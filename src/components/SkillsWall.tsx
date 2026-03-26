import { useState, useEffect } from 'react';
import { Card, Tag, Button, Input, Select, Statistic, Row, Col, Tooltip, Badge, Empty, Table, Radio, Space } from 'antd';
import { CopyOutlined, LinkOutlined, RiseOutlined, AppstoreOutlined, SearchOutlined, FireOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
import type { Skill } from '../services/skillsData';
import { getTopSkills, getCategories, searchSkills, getStats } from '../services/skillsData';

const { Search } = Input;
const { Option } = Select;

// 分类颜色映射 - 适配深色主题，使用柔和的颜色
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
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
  'GraphQL': { bg: 'rgba(244, 114, 182, 0.15)', text: '#f9a8d4', border: 'rgba(244, 114, 182, 0.3)' },
  '设计 / UI': { bg: 'rgba(192, 132, 252, 0.15)', text: '#d8b4fe', border: 'rgba(192, 132, 252, 0.3)' },
  '文档': { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' },
  '代码质量 / 重构': { bg: 'rgba(45, 212, 191, 0.15)', text: '#5eead4', border: 'rgba(45, 212, 191, 0.3)' },
  '安全': { bg: 'rgba(248, 113, 113, 0.15)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.3)' },
  '性能优化': { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
  'Git / GitHub': { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' },
  'API / 爬虫': { bg: 'rgba(34, 211, 238, 0.15)', text: '#67e8f9', border: 'rgba(34, 211, 238, 0.3)' },
  '特殊 Skills': { bg: 'rgba(232, 121, 249, 0.15)', text: '#f0abfc', border: 'rgba(232, 121, 249, 0.3)' },
  '工作流 / 自动化': { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
};

// 获取分类样式
const getCategoryStyle = (category: string) => {
  return categoryColors[category] || { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' };
};

// 格式化安装量
const formatInstalls = (num: number): string => {
  if (num >= 100000) return (num / 1000).toFixed(0) + 'K';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// 视图类型
type ViewType = 'card' | 'list';

export default function SkillsWall() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<ViewType>('card');
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

  // 自定义分类标签组件
  const CategoryTag = ({ category }: { category: string }) => {
    const style = getCategoryStyle(category);
    return (
      <span
        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border"
        style={{
          backgroundColor: style.bg,
          color: style.text,
          borderColor: style.border,
        }}
      >
        {category}
      </span>
    );
  };

  // 表格列定义
  const columns = [
    {
      title: <span className="text-gray-300">排名</span>,
      key: 'rank',
      width: 70,
      render: (_: unknown, __: Skill, index: number) => (
        <span className="font-bold text-purple-400">#{index + 1}</span>
      ),
    },
    {
      title: <span className="text-gray-300">技能名称</span>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, skill: Skill, index: number) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-100">{name}</span>
          {index < 4 && <FireOutlined className="text-orange-400" />}
        </div>
      ),
    },
    {
      title: <span className="text-gray-300">分类</span>,
      dataIndex: 'category',
      key: 'category',
      width: 140,
      render: (category: string) => <CategoryTag category={category} />,
    },
    {
      title: <span className="text-gray-300">描述</span>,
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc: string) => <span className="text-gray-400">{desc}</span>,
    },
    {
      title: <span className="text-gray-300">安装量</span>,
      dataIndex: 'installs',
      key: 'installs',
      width: 120,
      sorter: (a: Skill, b: Skill) => a.installs - b.installs,
      render: (installs: number) => (
        <div className="flex items-center gap-2">
          <RiseOutlined className="text-emerald-400" />
          <span className="font-semibold text-emerald-400">{formatInstalls(installs)}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-300">作者</span>,
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
      render: (owner: string) => <span className="text-gray-500">{owner}</span>,
    },
    {
      title: <span className="text-gray-300">安装命令</span>,
      key: 'command',
      width: 320,
      render: (skill: Skill) => (
        <div className="flex items-center gap-2">
          <code 
            className="px-2 py-1 rounded text-xs flex-1 truncate font-mono"
            style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#c4b5fd' }}
          >
            {skill.installCommand}
          </code>
          <Tooltip title="复制命令">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined style={{ color: '#a78bfa' }} />}
              onClick={() => handleCopy(skill.installCommand)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: <span className="text-gray-300">操作</span>,
      key: 'action',
      width: 120,
      render: (skill: Skill) => (
        <Space>
          <Button
            type="primary"
            size="small"
            style={{ 
              background: 'rgba(139, 92, 246, 0.2)', 
              borderColor: 'rgba(139, 92, 246, 0.5)',
              color: '#c4b5fd'
            }}
            onClick={() => handleCopy(skill.installCommand)}
          >
            复制
          </Button>
          <Button
            size="small"
            type="link"
            icon={<LinkOutlined />}
            href={skill.url}
            target="_blank"
            style={{ color: '#a78bfa' }}
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* 头部区域 - 暗黑魔幻紫主题 */}
      <div 
        className="text-white py-16 px-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #1a1650 30%, #302b63 60%, #24243e 100%)',
        }}
      >
        {/* 魔幻背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(139, 92, 246, 0.15)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(99, 102, 241, 0.15)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: 'rgba(167, 139, 250, 0.08)' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
            >
              <AppstoreOutlined className="text-3xl text-white" />
            </div>
            <h1 
              className="text-5xl font-bold mb-4"
              style={{ 
                background: 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 30%, #a78bfa 60%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              技能包展示墙
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(196, 181, 253, 0.7)' }}>
              探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率
            </p>
          </div>
          
          {/* 统计卡片 */}
          <Row gutter={16} className="max-w-4xl mx-auto">
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.1)' }}
              >
                <Statistic 
                  title={<span style={{ color: 'rgba(196, 181, 253, 0.6)' }}>总技能数</span>}
                  value={stats.totalSkills}
                  valueStyle={{ color: '#e9d5ff', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.1)' }}
              >
                <Statistic 
                  title={<span style={{ color: 'rgba(196, 181, 253, 0.6)' }}>总安装量</span>}
                  value={formatInstalls(stats.totalInstalls)}
                  valueStyle={{ color: '#ddd6fe', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.1)' }}
              >
                <Statistic 
                  title={<span style={{ color: 'rgba(196, 181, 253, 0.6)' }}>分类数量</span>}
                  value={stats.categoryCount}
                  valueStyle={{ color: '#c4b5fd', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139, 92, 246, 0.1)' }}
              >
                <Statistic 
                  title={<span style={{ color: 'rgba(196, 181, 253, 0.6)' }}>平均安装</span>}
                  value={formatInstalls(stats.averageInstalls)}
                  valueStyle={{ color: '#a78bfa', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 筛选区域 */}
      <div 
        className="sticky top-0 z-10 py-4 px-4 border-b"
        style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)', borderColor: 'rgba(139, 92, 246, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <Search
            placeholder="搜索技能名称、描述或分类..."
            allowClear
            enterButton={<><SearchOutlined /> 搜索</>}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 custom-search"
          />
          <Select
            placeholder="选择分类"
            size="large"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-auto custom-select"
            style={{ minWidth: '200px' }}
          >
            {categories.map(cat => (
              <Option key={cat} value={cat}>{cat}</Option>
            ))}
          </Select>
          
          {/* 视图切换 */}
          <Radio.Group 
            value={viewType} 
            onChange={(e) => setViewType(e.target.value)}
            size="large"
            className="custom-radio-group"
          >
            <Radio.Button value="card" className="flex items-center gap-1">
              <TableOutlined /> 卡片
            </Radio.Button>
            <Radio.Button value="list" className="flex items-center gap-1">
              <UnorderedListOutlined /> 列表
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      {/* 技能展示区域 */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {filteredSkills.length === 0 ? (
          <Empty 
            description={<span style={{ color: '#6b7280' }}>没有找到匹配的技能</span>}
            className="py-16"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span style={{ color: '#9ca3af' }}>
                共找到 <span className="font-bold" style={{ color: '#a78bfa' }}>{filteredSkills.length}</span> 个技能
              </span>
            </div>
            
            {viewType === 'card' ? (
              /* 卡片视图 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSkills.map((skill, index) => (
                  <Card
                    key={skill.id}
                    className="border-0 transition-all duration-300 hover:shadow-lg"
                    style={{ 
                      background: 'rgba(20, 20, 30, 0.8)', 
                      border: '1px solid rgba(139, 92, 246, 0.15)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    title={
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold" style={{ color: '#e5e7eb' }}>{skill.name}</span>
                        {index < 4 && (
                          <FireOutlined style={{ color: '#fb923c' }} />
                        )}
                      </div>
                    }
                    extra={<CategoryTag category={skill.category} />}
                  >
                    <div className="space-y-3">
                      {/* 描述 */}
                      <p className="text-sm line-clamp-2 h-10" style={{ color: '#9ca3af' }}>
                        {skill.description}
                      </p>
                      
                      {/* 安装量 */}
                      <div className="flex items-center gap-2 text-sm">
                        <RiseOutlined style={{ color: '#34d399' }} />
                        <span className="font-semibold" style={{ color: '#34d399' }}>
                          {formatInstalls(skill.installs)}
                        </span>
                        <span style={{ color: '#6b7280' }}>次安装</span>
                      </div>
                      
                      {/* 安装命令 */}
                      <div 
                        className="rounded p-2 text-xs font-mono break-all relative group border"
                        style={{ background: 'rgba(10, 10, 15, 0.8)', borderColor: 'rgba(139, 92, 246, 0.2)' }}
                      >
                        <code style={{ color: '#c4b5fd' }}>{skill.installCommand}</code>
                        <Tooltip title="复制命令">
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined style={{ color: '#a78bfa' }} />}
                            className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopy(skill.installCommand)}
                          />
                        </Tooltip>
                      </div>
                      
                      {/* 操作按钮 */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="small"
                          icon={<CopyOutlined />}
                          onClick={() => handleCopy(skill.installCommand)}
                          className="flex-1"
                          style={{ 
                            background: 'rgba(139, 92, 246, 0.15)', 
                            borderColor: 'rgba(139, 92, 246, 0.4)',
                            color: '#c4b5fd'
                          }}
                        >
                          复制命令
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          icon={<LinkOutlined />}
                          href={skill.url}
                          target="_blank"
                          style={{ color: '#a78bfa' }}
                        >
                          查看
                        </Button>
                      </div>
                      
                      {/* 所有者信息 */}
                      <div className="text-xs pt-2 border-t" style={{ color: '#6b7280', borderColor: 'rgba(139, 92, 246, 0.1)' }}>
                        作者: <span style={{ color: '#9ca3af' }}>{skill.owner}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              /* 列表视图 */
              <Table
                dataSource={filteredSkills}
                columns={columns}
                rowKey="id"
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `共 ${total} 个技能`,
                }}
                scroll={{ x: 1200 }}
                className="skills-table"
                rowClassName={() => 'bg-transparent'}
              />
            )}
          </>
        )}
      </div>

      {/* 底部信息 */}
      <div 
        className="py-8 px-4 mt-12 border-t"
        style={{ background: 'rgba(10, 10, 15, 0.8)', borderColor: 'rgba(139, 92, 246, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2" style={{ color: '#a78bfa' }}>技能包展示墙 - OpenClaw Skills Marketplace</p>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            数据来源于 skills.sh 社区排行榜 · 定期自动更新
          </p>
          <p className="text-xs mt-4" style={{ color: '#4b5563' }}>
            安装命令: npx skills add {'<owner/repo@skill>'}
          </p>
        </div>
      </div>
    </div>
  );
}
