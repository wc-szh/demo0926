import { offlineJobs, onlineOrders, type OfflineJob, type OnlineOrder } from '@lingong/shared'

export type WorkListItem =
  | { kind: 'offline'; data: OfflineJob }
  | { kind: 'online'; data: OnlineOrder }

export function countPendingConfirm(workerId: string) {
  const offline = offlineJobs.filter(
    (j) => j.assigneeId === workerId && j.status === 'PENDING_ACCEPT',
  ).length
  const online = onlineOrders.filter((o) => o.assigneeId === workerId && o.status === 'PENDING').length
  return offline + online
}

export function countInProgressWork(workerId: string) {
  const offline = offlineJobs.filter(
    (j) =>
      j.assigneeId === workerId &&
      (j.status === 'IN_PROGRESS' || j.status === 'PENDING_REVIEW'),
  ).length
  const online = onlineOrders.filter(
    (o) => o.assigneeId === workerId && o.status === 'IN_PROGRESS',
  ).length
  return offline + online
}

export function getAssignedWorkItems(workerId: string): WorkListItem[] {
  const items: WorkListItem[] = []
  for (const data of offlineJobs) {
    if (data.assigneeId === workerId && data.status === 'PENDING_ACCEPT') {
      items.push({ kind: 'offline', data })
    }
  }
  for (const data of onlineOrders) {
    if (data.assigneeId === workerId && data.status === 'PENDING') {
      items.push({ kind: 'online', data })
    }
  }
  return items
}

export function getMineWorkItems(workerId: string): WorkListItem[] {
  const items: WorkListItem[] = []
  for (const data of offlineJobs) {
    if (
      data.assigneeId === workerId &&
      (data.status === 'IN_PROGRESS' || data.status === 'PENDING_REVIEW')
    ) {
      items.push({ kind: 'offline', data })
    }
  }
  for (const data of onlineOrders) {
    if (data.assigneeId === workerId && data.status === 'IN_PROGRESS') {
      items.push({ kind: 'online', data })
    }
  }
  return items
}

export function workItemId(item: WorkListItem) {
  return `${item.kind}-${item.data.id}`
}

export function workItemDetailPath(item: WorkListItem) {
  return `/tasks/${item.data.id}`
}
