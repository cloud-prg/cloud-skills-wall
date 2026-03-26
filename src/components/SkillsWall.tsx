import { useState, useEffect } from 'react';
import { Card, Tag, Button, Input, Select, Statistic, Row, Col, Tooltip, Badge, Empty, Table, Radio, Space } from 'antd';
import { CopyOutlined, LinkOutlined, RiseOutlined, AppstoreOutlined, SearchOutlined, FireOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
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

  // 表格列定义
  const columns = [
    {
      title: '排名',
      key: 'rank',
      width: 60,
      render: (_: unknown, __: Skill, index: number) => (
        <span className="font-bold text-purple-400">#{index + 1}</span>
      ),
    },
    {
      title: '技能名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (name: string, skill: Skill, index: number) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">{name}</span>
          {index < 4 && <FireOutlined className="text-red-500" />}
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: string) => (
        <Tag color={categoryColors[category] || 'default'}>{category}</Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (desc: string) => <span className="text-gray-300">{desc}</span>,
    },
    {
      title: '安装量',
      dataIndex: 'installs',
      key: 'installs',
      width: 120,
      sorter: (a: Skill, b: Skill) => a.installs - b.installs,
      render: (installs: number) => (
        <div className="flex items-center gap-2">
          <RiseOutlined className="text-green-400" />
          <span className="font-semibold text-green-400">{formatInstalls(installs)}</span>
        </div>
      ),
    },
    {
      title: '作者',
      dataIndex: 'owner',
      key: 'owner',
      width: 120,
      render: (owner: string) => <span className="text-gray-400">{owner}</span>,
    },
    {
      title: '安装命令',
      key: 'command',
      width: 300,
      render: (skill: Skill) => (
        <div className="flex items-center gap-2">
          <code className="bg-gray-800 px-2 py-1 rounded text-xs text-purple-300 flex-1 truncate">
            {skill.installCommand}
          </code>
          <Tooltip title="复制命令">
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined className="text-purple-400" />}
              onClick={() => handleCopy(skill.installCommand)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (skill: Skill) => (
        <Space>
          <Button
            type="primary"
            size="small"
            ghost
            icon={<CopyOutlined />}
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
            className="text-purple-400"
          >
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 头部区域 - 暗黑魔幻紫主题 */}
      <div 
        className="text-white py-16 px-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        }}
      >
        {/* 魔幻背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mb-6 shadow-lg shadow-purple-500/30">
              <AppstoreOutlined className="text-3xl text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              技能包展示墙
            </h1>
            <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
              探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率
            </p>
          </div>
          
          {/* 统计卡片 */}
          <Row gutter={16} className="max-w-4xl mx-auto">
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
              >
                <Statistic 
                  title={<span className="text-purple-300/70">总技能数</span>}
                  value={stats.totalSkills}
                  valueStyle={{ color: '#e879f9', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
              >
                <Statistic 
                  title={<span className="text-purple-300/70">总安装量</span>}
                  value={formatInstalls(stats.totalInstalls)}
                  valueStyle={{ color: '#a78bfa', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
              >
                <Statistic 
                  title={<span className="text-purple-300/70">分类数量</span>}
                  value={stats.categoryCount}
                  valueStyle={{ color: '#818cf8', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card 
                className="border-0 text-center" 
                style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' }}
              >
                <Statistic 
                  title={<span className="text-purple-300/70">平均安装</span>}
                  value={formatInstalls(stats.averageInstalls)}
                  valueStyle={{ color: '#60a5fa', fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 筛选区域 */}
      <div 
        className="sticky top-0 z-10 py-4 px-4 border-b"
        style={{ background: 'rgba(17, 24, 39, 0.95)', backdropFilter: 'blur(10px)', borderColor: 'rgba(139, 92, 246, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center">
          <Search
            placeholder="搜索技能名称、描述或分类..."
            allowClear
            enterButton={<><SearchOutlined /> 搜索</>}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            style={{ background: 'rgba(31, 41, 55, 0.8)' }}
          />
          <Select
            placeholder="选择分类"
            size="large"
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ minWidth: '200px', background: 'rgba(31, 41, 55, 0.8)' }}
            className="w-full sm:w-auto"
            dropdownStyle={{ background: '#1f2937' }}
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
            buttonStyle="solid"
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
            description="没有找到匹配的技能" 
            className="py-16"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="mb-4 text-gray-400 flex items-center justify-between">
              <span>
                共找到 <span className="font-bold text-purple-400">{filteredSkills.length}</span> 个技能
              </span>
            </div>
            
            {viewType === 'card' ? (
              /* 卡片视图 */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSkills.map((skill, index) => (
                  <Card
                    key={skill.id}
                    className="border-0 shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                    style={{ background: 'rgba(31, 41, 55, 0.8)' }}
                    title={
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-white">{skill.name}</span>
                        {index < 4 && (
                          <FireOutlined className="text-red-500" />
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
                      <p className="text-gray-400 text-sm line-clamp-2 h-10">
                        {skill.description}
                      </p>
                      
                      {/* 安装量 */}
                      <div className="flex items-center gap-2 text-sm">
                        <RiseOutlined className="text-green-400" />
                        <span className="font-semibold text-green-400">
                          {formatInstalls(skill.installs)}
                        </span>
                        <span className="text-gray-500">次安装</span>
                      </div>
                      
                      {/* 安装命令 */}
                      <div className="bg-gray-900 rounded p-2 text-xs font-mono break-all relative group border border-gray-700">
                        <code className="text-purple-300">{skill.installCommand}</code>
                        <Tooltip title="复制命令">
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined className="text-purple-400" />}
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
                          ghost
                          icon={<CopyOutlined />}
                          onClick={() => handleCopy(skill.installCommand)}
                          className="flex-1 border-purple-500 text-purple-400 hover:border-purple-400 hover:text-purple-300"
                        >
                          复制命令
                        </Button>
                        <Button
                          size="small"
                          type="link"
                          icon={<LinkOutlined />}
                          href={skill.url}
                          target="_blank"
                          className="text-purple-400"
                        >
                          查看
                        </Button>
                      </div>
                      
                      {/* 所有者信息 */}
                      <div className="text-xs text-gray-500 pt-2 border-t border-gray-700">
                        作者: <span className="text-gray-400">{skill.owner}</span>
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
                rowClassName={() => 'bg-transparent hover:bg-gray-800/50'}
              />
            )}
          </>
        )}
      </div>

      {/* 底部信息 */}
      <div 
        className="text-white py-8 px-4 mt-12 border-t"
        style={{ background: 'rgba(15, 12, 41, 0.8)', borderColor: 'rgba(139, 92, 246, 0.2)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2 text-purple-300">技能包展示墙 - OpenClaw Skills Marketplace</p>
          <p className="text-gray-500 text-sm">
            数据来源于 skills.sh 社区排行榜 · 定期自动更新
          </p>
          <p className="text-gray-600 text-xs mt-4">
            安装命令: npx skills add {'<owner/repo@skill>'}
          </p>
        </div>
      </div>
    </div>
  );
}
