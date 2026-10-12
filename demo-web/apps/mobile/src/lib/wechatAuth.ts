const OPENID_KEY = 'lingong-wechat-openid'
const PROFILE_KEY = 'lingong-wechat-profile'

export interface WeChatAuthResult {
  openId: string
  displayName: string
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function getOrCreateOpenId() {
  const stored = localStorage.getItem(OPENID_KEY)
  if (stored) return stored
  const openId = `wx_demo_${Math.random().toString(36).slice(2, 10)}`
  localStorage.setItem(OPENID_KEY, openId)
  return openId
}

function readProfile(openId: string): string | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    const profiles = JSON.parse(raw) as Record<string, string>
    return profiles[openId] ?? null
  } catch {
    return null
  }
}

function saveProfile(openId: string, displayName: string) {
  const raw = localStorage.getItem(PROFILE_KEY)
  let profiles: Record<string, string> = {}
  if (raw) {
    try {
      profiles = JSON.parse(raw) as Record<string, string>
    } catch {
      profiles = {}
    }
  }
  profiles[openId] = displayName
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles))
}

/** 模拟 wx.login + 后端换取用户信息（无真实后端） */
export async function mockWeChatAuthorize(): Promise<WeChatAuthResult> {
  await delay(800)
  const openId = getOrCreateOpenId()
  const displayName = readProfile(openId) ?? '微信用户'
  saveProfile(openId, displayName)
  return { openId, displayName }
}
