const SESSION_KEY = 'lingong-mobile-session'

export interface AuthSession {
  username: string
  displayName: string
  loginType?: 'wechat'
  openId?: string
  phone?: string
}

export function getSession(): AuthSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function setSession(session: AuthSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated() {
  return getSession() !== null
}
