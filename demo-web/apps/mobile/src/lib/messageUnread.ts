import { notifications } from '@lingong/shared'

const CURRENT_WORKER = 'w1'
const READ_IDS_KEY = 'lingong-read-notification-ids'

function readStoredIds(): Set<string> {
  const raw = sessionStorage.getItem(READ_IDS_KEY)
  if (!raw) return new Set()
  try {
    const parsed = JSON.parse(raw) as unknown
    return new Set(Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [])
  } catch {
    return new Set()
  }
}

function writeStoredIds(ids: Set<string>) {
  sessionStorage.setItem(READ_IDS_KEY, JSON.stringify([...ids]))
}

export function isNotificationRead(notification: { id: string; read: boolean }) {
  if (notification.read) return true
  return readStoredIds().has(notification.id)
}

export function markNotificationRead(id: string) {
  const ids = readStoredIds()
  if (ids.has(id)) return
  ids.add(id)
  writeStoredIds(ids)
}

export function markAllNotificationsRead(workerId: string) {
  const ids = readStoredIds()
  for (const n of notifications) {
    if (n.workerId === workerId) ids.add(n.id)
  }
  writeStoredIds(ids)
}

export function getUnreadMessageCount(): number {
  return notifications.filter((n) => n.workerId === CURRENT_WORKER && !isNotificationRead(n)).length
}

export function getWorkerNotifications(workerId: string) {
  return notifications
    .filter((n) => n.workerId === workerId)
    .map((n) => ({ ...n, read: isNotificationRead(n) }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function getWorkerNotificationById(workerId: string, id: string) {
  const n = notifications.find((item) => item.id === id && item.workerId === workerId)
  if (!n) return null
  return { ...n, read: isNotificationRead(n) }
}
