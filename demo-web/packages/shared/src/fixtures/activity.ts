export interface ActivityItem {
  id: string
  workerName: string
  action: string
  amount: number
  time: string
}

export const activityFeed: ActivityItem[] = [
  { id: 'a1', workerName: '李四', action: '完成 AI 视频单', amount: 96, time: '刚刚' },
  { id: 'a2', workerName: '王五', action: '完成实拍任务', amount: 350, time: '1分钟前' },
  { id: 'a3', workerName: '张三', action: '完成 AI 视频单', amount: 128.5, time: '3分钟前' },
  { id: 'a4', workerName: '赵六', action: '完成实拍任务', amount: 220, time: '5分钟前' },
  { id: 'a5', workerName: '孙七', action: '提现到账', amount: 500, time: '8分钟前' },
  { id: 'a6', workerName: '周八', action: '完成 AI 视频单', amount: 75, time: '12分钟前' },
  { id: 'a7', workerName: '王五', action: '完成实拍任务', amount: 180, time: '15分钟前' },
  { id: 'a8', workerName: '李四', action: '完成 AI 视频单', amount: 112, time: '18分钟前' },
]
