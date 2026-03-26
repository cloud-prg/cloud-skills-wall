// ClawHub Skills 数据 - OpenClaw 社区专用技能
// 数据来源: clawhub.com / skills.sh

export interface ClawSkill {
  id: string;
  name: string;
  owner: string;
  repo: string;
  installs: number;
  description: string;
  category: string;
  url: string;
  installCommand: string;
}

// ClawHub 热门 Skills 数据
export const clawSkillsData: ClawSkill[] = [
  // Agent 浏览器和工具
  { id: 'c1', name: 'agent-browser', owner: 'vercel-labs', repo: 'agent-browser', installs: 132000, description: 'Vercel 官方 Agent 浏览器自动化工具', category: 'Agent 工具', url: 'https://skills.sh/vercel-labs/agent-browser/agent-browser', installCommand: 'npx skills add vercel-labs/agent-browser@agent-browser' },
  { id: 'c2', name: 'agent-tools', owner: 'inferen-sh', repo: 'skills', installs: 108500, description: 'Agent 开发工具集', category: 'Agent 工具', url: 'https://skills.sh/inferen-sh/skills/agent-tools', installCommand: 'npx skills add inferen-sh/skills@agent-tools' },
  
  // MCP 相关
  { id: 'c3', name: 'mcp-builder', owner: 'anthropics', repo: 'skills', installs: 27500, description: 'MCP (Model Context Protocol) 构建器', category: 'MCP', url: 'https://skills.sh/anthropics/skills/mcp-builder', installCommand: 'npx skills add anthropics/skills@mcp-builder' },
  { id: 'c4', name: 'mcp-cli', owner: 'github', repo: 'awesome-copilot', installs: 7900, description: 'MCP 命令行工具', category: 'MCP', url: 'https://skills.sh/github/awesome-copilot/mcp-cli', installCommand: 'npx skills add github/awesome-copilot@mcp-cli' },
  { id: 'c5', name: 'mcp-deploy-manage-agents', owner: 'github', repo: 'awesome-copilot', installs: 7400, description: 'MCP 部署和管理 Agents', category: 'MCP', url: 'https://skills.sh/github/awesome-copilot/mcp-deploy-manage-agents', installCommand: 'npx skills add github/awesome-copilot@mcp-deploy-manage-agents' },
  { id: 'c6', name: 'mcp-create-adaptive-cards', owner: 'github', repo: 'awesome-copilot', installs: 7400, description: 'MCP 创建自适应卡片', category: 'MCP', url: 'https://skills.sh/github/awesome-copilot/mcp-create-adaptive-cards', installCommand: 'npx skills add github/awesome-copilot@mcp-create-adaptive-cards' },
  { id: 'c7', name: 'mcp-copilot-studio-server-generator', owner: 'github', repo: 'awesome-copilot', installs: 7400, description: 'MCP Copilot Studio 服务器生成器', category: 'MCP', url: 'https://skills.sh/github/awesome-copilot/mcp-copilot-studio-server-generator', installCommand: 'npx skills add github/awesome-copilot@mcp-copilot-studio-server-generator' },
  { id: 'c8', name: 'mcp-create-declarative-agent', owner: 'github', repo: 'awesome-copilot', installs: 7300, description: 'MCP 创建声明式 Agent', category: 'MCP', url: 'https://skills.sh/github/awesome-copilot/mcp-create-declarative-agent', installCommand: 'npx skills add github/awesome-copilot@mcp-create-declarative-agent' },
  
  // Agent 治理和评估
  { id: 'c9', name: 'create-agentsmd', owner: 'github', repo: 'awesome-copilot', installs: 8000, description: '创建 Agent SMD 文件', category: 'Agent 治理', url: 'https://skills.sh/github/awesome-copilot/create-agentsmd', installCommand: 'npx skills add github/awesome-copilot@create-agentsmd' },
  { id: 'c10', name: 'agentic-eval', owner: 'github', repo: 'awesome-copilot', installs: 7900, description: 'Agent 能力评估', category: 'Agent 治理', url: 'https://skills.sh/github/awesome-copilot/agentic-eval', installCommand: 'npx skills add github/awesome-copilot@agentic-eval' },
  { id: 'c11', name: 'agent-governance', owner: 'github', repo: 'awesome-copilot', installs: 7600, description: 'Agent 治理框架', category: 'Agent 治理', url: 'https://skills.sh/github/awesome-copilot/agent-governance', installCommand: 'npx skills add github/awesome-copilot@agent-governance' },
  { id: 'c12', name: 'polyglot-test-agent', owner: 'github', repo: 'awesome-copilot', installs: 7400, description: '多语言测试 Agent', category: 'Agent 治理', url: 'https://skills.sh/github/awesome-copilot/polyglot-test-agent', installCommand: 'npx skills add github/awesome-copilot@polyglot-test-agent' },
  
  // ClawDirect 相关
  { id: 'c13', name: 'clawdirect', owner: 'napoleond', repo: 'clawdirect', installs: 4400, description: 'ClawDirect 核心工具', category: 'ClawDirect', url: 'https://skills.sh/napoleond/clawdirect/clawdirect', installCommand: 'npx skills add napoleond/clawdirect@clawdirect' },
  { id: 'c14', name: 'instaclaw', owner: 'napoleond', repo: 'instaclaw', installs: 4400, description: 'InstaClaw 快速部署', category: 'ClawDirect', url: 'https://skills.sh/napoleond/instaclaw/instaclaw', installCommand: 'npx skills add napoleond/instaclaw@instaclaw' },
  { id: 'c15', name: 'clawdirect-dev', owner: 'napoleond', repo: 'clawdirect', installs: 4300, description: 'ClawDirect 开发版', category: 'ClawDirect', url: 'https://skills.sh/napoleond/clawdirect/clawdirect-dev', installCommand: 'npx skills add napoleond/clawdirect@clawdirect-dev' },
  
  // OpenClaw 配置和工具
  { id: 'c16', name: 'openclaw-config', owner: 'adisinghstudent', repo: 'easyclaw', installs: 2100, description: 'EasyClaw OpenClaw 配置', category: 'OpenClaw 工具', url: 'https://skills.sh/adisinghstudent/easyclaw/openclaw-config', installCommand: 'npx skills add adisinghstudent/easyclaw@openclaw-config' },
  { id: 'c17', name: 'openclaw-control-center', owner: 'aradotso', repo: 'trending-skills', installs: 2100, description: 'OpenClaw 控制中心', category: 'OpenClaw 工具', url: 'https://skills.sh/aradotso/trending-skills/openclaw-control-center', installCommand: 'npx skills add aradotso/trending-skills@openclaw-control-center' },
  { id: 'c18', name: 'openclaw-backup', owner: 'theagentservice', repo: 'skills', installs: 1800, description: 'OpenClaw 备份工具', category: 'OpenClaw 工具', url: 'https://skills.sh/theagentservice/skills/openclaw-backup', installCommand: 'npx skills add theagentservice/skills@openclaw-backup' },
  
  // 自我改进和修复
  { id: 'c19', name: 'proactive-self-improving-agent', owner: 'yanhongxi-openclaw', repo: 'proactive-self-improving-agent', installs: 1500, description: '主动自我改进 Agent', category: '自我改进', url: 'https://skills.sh/yanhongxi-openclaw/proactive-self-improving-agent/proactive-self-improving-agent', installCommand: 'npx skills add yanhongxi-openclaw/proactive-self-improving-agent@proactive-self-improving-agent' },
  { id: 'c20', name: 'openclaw-self-healing', owner: 'ramsbaby', repo: 'openclaw-self-healing', installs: 679, description: 'OpenClaw 自我修复', category: '自我改进', url: 'https://skills.sh/ramsbaby/openclaw-self-healing/openclaw-self-healing', installCommand: 'npx skills add ramsbaby/openclaw-self-healing@openclaw-self-healing' },
  
  // 安全和审计
  { id: 'c21', name: 'openclaw-audit-watchdog', owner: 'prompt-security', repo: 'clawsec', installs: 399, description: 'OpenClaw 审计监控', category: '安全', url: 'https://skills.sh/prompt-security/clawsec/openclaw-audit-watchdog', installCommand: 'npx skills add prompt-security/clawsec@openclaw-audit-watchdog' },
];

// 获取所有分类
export const getClawCategories = (): string[] => {
  const categories = new Set(clawSkillsData.map(skill => skill.category));
  return Array.from(categories).sort();
};

// 按分类获取技能
export const getClawSkillsByCategory = (category: string): ClawSkill[] => {
  return clawSkillsData.filter(skill => skill.category === category);
};

// 按安装量排序获取前N个技能
export const getTopClawSkills = (count: number = 100): ClawSkill[] => {
  return [...clawSkillsData].sort((a, b) => b.installs - a.installs).slice(0, count);
};

// 搜索技能
export const searchClawSkills = (query: string): ClawSkill[] => {
  const lowerQuery = query.toLowerCase();
  return clawSkillsData.filter(skill => 
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.category.toLowerCase().includes(lowerQuery) ||
    skill.owner.toLowerCase().includes(lowerQuery)
  );
};

// 获取技能统计信息
export const getClawStats = () => {
  const totalSkills = clawSkillsData.length;
  const totalInstalls = clawSkillsData.reduce((sum, skill) => sum + skill.installs, 0);
  const categories = getClawCategories();
  const topSkill = clawSkillsData.reduce((max, skill) => skill.installs > max.installs ? skill : max, clawSkillsData[0]);
  
  return {
    totalSkills,
    totalInstalls,
    categoryCount: categories.length,
    topSkill,
    averageInstalls: Math.round(totalInstalls / totalSkills)
  };
};
