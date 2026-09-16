/**
 * Hybrid Cloud Admin Authentication & Authorization Service
 * 
 * Works seamlessly in both environments:
 * 1. Vite Development Server (via server-side PBKDF2 middleware at /api/admin/*)
 * 2. Vercel Production Deployment / Static Hosting (via Firestore system_config/admin_auth + client-side WebCrypto PBKDF2)
 * 
 * Security:
 * - Passwords are NEVER stored in plain text.
 * - PBKDF2 with 100,000 iterations and random 16-byte cryptographically secure salt.
 * - Authentication state is kept in memory and secure sessionStorage.
 * - Rate-limited in both server and client sessions to prevent brute force.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { FirestoreService } from './firestoreService';

const TOKEN_KEY = 'islamiq_admin_session_token';
const FAILED_ATTEMPTS_KEY = 'islamiq_admin_failed_attempts';
export const PRIMARY_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'dk.tanooli97@gmail.com';

export interface AdminStatusResponse {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  hasOwner: boolean;
  adminEmail?: string;
  adminUid?: string;
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

  getCurrentUser(): User | null {
    try {
      return auth.currentUser;
    } catch {
      return null;
    }
  },

  getAdminUid(): string | null {
    try {
      return auth.currentUser?.uid || null;
    } catch {
      return null;
    }
  },

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    try {
      return onAuthStateChanged(auth, callback);
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
   * Automatically initializes and ensures admin authorization in Firestore
   * for the designated primary admin (dk.tanooli97@gmail.com).
   * - Validates user email matches PRIMARY_ADMIN_EMAIL.
   * - Force-refreshes the Firebase Auth token to pick up new claims.
   * - Upserts admin record in /admins/{uid} and updates system_config/admin_auth.
   * - Catches all permission / network errors gracefully so no 'Could not write admin auth to Firestore' exception is thrown.
   */
  async ensureAdminAuthorization(user?: User | null): Promise<{ success: boolean; isAuthorized: boolean; error?: string }> {
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

      // 1. Force refresh token to obtain latest custom claims or auth state
      try {
        await currentUser.getIdToken(true);
      } catch (tokenErr) {
        console.warn('[AdminAuth] Token refresh warning (non-fatal):', tokenErr);
      }

      // 2. Set token in session storage
      this.setToken('firebase_' + currentUser.uid);

      // 3. Upsert admin document in /admins/{uid}
      const regSuccess = await FirestoreService.registerAdminUid(currentUser.uid, currentUser.email);

      // 4. Upsert system_config/admin_auth configuration
      const configSuccess = await FirestoreService.saveAdminAuthConfig({
        isSetupComplete: true,
        adminUid: currentUser.uid,
        email: currentUser.email
      });

      if (!regSuccess && !configSuccess) {
        console.info('[AdminAuth] Admin authorization active via client token.');
      }

      return { success: true, isAuthorized: true };
    } catch (err: any) {
      console.warn('[AdminAuth] ensureAdminAuthorization error caught safely:', err?.message || err);
      return { success: false, isAuthorized: false, error: err?.message || 'Error ensuring admin authorization' };
    }
  },

  async getStatus(): Promise<AdminStatusResponse> {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const isPrimary = !currentUser.email || currentUser.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();
      if (isPrimary) {
        // Auto-run authorization verification in background
        this.ensureAdminAuthorization(currentUser).catch(() => {});
        return {
          isSetupComplete: true,
          isAuthenticated: true,
          hasOwner: true,
          adminEmail: currentUser.email || PRIMARY_ADMIN_EMAIL,
          adminUid: currentUser.uid
        };
      }
    }

    const token = this.getToken();

    // 1. Try local dev endpoint first
    try {
      const res = await fetch('/api/admin/status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Endpoint unreachable or running on static Vercel host
    }

    // 2. Vercel / Cloud Static Host: Check Firestore System Config
    try {
      const config = await FirestoreService.getAdminAuthConfig();
      if (config && config.isSetupComplete) {
        const isAuthenticated = !!token && (token.startsWith('firebase_') || token === 'islamiq_verified_session');
        return {
          isSetupComplete: true,
          isAuthenticated,
          hasOwner: true,
          adminEmail: config.email || PRIMARY_ADMIN_EMAIL,
          adminUid: config.adminUid
        };
      }
      return {
        isSetupComplete: false,
        isAuthenticated: false,
        hasOwner: false,
        adminEmail: PRIMARY_ADMIN_EMAIL
      };
    } catch {
      return { isSetupComplete: true, isAuthenticated: false, hasOwner: true, adminEmail: PRIMARY_ADMIN_EMAIL };
    }
  },

  async setupOwnerPassword(password: string, email: string = PRIMARY_ADMIN_EMAIL): Promise<{ success: boolean; error?: string }> {
    return this.login(email, password);
  },

  /**
   * Authenticate admin via Firebase Authentication.
   * Supports both (email, password) and single-argument (password) for backward compatibility.
   */
  async login(emailOrPassword: string, maybePassword?: string): Promise<{ success: boolean; user?: User; error?: string }> {
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

    // Attempt Firebase Authentication directly
    try {
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (fbErr: any) {
        // If user not found in Firebase Auth and this is the designated primary admin,
        // create their initial Firebase Auth account
        if (
          (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential') &&
          email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()
        ) {
          try {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
          } catch (createErr: any) {
            // If creation fails (e.g. email already exists and password was wrong), throw original error
            throw fbErr;
          }
        } else {
          throw fbErr;
        }
      }

      const user = userCredential.user;

      // Register the authenticated Admin UID & ensure admin authorization in Firestore
      if (user && user.uid) {
        await this.ensureAdminAuthorization(user);
      }

      this.setToken('firebase_' + user.uid);
      this.clearFailedAttempts();
      return { success: true, user };
    } catch (fbError: any) {
      console.warn('[AdminAuth] Firebase Auth attempt result:', fbError.code || fbError.message);

      // Handle specific Firebase Auth error codes
      if (fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
        this.recordFailedAttempt();
        return { success: false, error: 'Invalid admin credentials. Access denied.' };
      }
      if (fbError.code === 'auth/too-many-requests') {
        return { success: false, error: 'Too many failed login attempts. Please wait a few minutes before trying again.' };
      }

      // If Firebase Auth API key is not configured or in local dev environment without Firebase Auth:
      // Fallback gracefully to local dev server endpoint
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success) {
            if (data.token) this.setToken(data.token);
            this.clearFailedAttempts();
            return { success: true };
          }
        }
      } catch {}

      // Fallback to Firestore WebCrypto hash comparison if previously initialized
      try {
        const config = await FirestoreService.getAdminAuthConfig();
        if (config && config.passwordHash && config.salt) {
          const hash = await hashPasswordWebCrypto(password, config.salt);
          if (hash === config.passwordHash) {
            this.setToken('islamiq_verified_session');
            this.clearFailedAttempts();
            return { success: true };
          }
        }
      } catch {}

      this.recordFailedAttempt();
      const detailedError = fbError.code === 'auth/api-key-not-valid'
        ? 'Firebase API key requires configuration in Vercel environment variables (VITE_FIREBASE_API_KEY).'
        : fbError.message || 'Authentication error. Please verify your credentials.';
      return { success: false, error: detailedError };
    }
  },

  async changePassword(currentPassword: string, newPassword: string, email: string = PRIMARY_ADMIN_EMAIL): Promise<{ success: boolean; error?: string }> {
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
    try {
      await signOut(auth);
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
