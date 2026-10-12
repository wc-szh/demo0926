import type { WorkerGender } from '@lingong/shared'
import type { WorkerProfileDraft } from '@/lib/workerProfile'
import femaleAvatar from '@/assets/Female.png'
import maleAvatar from '@/assets/Male.png'

export const defaultAvatarAssets = {
  male: maleAvatar,
  female: femaleAvatar,
} as const

export function getDefaultAvatarSrc(gender: WorkerGender) {
  return gender === 'female' ? femaleAvatar : maleAvatar
}

export function resolveAvatarSrc(
  profile: Pick<WorkerProfileDraft, 'avatarMode' | 'avatarCustom'>,
  workerGender: WorkerGender,
) {
  if (profile.avatarMode === 'custom' && profile.avatarCustom) {
    return profile.avatarCustom
  }
  const gender = profile.avatarMode === 'female' ? 'female' : profile.avatarMode === 'male' ? 'male' : workerGender
  return getDefaultAvatarSrc(gender)
}
