#!/bin/bash

# 技能数据更新脚本
# 定期拉取社区 skills 排行榜数据
# 建议通过 cron 定时任务执行: 0 */6 * * * /path/to/update-skills.sh

echo "🔄 开始更新技能数据..."

# 项目目录
PROJECT_DIR="/Users/cloud_prg/Documents/project/claw-toy/cloud-skills-wall"
DATA_FILE="$PROJECT_DIR/src/services/skillsData.ts"

# 创建临时文件存储新数据
TEMP_FILE=$(mktemp)

# 获取当前时间
UPDATE_TIME=$(date '+%Y-%m-%d %H:%M:%S')

echo "📊 正在从 skills.sh 获取最新数据..."

# 使用 npx skills find 命令获取热门技能
# 注意: 这里需要手动更新，因为 skills CLI 没有直接的 API 接口
# 可以通过以下方式获取:
# 1. npx skills find react (获取 React 相关)
# 2. npx skills find vue (获取 Vue 相关)
# 3. npx skills find typescript (获取 TypeScript 相关)
# ...等等

echo "⚠️ 注意: 由于 skills.sh 没有公开的 REST API,"
echo "   需要手动运行 'npx skills find <关键词>' 命令获取最新数据"
echo "   然后更新 skillsData.ts 文件中的数据"

# 记录更新时间
echo "// 最后更新时间: $UPDATE_TIME" >> "$TEMP_FILE"

# 清理临时文件
rm -f "$TEMP_FILE"

echo "✅ 数据更新检查完成"
echo "📅 更新时间: $UPDATE_TIME"

# 可选: 自动提交到 git (如果需要)
# cd "$PROJECT_DIR"
# git add src/services/skillsData.ts
# git commit -m "chore: update skills data at $UPDATE_TIME"
# git push
