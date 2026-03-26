import { useState, useEffect } from 'react';
import { Card, Tag, Button, Input, Select, Statistic, Row, Col, Tooltip, Badge, Empty } from 'antd';
import { CopyOutlined, LinkOutlined, RiseOutlined, AppstoreOutlined, SearchOutlined, FireOutlined } from '@ant-design/icons';
import type { Skill } from '../services/skillsData';
import { getTopSkills, getCategories, searchSkills, getStats } from '../services/skillsData';

const { Search } = Input;
const { Option } = Select;

// 分类颜色映射
const categoryColors: Record<string, string> = {
  'React / Next.js': 'blue',
  'Vue.js': 'green',
  'TypeScript': 'geekblue',
  'CSS / Tailwind': 'cyan',
  '测试': 'orange',
  '数据库': 'purple',
  '认证': 'gold',
  'DevOps / Docker': 'volcano',
  'CI/CD / 部署': 'red',
  '全栈开发': 'magenta',
  '移动端开发': 'lime',
  'Python': 'yellow',
  'Node.js / 后端': 'blue',
  'GraphQL': 'pink',
  '设计 / UI': 'purple',
  '文档': 'default',
  '代码质量 / 重构': 'processing',
  '安全': 'error',
  '性能优化': 'warning',
  'Git / GitHub': 'default',
  'API / 爬虫': 'cyan',
  '特殊 Skills': 'magenta',
  '工作流 / 自动化': 'gold',
};

// 格式化安装量
const formatInstalls = (num: number): string => {
  if (num >= 100000) return (num / 1000).toFixed(0) + 'K';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function SkillsWall() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    totalSkills: 0,
    totalInstalls: 0,
    categoryCount: 0,
    topSkill: null as Skill | null,
    averageInstalls: 0
  });

  useEffect(() => {
    // 加载技能数据
    const topSkills = getTopSkills(100);
    setSkills(topSkills);
    setFilteredSkills(topSkills);
    setCategories(['全部', ...getCategories()]);
    setStats(getStats());
  }, []);

  useEffect(() => {
    // 过滤技能
    let result = skills;
    
    if (selectedCategory !== '全部') {
      result = result.filter(skill => skill.category === selectedCategory);
    }
    
    if (searchQuery) {
      result = searchSkills(searchQuery);
      if (selectedCategory !== '全部') {
        result = result.filter(skill => skill.category === selectedCategory);
      }
    }
    
    setFilteredSkills(result);
  }, [selectedCategory, searchQuery, skills]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <AppstoreOutlined />
              技能包展示墙
            </h1>
            <p className="text-lg opacity-90">
              探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率
            </p>
          </div>
          
          {/* 统计卡片 */}
          <Row gutter={16} className="max-w-4xl mx-auto">
            <Col xs={12} sm={6}>
              <Card className="bg-white/10 backdrop-blur border-0 text-white">
                <Statistic 
                  title={<span className="text-white/70">总技能数</span>}
                  value={stats.totalSkills}
                  valueStyle={{ color: 'white', fontSize: '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-white/10 backdrop-blur border-0 text-white">
                <Statistic 
                  title={<span className="text-white/70">总安装量</span>}
                  value={formatInstalls(stats.totalInstalls)}
                  valueStyle={{ color: 'white', fontSize: '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-white/10 backdrop-blur border-0 text-white">
                <Statistic 
                  title={<span className="text-white/70">分类数量</span>}
                  value={stats.categoryCount}
                  valueStyle={{ color: 'white', fontSize: '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="bg-white/10 backdrop-blur border-0 text-white">
                <Statistic 
                  title={<span className="text-white/70">平均安装</span>}
                  value={formatInstalls(stats.averageInstalls)}
                  valueStyle={{ color: 'white', fontSize: '24px' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4">
          <Search
            placeholder="搜索技能名称、描述或分类..."
            allowClear
            enterButton={<><SearchOutlined /> 搜索</>}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Select
            placeholder="选择分类"
            size="large"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ minWidth: '200px' }}
            className="w-full sm:w-auto"
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
        </div>
      </div>

      {/* 技能卡片网格 */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {filteredSkills.length === 0 ? (
          <Empty description="没有找到匹配的技能" className="py-16" />
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              共找到 <span className="font-bold text-blue-600">{filteredSkills.length}</span> 个技能
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSkills.map((skill, index) => (
                <Card
                  key={skill.id}
                  className="hover:shadow-lg transition-shadow duration-300 border-0 shadow"
                  title={
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">{skill.name}</span>
                      {index < 4 && (
                        <Badge count={<FireOutlined style={{ color: '#f5222d' }} />} />
                      )}
                    </div>
                  }
                  extra={
                    <Tag color={categoryColors[skill.category] || 'default'} className="text-xs">
                      {skill.category}
                    </Tag>
                  }
                >
                  <div className="space-y-3">
                    {/* 描述 */}
                    <p className="text-gray-600 text-sm line-clamp-2 h-10">
                      {skill.description}
                    </p>
                    
                    {/* 安装量 */}
                    <div className="flex items-center gap-2 text-sm">
                      <RiseOutlined className="text-green-500" />
                      <span className="font-semibold text-green-600">
                        {formatInstalls(skill.installs)}
                      </span>
                      <span className="text-gray-400">次安装</span>
                    </div>
                    
                    {/* 安装命令 */}
                    <div className="bg-gray-100 rounded p-2 text-xs font-mono break-all relative group">
                      <code>{skill.installCommand}</code>
                      <Tooltip title="复制命令">
                        <Button
                          type="text"
                          size="small"
                          icon={<CopyOutlined />}
                          className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopy(skill.installCommand)}
                        />
                      </Tooltip>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        type="primary"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => handleCopy(skill.installCommand)}
                        className="flex-1"
                      >
                        复制命令
                      </Button>
                      <Button
                        size="small"
                        icon={<LinkOutlined />}
                        href={skill.url}
                        target="_blank"
                      >
                        查看
                      </Button>
                    </div>
                    
                    {/* 所有者信息 */}
                    <div className="text-xs text-gray-400 pt-2 border-t">
                      作者: <span className="text-gray-600">{skill.owner}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 底部信息 */}
      <div className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">技能包展示墙 - OpenClaw Skills Marketplace</p>
          <p className="text-gray-400 text-sm">
            数据来源于 skills.sh 社区排行榜 · 定期自动更新
          </p>
          <p className="text-gray-500 text-xs mt-4">
            安装命令: npx skills add {'<owner/repo@skill>'}
          </p>
        </div>
      </div>
    </div>
  );
}
