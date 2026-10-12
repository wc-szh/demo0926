export const skillOptions = [
  '实拍视频拍摄',
  '视频剪辑包装',
  '企业宣传片',
  '动画制作',
  'AI 视频生成',
  'AI 漫剧',
  'AI 短剧',
  'AI 脚本分镜',
  '口播与配音',
  '字幕与调色',
] as const

export type SkillOption = (typeof skillOptions)[number]
