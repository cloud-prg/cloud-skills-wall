# 技能包展示墙 (Cloud Skills Wall)

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5-blue)](https://ant.design/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-cyan)](https://tailwindcss.com/)

探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率。

![技能包展示墙](./screenshot.png)

## 功能特性

- 📊 **实时排行榜** - 展示社区安装量前 100 的 Skills
- 🔍 **智能搜索** - 支持按名称、描述、分类搜索
- 🏷️ **分类筛选** - 按技术栈分类浏览
- 📋 **一键复制** - 快速复制安装命令
- 🌐 **中文界面** - 完整的中文注释和界面
- 📱 **响应式设计** - 支持桌面端和移动端

## 技术栈

- **React 18** - 用户界面库
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design 5** - 企业级 UI 组件库
- **Tailwind CSS** - 原子化 CSS 框架
- **Vite** - 快速构建工具

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
cloud-skills-wall/
├── src/
│   ├── components/          # React 组件
│   │   └── SkillsWall.tsx   # 主展示组件
│   ├── services/            # 数据服务
│   │   └── skillsData.ts    # 技能数据
│   ├── App.tsx              # 应用入口
│   ├── main.tsx             # 渲染入口
│   └── index.css            # 全局样式
├── scripts/
│   └── update-skills.sh     # 数据更新脚本
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── tailwind.config.js       # Tailwind 配置
├── postcss.config.js        # PostCSS 配置
└── README.md                # 项目说明
```

## 数据来源

技能数据来源于 [skills.sh](https://skills.sh) 社区排行榜，通过 `npx skills find` 命令定期更新。

### 手动更新数据

```bash
# 获取 React 相关技能
npx skills find react

# 获取 Vue 相关技能
npx skills find vue

# 获取 TypeScript 相关技能
npx skills find typescript

# 更多分类...
npx skills find docker
npx skills find testing
npx skills find database
```

### 自动更新 (Cron)

```bash
# 编辑 crontab
crontab -e

# 添加定时任务 (每6小时更新一次)
0 */6 * * * /path/to/cloud-skills-wall/scripts/update-skills.sh
```

## 使用 Skills

安装 Skill 的命令格式：

```bash
npx skills add <owner/repo@skill>
```

例如：

```bash
npx skills add vercel-labs/agent-skills@vercel-react-best-practices
```

## 推荐的 Skills

### 前端开发
- `vercel-labs/agent-skills@vercel-react-best-practices` - React/Next.js 最佳实践
- `hyf0/vue-skills@vue-best-practices` - Vue 最佳实践
- `wshobson/agents@typescript-advanced-types` - TypeScript 高级类型
- `wshobson/agents@tailwind-design-system` - Tailwind 设计系统

### 后端 & 数据库
- `supabase/agent-skills@supabase-postgres-best-practices` - Supabase + Postgres
- `prisma/skills@prisma-database-setup` - Prisma 数据库设置
- `wshobson/agents@nodejs-backend-patterns` - Node.js 后端模式

### DevOps
- `github/awesome-copilot@multi-stage-dockerfile` - Docker 多阶段构建
- `vercel-labs/agent-skills@deploy-to-vercel` - Vercel 部署
- `mindrally/skills@ci-cd-best-practices` - CI/CD 最佳实践

### 代码质量
- `obra/superpowers@requesting-code-review` - 代码审查
- `supercent-io/skills-template@code-refactoring` - 代码重构
- `anthropics/skills@webapp-testing` - Web 应用测试

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

## 相关链接

- [OpenClaw 官网](https://openclaw.ai)
- [Skills 市场](https://skills.sh)
- [ClawHub](https://clawhub.com)
- [Ant Design](https://ant.design)
- [Tailwind CSS](https://tailwindcss.com)

---

Made with ❤️ by OpenClaw Community
