"use client";
import React, { useState } from 'react';
import { Users, Plus, Edit3, Trash2, Search, Palette, Menu, X } from 'lucide-react';

const Team = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('midnight');
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Frontend Developer', avatar: '👨‍💼', projects: 3, status: 'active', email: 'john@example.com', performance: 92 },
    { id: 2, name: 'Jane Smith', role: 'Backend Developer', avatar: '👩‍💻', projects: 2, status: 'active', email: 'jane@example.com', performance: 88 },
    { id: 3, name: 'Mike Johnson', role: 'Designer', avatar: '👨‍🎨', projects: 1, status: 'on leave', email: 'mike@example.com', performance: 85 },
    { id: 4, name: 'Sarah Wilson', role: 'Project Manager', avatar: '👩‍💼', projects: 4, status: 'active', email: 'sarah@example.com', performance: 95 },
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

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMember = () => {
    alert('Add Team Member clicked!');
  };

  const handleEditMember = (id) => {
    alert(`Edit Team Member ${id} clicked!`);
  };

  const handleDeleteMember = (id) => {
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-all duration-500`}>
      {/* Header */}
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
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Team Management</h1>
            </div>

            <div className="flex items-center space-x-3">
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
                      placeholder="Search team members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-2 bg-transparent border ${currentTheme.border} rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                      autoFocus
                    />
                  </div>
                )}
              </div>

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
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Team Members Section */}
            <div className="xl:col-span-2">
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Team Members</h3>
                  <button
                    onClick={handleAddMember}
                    className={`px-4 py-2 ${currentTheme.accent} text-white rounded-lg hover:scale-105 transition-all duration-200 text-sm font-medium`}
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Member
                  </button>
                </div>
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg ${currentTheme.hover} transition-all duration-200 hover:scale-105 bg-gradient-to-r from-gray-800/50 to-transparent`}
                    >
                      <div className="text-3xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium ${currentTheme.text}`}>{member.name}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                        <p className={`text-sm ${currentTheme.textSecondary}`}>{member.role}</p>
                        <p className={`text-xs ${currentTheme.textSecondary} mt-1`}>{member.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`text-xs ${currentTheme.textSecondary}`}>{member.projects} projects</span>
                          <span className={`text-xs ${currentTheme.textSecondary}`}>Performance: {member.performance}%</span>
                        </div>
                        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${currentTheme.accent} rounded-full transition-all duration-500`}
                            style={{ width: `${member.performance}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditMember(member.id)}
                          className={`p-2 rounded-lg ${currentTheme.hover} text-blue-400`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className={`p-2 rounded-lg ${currentTheme.hover} text-red-400`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar with Quick Actions */}
            <div className="space-y-6">
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Users, label: 'Add User', color: 'blue', action: () => alert('Add User clicked!') },
                    { icon: Edit3, label: 'Edit Roles', color: 'green', action: () => alert('Edit Roles clicked!') },
                    { icon: Trash2, label: 'Remove User', color: 'red', action: () => alert('Remove User clicked!') },
                    { icon: Search, label: 'View Reports', color: 'purple', action: () => alert('View Reports clicked!') }
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;