
"use client";
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Activity, 
  Calendar, Bell, Search, Filter, MoreVertical, ArrowUp, ArrowDown, Eye, Download, 
  RefreshCw, Star, Target, Clock, CheckCircle, PieChart, LineChart, Zap, Globe, 
  Shield, Phone, Mail, Menu, X, Sun, Moon, Palette, Settings, Plus, Edit3, 
  Trash2, Send, MapPin, Smartphone, Monitor, Tablet, AlertTriangle, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalyticsPage = () => {
  const [theme, setTheme] = useState('midnight');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [showFilters, setShowFilters] = useState(false);
  const [realTimeData, setRealTimeData] = useState(true);
  const [selectedChart, setSelectedChart] = useState('line');

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

  // Analytics Data
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: { value: 2847590, change: 12.5, trend: 'up' },
      totalUsers: { value: 45632, change: 8.2, trend: 'up' },
      conversionRate: { value: 3.47, change: -2.1, trend: 'down' },
      avgOrderValue: { value: 127.45, change: 15.3, trend: 'up' },
      bounceRate: { value: 32.1, change: -5.2, trend: 'up' },
      pageViews: { value: 1234567, change: 23.1, trend: 'up' }
    },
    revenueData: [
      { month: 'Jan', revenue: 45000, users: 1200, orders: 450 },
      { month: 'Feb', revenue: 52000, users: 1350, orders: 520 },
      { month: 'Mar', revenue: 48000, users: 1180, orders: 480 },
      { month: 'Apr', revenue: 61000, users: 1420, orders: 610 },
      { month: 'May', revenue: 55000, users: 1380, orders: 550 },
      { month: 'Jun', revenue: 67000, users: 1520, orders: 670 },
      { month: 'Jul', revenue: 72000, users: 1650, orders: 720 }
    ],
    deviceData: [
      { device: 'Desktop', users: 18500, percentage: 40.5, color: 'cyan' },
      { device: 'Mobile', users: 22800, percentage: 50.1, color: 'blue' },
      { device: 'Tablet', users: 4332, percentage: 9.4, color: 'purple' }
    ],
    trafficSources: [
      { source: 'Organic Search', visitors: 15420, percentage: 33.8, color: 'green' },
      { source: 'Direct', visitors: 12340, percentage: 27.1, color: 'blue' },
      { source: 'Social Media', visitors: 8760, percentage: 19.2, color: 'pink' },
      { source: 'Paid Ads', visitors: 5670, percentage: 12.4, color: 'orange' },
      { source: 'Email', visitors: 3442, percentage: 7.5, color: 'purple' }
    ],
    topPages: [
      { page: '/dashboard', views: 234567, bounceRate: 25.3, avgTime: '3:45' },
      { page: '/products', views: 189432, bounceRate: 31.2, avgTime: '2:58' },
      { page: '/analytics', views: 156789, bounceRate: 28.7, avgTime: '4:12' },
      { page: '/settings', views: 123456, bounceRate: 35.1, avgTime: '2:23' },
      { page: '/profile', views: 98765, bounceRate: 29.8, avgTime: '1:56' }
    ],
    realtimeData: {
      activeUsers: 1247,
      currentSessions: 892,
      pageViewsPerMinute: 156,
      conversionEvents: 23
    }
  });

  // Real-time updates
  useEffect(() => {
    if (realTimeData) {
      const interval = setInterval(() => {
        setAnalyticsData(prev => ({
          ...prev,
          realtimeData: {
            activeUsers: Math.floor(Math.random() * 500) + 1000,
            currentSessions: Math.floor(Math.random() * 300) + 700,
            pageViewsPerMinute: Math.floor(Math.random() * 50) + 120,
            conversionEvents: Math.floor(Math.random() * 20) + 15
          }
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [realTimeData]);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(num);
  };

  const InteractiveChart = ({ data, type, color }) => {
    return (
      <div className="h-64 relative">
        {type === 'line' && (
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {data.map((point, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-3 h-3 bg-${color}-400 rounded-full opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200`}></div>
                <div
                  className={`w-1 bg-gradient-to-t from-${color}-500 to-${color}-300 rounded-t transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
                  style={{ height: `${(point.revenue / Math.max(...data.map(d => d.revenue))) * 200}px` }}
                ></div>
                <span className={`text-xs ${currentTheme.textSecondary} group-hover:${currentTheme.text} transition-colors`}>
                  {point.month}
                </span>
              </motion.div>
            ))}
          </div>
        )}
        
        {type === 'bar' && (
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8 space-x-2">
            {data.map((point, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2 flex-1 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`w-full bg-gradient-to-t from-${color}-600 to-${color}-400 rounded-t hover:from-${color}-500 hover:to-${color}-300 transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]`}
                  style={{ height: `${(point.revenue / Math.max(...data.map(d => d.revenue))) * 200}px` }}
                ></div>
                <span className={`text-xs ${currentTheme.textSecondary} group-hover:${currentTheme.text} transition-colors`}>
                  {point.month}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {type === 'area' && (
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 400 250">
              <defs>
                <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" className={`text-${color}-400`} stopColor="currentColor" stopOpacity="0.6"/>
                  <stop offset="100%" className={`text-${color}-600`} stopColor="currentColor" stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                d={`M 50,200 L 100,150 L 150,180 L 200,120 L 250,140 L 300,100 L 350,80 L 350,220 L 50,220 Z`}
                fill={`url(#gradient-${color})`}
                className="transition-all duration-500"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.2 }}
                d={`M 50,200 L 100,150 L 150,180 L 200,120 L 250,140 L 300,100 L 350,80`}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className={`text-${color}-400`}
              />
              {[50, 100, 150, 200, 250, 300, 350].map((x, i) => (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={[200, 150, 180, 120, 140, 100, 80][i]}
                  r="4"
                  fill="currentColor"
                  className={`text-${color}-400 hover:text-${color}-300 cursor-pointer transition-colors`}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
              ))}
            </svg>
          </div>
        )}
      </div>
    );
  };

  const DonutChart = ({ data, size = 200 }) => {
    let cumulativePercentage = 0;
    const radius = size / 2 - 20;
    const circumference = 2 * Math.PI * radius;

    return (
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            className="text-gray-700"
          />
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage * circumference / 100;
            cumulativePercentage += item.percentage;
            
            return (
              <motion.circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`text-${item.color}-400 hover:text-${item.color}-300 transition-colors cursor-pointer`}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${currentTheme.text}`}>
              {formatNumber(data.reduce((sum, item) => sum + item.users, 0))}
            </div>
            <div className={`text-sm ${currentTheme.textSecondary}`}>Total Users</div>
          </div>
        </div>
      </motion.div>
    );
  };

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
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Analytics Dashboard</h1>
              <div className="flex items-center space-x-2">
                {realTimeData && (
                  <motion.div
                    className="flex items-center space-x-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>Live</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Selector */}
              <motion.select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`px-3 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select Theme"
              >
                <option value="midnight">Midnight</option>
                <option value="dark">Dark Purple</option>
                <option value="ocean">Ocean Blue</option>
              </motion.select>

              {/* Date Range Selector */}
              <motion.select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Select Date Range"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </motion.select>

              {/* Filters */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 relative group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Filters"
              >
                <Filter className="w-5 h-5" />
                <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-cyan-500/30">
                  Filters
                </span>
              </motion.button>

              {/* Real-time Toggle */}
              <motion.button
                onClick={() => setRealTimeData(!realTimeData)}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 ${
                  realTimeData 
                    ? 'bg-green-500 border-green-400 text-white' 
                    : `${currentTheme.border} ${currentTheme.text} ${currentTheme.hover}`
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Real-time Data"
              >
                <Activity className="w-4 h-4 inline mr-2" />
                Real-time
              </motion.button>

              {/* Export */}
              <motion.button
                className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 relative group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Export Data"
              >
                <Download className="w-5 h-5" />
                <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-cyan-500/30">
                  Export
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

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
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Select Metric"
              >
                <option value="revenue">Revenue</option>
                <option value="users">Users</option>
                <option value="orders">Orders</option>
                <option value="conversion">Conversion Rate</option>
              </select>
              <input
                type="text"
                placeholder="Search metrics..."
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Search Metrics"
              />
              <button
                className={`px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200`}
                aria-label="Apply Filters"
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
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { 
                title: 'Total Revenue', 
                value: formatCurrency(analyticsData.overview.totalRevenue.value), 
                change: analyticsData.overview.totalRevenue.change,
                trend: analyticsData.overview.totalRevenue.trend,
                icon: DollarSign, 
                color: 'emerald' 
              },
              { 
                title: 'Total Users', 
                value: formatNumber(analyticsData.overview.totalUsers.value), 
                change: analyticsData.overview.totalUsers.change,
                trend: analyticsData.overview.totalUsers.trend,
                icon: Users, 
                color: 'blue' 
              },
              { 
                title: 'Conversion Rate', 
                value: `${analyticsData.overview.conversionRate.value}%`, 
                change: analyticsData.overview.conversionRate.change,
                trend: analyticsData.overview.conversionRate.trend,
                icon: Target, 
                color: 'purple' 
              },
              { 
                title: 'Avg Order Value', 
                value: formatCurrency(analyticsData.overview.avgOrderValue.value), 
                change: analyticsData.overview.avgOrderValue.change,
                trend: analyticsData.overview.avgOrderValue.trend,
                icon: ShoppingCart, 
                color: 'orange' 
              },
              { 
                title: 'Bounce Rate', 
                value: `${analyticsData.overview.bounceRate.value}%`, 
                change: analyticsData.overview.bounceRate.change,
                trend: analyticsData.overview.bounceRate.trend,
                icon: TrendingDown, 
                color: 'red' 
              },
              { 
                title: 'Page Views', 
                value: formatNumber(analyticsData.overview.pageViews.value), 
                change: analyticsData.overview.pageViews.change,
                trend: analyticsData.overview.pageViews.trend,
                icon: Eye, 
                color: 'cyan' 
              }
            ].map((metric, index) => (
              <motion.div
                key={index}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${metric.color}-500/5 to-transparent`}></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${metric.color}-500/20`}>
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs font-medium ${
                        metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm ${currentTheme.textSecondary} mb-1`}>{metric.title}</div>
                  <div className={`text-xl font-bold ${currentTheme.text}`}>{metric.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Main Revenue Chart */}
            <motion.div
              className="xl:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Revenue Trends</h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>Monthly performance analysis</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex rounded-lg border border-gray-600 overflow-hidden">
                      {['line', 'bar', 'area'].map((chartType) => (
                        <motion.button
                          key={chartType}
                          onClick={() => setSelectedChart(chartType)}
                          className={`px-3 py-1 text-sm capitalize transition-all duration-200 ${
                            selectedChart === chartType
                              ? 'bg-cyan-500 text-white'
                              : `${currentTheme.text} ${currentTheme.hover}`
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {chartType}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <InteractiveChart 
                  data={analyticsData.revenueData} 
                  type={selectedChart} 
                  color="cyan" 
                />
                
                {/* Chart Legend */}
                <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Orders</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Users</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Device Analytics & Real-time Metrics */}
            <div className="space-y-6">
              <motion.div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>Device Analytics</h3>
                <div className="flex items-center justify-center mb-6">
                  <DonutChart data={analyticsData.deviceData} />
                </div>
                <div className="space-y-3">
                  {analyticsData.deviceData.map((device, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${device.color}-400`}></div>
                        <span className={`text-sm ${currentTheme.text}`}>
                          {device.device === 'Desktop' && <Monitor className="w-4 h-4 inline mr-1" />}
                          {device.device === 'Mobile' && <Smartphone className="w-4 h-4 inline mr-1" />}
                          {device.device === 'Tablet' && <Tablet className="w-4 h-4 inline mr-1" />}
                          {device.device}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${currentTheme.text}`}>
                          {formatNumber(device.users)}
                        </div>
                        <div className={`text-xs ${currentTheme.textSecondary}`}>
                          {device.percentage}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Real-time Activity</h3>
                  <motion.div
                    className="flex items-center space-x-1"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>Live</span>
                  </motion.div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Active Users', value: analyticsData.realtimeData.activeUsers, icon: Users, color: 'green' },
                    { label: 'Current Sessions', value: analyticsData.realtimeData.currentSessions, icon: Activity, color: 'blue' },
                    { label: 'Views/min', value: analyticsData.realtimeData.pageViewsPerMinute, icon: Eye, color: 'purple' },
                    { label: 'Conversions', value: analyticsData.realtimeData.conversionEvents, icon: Target, color: 'orange' }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${currentTheme.hover} transition-all duration-200`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${metric.color}-500/20`}>
                          <metric.icon className={`w-4 h-4 text-${metric.color}-400`} />
                        </div>
                        <span className={`text-sm ${currentTheme.text}`}>{metric.label}</span>
                      </div>
                      <span className={`text-lg font-bold ${currentTheme.text}`}>
                        {formatNumber(metric.value)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traffic Sources */}
            <motion.div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>Traffic Sources</h3>
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-200 group`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${currentTheme.text}`}>{source.source}</span>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>
                        {formatNumber(source.visitors)} visitors
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-${source.color}-500 rounded-full transition-all duration-500 group-hover:bg-${source.color}-400`}
                          style={{ width: `${source.percentage}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${source.percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${currentTheme.text} min-w-[3rem]`}>
                        {source.percentage}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Pages */}
            <motion.div
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-6`}>Top Performing Pages</h3>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-200 group relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
                    <div className="relative z-10 flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <motion.a
                          href={page.page}
                          className={`font-medium ${currentTheme.text} hover:text-cyan-400 transition-colors duration-200`}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {page.page}
                        </motion.a>
                        <motion.button
                          className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="More options"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>
                        {formatNumber(page.views)} views
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                          <span className={`text-xs ${currentTheme.textSecondary}`}>
                            {page.avgTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingDown className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                          <span className={`text-xs ${currentTheme.textSecondary}`}>
                            {page.bounceRate}%
                          </span>
                        </div>
                      </div>
                      <motion.button
                        className={`px-3 py-1 text-sm rounded-lg ${currentTheme.accent} text-white hover:opacity-90 transition-all duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Details"
                      >
                        Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
