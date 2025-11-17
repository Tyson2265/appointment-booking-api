export const API_BASE = '/api';

const AUTH_KEY = 'capitec_auth_token';

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_KEY);
}
export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_KEY, token);
}
export function clearAuthToken() {
  localStorage.removeItem(AUTH_KEY);
}

async function parseBody(res: Response) {
  const ct = res.headers.get('content-type') || '';
  if (res.status === 204) return null;
  try {
    if (ct.includes('application/json')) return await res.json();
    return await res.text();
  } catch {
    return null;
  }
}

export async function apiFetch<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    ...(opts.headers ? (opts.headers as Record<string, string>) : {}),
  };

  const token = getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, { ...opts, headers });

  const body = await parseBody(res).catch(() => null);

  // helpful dev logging
  if (!res.ok) {
    const serverMsg = (body && typeof body === 'object' && 'message' in body) ? (body as any).message : body;
    const errMsg = serverMsg ? `${res.status} ${res.statusText} — ${JSON.stringify(serverMsg)}` : `${res.status} ${res.statusText}`;
    throw new Error(errMsg);
  }

  return (body as T);
}

/* Auth helpers */
export type LoginResponse = { token: string };

export async function loginRequest(username: string, password: string): Promise<string> {
  const data = await apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!data?.token) throw new Error('No token returned');
  setAuthToken(data.token);
  return data.token;
}

export async function registerRequest(username: string, password: string, role?: string): Promise<void> {
  await apiFetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
  });
}