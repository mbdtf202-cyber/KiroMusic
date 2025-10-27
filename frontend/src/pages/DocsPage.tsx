import Layout from '../components/Layout';
import { Book, FileText, Rocket, Code, Zap, Shield, Brain, GitBranch } from 'lucide-react';

export function DocsPage() {
  const docSections = [
    {
      title: '快速开始',
      icon: Rocket,
      color: 'from-green-500 to-emerald-600',
      docs: [
        {
          name: '安装指南',
          description: '快速安装和配置KiroMusic',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/INSTALL.md',
        },
        {
          name: '使用指南',
          description: '学习如何使用KiroMusic平台',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/USAGE_GUIDE.md',
        },
        {
          name: 'AI快速开始',
          description: 'AI功能快速入门指南',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/docs/AI_QUICKSTART.md',
        },
      ],
    },
    {
      title: '功能文档',
      icon: FileText,
      color: 'from-blue-500 to-cyan-600',
      docs: [
        {
          name: '功能特性',
          description: '了解KiroMusic的所有功能',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/FEATURES.md',
        },
        {
          name: 'AI功能详解',
          description: '完整的AI功能文档',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/docs/AI_FEATURES.md',
        },
        {
          name: 'AI功能说明',
          description: '中文AI功能使用说明',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/AI功能说明.md',
        },
      ],
    },
    {
      title: '开发文档',
      icon: Code,
      color: 'from-purple-500 to-pink-600',
      docs: [
        {
          name: '开发者指南',
          description: '为开发者提供的完整指南',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/DEVELOPER_GUIDE.md',
        },
        {
          name: '架构设计',
          description: '系统架构和设计文档',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/docs/ARCHITECTURE.md',
        },
        {
          name: '部署指南',
          description: '生产环境部署文档',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/docs/DEPLOYMENT.md',
        },
      ],
    },
    {
      title: 'AI相关',
      icon: Brain,
      color: 'from-orange-500 to-red-600',
      docs: [
        {
          name: 'AI实现报告',
          description: 'AI功能完整实现报告',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/AI_IMPLEMENTATION_COMPLETE.md',
        },
        {
          name: 'AI完成总结',
          description: 'AI功能完成总结',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/AI_COMPLETION_SUMMARY.md',
        },
        {
          name: 'AI部署清单',
          description: 'AI功能部署检查清单',
          link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/AI_DEPLOYMENT_CHECKLIST.md',
        },
      ],
    },
  ];

  const quickLinks = [
    {
      name: 'GitHub仓库',
      icon: GitBranch,
      link: 'https://github.com/mbdtf202-cyber/KiroMusic',
      description: '查看源代码和贡献',
    },
    {
      name: 'README',
      icon: Book,
      link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/README.md',
      description: '项目概述和介绍',
    },
    {
      name: 'Docker部署',
      icon: Zap,
      link: 'https://github.com/mbdtf202-cyber/KiroMusic/blob/main/DOCKER_DEPLOYMENT.md',
      description: '使用Docker快速部署',
    },
    {
      name: '智能合约',
      icon: Shield,
      link: 'https://github.com/mbdtf202-cyber/KiroMusic/tree/main/contracts',
      description: '查看智能合约代码',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            📚 文档中心
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            探索KiroMusic的完整文档，学习如何使用平台的所有功能
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyber-blue/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-cyber-blue transition-colors">
                    {link.name}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{link.description}</p>
              </a>
            );
          })}
        </div>

        {/* Documentation Sections */}
        <div className="space-y-8">
          {docSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <div key={sectionIndex} className="glass-effect p-8 rounded-xl border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${section.color} rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {section.docs.map((doc, docIndex) => (
                    <a
                      key={docIndex}
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-cyber-blue/50 hover:bg-white/10 transition-all duration-300 group"
                    >
                      <h3 className="font-semibold text-white mb-2 group-hover:text-cyber-blue transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-sm text-gray-400">{doc.description}</p>
                      <div className="mt-3 text-xs text-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        查看文档 →
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-12 glass-effect p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">📖 其他资源</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">社区</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://discord.gg/kiromusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    Discord社区 →
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/kiromusic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    Twitter →
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mbdtf202-cyber/KiroMusic/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    GitHub讨论 →
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">支持</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/mbdtf202-cyber/KiroMusic/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    报告问题 →
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@kiromusic.io"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    技术支持 →
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ai@kiromusic.io"
                    className="text-gray-400 hover:text-cyber-blue transition-colors"
                  >
                    AI团队 →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="glass-effect p-8 rounded-xl border border-white/10 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10">
            <h2 className="text-2xl font-bold text-white mb-4">准备开始了吗？</h2>
            <p className="text-gray-400 mb-6">
              查看我们的快速开始指南，几分钟内开始使用KiroMusic
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/mbdtf202-cyber/KiroMusic/blob/main/INSTALL.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple text-white rounded-lg hover:shadow-lg hover:shadow-cyber-blue/50 transition-all duration-300"
              >
                安装指南
              </a>
              <a
                href="https://github.com/mbdtf202-cyber/KiroMusic/blob/main/docs/AI_QUICKSTART.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                AI快速开始
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
