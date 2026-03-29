import { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Statistic, Row, Col, Tooltip, Empty, Table, Radio, Space } from 'antd';
import { CopyOutlined, LinkOutlined, RiseOutlined, SearchOutlined, FireOutlined, UnorderedListOutlined, TableOutlined } from '@ant-design/icons';
import { getTopSkills, getCategories, searchSkills, getStats } from '../services/skillsData';
import { getTopClawSkills, getClawCategories, searchClawSkills, getClawStats } from '../services/clawSkillsData';
import { getCategoryStyle, SOURCE_THEME_COLORS, STATIC_THEME_COLORS } from '../style/palette';

// 数据源类型
type DataSourceType = 'skills' | 'claw';

const { Search } = Input;
const { Option } = Select;

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
  const sourceColors = SOURCE_THEME_COLORS[dataSource];

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
    const style = getCategoryStyle(category, dataSource);
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
      render: (name: string, _skill: UnifiedSkill, index: number) => (
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
              style={{ background: STATIC_THEME_COLORS.commandBg, color: STATIC_THEME_COLORS.commandText }}
            >
              {skill.installCommand}
            </code>
          </Tooltip>
          <Button
            type="text"
            size="small"
            icon={<CopyOutlined style={{ color: STATIC_THEME_COLORS.commandIcon, fontSize: '12px' }} />}
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
      fixed: 'right' as const,
      render: (skill: UnifiedSkill) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            style={{ 
              background: sourceColors.actionBg,
              borderColor: sourceColors.actionBorder,
              color: sourceColors.actionText,
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
            style={{ color: sourceColors.link, padding: '0 4px' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: STATIC_THEME_COLORS.pageBg }}>
      {/* 头部区域 - 暗黑魔幻紫主题 */}
      <div
        className="text-white py-12 px-4 relative overflow-hidden"
        style={{
          background: sourceColors.gradientHeader,
        }}
      >
        {/* 魔幻背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: sourceColors.glowPrimary }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: sourceColors.glowSecondary }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: sourceColors.glowCenter }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
          {/* 右上角数据源切换 */}
          <div className="absolute top-0 right-0">
            <Radio.Group
              value={dataSource}
              onChange={(e) => handleDataSourceChange(e.target.value)}
              size="small"
            >
              <Radio.Button value="skills">Skills</Radio.Button>
              <Radio.Button value="claw">Claw</Radio.Button>
            </Radio.Group>
          </div>

          {/* GitHub 猫咪图标 */}
          <div className="mb-6">
            <svg
              viewBox="0 0 24 24"
              width="64"
              height="64"
              fill="white"
              className="drop-shadow-lg"
              style={{ filter: STATIC_THEME_COLORS.iconGlow }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>

          {/* 标题 */}
          <h1
            className="text-5xl font-bold mb-4"
            style={{
              background: sourceColors.titleGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {dataSource === 'skills' ? '技能包展示墙' : 'Claw Skills 展示墙'}
          </h1>

          {/* 副标题 */}
          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: sourceColors.subtitle }}>
            {dataSource === 'skills'
              ? '探索 OpenClaw 社区最受欢迎的 Skills，提升你的开发效率'
              : '探索 ClawHub 高热度 Claw Skills，扩展你的 Agent 能力'
            }
          </p>
          
          {/* 统计卡片 */}
          <Row gutter={16} className="max-w-4xl mx-auto">
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: STATIC_THEME_COLORS.cardGlassBg, backdropFilter: 'blur(10px)', border: `1px solid ${sourceColors.panelBorder}` }}
              >
                <Statistic
                  title={<span style={{ color: sourceColors.mutedTitle }}>总技能数</span>}
                  value={stats.totalSkills}
                  valueStyle={{ color: sourceColors.stat1, fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: STATIC_THEME_COLORS.cardGlassBg, backdropFilter: 'blur(10px)', border: `1px solid ${sourceColors.panelBorder}` }}
              >
                <Statistic
                  title={<span style={{ color: sourceColors.mutedTitle }}>总安装量</span>}
                  value={formatInstalls(stats.totalInstalls)}
                  valueStyle={{ color: sourceColors.stat2, fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: STATIC_THEME_COLORS.cardGlassBg, backdropFilter: 'blur(10px)', border: `1px solid ${sourceColors.panelBorder}` }}
              >
                <Statistic
                  title={<span style={{ color: sourceColors.mutedTitle }}>分类数量</span>}
                  value={stats.categoryCount}
                  valueStyle={{ color: sourceColors.stat3, fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card
                className="border-0 text-center"
                style={{ background: STATIC_THEME_COLORS.cardGlassBg, backdropFilter: 'blur(10px)', border: `1px solid ${sourceColors.panelBorder}` }}
              >
                <Statistic
                  title={<span style={{ color: sourceColors.mutedTitle }}>平均安装</span>}
                  value={formatInstalls(stats.averageInstalls)}
                  valueStyle={{ color: sourceColors.stat4, fontSize: '28px', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* 筛选区域 */}
      <div
        className="sticky top-0 z-10 py-4 px-4 border-b"
        style={{ background: STATIC_THEME_COLORS.panelBg, backdropFilter: 'blur(10px)', borderColor: sourceColors.panelBorder }}
      >
        <div className="max-w-7xl mx-auto flex flex-row gap-4 items-center">
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
            className="custom-select"
            style={{ minWidth: '180px', width: '180px' }}
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
            description={<span style={{ color: STATIC_THEME_COLORS.secondaryText }}>没有找到匹配的技能</span>}
            className="py-16"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <span style={{ color: STATIC_THEME_COLORS.descText }}>
                共找到 <span className="font-bold" style={{ color: sourceColors.badge }}>{filteredSkills.length}</span> 个技能
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
                      background: STATIC_THEME_COLORS.cardBg,
                      border: `1px solid ${sourceColors.cardBorder}`,
                      boxShadow: STATIC_THEME_COLORS.cardShadow
                    }}
                    title={
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold" style={{ color: STATIC_THEME_COLORS.titleText }}>{skill.name}</span>
                        {index < 4 && (
                          <FireOutlined style={{ color: STATIC_THEME_COLORS.hotIcon }} />
                        )}
                      </div>
                    }
                    extra={<CategoryTag category={skill.category} />}
                  >
                    <div className="space-y-3">
                      {/* 描述 */}
                      <p className="text-sm line-clamp-2 h-10" style={{ color: STATIC_THEME_COLORS.descText }}>
                        {skill.description}
                      </p>
                      
                      {/* 安装量 */}
                      <div className="flex items-center gap-2 text-sm">
                        <RiseOutlined style={{ color: STATIC_THEME_COLORS.rise }} />
                        <span className="font-semibold" style={{ color: STATIC_THEME_COLORS.rise }}>
                          {formatInstalls(skill.installs)}
                        </span>
                        <span style={{ color: STATIC_THEME_COLORS.secondaryText }}>次安装</span>
                      </div>
                      
                      {/* 安装命令 */}
                      <div
                        className="rounded p-2 text-xs font-mono break-all relative group border"
                        style={{ background: STATIC_THEME_COLORS.codeBg, borderColor: sourceColors.codeBorder }}
                      >
                        <code style={{ color: sourceColors.actionText }}>{skill.installCommand}</code>
                        <Tooltip title="复制命令">
                          <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined style={{ color: sourceColors.link }} />}
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
                            background: sourceColors.actionBg,
                            borderColor: sourceColors.actionBorder,
                            color: sourceColors.actionText
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
                          style={{ color: sourceColors.link }}
                        >
                          查看
                        </Button>
                      </div>

                      {/* 所有者信息 */}
                      <div className="text-xs pt-2 border-t" style={{ color: STATIC_THEME_COLORS.secondaryText, borderColor: sourceColors.panelBorder }}>
                        作者: <span style={{ color: STATIC_THEME_COLORS.descText }}>{skill.owner}</span>
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
        style={{ background: STATIC_THEME_COLORS.codeBg, borderColor: sourceColors.panelBorder }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2" style={{ color: sourceColors.footerText }}>
            {dataSource === 'skills' ? '技能包展示墙 - OpenClaw Skills Marketplace' : 'Claw Skills 展示墙 - ClawHub'}
          </p>
          <p className="text-sm" style={{ color: STATIC_THEME_COLORS.secondaryText }}>
            数据来源于 {dataSource === 'skills' ? 'skills.sh' : 'clawhub.com'} 社区排行榜 · 定期自动更新
          </p>
          <p className="text-xs mt-4" style={{ color: STATIC_THEME_COLORS.weakText }}>
            安装命令: npx skills add {'<owner/repo@skill>'}
          </p>
        </div>
      </div>
    </div>
  );
}
