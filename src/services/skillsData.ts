// 技能数据服务 - 模拟API获取技能排行榜数据
// 实际项目中可以通过定时任务调用 npx skills find 命令获取最新数据

// Skill 类型定义
export type Skill = {
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

// 技能分类映射
const categoryMap: Record<string, string> = {
  'react': 'React / Next.js',
  'nextjs': 'React / Next.js',
  'vue': 'Vue.js',
  'typescript': 'TypeScript',
  'tailwind': 'CSS / Tailwind',
  'css': 'CSS / Tailwind',
  'test': '测试',
  'testing': '测试',
  'database': '数据库',
  'postgres': '数据库',
  'prisma': '数据库',
  'redis': '数据库',
  'supabase': '数据库',
  'auth': '认证',
  'docker': 'DevOps / Docker',
  'kubernetes': 'DevOps / Docker',
  'deploy': 'CI/CD / 部署',
  'ci-cd': 'CI/CD / 部署',
  'vercel': 'CI/CD / 部署',
  'fullstack': '全栈开发',
  'mobile': '移动端开发',
  'ios': '移动端开发',
  'react-native': '移动端开发',
  'python': 'Python',
  'node': 'Node.js / 后端',
  'backend': 'Node.js / 后端',
  'graphql': 'GraphQL',
  'apollo': 'GraphQL',
  'design': '设计 / UI',
  'ui': '设计 / UI',
  'doc': '文档',
  'documentation': '文档',
  'refactor': '代码质量 / 重构',
  'review': '代码质量 / 重构',
  'security': '安全',
  'performance': '性能优化',
  'git': 'Git / GitHub',
  'github': 'Git / GitHub',
  'api': 'API / 爬虫',
  'scraper': 'API / 爬虫',
};

// 技能数据 - 基于之前整理的 SKILLS_CATALOG.md
export const skillsData: Skill[] = [
  // 超高人气
  { id: '1', name: 'vercel-react-best-practices', owner: 'vercel-labs', repo: 'agent-skills', installs: 248700, description: 'Vercel 官方 React/Next.js 最佳实践', category: 'React / Next.js', url: 'https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices', installCommand: 'npx skills add vercel-labs/agent-skills@vercel-react-best-practices' },
  { id: '2', name: 'frontend-design', owner: 'anthropics', repo: 'skills', installs: 201400, description: '前端设计', category: '设计 / UI', url: 'https://skills.sh/anthropics/skills/frontend-design', installCommand: 'npx skills add anthropics/skills@frontend-design' },
  { id: '3', name: 'web-design-guidelines', owner: 'vercel-labs', repo: 'agent-skills', installs: 199700, description: 'Web 设计指南', category: '设计 / UI', url: 'https://skills.sh/vercel-labs/agent-skills/web-design-guidelines', installCommand: 'npx skills add vercel-labs/agent-skills@web-design-guidelines' },
  { id: '4', name: 'azure-deploy', owner: 'microsoft', repo: 'github-copilot-for-azure', installs: 144500, description: 'Azure 部署', category: 'CI/CD / 部署', url: 'https://skills.sh/microsoft/github-copilot-for-azure/azure-deploy', installCommand: 'npx skills add microsoft/github-copilot-for-azure@azure-deploy' },
  
  // React / Next.js
  { id: '5', name: 'vercel-react-native-skills', owner: 'vercel-labs', repo: 'agent-skills', installs: 71300, description: 'React Native 开发技能', category: '移动端开发', url: 'https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills', installCommand: 'npx skills add vercel-labs/agent-skills@vercel-react-native-skills' },
  { id: '6', name: 'react:components', owner: 'google-labs-code', repo: 'stitch-skills', installs: 23300, description: 'Google 的 React 组件技能', category: 'React / Next.js', url: 'https://skills.sh/google-labs-code/stitch-skills/react:components', installCommand: 'npx skills add google-labs-code/stitch-skills@react:components' },
  { id: '7', name: 'react-email', owner: 'resend', repo: 'react-email', installs: 3500, description: 'React Email', category: 'React / Next.js', url: 'https://skills.sh/resend/react-email@react-email', installCommand: 'npx skills add resend/react-email@react-email' },
  { id: '8', name: 'nextjs-app-router-patterns', owner: 'wshobson', repo: 'agents', installs: 10100, description: 'Next.js App Router 模式', category: 'React / Next.js', url: 'https://skills.sh/wshobson/agents/nextjs-app-router-patterns', installCommand: 'npx skills add wshobson/agents@nextjs-app-router-patterns' },
  { id: '9', name: 'clerk-nextjs-patterns', owner: 'clerk', repo: 'skills', installs: 5300, description: 'Clerk + Next.js 模式', category: 'React / Next.js', url: 'https://skills.sh/clerk/skills/clerk-nextjs-patterns', installCommand: 'npx skills add clerk/skills@clerk-nextjs-patterns' },
  { id: '10', name: 'nextjs-best-practices', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 3600, description: 'Next.js 最佳实践', category: 'React / Next.js', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/nextjs-best-practices', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@nextjs-best-practices' },
  { id: '11', name: 'nextjs-supabase-auth', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 3600, description: 'Next.js + Supabase 认证', category: 'React / Next.js', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/nextjs-supabase-auth', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@nextjs-supabase-auth' },
  
  // Vue.js
  { id: '12', name: 'vue-best-practices', owner: 'hyf0', repo: 'vue-skills', installs: 12800, description: 'Vue 最佳实践', category: 'Vue.js', url: 'https://skills.sh/hyf0/vue-skills/vue-best-practices', installCommand: 'npx skills add hyf0/vue-skills@vue-best-practices' },
  { id: '13', name: 'vue', owner: 'antfu', repo: 'skills', installs: 12100, description: 'Vue 开发技能', category: 'Vue.js', url: 'https://skills.sh/antfu/skills/vue', installCommand: 'npx skills add antfu/skills@vue' },
  { id: '14', name: 'vue-debug-guides', owner: 'hyf0', repo: 'vue-skills', installs: 9600, description: 'Vue 调试指南', category: 'Vue.js', url: 'https://skills.sh/hyf0/vue-skills/vue-debug-guides', installCommand: 'npx skills add hyf0/vue-skills@vue-debug-guides' },
  { id: '15', name: 'vueuse-functions', owner: 'antfu', repo: 'skills', installs: 8900, description: 'VueUse 函数', category: 'Vue.js', url: 'https://skills.sh/antfu/skills/vueuse-functions', installCommand: 'npx skills add antfu/skills@vueuse-functions' },
  
  // TypeScript
  { id: '16', name: 'typescript-advanced-types', owner: 'wshobson', repo: 'agents', installs: 17800, description: 'TypeScript 高级类型', category: 'TypeScript', url: 'https://skills.sh/wshobson/agents/typescript-advanced-types', installCommand: 'npx skills add wshobson/agents@typescript-advanced-types' },
  { id: '17', name: 'javascript-typescript-jest', owner: 'github', repo: 'awesome-copilot', installs: 8100, description: 'JS/TS + Jest', category: 'TypeScript', url: 'https://skills.sh/github/awesome-copilot/javascript-typescript-jest', installCommand: 'npx skills add github/awesome-copilot@javascript-typescript-jest' },
  { id: '18', name: 'typescript-mcp-server-generator', owner: 'github', repo: 'awesome-copilot', installs: 7600, description: 'TypeScript MCP 服务器生成器', category: 'TypeScript', url: 'https://skills.sh/github/awesome-copilot/typescript-mcp-server-generator', installCommand: 'npx skills add github/awesome-copilot@typescript-mcp-server-generator' },
  { id: '19', name: 'typescript-expert', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 4200, description: 'TypeScript 专家', category: 'TypeScript', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/typescript-expert', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@typescript-expert' },
  
  // Tailwind / CSS
  { id: '20', name: 'tailwind-design-system', owner: 'wshobson', repo: 'agents', installs: 24100, description: 'Tailwind 设计系统', category: 'CSS / Tailwind', url: 'https://skills.sh/wshobson/agents/tailwind-design-system', installCommand: 'npx skills add wshobson/agents@tailwind-design-system' },
  { id: '21', name: 'expo-tailwind-setup', owner: 'expo', repo: 'skills', installs: 13600, description: 'Expo + Tailwind 配置', category: 'CSS / Tailwind', url: 'https://skills.sh/expo/skills/expo-tailwind-setup', installCommand: 'npx skills add expo/skills@expo-tailwind-setup' },
  
  // 测试
  { id: '22', name: 'webapp-testing', owner: 'anthropics', repo: 'skills', installs: 32900, description: 'Web 应用测试', category: '测试', url: 'https://skills.sh/anthropics/skills/webapp-testing', installCommand: 'npx skills add anthropics/skills@webapp-testing' },
  { id: '23', name: 'backend-testing', owner: 'supercent-io', repo: 'skills-template', installs: 11800, description: '后端测试', category: '测试', url: 'https://skills.sh/supercent-io/skills-template/backend-testing', installCommand: 'npx skills add supercent-io/skills-template@backend-testing' },
  
  // 数据库
  { id: '24', name: 'supabase-postgres-best-practices', owner: 'supabase', repo: 'agent-skills', installs: 50600, description: 'Supabase + Postgres 最佳实践', category: '数据库', url: 'https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices', installCommand: 'npx skills add supabase/agent-skills@supabase-postgres-best-practices' },
  { id: '25', name: 'neon-postgres', owner: 'neondatabase', repo: 'agent-skills', installs: 13500, description: 'Neon Postgres', category: '数据库', url: 'https://skills.sh/neondatabase/agent-skills/neon-postgres', installCommand: 'npx skills add neondatabase/agent-skills@neon-postgres' },
  { id: '26', name: 'database-schema-design', owner: 'supercent-io', repo: 'skills-template', installs: 12100, description: '数据库 Schema 设计', category: '数据库', url: 'https://skills.sh/supercent-io/skills-template/database-schema-design', installCommand: 'npx skills add supercent-io/skills-template@database-schema-design' },
  { id: '27', name: 'prisma-database-setup', owner: 'prisma', repo: 'skills', installs: 3200, description: 'Prisma 数据库设置', category: '数据库', url: 'https://skills.sh/prisma/skills/prisma-database-setup', installCommand: 'npx skills add prisma/skills@prisma-database-setup' },
  { id: '28', name: 'prisma-expert', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 2900, description: 'Prisma 专家', category: '数据库', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/prisma-expert', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@prisma-expert' },
  { id: '29', name: 'redis-development', owner: 'redis', repo: 'agent-skills', installs: 1000, description: 'Redis 开发', category: '数据库', url: 'https://skills.sh/redis/agent-skills/redis-development', installCommand: 'npx skills add redis/agent-skills@redis-development' },
  { id: '30', name: 'redis-best-practices', owner: 'mindrally', repo: 'skills', installs: 898, description: 'Redis 最佳实践', category: '数据库', url: 'https://skills.sh/mindrally/skills/redis-best-practices', installCommand: 'npx skills add mindrally/skills@redis-best-practices' },
  
  // 认证
  { id: '31', name: 'better-auth-best-practices', owner: 'better-auth', repo: 'skills', installs: 28100, description: 'Better Auth 最佳实践', category: '认证', url: 'https://skills.sh/better-auth/skills/better-auth-best-practices', installCommand: 'npx skills add better-auth/skills@better-auth-best-practices' },
  
  // DevOps / Docker
  { id: '32', name: 'multi-stage-dockerfile', owner: 'github', repo: 'awesome-copilot', installs: 8700, description: '多阶段 Dockerfile', category: 'DevOps / Docker', url: 'https://skills.sh/github/awesome-copilot/multi-stage-dockerfile', installCommand: 'npx skills add github/awesome-copilot@multi-stage-dockerfile' },
  { id: '33', name: 'docker-expert', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 8400, description: 'Docker 专家', category: 'DevOps / Docker', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/docker-expert', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@docker-expert' },
  { id: '34', name: 'kubernetes-specialist', owner: 'jeffallan', repo: 'claude-skills', installs: 4700, description: 'Kubernetes 专家', category: 'DevOps / Docker', url: 'https://skills.sh/jeffallan/claude-skills/kubernetes-specialist', installCommand: 'npx skills add jeffallan/claude-skills@kubernetes-specialist' },
  { id: '35', name: 'azure-kubernetes', owner: 'microsoft', repo: 'azure-skills', installs: 3100, description: 'Azure Kubernetes', category: 'DevOps / Docker', url: 'https://skills.sh/microsoft/azure-skills/azure-kubernetes', installCommand: 'npx skills add microsoft/azure-skills@azure-kubernetes' },
  
  // CI/CD / 部署
  { id: '36', name: 'deploy-to-vercel', owner: 'vercel-labs', repo: 'agent-skills', installs: 15100, description: '部署到 Vercel', category: 'CI/CD / 部署', url: 'https://skills.sh/vercel-labs/agent-skills/deploy-to-vercel', installCommand: 'npx skills add vercel-labs/agent-skills@deploy-to-vercel' },
  { id: '37', name: 'ci-cd-best-practices', owner: 'mindrally', repo: 'skills', installs: 365, description: 'CI/CD 最佳实践', category: 'CI/CD / 部署', url: 'https://skills.sh/mindrally/skills/ci-cd-best-practices', installCommand: 'npx skills add mindrally/skills@ci-cd-best-practices' },
  { id: '38', name: 'ci-cd', owner: 'ahmedasmar', repo: 'devops-claude-skills', installs: 149, description: 'CI/CD', category: 'CI/CD / 部署', url: 'https://skills.sh/ahmedasmar/devops-claude-skills/ci-cd', installCommand: 'npx skills add ahmedasmar/devops-claude-skills@ci-cd' },
  
  // 全栈开发
  { id: '39', name: 'fullstack-developer', owner: 'shubhamsaboo', repo: 'awesome-llm-apps', installs: 3500, description: '全栈开发', category: '全栈开发', url: 'https://skills.sh/shubhamsaboo/awesome-llm-apps/fullstack-developer', installCommand: 'npx skills add shubhamsaboo/awesome-llm-apps@fullstack-developer' },
  { id: '40', name: 'fullstack-guardian', owner: 'jeffallan', repo: 'claude-skills', installs: 1000, description: '全栈守护', category: '全栈开发', url: 'https://skills.sh/jeffallan/claude-skills/fullstack-guardian', installCommand: 'npx skills add jeffallan/claude-skills@fullstack-guardian' },
  { id: '41', name: 'senior-fullstack', owner: 'sickn33', repo: 'antigravity-awesome-skills', installs: 936, description: '高级全栈', category: '全栈开发', url: 'https://skills.sh/sickn33/antigravity-awesome-skills/senior-fullstack', installCommand: 'npx skills add sickn33/antigravity-awesome-skills@senior-fullstack' },
  { id: '42', name: 'fullstack-dev', owner: 'minimax-ai', repo: 'skills', installs: 234, description: '全栈开发', category: '全栈开发', url: 'https://skills.sh/minimax-ai/skills/fullstack-dev', installCommand: 'npx skills add minimax-ai/skills@fullstack-dev' },
  { id: '43', name: 'senior-fullstack-2', owner: 'alirezarezvani', repo: 'claude-skills', installs: 224, description: '高级全栈', category: '全栈开发', url: 'https://skills.sh/alirezarezvani/claude-skills/senior-fullstack', installCommand: 'npx skills add alirezarezvani/claude-skills@senior-fullstack' },
  { id: '44', name: 'fullstack-developer-2', owner: '404kidwiz', repo: 'claude-supercode-skills', installs: 155, description: '全栈开发', category: '全栈开发', url: 'https://skills.sh/404kidwiz/claude-supercode-skills/fullstack-developer', installCommand: 'npx skills add 404kidwiz/claude-supercode-skills@fullstack-developer' },
  
  // 移动端开发
  { id: '45', name: 'sleek-design-mobile-apps', owner: 'sleekdotdesign', repo: 'agent-skills', installs: 28200, description: '移动应用设计', category: '移动端开发', url: 'https://skills.sh/sleekdotdesign/agent-skills/sleek-design-mobile-apps', installCommand: 'npx skills add sleekdotdesign/agent-skills@sleek-design-mobile-apps' },
  { id: '46', name: 'mobile-ios-design', owner: 'wshobson', repo: 'agents', installs: 8200, description: 'iOS 设计', category: '移动端开发', url: 'https://skills.sh/wshobson/agents/mobile-ios-design', installCommand: 'npx skills add wshobson/agents@mobile-ios-design' },
  { id: '47', name: 'swiftui-pro', owner: 'twostraws', repo: 'swiftui-agent-skill', installs: 7100, description: 'SwiftUI Pro', category: '移动端开发', url: 'https://skills.sh/twostraws/swiftui-agent-skill/swiftui-pro', installCommand: 'npx skills add twostraws/swiftui-agent-skill@swiftui-pro' },
  { id: '48', name: 'swift-concurrency-pro', owner: 'twostraws', repo: 'swift-concurrency-agent-skill', installs: 1700, description: 'Swift 并发', category: '移动端开发', url: 'https://skills.sh/twostraws/swift-concurrency-agent-skill/swift-concurrency-pro', installCommand: 'npx skills add twostraws/swift-concurrency-agent-skill@swift-concurrency-pro' },
  
  // Python
  { id: '49', name: 'python-executor', owner: 'inferen-sh', repo: 'skills', installs: 14100, description: 'Python 执行器', category: 'Python', url: 'https://skills.sh/inferen-sh/skills/python-executor', installCommand: 'npx skills add inferen-sh/skills@python-executor' },
  { id: '50', name: 'python-sdk', owner: 'inferen-sh', repo: 'skills', installs: 13800, description: 'Python SDK', category: 'Python', url: 'https://skills.sh/inferen-sh/skills/python-sdk', installCommand: 'npx skills add inferen-sh/skills@python-sdk' },
  { id: '51', name: 'python-performance-optimization', owner: 'wshobson', repo: 'agents', installs: 12300, description: 'Python 性能优化', category: 'Python', url: 'https://skills.sh/wshobson/agents/python-performance-optimization', installCommand: 'npx skills add wshobson/agents@python-performance-optimization' },
  
  // Node.js / 后端
  { id: '52', name: 'nodejs-backend-patterns', owner: 'wshobson', repo: 'agents', installs: 12200, description: 'Node.js 后端模式', category: 'Node.js / 后端', url: 'https://skills.sh/wshobson/agents/nodejs-backend-patterns', installCommand: 'npx skills add wshobson/agents@nodejs-backend-patterns' },
  { id: '53', name: 'n8n-node-configuration', owner: 'czlonkowski', repo: 'n8n-skills', installs: 1900, description: 'n8n 节点配置', category: 'Node.js / 后端', url: 'https://skills.sh/czlonkowski/n8n-skills/n8n-node-configuration', installCommand: 'npx skills add czlonkowski/n8n-skills@n8n-node-configuration' },
  
  // GraphQL
  { id: '54', name: 'rust-best-practices', owner: 'apollographql', repo: 'skills', installs: 4500, description: 'Apollo Rust 最佳实践', category: 'GraphQL', url: 'https://skills.sh/apollographql/skills/rust-best-practices', installCommand: 'npx skills add apollographql/skills@rust-best-practices' },
  { id: '55', name: 'apollo-client', owner: 'apollographql', repo: 'skills', installs: 1600, description: 'Apollo Client', category: 'GraphQL', url: 'https://skills.sh/apollographql/skills/apollo-client', installCommand: 'npx skills add apollographql/skills@apollo-client' },
  
  // 设计 / UI
  { id: '56', name: 'web-design-reviewer', owner: 'github', repo: 'awesome-copilot', installs: 8400, description: 'Web 设计审查', category: '设计 / UI', url: 'https://skills.sh/github/awesome-copilot/web-design-reviewer', installCommand: 'npx skills add github/awesome-copilot@web-design-reviewer' },
  
  // 文档
  { id: '57', name: 'doc-coauthoring', owner: 'anthropics', repo: 'skills', installs: 19300, description: '文档协作', category: '文档', url: 'https://skills.sh/anthropics/skills/doc-coauthoring', installCommand: 'npx skills add anthropics/skills@doc-coauthoring' },
  { id: '58', name: 'api-documentation', owner: 'supercent-io', repo: 'skills-template', installs: 11700, description: 'API 文档', category: '文档', url: 'https://skills.sh/supercent-io/skills-template/api-documentation', installCommand: 'npx skills add supercent-io/skills-template@api-documentation' },
  { id: '59', name: 'documentation-writer', owner: 'github', repo: 'awesome-copilot', installs: 11300, description: '文档编写', category: '文档', url: 'https://skills.sh/github/awesome-copilot/documentation-writer', installCommand: 'npx skills add github/awesome-copilot@documentation-writer' },
  
  // 代码质量 / 重构
  { id: '60', name: 'requesting-code-review', owner: 'obra', repo: 'superpowers', installs: 32100, description: '代码审查请求', category: '代码质量 / 重构', url: 'https://skills.sh/obra/superpowers/requesting-code-review', installCommand: 'npx skills add obra/superpowers@requesting-code-review' },
  { id: '61', name: 'code-refactoring', owner: 'supercent-io', repo: 'skills-template', installs: 11900, description: '代码重构', category: '代码质量 / 重构', url: 'https://skills.sh/supercent-io/skills-template/code-refactoring', installCommand: 'npx skills add supercent-io/skills-template@code-refactoring' },
  { id: '62', name: 'refactor', owner: 'github', repo: 'awesome-copilot', installs: 10800, description: '重构', category: '代码质量 / 重构', url: 'https://skills.sh/github/awesome-copilot/refactor', installCommand: 'npx skills add github/awesome-copilot@refactor' },
  
  // 安全
  { id: '63', name: 'security-best-practices', owner: 'supercent-io', repo: 'skills-template', installs: 14100, description: '安全最佳实践', category: '安全', url: 'https://skills.sh/supercent-io/skills-template/security-best-practices', installCommand: 'npx skills add supercent-io/skills-template@security-best-practices' },
  { id: '64', name: 'security-requirement-extraction', owner: 'wshobson', repo: 'agents', installs: 7000, description: '安全需求提取', category: '安全', url: 'https://skills.sh/wshobson/agents/security-requirement-extraction', installCommand: 'npx skills add wshobson/agents@security-requirement-extraction' },
  
  // 性能优化
  { id: '65', name: 'performance-optimization', owner: 'supercent-io', repo: 'skills-template', installs: 11500, description: '性能优化', category: '性能优化', url: 'https://skills.sh/supercent-io/skills-template/performance-optimization', installCommand: 'npx skills add supercent-io/skills-template@performance-optimization' },
  
  // Git / GitHub
  { id: '66', name: 'git-commit', owner: 'github', repo: 'awesome-copilot', installs: 18000, description: 'Git 提交', category: 'Git / GitHub', url: 'https://skills.sh/github/awesome-copilot/git-commit', installCommand: 'npx skills add github/awesome-copilot@git-commit' },
  { id: '67', name: 'gh-cli', owner: 'github', repo: 'awesome-copilot', installs: 14000, description: 'GitHub CLI', category: 'Git / GitHub', url: 'https://skills.sh/github/awesome-copilot/gh-cli', installCommand: 'npx skills add github/awesome-copilot@gh-cli' },
  
  // API / 爬虫
  { id: '68', name: 'apify-ultimate-scraper', owner: 'apify', repo: 'agent-skills', installs: 4100, description: 'Apify 终极爬虫', category: 'API / 爬虫', url: 'https://skills.sh/apify/agent-skills/apify-ultimate-scraper', installCommand: 'npx skills add apify/agent-skills@apify-ultimate-scraper' },
  { id: '69', name: 'apify-market-research', owner: 'apify', repo: 'agent-skills', installs: 3400, description: 'Apify 市场研究', category: 'API / 爬虫', url: 'https://skills.sh/apify/agent-skills/apify-market-research', installCommand: 'npx skills add apify/agent-skills@apify-market-research' },
  
  // Arena (多引擎编排)
  { id: '70', name: 'arena', owner: 'simota', repo: 'agent-skills', installs: 41, description: '多引擎竞争/协作编排', category: '特殊 Skills', url: 'https://skills.sh/simota/agent-skills/arena', installCommand: 'npx skills add simota/agent-skills@arena' },
  
  // 工作流 / 自动化
  { id: '71', name: 'impl-plan', owner: 'arenahito', repo: 'piggychick', installs: 22, description: '实现计划', category: '工作流 / 自动化', url: 'https://skills.sh/arenahito/piggychick@impl-plan', installCommand: 'npx skills add arenahito/piggychick@impl-plan' },
  { id: '72', name: 'impl-do', owner: 'arenahito', repo: 'piggychick', installs: 21, description: '实现执行', category: '工作流 / 自动化', url: 'https://skills.sh/arenahito/piggychick@impl-do', installCommand: 'npx skills add arenahito/piggychick@impl-do' },
  { id: '73', name: 'auto-arena', owner: 'agentscope-ai', repo: 'openjudge', installs: 10, description: '自动竞技场', category: '工作流 / 自动化', url: 'https://skills.sh/agentscope-ai/openjudge@auto-arena', installCommand: 'npx skills add agentscope-ai/openjudge@auto-arena' },
];

// 获取所有分类
export const getCategories = (): string[] => {
  const categories = new Set(skillsData.map(skill => skill.category));
  return Array.from(categories).sort();
};

// 按分类获取技能
export const getSkillsByCategory = (category: string): Skill[] => {
  return skillsData.filter(skill => skill.category === category);
};

// 按安装量排序获取前N个技能
export const getTopSkills = (count: number = 100): Skill[] => {
  return [...skillsData].sort((a, b) => b.installs - a.installs).slice(0, count);
};

// 搜索技能
export const searchSkills = (query: string): Skill[] => {
  const lowerQuery = query.toLowerCase();
  return skillsData.filter(skill => 
    skill.name.toLowerCase().includes(lowerQuery) ||
    skill.description.toLowerCase().includes(lowerQuery) ||
    skill.category.toLowerCase().includes(lowerQuery) ||
    skill.owner.toLowerCase().includes(lowerQuery)
  );
};

// 获取技能统计信息
export const getStats = () => {
  const totalSkills = skillsData.length;
  const totalInstalls = skillsData.reduce((sum, skill) => sum + skill.installs, 0);
  const categories = getCategories();
  const topSkill = skillsData.reduce((max, skill) => skill.installs > max.installs ? skill : max, skillsData[0]);
  
  return {
    totalSkills,
    totalInstalls,
    categoryCount: categories.length,
    topSkill,
    averageInstalls: Math.round(totalInstalls / totalSkills)
  };
};
