// Centralized Client-Side Admin Authentication & Authorization Service
// Connects to server-side endpoints with cryptographically secure session management.

const TOKEN_KEY = 'islamiq_admin_session_token';

export interface AdminStatusResponse {
  isSetupComplete: boolean;
  isAuthenticated: boolean;
  hasOwner: boolean;
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
      // Clean up legacy insecure localStorage key if present
      localStorage.removeItem('islamiq_admin_passkey_v1');
    } catch {}
  },

  async getStatus(): Promise<AdminStatusResponse> {
    const token = this.getToken();
    try {
      const res = await fetch('/api/admin/status', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        return { isSetupComplete: true, isAuthenticated: false, hasOwner: true };
      }
      const data = await res.json();
      return data;
    } catch {
      // Fallback
      return { isSetupComplete: true, isAuthenticated: false, hasOwner: true };
    }
  },

  async setupOwnerPassword(password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to initialize owner password.' };
      }
      if (data.token) {
        this.setToken(data.token);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error during setup' };
    }
  },

  async login(password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Invalid credentials' };
      }
      if (data.token) {
        this.setToken(data.token);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Authentication failed' };
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const token = this.getToken();
    if (!token) {
      return { success: false, error: 'Not authenticated' };
    }
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to update password' };
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Network error' };
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
