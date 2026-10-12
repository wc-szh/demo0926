export interface HomeBanner {
  id: string
  tag: string
  title: string
  subtitle: string
}

export interface HomeAnnouncement {
  id: string
  tag: string
  title: string
  description: string
}

/** 首页单张运营海报（Part A 静态） */
export const homeBanner: HomeBanner = {
  id: 'hb1',
  tag: '活动',
  title: '国庆视频激励',
  subtitle: '10月1日–7日交付成片，额外享 3% 提成加成',
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
