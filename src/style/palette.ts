export type DataSourceType = 'skills' | 'claw';

export interface CategoryColor {
  bg: string;
  text: string;
  border: string;
}

const FALLBACK_CATEGORY_COLOR: CategoryColor = {
  bg: 'rgba(148, 163, 184, 0.15)',
  text: '#cbd5e1',
  border: 'rgba(148, 163, 184, 0.3)',
};

const SKILL_CATEGORY_COLORS: Record<string, CategoryColor> = {
  'React / Next.js': { bg: 'rgba(96, 165, 250, 0.15)', text: '#93c5fd', border: 'rgba(96, 165, 250, 0.3)' },
  'Vue.js': { bg: 'rgba(74, 222, 128, 0.15)', text: '#86efac', border: 'rgba(74, 222, 128, 0.3)' },
  'TypeScript': { bg: 'rgba(129, 140, 248, 0.15)', text: '#a5b4fc', border: 'rgba(129, 140, 248, 0.3)' },
  'CSS / Tailwind': { bg: 'rgba(34, 211, 238, 0.15)', text: '#67e8f9', border: 'rgba(34, 211, 238, 0.3)' },
  '测试': { bg: 'rgba(251, 146, 60, 0.15)', text: '#fdba74', border: 'rgba(251, 146, 60, 0.3)' },
  '数据库': { bg: 'rgba(167, 139, 250, 0.15)', text: '#c4b5fd', border: 'rgba(167, 139, 250, 0.3)' },
  '认证': { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
  'DevOps / Docker': { bg: 'rgba(248, 113, 113, 0.15)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.3)' },
  'CI/CD / 部署': { bg: 'rgba(232, 121, 249, 0.15)', text: '#f0abfc', border: 'rgba(232, 121, 249, 0.3)' },
  '全栈开发': { bg: 'rgba(192, 132, 252, 0.15)', text: '#d8b4fe', border: 'rgba(192, 132, 252, 0.3)' },
  '移动端开发': { bg: 'rgba(163, 230, 53, 0.15)', text: '#bef264', border: 'rgba(163, 230, 53, 0.3)' },
  'Python': { bg: 'rgba(250, 204, 21, 0.15)', text: '#fde047', border: 'rgba(250, 204, 21, 0.3)' },
  'Node.js / 后端': { bg: 'rgba(56, 189, 248, 0.15)', text: '#7dd3fc', border: 'rgba(56, 189, 248, 0.3)' },
  GraphQL: { bg: 'rgba(244, 114, 182, 0.15)', text: '#f9a8d4', border: 'rgba(244, 114, 182, 0.3)' },
  '设计 / UI': { bg: 'rgba(192, 132, 252, 0.15)', text: '#d8b4fe', border: 'rgba(192, 132, 252, 0.3)' },
  文档: { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' },
  '代码质量 / 重构': { bg: 'rgba(45, 212, 191, 0.15)', text: '#5eead4', border: 'rgba(45, 212, 191, 0.3)' },
  安全: { bg: 'rgba(248, 113, 113, 0.15)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.3)' },
  性能优化: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
  'Git / GitHub': { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' },
  'API / 爬虫': { bg: 'rgba(34, 211, 238, 0.15)', text: '#67e8f9', border: 'rgba(34, 211, 238, 0.3)' },
  '特殊 Skills': { bg: 'rgba(232, 121, 249, 0.15)', text: '#f0abfc', border: 'rgba(232, 121, 249, 0.3)' },
  '工作流 / 自动化': { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
};

const CLAW_CATEGORY_COLORS: Record<string, CategoryColor> = {
  'Agent 工具': { bg: 'rgba(96, 165, 250, 0.15)', text: '#93c5fd', border: 'rgba(96, 165, 250, 0.3)' },
  MCP: { bg: 'rgba(167, 139, 250, 0.15)', text: '#c4b5fd', border: 'rgba(167, 139, 250, 0.3)' },
  'Agent 治理': { bg: 'rgba(74, 222, 128, 0.15)', text: '#86efac', border: 'rgba(74, 222, 128, 0.3)' },
  ClawDirect: { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
  'OpenClaw 工具': { bg: 'rgba(34, 211, 238, 0.15)', text: '#67e8f9', border: 'rgba(34, 211, 238, 0.3)' },
  '自我改进': { bg: 'rgba(244, 114, 182, 0.15)', text: '#f9a8d4', border: 'rgba(244, 114, 182, 0.3)' },
  安全: { bg: 'rgba(248, 113, 113, 0.15)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.3)' },
};

export const SOURCE_THEME_COLORS: Record<DataSourceType, Record<string, string>> = {
  skills: {
    gradientHeader: 'linear-gradient(135deg, #0f0c29 0%, #1a1650 30%, #302b63 60%, #24243e 100%)',
    glowPrimary: 'rgba(139, 92, 246, 0.15)',
    glowSecondary: 'rgba(99, 102, 241, 0.15)',
    glowCenter: 'rgba(167, 139, 250, 0.08)',
    titleGradient: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 30%, #a78bfa 60%, #818cf8 100%)',
    subtitle: 'rgba(196, 181, 253, 0.7)',
    mutedTitle: 'rgba(196, 181, 253, 0.6)',
    stat1: '#e9d5ff',
    stat2: '#ddd6fe',
    stat3: '#c4b5fd',
    stat4: '#a78bfa',
    panelBorder: 'rgba(139, 92, 246, 0.15)',
    cardBorder: 'rgba(139, 92, 246, 0.15)',
    codeBorder: 'rgba(139, 92, 246, 0.2)',
    actionBg: 'rgba(139, 92, 246, 0.15)',
    actionBorder: 'rgba(139, 92, 246, 0.4)',
    actionText: '#c4b5fd',
    link: '#a78bfa',
    badge: '#a78bfa',
    footerText: '#a78bfa',
  },
  claw: {
    gradientHeader: 'linear-gradient(135deg, #0c1a1f 0%, #0f2a35 30%, #1a3a4a 60%, #1a2a3a 100%)',
    glowPrimary: 'rgba(34, 211, 238, 0.15)',
    glowSecondary: 'rgba(56, 189, 248, 0.15)',
    glowCenter: 'rgba(34, 211, 238, 0.08)',
    titleGradient: 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 30%, #22d3ee 60%, #0ea5e9 100%)',
    subtitle: 'rgba(103, 232, 249, 0.7)',
    mutedTitle: 'rgba(103, 232, 249, 0.6)',
    stat1: '#a5f3fc',
    stat2: '#67e8f9',
    stat3: '#22d3ee',
    stat4: '#0ea5e9',
    panelBorder: 'rgba(34, 211, 238, 0.15)',
    cardBorder: 'rgba(34, 211, 238, 0.15)',
    codeBorder: 'rgba(34, 211, 238, 0.2)',
    actionBg: 'rgba(34, 211, 238, 0.15)',
    actionBorder: 'rgba(34, 211, 238, 0.4)',
    actionText: '#67e8f9',
    link: '#22d3ee',
    badge: '#22d3ee',
    footerText: '#22d3ee',
  },
};

export const STATIC_THEME_COLORS = {
  pageBg: '#0a0a0f',
  panelBg: 'rgba(10, 10, 15, 0.95)',
  cardGlassBg: 'rgba(255,255,255,0.03)',
  cardBg: 'rgba(20, 20, 30, 0.8)',
  codeBg: 'rgba(10, 10, 15, 0.8)',
  cardShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  titleText: '#e5e7eb',
  descText: '#9ca3af',
  secondaryText: '#6b7280',
  weakText: '#4b5563',
  hotIcon: '#fb923c',
  rise: '#34d399',
  iconGlow: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
  commandBg: 'rgba(139, 92, 246, 0.1)',
  commandText: '#c4b5fd',
  commandIcon: '#a78bfa',
};

export const getCategoryStyle = (category: string, dataSource: DataSourceType): CategoryColor => {
  const colors = dataSource === 'claw' ? CLAW_CATEGORY_COLORS : SKILL_CATEGORY_COLORS;
  return colors[category] || FALLBACK_CATEGORY_COLOR;
};
