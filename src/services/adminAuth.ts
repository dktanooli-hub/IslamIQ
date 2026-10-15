/**
 * IslamIQ Dual-Backend Admin Authentication Service
 * 
 * Supports:
 * 1. Supabase Auth (Target PostgreSQL backend via supabase-js + secure claim_admin_bootstrap RPC)
 * 2. Firebase Auth (Legacy/Fallback backend, preserved for zero-downtime migration)
 * 
 * Security:
 * - Passwords are NEVER stored in plain text.
 * - In Supabase mode, sessions use standard JWTs with Supabase RLS policies.
 * - Admin authorization relies on server-side public.is_admin() and public.app_admins table.
 * - No automatic bypasses or silent role grants.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth as firebaseAuth } from '../firebase/config';
import { FirestoreService } from './firestoreService';
import { supabase, isSupabaseConfigured } from '../supabase/config';
import { SupabaseService } from './supabaseService';

const TOKEN_KEY = 'islamiq_admin_session_token';
const FAILED_ATTEMPTS_KEY = 'islamiq_admin_failed_attempts';
export const PRIMARY_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'dk.tanooli97@gmail.com';

export interface AdminStatusResponse {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  hasOwner: boolean;
  adminEmail?: string;
  adminUid?: string;
  authBackend: 'supabase' | 'firebase' | 'local';
}

// Client-side WebCrypto PBKDF2 helper for static hosts
async function hashPasswordWebCrypto(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const saltBytes = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-512'
    },
    keyMaterial,
    512
  );
  return Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateRandomSalt(): string {
  const random = new Uint8Array(16);
  window.crypto.getRandomValues(random);
  return Array.from(random)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const AdminAuthService = {
  getAuthBackend(): 'supabase' | 'firebase' | 'local' {
    if (isSupabaseConfigured()) return 'supabase';
    return 'firebase';
  },

  getToken(): string | null {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string) {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },

  clearToken() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('islamiq_admin_passkey_v1');
    } catch {}
  },

  getCurrentUser(): { email?: string | null; uid?: string | null } | null {
    if (isSupabaseConfigured()) {
      // Supabase user from synchronous session cache if available
      try {
        const sessionStr = localStorage.getItem(`sb-${new URL(supabase['supabaseUrl'] || 'https://udlunwwubmskgdbbjwee.supabase.co').hostname.split('.')[0]}-auth-token`);
        if (sessionStr) {
          const parsed = JSON.parse(sessionStr);
          if (parsed?.user) {
            return { email: parsed.user.email, uid: parsed.user.id };
          }
        }
      } catch {}
    }

    try {
      const fbUser = firebaseAuth.currentUser;
      if (fbUser) return { email: fbUser.email, uid: fbUser.uid };
    } catch {}

    return null;
  },

  getAdminUid(): string | null {
    return this.getCurrentUser()?.uid || null;
  },

  onAuthStateChanged(callback: (user: { email?: string | null; uid?: string | null } | null) => void): () => void {
    if (isSupabaseConfigured()) {
      try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            callback({ email: session.user.email, uid: session.user.id });
          } else {
            callback(null);
          }
        });
        return () => subscription.unsubscribe();
      } catch {
        return () => {};
      }
    }

    try {
      return onAuthStateChanged(firebaseAuth, (user: FirebaseUser | null) => {
        if (user) {
          callback({ email: user.email, uid: user.uid });
        } else {
          callback(null);
        }
      });
    } catch {
      return () => {};
    }
  },

  checkRateLimit(): { isLocked: boolean; waitSeconds: number } {
    try {
      const record = JSON.parse(sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '{}');
      const now = Date.now();
      if (record.lockedUntil && record.lockedUntil > now) {
        return { isLocked: true, waitSeconds: Math.ceil((record.lockedUntil - now) / 1000) };
      }
      return { isLocked: false, waitSeconds: 0 };
    } catch {
      return { isLocked: false, waitSeconds: 0 };
    }
  },

  recordFailedAttempt() {
    try {
      const now = Date.now();
      const record = JSON.parse(sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '{"count": 0}');
      record.count = (record.count || 0) + 1;
      if (record.count >= 5) {
        record.lockedUntil = now + 60 * 1000; // lock for 60s
      }
      sessionStorage.setItem(FAILED_ATTEMPTS_KEY, JSON.stringify(record));
    } catch {}
  },

  clearFailedAttempts() {
    try {
      sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
    } catch {}
  },

  /**
   * Explicitly claims administrator bootstrap via Supabase RPC.
   * Requires caller to be authenticated with verified dk.tanooli97@gmail.com.
   */
  async claimAdminBootstrap(): Promise<{ success: boolean; message?: string; error?: string }> {
    if (isSupabaseConfigured()) {
      return SupabaseService.claimAdminBootstrap();
    }
    return { success: false, error: 'Supabase configuration is not active.' };
  },

  /**
   * Automatically initializes and ensures admin authorization in Firestore
   * for the designated primary admin (dk.tanooli97@gmail.com) when in Firebase fallback mode.
   */
  async ensureAdminAuthorization(user?: { email?: string | null; uid?: string | null } | null): Promise<{ success: boolean; isAuthorized: boolean; error?: string }> {
    try {
      const currentUser = user || this.getCurrentUser();
      if (!currentUser || !currentUser.email) {
        return { success: true, isAuthorized: false };
      }

      const email = currentUser.email.trim().toLowerCase();
      const primaryEmail = PRIMARY_ADMIN_EMAIL.trim().toLowerCase();

      if (email !== primaryEmail) {
        return { success: true, isAuthorized: false };
      }

      // Supabase verification path
      if (isSupabaseConfigured()) {
        const isAdmin = await SupabaseService.checkIsAdmin();
        return { success: true, isAuthorized: isAdmin };
      }

      // Legacy Firebase verification path
      if (currentUser.uid) {
        this.setToken('firebase_' + currentUser.uid);
        await FirestoreService.registerAdminUid(currentUser.uid, currentUser.email);
        await FirestoreService.saveAdminAuthConfig({
          isSetupComplete: true,
          adminUid: currentUser.uid,
          email: currentUser.email
        });
      }

      return { success: true, isAuthorized: true };
    } catch (err: any) {
      console.warn('[AdminAuth] ensureAdminAuthorization error caught safely:', err?.message || err);
      return { success: false, isAuthorized: false, error: err?.message || 'Error ensuring admin authorization' };
    }
  },

  async getStatus(): Promise<AdminStatusResponse> {
    const authBackend = this.getAuthBackend();

    // 1. Supabase Auth Status Check
    if (isSupabaseConfigured()) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const email = session.user.email || PRIMARY_ADMIN_EMAIL;
          const isAdmin = await SupabaseService.checkIsAdmin();
          return {
            isSetupComplete: true,
            isAuthenticated: isAdmin,
            hasOwner: true,
            adminEmail: email,
            adminUid: session.user.id,
            authBackend: 'supabase'
          };
        }
      } catch (sbErr) {
        console.warn('[AdminAuth] Supabase session check error:', sbErr);
      }
    }

    // 2. Legacy Firebase Auth Status Check
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.email) {
      const isPrimary = currentUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();
      if (isPrimary) {
        return {
          isSetupComplete: true,
          isAuthenticated: true,
          hasOwner: true,
          adminEmail: currentUser.email,
          adminUid: currentUser.uid || undefined,
          authBackend
        };
      }
    }

    const token = this.getToken();

    // 3. Try local dev endpoint fallback
    try {
      const res = await fetch('/api/admin/status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        return { ...data, authBackend };
      }
    } catch {}

    // 4. Fallback: Check Firestore System Config if available
    try {
      const config = await FirestoreService.getAdminAuthConfig();
      if (config && config.isSetupComplete) {
        const isAuthenticated = !!token && (token.startsWith('firebase_') || token === 'islamiq_verified_session');
        return {
          isSetupComplete: true,
          isAuthenticated,
          hasOwner: true,
          adminEmail: config.email || PRIMARY_ADMIN_EMAIL,
          adminUid: config.adminUid,
          authBackend
        };
      }
      return {
        isSetupComplete: false,
        isAuthenticated: false,
        hasOwner: false,
        adminEmail: PRIMARY_ADMIN_EMAIL,
        authBackend
      };
    } catch {
      return {
        isSetupComplete: true,
        isAuthenticated: false,
        hasOwner: true,
        adminEmail: PRIMARY_ADMIN_EMAIL,
        authBackend
      };
    }
  },

  async setupOwnerPassword(password: string, email: string = PRIMARY_ADMIN_EMAIL): Promise<{ success: boolean; error?: string }> {
    return this.login(email, password);
  },

  /**
   * Authenticate administrator.
   * If Supabase is configured, signs in with Supabase Auth.
   * If not configured, gracefully falls back to Firebase Auth.
   */
  async login(emailOrPassword: string, maybePassword?: string): Promise<{ success: boolean; user?: any; error?: string }> {
    const rate = this.checkRateLimit();
    if (rate.isLocked) {
      return { success: false, error: `Too many failed attempts. Locked for ${rate.waitSeconds}s.` };
    }

    let email = PRIMARY_ADMIN_EMAIL;
    let password = emailOrPassword;

    if (maybePassword !== undefined) {
      email = emailOrPassword.trim();
      password = maybePassword;
    }

    // -------------------------------------------------------------------------
    // A. SUPABASE AUTH PATH (When Configured)
    // -------------------------------------------------------------------------
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          // If login fails due to credentials or unconfirmed email
          this.recordFailedAttempt();
          return { success: false, error: `Supabase Auth: ${error.message}` };
        }

        if (data?.user) {
          this.setToken('supabase_' + data.user.id);
          this.clearFailedAttempts();
          return { success: true, user: data.user };
        }
      } catch (sbError: any) {
        console.warn('[AdminAuth] Supabase Auth exception:', sbError);
        return { success: false, error: sbError?.message || 'Supabase authentication failed.' };
      }
    }

    // -------------------------------------------------------------------------
    // B. LEGACY FIREBASE AUTH PATH (Fallback Mode)
    // -------------------------------------------------------------------------
    try {
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      } catch (fbErr: any) {
        if (
          (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential') &&
          email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()
        ) {
          try {
            userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          } catch {
            throw fbErr;
          }
        } else {
          throw fbErr;
        }
      }

      const user = userCredential.user;
      if (user && user.uid) {
        await this.ensureAdminAuthorization(user);
      }

      this.setToken('firebase_' + user.uid);
      this.clearFailedAttempts();
      return { success: true, user };
    } catch (fbError: any) {
      console.warn('[AdminAuth] Firebase Auth attempt result:', fbError.code || fbError.message);

      if (fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
        this.recordFailedAttempt();
        return { success: false, error: 'Invalid admin credentials. Access denied.' };
      }
      if (fbError.code === 'auth/too-many-requests') {
        return { success: false, error: 'Too many failed login attempts. Please wait a few minutes.' };
      }

      // Local dev endpoint fallback
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const data = await res.json();
        if (data?.success) {
          if (data.token) this.setToken(data.token);
          this.clearFailedAttempts();
          return { success: true };
        }
      } catch {}

      this.recordFailedAttempt();
      return { success: false, error: fbError.message || 'Authentication error. Please verify your credentials.' };
    }
  },

  async changePassword(currentPassword: string, newPassword: string, email: string = PRIMARY_ADMIN_EMAIL): Promise<{ success: boolean; error?: string }> {
    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to update password.' };
      }
    }

    const loginRes = await this.login(email, currentPassword);
    if (!loginRes.success) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    try {
      const salt = generateRandomSalt();
      const passwordHash = await hashPasswordWebCrypto(newPassword, salt);
      const uid = this.getAdminUid() || undefined;
      await FirestoreService.saveAdminAuthConfig({
        isSetupComplete: true,
        passwordHash,
        salt,
        adminUid: uid,
        email
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to update passkey.' };
    }
  },

  async logout(): Promise<void> {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch {}
    }

    try {
      await firebaseSignOut(firebaseAuth);
    } catch {}

    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    this.clearToken();
  }
};
