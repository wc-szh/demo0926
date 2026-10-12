export type TaskOfferResponse = 'ACCEPTED' | 'REJECTED'

const KEY = 'lingong-message-task-offer'

function loadMap(): Record<string, TaskOfferResponse> {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    return parsed as Record<string, TaskOfferResponse>
  } catch {
    return {}
  }
}

function saveMap(map: Record<string, TaskOfferResponse>) {
  sessionStorage.setItem(KEY, JSON.stringify(map))
}

export function getTaskOfferResponse(notificationId: string): TaskOfferResponse | null {
  return loadMap()[notificationId] ?? null
}

export function setTaskOfferResponse(notificationId: string, response: TaskOfferResponse) {
  const map = loadMap()
  map[notificationId] = response
  saveMap(map)
}
