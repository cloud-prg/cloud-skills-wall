import { useState, useEffect } from 'react';
import { Card, Tag, Button, Input, Select, Statistic, Row, Col, Tooltip, Badge, Empty, Table, Radio, Space } from 'antd';
import { CopyOutlined, LinkOutlined, RiseOutlined, AppstoreOutlined, SearchOutlined, FireOutlined, UnorderedListOutlined, TableOutlined, GithubOutlined, CloudOutlined } from '@ant-design/icons';
import type { Skill } from '../services/skillsData';
import { getTopSkills, getCategories, searchSkills, getStats } from '../services/skillsData';
import type { ClawSkill } from '../services/clawSkillsData';
import { getTopClawSkills, getClawCategories, searchClawSkills, getClawStats } from '../services/clawSkillsData';

// 数据源类型
type DataSourceType = 'skills' | 'claw';

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

// Claw Skills 分类颜色映射
const clawCategoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Agent 工具': { bg: 'rgba(96, 165, 250, 0.15)', text: '#93c5fd', border: 'rgba(96, 165, 250, 0.3)' },
  'MCP': { bg: 'rgba(167, 139, 250, 0.15)', text: '#c4b5fd', border: 'rgba(167, 139, 250, 0.3)' },
  'Agent 治理': { bg: 'rgba(74, 222, 128, 0.15)', text: '#86efac', border: 'rgba(74, 222, 128, 0.3)' },
  'ClawDirect': { bg: 'rgba(251, 191, 36, 0.15)', text: '#fcd34d', border: 'rgba(251, 191, 36, 0.3)' },
  'OpenClaw 工具': { bg: 'rgba(34, 211, 238, 0.15)', text: '#67e8f9', border: 'rgba(34, 211, 238, 0.3)' },
  '自我改进': { bg: 'rgba(244, 114, 182, 0.15)', text: '#f9a8d4', border: 'rgba(244, 114, 182, 0.3)' },
  '安全': { bg: 'rgba(248, 113, 113, 0.15)', text: '#fca5a5', border: 'rgba(248, 113, 113, 0.3)' },
};

// 获取分类样式
const getCategoryStyle = (category: string, isClaw: boolean = false) => {
  const colors = isClaw ? clawCategoryColors : categoryColors;
  return colors[category] || { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1', border: 'rgba(148, 163, 184, 0.3)' };
};

// 格式化安装量
const formatInstalls = (num: number): string => {
  if (num >= 100000) return (num / 1000).toFixed(0) + 'K';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

// 视图类型
type ViewType = 'card' | 'list';

// 统一类型
interface UnifiedSkill {
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

export default function SkillsWall() {
  const [dataSource, setDataSource] = useState<DataSourceType>('skills');
  const [skills, setSkills] = useState<UnifiedSkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<UnifiedSkill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewType, setViewType] = useState<ViewType>('card');
  const [stats, setStats] = useState({
    totalSkills: 0,
    totalInstalls: 0,
    categoryCount: 0,
    topSkill: null as UnifiedSkill | null,
    averageInstalls: 0
  });

  // 根据数据源加载数据
  useEffect(() => {
    if (dataSource === 'skills') {
      const topSkills = getTopSkills(100).map(s => ({ ...s }));
      setSkills(topSkills);
      setFilteredSkills(topSkills);
      setCategories(['全部', ...getCategories()]);
      const s = getStats();
      setStats({ ...s, topSkill: s.topSkill });
    } else {
      const topClawSkills = getTopClawSkills(100).map(s => ({ ...s }));
      setSkills(topClawSkills);
      setFilteredSkills(topClawSkills);
      setCategories(['全部', ...getClawCategories()]);
      const s = getClawStats();
      setStats({ ...s, topSkill: s.topSkill });
    }
    setSelectedCategory('全部');
    setSearchQuery('');
  }, [dataSource]);

  useEffect(() => {
    // 过滤技能
    let result = skills;

    if (selectedCategory !== '全部') {
      result = result.filter(skill => skill.category === selectedCategory);
    }

    if (searchQuery) {
      if (dataSource === 'skills') {
        result = searchSkills(searchQuery).map(s => ({ ...s }));
      } else {
        result = searchClawSkills(searchQuery).map(s => ({ ...s }));
      }
      if (selectedCategory !== '全部') {
        result = result.filter(skill => skill.category === selectedCategory);
      }
    }

    setFilteredSkills(result);
  }, [selectedCategory, searchQuery, skills, dataSource]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleDataSourceChange = (value: DataSourceType) => {
    setDataSource(value);
  };

  // 自定义分类标签组件
  const CategoryTag = ({ category }: { category: string }) => {
    const style = getCategoryStyle(category, dataSource === 'claw');
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

  // 表格列定义 - 优化布局，避免横向滚动
  const columns = [
    {
      title: <span className="text-gray-300">#</span>,
      key: 'rank',
      width: 50,
      render: (_: unknown, __: UnifiedSkill, index: number) => (
        <span className="font-bold text-purple-400">{index + 1}</span>
      ),
    },
    {
      title: <span className="text-gray-300">技能</span>,
      dataIndex: 'name',
      key: 'name',
      width: 180,
      render: (name: string, skill: UnifiedSkill, index: number) => (
        <Tooltip title={name} placement="topLeft">
          <div className="flex items-center gap-1 truncate">
            <span className="font-semibold text-gray-100 truncate">{name}</span>
            {index < 4 && <FireOutlined className="text-orange-400 flex-shrink-0" />}
          </div>
        </Tooltip>
      ),
    },
    {
      title: <span className="text-gray-300">分类</span>,
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (category: string) => <CategoryTag category={category} />,
    },
    {
      title: <span className="text-gray-300">描述</span>,
      dataIndex: 'description',
      key: 'description',
      width: 130,
      render: (desc: string) => (
        <Tooltip title={desc} placement="topLeft">
          <span className="text-gray-400 truncate block max-w-[130px]">{desc}</span>
        </Tooltip>
      ),
    },
    {
      title: <span className="text-gray-300">安装</span>,
      dataIndex: 'installs',
      key: 'installs',
      width: 90,
      sorter: (a: UnifiedSkill, b: UnifiedSkill) => a.installs - b.installs,
      render: (installs: number) => (
        <div className="flex items-center gap-1">
          <RiseOutlined className="text-emerald-400 text-xs" />
          <span className="font-semibold text-emerald-400 text-sm">{formatInstalls(installs)}</span>
        </div>
      ),
    },
    {
      title: <span className="text-gray-300">命令</span>,
      key: 'command',
      width: 200,
      render: (skill: UnifiedSkill) => (
        <div className="flex items-center gap-1">
          <Tooltip title={skill.installCommand} placement="topLeft">
            <code 
              className="px-2 py-1 rounded text-xs truncate font-mono block max-w-[160px]"
              style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#c4b5fd' }}
            >
              {skill.installCommand}
            </code>
          </Tooltip>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined style={{ color: '#a78bfa', fontSize: '12px' }} />}
            onClick={() => handleCopy(skill.installCommand)}
            className="flex-shrink-0"
          />
        </div>
      ),
    },
    {
      title: <span className="text-gray-300">操作</span>,
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (skill: UnifiedSkill) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            style={{ 
              background: 'rgba(139, 92, 246, 0.2)', 
              borderColor: 'rgba(139, 92, 246, 0.5)',
              color: '#c4b5fd',
              fontSize: '12px',
              padding: '0 8px'
            }}
            onClick={() => handleCopy(skill.installCommand)}
          >
            复制
          </Button>
          <Button
            size="small"
            type="link"
            icon={<LinkOutlined style={{ fontSize: '14px' }} />}
            href={skill.url}
            target="_blank"
            style={{ color: '#a78bfa', padding: '0 4px' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* 头部区域 - 暗黑魔幻紫主题 */}
      <div
        className="text-white py-12 px-4 relative overflow-hidden"
        style={{
          background: dataSource === 'skills'
            ? 'linear-gradient(135deg, #0f0c29 0%, #1a1650 30%, #302b63 60%, #24243e 100%)'
            : 'linear-gradient(135deg, #0c1a1f 0%, #0f2a35 30%, #1a3a4a 60%, #1a2a3a 100%)',
        }}
      >
        {/* 魔幻背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.15)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: dataSource === 'skills' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(56, 189, 248, 0.15)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: dataSource === 'skills' ? 'rgba(167, 139, 250, 0.08)' : 'rgba(34, 211, 238, 0.08)' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* 数据源切换 - 顶部 */}
          <div className="flex justify-center mb-8">
            <Radio.Group
              value={dataSource}
              onChange={(e) => handleDataSourceChange(e.target.value)}
              size="large"
              className="source-switcher"
            >
              <Radio.Button value="skills" className="flex items-center gap-2">
                <CloudOutlined /> Skills
              </Radio.Button>
              <Radio.Button value="claw" className="flex items-center gap-2">
                <GithubOutlined /> Claw Skills
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className="text-center mb-10">
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
              style={{
                background: dataSource === 'skills'
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                boxShadow: dataSource === 'skills' ? '0 0 30px rgba(139, 92, 246, 0.4)' : '0 0 30px rgba(34, 211, 238, 0.4)'
              }}
            >
              <AppstoreOutlined className="text-3xl text-white" />
            </div>
            <h1
              className="text-5xl font-bold mb-4"
              style={{
                background: dataSource === 'skills'
                  ? 'linear-gradient(135deg, #e9d5ff 0%, #c4b5fd 30%, #a78bfa 60%, #818cf8 100%)'
                  : 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 30%, #22d3ee 60%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {dataSource === 'skills' ? '技能包展示墙' : 'Claw Skills 展示墙'}
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: dataSource === 'skills' ? 'rgba(196, 181, 253, 0.7)' : 'rgba(103, 232, 249, 0.7)' }}>
              {dataSource === 'skills'
                ? '探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率'
                : '探索 ClawHub 高热度 Claw Skills，扩展你的 Agent 能力'
              }
            </p>
          </div>
          
          {/* 统计卡片 */}
          <Row gutter={16} className="max-w-4xl mx-auto">
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: `1px solid ${dataSource === 'skills' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)'}` }}
              >
                <Statistic
                  title={<span style={{ color: dataSource === 'skills' ? 'rgba(196, 181, 253, 0.6)' : 'rgba(103, 232, 249, 0.6)' }}>总技能数</span>}
                  value={stats.totalSkills}
                  valueStyle={{ color: dataSource === 'skills' ? '#e9d5ff' : '#a5f3fc', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: `1px solid ${dataSource === 'skills' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)'}` }}
              >
                <Statistic
                  title={<span style={{ color: dataSource === 'skills' ? 'rgba(196, 181, 253, 0.6)' : 'rgba(103, 232, 249, 0.6)' }}>总安装量</span>}
                  value={formatInstalls(stats.totalInstalls)}
                  valueStyle={{ color: dataSource === 'skills' ? '#ddd6fe' : '#67e8f9', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: `1px solid ${dataSource === 'skills' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)'}` }}
              >
                <Statistic
                  title={<span style={{ color: dataSource === 'skills' ? 'rgba(196, 181, 253, 0.6)' : 'rgba(103, 232, 249, 0.6)' }}>分类数量</span>}
                  value={stats.categoryCount}
                  valueStyle={{ color: dataSource === 'skills' ? '#c4b5fd' : '#22d3ee', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: `1px solid ${dataSource === 'skills' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)'}` }}
              >
                <Statistic
                  title={<span style={{ color: dataSource === 'skills' ? 'rgba(196, 181, 253, 0.6)' : 'rgba(103, 232, 249, 0.6)' }}>平均安装</span>}
                  value={formatInstalls(stats.averageInstalls)}
                  valueStyle={{ color: dataSource === 'skills' ? '#a78bfa' : '#0ea5e9', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 筛选区域 */}
      <div
        className="sticky top-0 z-10 py-4 px-4 border-b"
        style={{ background: 'rgba(10, 10, 15, 0.95)', backdropFilter: 'blur(10px)', borderColor: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.15)' }}
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
                共找到 <span className="font-bold" style={{ color: dataSource === 'skills' ? '#a78bfa' : '#22d3ee' }}>{filteredSkills.length}</span> 个技能
              </span>
              {/* 视图切换 - 右上角 */}
              <Radio.Group
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
                size="small"
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
            
            {viewType === 'card' ? (
              /* 卡片视图 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSkills.map((skill, index) => (
                  <Card
                    key={skill.id}
                    className="border-0 transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: 'rgba(20, 20, 30, 0.8)',
                      border: `1px solid ${dataSource === 'skills' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.15)'}`,
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
                        style={{ background: 'rgba(10, 10, 15, 0.8)', borderColor: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(34, 211, 238, 0.2)' }}
                      >
                        <code style={{ color: dataSource === 'skills' ? '#c4b5fd' : '#67e8f9' }}>{skill.installCommand}</code>
                        <Tooltip title="复制命令">
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined style={{ color: dataSource === 'skills' ? '#a78bfa' : '#22d3ee' }} />}
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
                            background: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.15)',
                            borderColor: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.4)' : 'rgba(34, 211, 238, 0.4)',
                            color: dataSource === 'skills' ? '#c4b5fd' : '#67e8f9'
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
                          style={{ color: dataSource === 'skills' ? '#a78bfa' : '#22d3ee' }}
                        >
                          查看
                        </Button>
                      </div>

                      {/* 所有者信息 */}
                      <div className="text-xs pt-2 border-t" style={{ color: '#6b7280', borderColor: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(34, 211, 238, 0.1)' }}>
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
        style={{ background: 'rgba(10, 10, 15, 0.8)', borderColor: dataSource === 'skills' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(34, 211, 238, 0.15)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2" style={{ color: dataSource === 'skills' ? '#a78bfa' : '#22d3ee' }}>
            {dataSource === 'skills' ? '技能包展示墙 - OpenClaw Skills Marketplace' : 'Claw Skills 展示墙 - ClawHub'}
          </p>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            数据来源于 {dataSource === 'skills' ? 'skills.sh' : 'clawhub.com'} 社区排行榜 · 定期自动更新
          </p>
          <p className="text-xs mt-4" style={{ color: '#4b5563' }}>
            安装命令: npx skills add {'<owner/repo@skill>'}
          </p>
        </div>
      </div>
    </div>
  );
}
