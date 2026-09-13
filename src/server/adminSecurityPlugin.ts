import { Plugin, Connect } from 'vite';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

// Server-side state file path
const DATA_DIR = path.resolve(process.cwd(), '.server-data');
const STATE_FILE = path.join(DATA_DIR, 'admin-state.json');

interface ServerAdminState {
  isSetupComplete: boolean;
  passwordHash: string;
  salt: string;
  sessions: { [token: string]: { createdAt: number; expiresAt: number } };
  failedAttempts: { [ip: string]: { count: number; lockedUntil: number } };
}

function ensureState(): ServerAdminState {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(STATE_FILE)) {
    try {
      const content = fs.readFileSync(STATE_FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      // ignore parse error, recreate below
    }
  }

  // Initial fresh unconfigured state
  // Notice: NO default password! isSetupComplete is false.
  // The owner MUST initialize their master password through secure first-time setup.
  const initialState: ServerAdminState = {
    isSetupComplete: false,
    passwordHash: '',
    salt: '',
    sessions: {},
    failedAttempts: {}
  };

  fs.writeFileSync(STATE_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
  return initialState;
}

function saveState(state: ServerAdminState) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('[AdminSecurity] Failed to write state:', err);
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
}

function parseJsonBody(req: any): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res: any, status: number, data: any) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.end(JSON.stringify(data));
}

export function adminSecurityPlugin(): Plugin {
  return {
    name: 'islamiq-admin-security-plugin',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
        const url = req.url || '';

        // Only intercept /api/admin/* routes
        if (!url.startsWith('/api/admin/')) {
          return next();
        }

        const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
        const state = ensureState();

        // Rate limiting check for authentication routes
        const now = Date.now();
        const ipRecord = state.failedAttempts[clientIp];
        if (ipRecord && ipRecord.lockedUntil > now) {
          const waitSecs = Math.ceil((ipRecord.lockedUntil - now) / 1000);
          return sendJson(res, 429, {
            success: false,
            error: `Too many failed attempts. Access locked for ${waitSecs} seconds for security.`
          });
        }

        // Helper to validate session token
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader.replace(/^Bearer\s+/i, '').trim();

        const validateSession = () => {
          if (!token || !state.sessions[token]) {
            return false;
          }
          const session = state.sessions[token];
          if (now > session.expiresAt) {
            delete state.sessions[token];
            saveState(state);
            return false;
          }
          return true;
        };

        // ROUTE 1: GET /api/admin/status (Checks setup status & token validity)
        if (url === '/api/admin/status' && req.method === 'GET') {
          const isAuthenticated = validateSession();
          return sendJson(res, 200, {
            isSetupComplete: state.isSetupComplete,
            isAuthenticated,
            hasOwner: state.isSetupComplete
          });
        }

        // ROUTE 2: POST /api/admin/setup (First-time secure initialization by owner)
        if (url === '/api/admin/setup' && req.method === 'POST') {
          if (state.isSetupComplete) {
            return sendJson(res, 403, {
              success: false,
              error: 'Admin portal is already initialized and secured. Use Admin Login.'
            });
          }

          try {
            const body = await parseJsonBody(req);
            const { password } = body;

            if (!password || typeof password !== 'string' || password.length < 8) {
              return sendJson(res, 400, {
                success: false,
                error: 'Master password must be at least 8 characters long.'
              });
            }

            const salt = crypto.randomBytes(16).toString('hex');
            const passwordHash = hashPassword(password, salt);

            // Generate secure session token (valid 8 hours)
            const newToken = crypto.randomBytes(32).toString('hex');
            state.isSetupComplete = true;
            state.salt = salt;
            state.passwordHash = passwordHash;
            state.sessions[newToken] = {
              createdAt: now,
              expiresAt: now + 8 * 60 * 60 * 1000
            };

            saveState(state);

            return sendJson(res, 200, {
              success: true,
              token: newToken,
              message: 'Owner Master Password set and secured successfully.'
            });
          } catch (e: any) {
            return sendJson(res, 500, { success: false, error: e.message || 'Setup error' });
          }
        }

        // ROUTE 3: POST /api/admin/login (Secure server-side authentication)
        if (url === '/api/admin/login' && req.method === 'POST') {
          if (!state.isSetupComplete) {
            return sendJson(res, 400, {
              success: false,
              error: 'Admin Portal has not been initialized yet. Please complete initial owner setup.'
            });
          }

          try {
            const body = await parseJsonBody(req);
            const { password } = body;

            if (!password || typeof password !== 'string') {
              return sendJson(res, 400, { success: false, error: 'Password required' });
            }

            const inputHash = hashPassword(password, state.salt);

            // Constant time comparison to prevent timing attacks
            const isValid = crypto.timingSafeEqual(
              Buffer.from(inputHash, 'hex'),
              Buffer.from(state.passwordHash, 'hex')
            );

            if (!isValid) {
              // Track failed attempts
              if (!state.failedAttempts[clientIp]) {
                state.failedAttempts[clientIp] = { count: 1, lockedUntil: 0 };
              } else {
                state.failedAttempts[clientIp].count += 1;
                if (state.failedAttempts[clientIp].count >= 5) {
                  // Lock for 15 minutes
                  state.failedAttempts[clientIp].lockedUntil = now + 15 * 60 * 1000;
                }
              }
              saveState(state);

              return sendJson(res, 401, {
                success: false,
                error: 'Invalid admin credentials. Access denied.'
              });
            }

            // Success: clear failed counter
            delete state.failedAttempts[clientIp];

            // Issue session token
            const newToken = crypto.randomBytes(32).toString('hex');
            state.sessions[newToken] = {
              createdAt: now,
              expiresAt: now + 8 * 60 * 60 * 1000
            };
            saveState(state);

            return sendJson(res, 200, {
              success: true,
              token: newToken,
              message: 'Authentication successful'
            });
          } catch (e: any) {
            return sendJson(res, 500, { success: false, error: e.message || 'Login error' });
          }
        }

        // ROUTE 4: POST /api/admin/logout (Terminates session on server)
        if (url === '/api/admin/logout' && req.method === 'POST') {
          if (token && state.sessions[token]) {
            delete state.sessions[token];
            saveState(state);
          }
          return sendJson(res, 200, { success: true, message: 'Logged out successfully' });
        }

        // ROUTE 5: POST /api/admin/change-password (Requires valid token + current password)
        if (url === '/api/admin/change-password' && req.method === 'POST') {
          if (!validateSession()) {
            return sendJson(res, 401, { success: false, error: 'Unauthorized: Session invalid or expired' });
          }

          try {
            const body = await parseJsonBody(req);
            const { currentPassword, newPassword } = body;

            if (!newPassword || newPassword.length < 8) {
              return sendJson(res, 400, {
                success: false,
                error: 'New password must be at least 8 characters long.'
              });
            }

            const currentHash = hashPassword(currentPassword || '', state.salt);
            const isCurrentValid = crypto.timingSafeEqual(
              Buffer.from(currentHash, 'hex'),
              Buffer.from(state.passwordHash, 'hex')
            );

            if (!isCurrentValid) {
              return sendJson(res, 403, { success: false, error: 'Current password does not match.' });
            }

            // Update to new salt & hash
            const newSalt = crypto.randomBytes(16).toString('hex');
            const newHash = hashPassword(newPassword, newSalt);

            state.salt = newSalt;
            state.passwordHash = newHash;
            // Invalidate other sessions
            state.sessions = {
              [token]: {
                createdAt: now,
                expiresAt: now + 8 * 60 * 60 * 1000
              }
            };
            saveState(state);

            return sendJson(res, 200, { success: true, message: 'Password updated securely.' });
          } catch (e: any) {
            return sendJson(res, 500, { success: false, error: e.message || 'Error updating password' });
          }
        }

        // ROUTE 6: ANY OTHER ADMIN MUTATION ROUTE (Guarded by server-side authorization)
        // e.g. /api/admin/verify-action, /api/admin/data
        if (!validateSession()) {
          return sendJson(res, 401, {
            success: false,
            error: 'Access Forbidden: Only authorized admin can perform administrative operations.'
          });
        }

        if (url === '/api/admin/verify-session' && req.method === 'GET') {
          return sendJson(res, 200, { success: true, valid: true });
        }

        return sendJson(res, 404, { success: false, error: 'Endpoint not found' });
      });
    }
  };
}
