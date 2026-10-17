export interface HomeBanner {
  id: string
  tag: string
  kicker?: string
  title: string
  subtitle: string
  to?: string
  tone?: 'blue' | 'mint'
}

export interface HomeAnnouncement {
  id: string
  tag: string
  title: string
  description: string
}

export interface HomeReferenceItem {
  id: string
  title: string
  hint: string
  to: string
  tone: 'blue' | 'mint' | 'warm' | 'violet'
}

/** 首页展示型海报（路线 A：无人数条、无报名条） */
export const homeBanners: HomeBanner[] = [
  {
    id: 'hb-camp',
    tag: '限时招募',
    kicker: '拾影学院',
    title: '成片规范新手特训营',
    subtitle: '官方导师按平台模板带教 速来预约',
    to: '/style-guide',
    tone: 'blue',
  },
  {
    id: 'hb-bonus',
    tag: '活动',
    kicker: '十月加码',
    title: '国庆视频激励加码',
    subtitle: '10月1日–7日交付成片，额外享 3% 提成加成',
    to: '/tasks/public',
    tone: 'mint',
  },
]

/** 首页单张运营海报（兼容旧引用） */
export const homeBanner: HomeBanner = homeBanners[0]

export const homeReferences: HomeReferenceItem[] = [
  { id: 'hr1', title: '企业宣传片模板', hint: '3–5 分钟成片结构', to: '/style-guide', tone: 'blue' },
  { id: 'hr2', title: '竖屏探店节奏', hint: '60s 分镜与字幕', to: '/style-guide', tone: 'warm' },
  { id: 'hr3', title: '活动纪实快剪', hint: '现场跟拍交付要点', to: '/settings', tone: 'violet' },
  { id: 'hr4', title: '动画成片规范', hint: '角色与合成验收', to: '/style-guide', tone: 'mint' },
]

/** 任务中心「本月收益」模块 */
export const taskHallEarnings = {
  month: 8942,
  todayEstimate: 38.2,
  yesterdayEstimate: 89988.1,
}

export const homeAnnouncements: HomeAnnouncement[] = [
  {
    id: 'ha1',
    tag: '活动',
    title: '国庆视频激励',
    description: '10月1日-7日完成视频任务，额外享 3% 提成加成。',
  },
  {
    id: 'ha2',
    tag: '公告',
    title: '成片规范更新',
    description: '企业宣传片、动画、AI 漫剧/短剧需按平台模板交付，逾期将影响信用分。',
  },
]
