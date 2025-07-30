"use client"
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Activity, 
  Calendar, Bell, Search, Filter, MoreVertical, ArrowUp, ArrowDown,
  Eye, Download, RefreshCw, Star, Target, Clock, CheckCircle,
  PieChart, LineChart, Zap, Globe, Shield, Phone, Mail, Menu, X,
  Sun, Moon, Palette, Settings, Plus, Edit3, Trash2, Send
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [theme, setTheme] = useState('midnight');
  const [accentColor, setAccentColor] = useState('cyan');
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [stats, setStats] = useState([
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald',
      data: [45, 52, 38, 67, 73, 82, 91]
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      data: [12, 19, 15, 25, 32, 28, 35]
    },
    {
      title: 'Orders',
      value: '1,423',
      change: '-2.4%',
      trend: 'down',
      icon: ShoppingCart,
      color: 'orange',
      data: [8, 12, 7, 15, 9, 11, 13]
    },
    {
      title: 'Conversion Rate',
      value: '3.21%',
      change: '+0.8%',
      trend: 'up',
      icon: Target,
      color: 'purple',
      data: [3.1, 3.3, 2.9, 3.5, 3.2, 3.4, 3.6]
    }
  ]);

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
    },
    forest: {
      bg: 'bg-gradient-to-br from-emerald-950 via-green-900 to-teal-800',
      cardBg: 'bg-green-900/70 backdrop-blur-xl border-emerald-400/20',
      text: 'text-white',
      textMuted: 'text-emerald-200',
      textSecondary: 'text-emerald-300',
      border: 'border-emerald-400/20',
      hover: 'hover:bg-emerald-800/30',
      accent: 'bg-gradient-to-r from-emerald-400 to-green-500'
    }
  };

  const currentTheme = themes[theme];

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          data: [...stat.data.slice(1), Math.floor(Math.random() * 50) + 20]
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New order received', user: 'John Doe', time: '2 min ago', type: 'order', avatar: '👨‍💼' },
    { id: 2, action: 'User registered', user: 'Jane Smith', time: '5 min ago', type: 'user', avatar: '👩‍💻' },
    { id: 3, action: 'Payment processed', user: 'Mike Johnson', time: '10 min ago', type: 'payment', avatar: '👨‍🔧' },
    { id: 4, action: 'Product reviewed', user: 'Sarah Wilson', time: '15 min ago', type: 'review', avatar: '👩‍🎨' },
    { id: 5, action: 'Support ticket created', user: 'Tom Brown', time: '20 min ago', type: 'support', avatar: '👨‍💼' }
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: 'E-commerce Platform', progress: 85, status: 'active', team: 5, deadline: '2 days', priority: 'high' },
    { id: 2, name: 'Mobile App Redesign', progress: 60, status: 'active', team: 3, deadline: '1 week', priority: 'medium' },
    { id: 3, name: 'API Integration', progress: 95, status: 'review', team: 2, deadline: 'Today', priority: 'high' },
    { id: 4, name: 'Database Migration', progress: 40, status: 'planning', team: 4, deadline: '2 weeks', priority: 'low' }
  ]);

  const [notifications] = useState([
    { id: 1, title: 'New Order Alert', message: 'Order #12345 requires attention', time: '5 min ago', type: 'order' },
    { id: 2, title: 'System Update', message: 'Scheduled maintenance tonight', time: '1 hour ago', type: 'system' },
    { id: 3, title: 'Team Meeting', message: 'Daily standup in 30 minutes', time: '2 hours ago', type: 'meeting' }
  ]);

  // Working functions
  const handleRefreshData = () => {
    setStats(prevStats => 
      prevStats.map(stat => ({
        ...stat,
        value: stat.title === 'Total Revenue' ? `$${Math.floor(Math.random() * 200000) + 100000}` :
               stat.title === 'Active Users' ? `${Math.floor(Math.random() * 10000) + 5000}` :
               stat.title === 'Orders' ? `${Math.floor(Math.random() * 2000) + 1000}` :
               `${(Math.random() * 5 + 1).toFixed(2)}%`,
        change: `${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 15 + 1).toFixed(1)}%`,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }))
    );
  };

  const updateProjectProgress = (id, newProgress) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id ? { ...project, progress: Math.min(100, newProgress) } : project
      )
    );
  };

  const MiniChart = ({ data, color }) => (
    <div className="flex items-end space-x-1 h-12 w-20">
      {data.map((point, index) => (
        <div
          key={index}
          className={`bg-${color}-500 rounded-t opacity-70 hover:opacity-100 transition-all duration-300`}
          style={{
            height: `${(point / Math.max(...data)) * 100}%`,
            width: '8px'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-all duration-500`}>
      
      {/* Enhanced Header */}
      <div className={`${currentTheme.cardBg} border-b ${currentTheme.border} backdrop-blur-xl sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 lg:hidden`}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Dashboard</h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Working Search */}
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
                >
                  <Search className="w-5 h-5" />
                </button>
                {showSearch && (
                  <div className={`absolute top-full right-0 mt-2 w-80 ${currentTheme.cardBg} rounded-2xl border ${currentTheme.border} p-4 shadow-2xl z-50`}>
                    <input
                      type="text"
                      placeholder="Search projects, users, orders..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-2 bg-transparent border ${currentTheme.border} rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Working Theme Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowThemePanel(!showThemePanel)}
                  className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200`}
                >
                  <Palette className="w-5 h-5" />
                </button>
                {showThemePanel && (
                  <div className={`absolute top-full right-0 mt-2 w-64 ${currentTheme.cardBg} rounded-2xl border ${currentTheme.border} p-4 shadow-2xl z-50`}>
                    <h3 className={`text-sm font-semibold ${currentTheme.text} mb-3`}>Choose Theme</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(themes).map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => setTheme(themeName)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                            theme === themeName ? 'border-cyan-500' : currentTheme.border
                          } ${currentTheme.hover}`}
                        >
                          <div className={`w-full h-6 rounded-lg ${themes[themeName].accent} mb-2`}></div>
                          <span className={`text-xs font-medium ${currentTheme.text} capitalize`}>{themeName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Working Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 relative`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                </button>
                {showNotifications && (
                  <div className={`absolute top-full right-0 mt-2 w-80 ${currentTheme.cardBg} rounded-2xl border ${currentTheme.border} shadow-2xl z-50`}>
                    <div className="p-4 border-b border-gray-700">
                      <h3 className={`font-semibold ${currentTheme.text}`}>Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-700 last:border-0 ${currentTheme.hover} transition-colors`}>
                          <h4 className={`font-medium ${currentTheme.text} text-sm`}>{notification.title}</h4>
                          <p className={`text-sm ${currentTheme.textSecondary} mt-1`}>{notification.message}</p>
                          <span className={`text-xs ${currentTheme.textSecondary} mt-2 block`}>{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleRefreshData}
                className={`p-2 rounded-xl ${currentTheme.hover} ${currentTheme.text} transition-all duration-200 hover:rotate-180`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Stats Grid with Mini Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-${stat.color}-500/20 backdrop-blur-sm`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <MiniChart data={stat.data} color={stat.color} />
                  </div>
                  
                  <div className="space-y-2">
                    <p className={`text-sm font-medium ${currentTheme.textMuted}`}>{stat.title}</p>
                    <p className={`text-2xl font-bold ${currentTheme.text}`}>{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      {stat.trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stat.change}
                      </span>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>vs last period</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            
            {/* Enhanced Chart Section */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Interactive Chart Area */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Revenue Analytics</h3>
                    <p className={`text-sm ${currentTheme.textSecondary}`}>Real-time revenue tracking</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className={`px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 ${currentTheme.text} text-sm focus:ring-2 focus:ring-cyan-500`}
                    >
                      <option value="24h">24 Hours</option>
                      <option value="7d">7 Days</option>
                      <option value="30d">30 Days</option>
                    </select>
                  </div>
                </div>
                
                {/* Interactive Chart Visualization */}
                <div className="h-64 rounded-xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5"></div>
                  <div className="text-center z-10">
                    <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-cyan-400 font-medium">Live Analytics Dashboard</p>
                    <p className="text-sm text-cyan-300 mt-1">Revenue: {selectedTimeframe}</p>
                  </div>
                  
                  {/* Animated Elements */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-cyan-400 rounded-t opacity-60 animate-pulse"
                        style={{
                          height: `${Math.random() * 60 + 20}px`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Interactive Projects */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Active Projects</h3>
                  <button className={`px-4 py-2 ${currentTheme.accent} text-white rounded-lg hover:scale-105 transition-all duration-200 text-sm font-medium`}>
                    <Plus className="w-4 h-4 inline mr-2" />
                    New Project
                  </button>
                </div>
                
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className={`p-4 rounded-xl border ${currentTheme.border} bg-gradient-to-r from-gray-800/50 to-transparent hover:from-gray-700/50 transition-all duration-300 group`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className={`font-medium ${currentTheme.text}`}>{project.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              project.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {project.priority}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`text-sm ${currentTheme.textSecondary}`}>
                              {project.team} members
                            </span>
                            <span className={`text-sm ${currentTheme.textSecondary}`}>
                              Due: {project.deadline}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <button 
                            onClick={() => updateProjectProgress(project.id, project.progress + 5)}
                            className={`p-2 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button className={`p-2 rounded-lg ${currentTheme.hover} text-blue-400`}>
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${currentTheme.accent} rounded-full transition-all duration-500`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${currentTheme.text} min-w-[3rem]`}>
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              
              {/* Interactive Quick Actions */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, label: 'Add User', color: 'blue', action: () => alert('Add User clicked!') },
                    { icon: ShoppingCart, label: 'New Order', color: 'green', action: () => alert('New Order clicked!') },
                    { icon: BarChart3, label: 'Reports', color: 'purple', action: () => alert('Reports clicked!') },
                    { icon: Calendar, label: 'Schedule', color: 'orange', action: () => alert('Schedule clicked!') }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-600 hover:border-${action.color}-500 transition-all duration-200 group hover:scale-105 ${currentTheme.hover}`}
                    >
                      <action.icon className={`w-6 h-6 text-${action.color}-400 mb-2 group-hover:scale-110 transition-transform`} />
                      <span className={`text-sm font-medium ${currentTheme.text}`}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Live Activity</h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className={`flex items-start space-x-3 p-3 rounded-lg ${currentTheme.hover} transition-all duration-200 hover:scale-105`}>
                      <div className="text-2xl">{activity.avatar}</div>
                      <div className="flex-1">
                        <p className={`text-sm ${currentTheme.text} font-medium`}>{activity.action}</p>
                        <p className={`text-sm ${currentTheme.textSecondary}`}>by {activity.user}</p>
                        <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>{activity.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'order' ? 'bg-green-400' :
                        activity.type === 'user' ? 'bg-blue-400' :
                        activity.type === 'payment' ? 'bg-yellow-400' :
                        activity.type === 'review' ? 'bg-purple-400' :
                        'bg-red-400'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Status with Real Updates */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${currentTheme.text}`}>System Status</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>All Systems Operational</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { service: 'API Gateway', status: 'operational', uptime: '99.9%', response: '45ms' },
                    { service: 'Database', status: 'operational', uptime: '99.8%', response: '12ms' },
                    { service: 'CDN', status: 'operational', uptime: '100%', response: '8ms' },
                    { service: 'Auth Service', status: 'maintenance', uptime: '99.5%', response: '67ms' }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${currentTheme.hover} transition-all duration-200`}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'operational' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                        }`}></div>
                        <span className={`text-sm ${currentTheme.text}`}>{item.service}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${currentTheme.text}`}>{item.uptime}</div>
                        <div className={`text-xs ${currentTheme.textSecondary}`}>{item.response}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;