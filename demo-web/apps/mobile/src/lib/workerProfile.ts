import type { SkillOption, Worker } from '@lingong/shared'

const STORAGE_KEY = 'lingong-worker-profile'
const MAX_AVATAR_BYTES = 1024 * 1024

export type AvatarMode = 'male' | 'female' | 'custom'

export type WorkerIdentityType = 'individual' | 'studio' | 'enterprise'

export const WORKER_IDENTITY_LABELS: Record<WorkerIdentityType, string> = {
  individual: '个人',
  studio: '工作室',
  enterprise: '企业',
}

export interface WorkerProfileDraft {
  displayName: string
  bio: string
  skills: SkillOption[]
  avatarMode: AvatarMode
  avatarCustom?: string
  identityType: WorkerIdentityType
}

export function createWorkerProfileDefaults(worker: Worker): WorkerProfileDraft {
  return {
    displayName: worker.displayName,
    bio: worker.bio ?? '',
    skills: [],
    avatarMode: worker.gender === 'female' ? 'female' : 'male',
    identityType: 'individual',
  }
}

export function loadWorkerProfile(defaults: WorkerProfileDraft): WorkerProfileDraft {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return defaults
  try {
    const parsed = JSON.parse(raw) as Partial<WorkerProfileDraft>
    return {
      ...defaults,
      ...parsed,
      avatarMode: parsed.avatarMode ?? defaults.avatarMode,
      identityType: parsed.identityType ?? defaults.identityType,
    }
  } catch {
    return defaults
  }
}

export function saveWorkerProfile(profile: WorkerProfileDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

export async function readAvatarFile(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('请选择图片文件')
  }
  if (file.size > MAX_AVATAR_BYTES) {
    throw new Error('图片大小不能超过 1MB')
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('图片读取失败'))
    reader.readAsDataURL(file)
  })

  return dataUrl
}