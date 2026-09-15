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

import { FirestoreService } from './firestoreService';

const TOKEN_KEY = 'islamiq_admin_session_token';
const FAILED_ATTEMPTS_KEY = 'islamiq_admin_failed_attempts';

export interface AdminStatusResponse {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  hasOwner: boolean;
}

// Client-side WebCrypto PBKDF2 helper for static hosts (Vercel)
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

  async getStatus(): Promise<AdminStatusResponse> {
    const token = this.getToken();

    // 1. Try local dev endpoint first
    try {
      const res = await fetch('/api/admin/status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      // Ensure response is actually JSON and not an SPA index.html fallback
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        return data;
      }
    } catch {
      // Endpoint unreachable or running on static Vercel host
    }

    // 2. Vercel/Static Host: Fallback to Firestore System Config
    try {
      const config = await FirestoreService.getAdminAuthConfig();
      if (config && config.isSetupComplete) {
        const isAuthenticated = !!token && token === 'islamiq_verified_session';
        return {
          isSetupComplete: true,
          isAuthenticated,
          hasOwner: true
        };
      }
      // If Firestore has no config yet, allow first-time owner setup
      return {
        isSetupComplete: false,
        isAuthenticated: false,
        hasOwner: false
      };
    } catch {
      return { isSetupComplete: true, isAuthenticated: false, hasOwner: true };
    }
  },

  async setupOwnerPassword(password: string): Promise<{ success: boolean; error?: string }> {
    // 1. Try dev endpoint
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success) {
          if (data.token) this.setToken(data.token);
          // Also sync hash to Firestore so Vercel can also authenticate
          try {
            const salt = generateRandomSalt();
            const passwordHash = await hashPasswordWebCrypto(password, salt);
            await FirestoreService.saveAdminAuthConfig({ isSetupComplete: true, passwordHash, salt });
          } catch {}
          return { success: true };
        }
        return { success: false, error: data.error };
      }
    } catch {
      // Proceed to static/cloud fallback
    }

    // 2. Static / Vercel Host: Initialize using WebCrypto and Firestore
    try {
      const salt = generateRandomSalt();
      const passwordHash = await hashPasswordWebCrypto(password, salt);
      const saved = await FirestoreService.saveAdminAuthConfig({
        isSetupComplete: true,
        passwordHash,
        salt
      });
      if (!saved) {
        return { success: false, error: 'Could not write admin auth to Firestore.' };
      }
      this.setToken('islamiq_verified_session');
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Setup failed' };
    }
  },

  async login(password: string): Promise<{ success: boolean; error?: string }> {
    const rate = this.checkRateLimit();
    if (rate.isLocked) {
      return { success: false, error: `Too many failed attempts. Locked for ${rate.waitSeconds}s.` };
    }

    // 1. Try local dev endpoint
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
        this.recordFailedAttempt();
        return { success: false, error: data.error || 'Invalid credentials' };
      }
    } catch {
      // Proceed to cloud/Firestore fallback
    }

    // 2. Static / Vercel Host: Authenticate against Firestore system_config/admin_auth
    try {
      const config = await FirestoreService.getAdminAuthConfig();
      if (!config || !config.isSetupComplete || !config.passwordHash || !config.salt) {
        // Not configured yet
        return { success: false, error: 'Admin has not been initialized yet.' };
      }

      const hash = await hashPasswordWebCrypto(password, config.salt);
      if (hash === config.passwordHash) {
        this.setToken('islamiq_verified_session');
        this.clearFailedAttempts();
        return { success: true };
      } else {
        this.recordFailedAttempt();
        return { success: false, error: 'Invalid credentials. Access denied.' };
      }
    } catch (e: any) {
      this.recordFailedAttempt();
      return { success: false, error: e.message || 'Authentication error' };
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    // Validate current password first
    const loginRes = await this.login(currentPassword);
    if (!loginRes.success) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    // Update in local server if available
    const token = this.getToken();
    try {
      await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
    } catch {}

    // Update in Firestore
    try {
      const salt = generateRandomSalt();
      const passwordHash = await hashPasswordWebCrypto(newPassword, salt);
      await FirestoreService.saveAdminAuthConfig({
        isSetupComplete: true,
        passwordHash,
        salt
      });
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to update passkey.' };
    }
  },

  async logout(): Promise<void> {
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
