const STORAGE_KEY = 'lingong-followed-tasks'
const DEFAULT_FOLLOWED_IDS = ['oj2', 'oj6']

function readIds(): string[] {
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

function writeIds(ids: string[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function loadFollowedTaskIds(): string[] {
  const ids = readIds()
  if (ids.length > 0) return ids
  writeIds(DEFAULT_FOLLOWED_IDS)
  return DEFAULT_FOLLOWED_IDS
}

export function isTaskFollowed(taskId: string): boolean {
  return readIds().includes(taskId)
}

export function addFollowedTask(taskId: string) {
  const ids = readIds()
  if (ids.includes(taskId)) return
  writeIds([taskId, ...ids])
}

export function removeFollowedTask(taskId: string) {
  writeIds(readIds().filter((id) => id !== taskId))
}

export function toggleFollowedTask(taskId: string): boolean {
  if (isTaskFollowed(taskId)) {
    removeFollowedTask(taskId)
    return false
  }
  addFollowedTask(taskId)
  return true
}
