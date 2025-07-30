
"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, Download, Calendar, Clock, Share2, Mail, Printer, Filter, 
  Search, Plus, Edit3, Trash2, MoreVertical, ArrowUp, ArrowDown, 
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, Users, 
  DollarSign, ShoppingCart, Eye, Target, Activity, CheckCircle, 
  AlertTriangle, Star, Bookmark, Send, Copy, Settings, RefreshCw,
  PlayCircle, PauseCircle, StopCircle, Layout, Grid, List, Zap,
  Sun, Moon, Palette, Bell, ChevronDown, ChevronRight, ExternalLink,
  Database, CloudDownload, Folder, FolderOpen, Archive, Lock, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ReportsPage = () => {
  const [theme, setTheme] = useState('midnight');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReports, setSelectedReports] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    type: '',
    category: 'financial',
    schedule: 'One-time',
    format: 'PDF',
    description: ''
  });

  const themes = {
    midnight: {
      bg: 'bg-gradient-to-br from-slate-950 via-gray-900 to-slate-800',
      cardBg: 'bg-gray-800/80 backdrop-blur-xl border-gray-700/50',
      text: 'text-white',
      textMuted: 'text-gray-300',
      textSecondary: 'text-gray-400',
      border: 'border-gray-700/50',
      hover: 'hover:bg-gray-700/50',
      accent: 'bg-gradient-to-r from-cyan-500 to-blue-600'
    },
    dark: {
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800',
      cardBg: 'bg-gray-800/90 backdrop-blur-lg border-purple-500/20',
      text: 'text-white',
      textMuted: 'text-purple-200',
      textSecondary: 'text-purple-300',
      border: 'border-purple-500/20',
      hover: 'hover:bg-purple-800/30',
      accent: 'bg-gradient-to-r from-purple-500 to-pink-600'
    },
    ocean: {
      bg: 'bg-gradient-to-br from-blue-950 via-indigo-900 to-cyan-800',
      cardBg: 'bg-blue-900/70 backdrop-blur-xl border-cyan-400/20',
      text: 'text-white',
      textMuted: 'text-cyan-200',
      textSecondary: 'text-cyan-300',
      border: 'border-cyan-400/20',
      hover: 'hover:bg-cyan-800/30',
      accent: 'bg-gradient-to-r from-cyan-400 to-blue-500'
    }
  };

  const currentTheme = themes[theme];

  const [reportsData, setReportsData] = useState({
    recentReports: [
      {
        id: 1,
        name: 'Monthly Revenue Analysis',
        type: 'Revenue',
        category: 'financial',
        status: 'completed',
        lastGenerated: '2024-01-28',
        size: '2.4 MB',
        format: 'PDF',
        schedule: 'Monthly',
        description: 'Comprehensive monthly revenue breakdown with trends and forecasts',
        downloads: 156,
        isStarred: true,
        createdBy: 'Analytics Team',
        nextRun: '2024-02-28'
      },
      {
        id: 2,
        name: 'User Engagement Report',
        type: 'Users',
        category: 'engagement',
        status: 'generating',
        lastGenerated: '2024-01-27',
        size: '1.8 MB',
        format: 'Excel',
        schedule: 'Weekly',
        description: 'Weekly user engagement metrics and behavioral analysis',
        downloads: 89,
        isStarred: false,
        createdBy: 'Marketing Team',
        nextRun: '2024-02-03'
      },
      {
        id: 3,
        name: 'E-commerce Performance',
        type: 'Sales',
        category: 'ecommerce',
        status: 'scheduled',
        lastGenerated: '2024-01-26',
        size: '3.1 MB',
        format: 'PDF',
        schedule: 'Daily',
        description: 'Daily sales performance and conversion metrics',
        downloads: 234,
        isStarred: true,
        createdBy: 'Sales Team',
        nextRun: '2024-01-29'
      },
      {
        id: 4,
        name: 'Traffic Sources Analysis',
        type: 'Traffic',
        category: 'marketing',
        status: 'completed',
        lastGenerated: '2024-01-25',
        size: '1.2 MB',
        format: 'CSV',
        schedule: 'Bi-weekly',
        description: 'Detailed breakdown of traffic sources and channel performance',
        downloads: 67,
        isStarred: false,
        createdBy: 'SEO Team',
        nextRun: '2024-02-08'
      },
      {
        id: 5,
        name: 'Customer Retention Study',
        type: 'Retention',
        category: 'customers',
        status: 'failed',
        lastGenerated: '2024-01-24',
        size: '0 MB',
        format: 'PDF',
        schedule: 'Monthly',
        description: 'Monthly customer retention analysis and churn prediction',
        downloads: 0,
        isStarred: false,
        createdBy: 'Customer Success',
        nextRun: '2024-02-24'
      },
      {
        id: 6,
        name: 'Device & Browser Analytics',
        type: 'Technical',
        category: 'technical',
        status: 'completed',
        lastGenerated: '2024-01-23',
        size: '900 KB',
        format: 'JSON',
        schedule: 'Weekly',
        description: 'Technical performance metrics across devices and browsers',
        downloads: 45,
        isStarred: false,
        createdBy: 'DevOps Team',
        nextRun: '2024-01-30'
      }
    ],
    templates: [
      { id: 1, name: 'Executive Summary', category: 'executive', icon: Star, usage: 45 },
      { id: 2, name: 'Sales Performance', category: 'sales', icon: TrendingUp, usage: 67 },
      { id: 3, name: 'User Analytics', category: 'users', icon: Users, usage: 52 },
      { id: 4, name: 'Financial Overview', category: 'financial', icon: DollarSign, usage: 38 },
      { id: 5, name: 'Marketing Metrics', category: 'marketing', icon: Target, usage: 29 },
      { id: 6, name: 'Technical Health', category: 'technical', icon: Activity, usage: 19 }
    ],
    categories: [
      { id: 'all', name: 'All Reports', count: 6, color: 'gray' },
      { id: 'financial', name: 'Financial', count: 1, color: 'green' },
      { id: 'engagement', name: 'Engagement', count: 1, color: 'blue' },
      { id: 'ecommerce', name: 'E-commerce', count: 1, color: 'purple' },
      { id: 'marketing', name: 'Marketing', count: 1, color: 'pink' },
      { id: 'customers', name: 'Customers', count: 1, color: 'orange' },
      { id: 'technical', name: 'Technical', count: 1, color: 'cyan' }
    ],
    stats: {
      totalReports: 156,
      scheduledReports: 12,
      totalDownloads: 2347,
      avgGenerationTime: '2.3 min'
    }
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-400 bg-green-400/20',
      generating: 'text-blue-400 bg-blue-400/20',
      scheduled: 'text-orange-400 bg-orange-400/20',
      failed: 'text-red-400 bg-red-400/20'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/20';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      generating: RefreshCw,
      scheduled: Clock,
      failed: AlertTriangle
    };
    const Icon = icons[status] || Clock;
    return <Icon className={`w-4 h-4 ${status === 'generating' ? 'animate-spin' : ''}`} />;
  };

  const filteredReports = reportsData.recentReports.filter(report => {
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleGenerateReport = async (reportId) => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setReportsData(prev => ({
      ...prev,
      recentReports: prev.recentReports.map(report =>
        report.id === reportId
          ? { ...report, status: 'completed', lastGenerated: new Date().toISOString().split('T')[0] }
          : report
      )
    }));
    setIsGenerating(false);
  };

  const toggleReportStar = (reportId) => {
    setReportsData(prev => ({
      ...prev,
      recentReports: prev.recentReports.map(report =>
        report.id === reportId
          ? { ...report, isStarred: !report.isStarred }
          : report
      )
    }));
  };

  const handleCreateReport = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate report creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setReportsData(prev => ({
      ...prev,
      recentReports: [
        {
          id: prev.recentReports.length + 1,
          name: newReport.name,
          type: newReport.type,
          category: newReport.category,
          status: 'completed',
          lastGenerated: new Date().toISOString().split('T')[0],
          size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
          format: newReport.format,
          schedule: newReport.schedule,
          description: newReport.description,
          downloads: 0,
          isStarred: false,
          createdBy: 'User',
          nextRun: newReport.schedule !== 'One-time' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null
        },
        ...prev.recentReports
      ],
      categories: prev.categories.map(cat => 
        cat.id === newReport.category || cat.id === 'all'
          ? { ...cat, count: cat.count + 1 }
          : cat
      ),
      stats: {
        ...prev.stats,
        totalReports: prev.stats.totalReports + 1,
        scheduledReports: newReport.schedule !== 'One-time' ? prev.stats.scheduledReports + 1 : prev.stats.scheduledReports
      }
    }));
    
    setShowCreateModal(false);
    setNewReport({ name: '', type: '', category: 'financial', schedule: 'One-time', format: 'PDF', description: '' });
    setIsGenerating(false);
  };

  const ReportCard = ({ report }) => (
    <motion.div
      className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl bg-cyan-500/20`}>
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className={`font-semibold ${currentTheme.text} group-hover:text-cyan-400 transition-colors`}>
                {report.name}
              </h3>
              <p className={`text-sm ${currentTheme.textSecondary}`}>{report.type}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => toggleReportStar(report.id)}
              className={`p-1 rounded-lg transition-colors ${report.isStarred ? 'text-yellow-400' : currentTheme.textSecondary}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={report.isStarred ? 'Unstar report' : 'Star report'}
            >
              <Star className={`w-4 h-4 ${report.isStarred ? 'fill-current' : ''}`} />
            </motion.button>
            <motion.button
              className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2 mb-4">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${getStatusColor(report.status)}`}>
            {getStatusIcon(report.status)}
            <span className="text-xs font-medium capitalize">{report.status}</span>
          </div>
          <span className={`text-xs ${currentTheme.textSecondary}`}>
            {report.format} • {report.size}
          </span>
        </div>

        {/* Description */}
        <p className={`text-sm ${currentTheme.textSecondary} mb-4 line-clamp-2`}>
          {report.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className={currentTheme.textSecondary}>
            <Clock className="w-4 h-4 inline mr-1" />
            {report.lastGenerated}
          </div>
          <div className={currentTheme.textSecondary}>
            <Download className="w-4 h-4 inline mr-1" />
            {report.downloads}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => handleGenerateReport(report.id)}
            disabled={report.status === 'generating' || isGenerating}
            className={`flex-1 px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={report.status === 'generating' ? 'Generating report' : 'Generate report'}
          >
            {report.status === 'generating' ? (
              <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
            ) : (
              <PlayCircle className="w-4 h-4 inline mr-2" />
            )}
            {report.status === 'generating' ? 'Generating...' : 'Generate'}
          </motion.button>
          <motion.button
            className={`p-2 rounded-xl border ${currentTheme.border} ${currentTheme.hover} ${currentTheme.text}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Download report"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            className={`p-2 rounded-xl border ${currentTheme.border} ${currentTheme.hover} ${currentTheme.text}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Share report"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const ReportListItem = ({ report }) => (
    <motion.div
      className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 hover:scale-[1.02] transition-all duration-200 group`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`p-2 rounded-lg bg-cyan-500/20`}>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-medium ${currentTheme.text} group-hover:text-cyan-400 transition-colors`}>
                {report.name}
              </h3>
              <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-lg ${getStatusColor(report.status)}`}>
                {getStatusIcon(report.status)}
                <span className="text-xs font-medium capitalize">{report.status}</span>
              </div>
            </div>
            <p className={`text-sm ${currentTheme.textSecondary}`}>
              {report.type} • {report.format} • {report.size} • {report.downloads} downloads
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${currentTheme.textSecondary}`}>
            {report.lastGenerated}
          </span>
          <motion.button
            onClick={() => toggleReportStar(report.id)}
            className={`p-1 rounded-lg transition-colors ${report.isStarred ? 'text-yellow-400' : currentTheme.textSecondary}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={report.isStarred ? 'Unstar report' : 'Star report'}
          >
            <Star className={`w-4 h-4 ${report.isStarred ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Download report"
          >
            <Download className="w-4 h-4" />
          </motion.button>
          <motion.button
            className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-all duration-500`}>
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`${currentTheme.cardBg} border-b ${currentTheme.border} backdrop-blur-xl sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Reports</h1>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500/20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className={`text-xs text-green-400`}>
                    {reportsData.stats.scheduledReports} Scheduled
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 w-64 transition-all duration-200`}
                  aria-label="Search reports"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-600 overflow-hidden">
                {[
                  { mode: 'grid', icon: Grid },
                  { mode: 'list', icon: List }
                ].map(({ mode, icon: Icon }) => (
                  <motion.button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 transition-all duration-200 ${
                      viewMode === mode
                        ? 'bg-cyan-500 text-white'
                        : `${currentTheme.text} ${currentTheme.hover}`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Switch to ${mode} view`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                ))}
              </div>

              {/* Theme Selector */}
              <motion.select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`px-3 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select theme"
              >
                <option value="midnight">Midnight</option>
                <option value="dark">Dark Purple</option>
                <option value="ocean">Ocean Blue</option>
              </motion.select>

              {/* Create Report Button */}
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className={`px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Create new report"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Report
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create Report Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 w-full max-w-lg mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Create New Report</h2>
                <motion.button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <form onSubmit={handleCreateReport}>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Report Name</label>
                    <input
                      type="text"
                      value={newReport.name}
                      onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Enter report name"
                      required
                      aria-label="Report name"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Report Type</label>
                    <input
                      type="text"
                      value={newReport.type}
                      onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      placeholder="e.g., Revenue, Sales, Users"
                      required
                      aria-label="Report type"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Category</label>
                    <select
                      value={newReport.category}
                      onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Report category"
                    >
                      {reportsData.categories.filter(cat => cat.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Schedule</label>
                    <select
                      value={newReport.schedule}
                      onChange={(e) => setNewReport({ ...newReport, schedule: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Report schedule"
                    >
                      <option value="One-time">One-time</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Format</label>
                    <select
                      value={newReport.format}
                      onChange={(e) => setNewReport({ ...newReport, format: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Report format"
                    >
                      <option value="PDF">PDF</option>
                      <option value="Excel">Excel</option>
                      <option value="CSV">CSV</option>
                      <option value="JSON">JSON</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Description</label>
                    <textarea
                      value={newReport.description}
                      onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 resize-y`}
                      placeholder="Describe the report"
                      rows={3}
                      aria-label="Report description"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <motion.button
                    type="submit"
                    disabled={isGenerating}
                    className={`flex-1 px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Create report"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 inline mr-2" />
                    )}
                    {isGenerating ? 'Creating...' : 'Create Report'}
                  </motion.button>
                  <motion.button
                    onClick={() => setShowCreateModal(false)}
                    className={`px-4 py-2 rounded-xl border ${currentTheme.border} ${currentTheme.text} ${currentTheme.hover} transition-all duration-200`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Cancel"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${currentTheme.cardBg} border-b ${currentTheme.border} p-4 max-w-7xl mx-auto`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <select
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="generating">Generating</option>
                <option value="scheduled">Scheduled</option>
                <option value="failed">Failed</option>
              </select>
              <select
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Filter by format"
              >
                <option value="all">All Formats</option>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
                <option value="JSON">JSON</option>
              </select>
              <button
                className={`px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200`}
                aria-label="Apply filters"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: 'Total Reports', 
                value: reportsData.stats.totalReports, 
                icon: FileText, 
                color: 'blue',
                change: '+12%'
              },
              { 
                title: 'Scheduled Reports', 
                value: reportsData.stats.scheduledReports, 
                icon: Clock, 
                color: 'orange',
                change: '+5%'
              },
              { 
                title: 'Total Downloads', 
                value: reportsData.stats.totalDownloads, 
                icon: Download, 
                color: 'green',
                change: '+28%'
              },
              { 
                title: 'Avg Generation Time', 
                value: reportsData.stats.avgGenerationTime, 
                icon: Zap, 
                color: 'purple',
                change: '-15%'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/5 to-transparent`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                    <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                  </div>
                  <div className={`text-sm ${currentTheme.textSecondary} mb-1`}>{stat.title}</div>
                  <div className={`text-2xl font-bold ${currentTheme.text}`}>{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Categories & Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Categories */}
            <motion.div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Categories</h3>
              <div className="space-y-2">
                {reportsData.categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === category.id
                        ? `bg-${category.color}-500/20 border border-${category.color}-500/30`
                        : `${currentTheme.hover} border border-transparent`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Filter by ${category.name}`}
                  >
                    <span className={`text-sm font-medium ${currentTheme.text}`}>
                      {category.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg bg-${category.color}-500/20 text-${category.color}-400`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Templates */}
            <motion.div
              className={`lg:col-span-3 ${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Report Templates</h3>
                <motion.button
                  className={`px-4 py-2 rounded-xl border ${currentTheme.border} ${currentTheme.hover} ${currentTheme.text} text-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="View all templates"
                >
                  View All
                </motion.button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportsData.templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-200 group cursor-pointer`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <template.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${currentTheme.text} group-hover:text-cyan-400 transition-colors`}>
                          {template.name}
                        </h4>
                        <p className={`text-xs ${currentTheme.textSecondary} capitalize`}>
                          {template.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${currentTheme.textSecondary}`}>
                        Used {template.usage} times
                      </span>
                      <motion.button
                        onClick={() => {
                          setNewReport({
                            ...newReport,
                            name: `${template.name} Report`,
                            type: template.category.charAt(0).toUpperCase() + template.category.slice(1),
                            category: template.category
                          });
                          setShowCreateModal(true);
                        }}
                        className={`px-3 py-1 text-xs rounded-lg ${currentTheme.accent} text-white hover:opacity-90 transition-all duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Create report from ${template.name} template`}
                      >
                        Use Template
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Reports */}
          <motion.div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Recent Reports</h3>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} relative group`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Toggle filters"
                >
                  <Filter className="w-5 h-5" />
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-cyan-500/30">
                    Filters
                  </span>
                </motion.button>
                <motion.button
                  className={`px-4 py-2 rounded-xl border ${currentTheme.border} ${currentTheme.text} ${currentTheme.hover} text-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Export selected reports"
                  disabled={selectedReports.length === 0}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Selected ({selectedReports.length})
                </motion.button>
              </div>
            </div>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  viewMode === 'grid' ? (
                    <ReportCard key={report.id} report={report} />
                  ) : (
                    <ReportListItem key={report.id} report={report} />
                  )
                ))
              ) : (
                <div className={`text-center py-8 ${currentTheme.textSecondary}`}>
                  No reports found matching your criteria.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
