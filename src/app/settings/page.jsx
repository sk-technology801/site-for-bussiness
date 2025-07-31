
"use client";
import React, { useState } from 'react';
import { SettingsIcon, Palette, Bell, User, Save, Search, Menu, X } from 'lucide-react';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('midnight');
  const [accentColor, setAccentColor] = useState('cyan');
  const [showThemePanel, setShowThemePanel] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    inApp: true,
  });
  const [profileSettings, setProfileSettings] = useState({
    displayName: 'Admin User',
    email: 'admin@example.com',
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

  const accentColors = ['cyan', 'purple', 'emerald', 'blue'];

  const currentTheme = themes[theme];

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleNotificationChange = (key) => {
    setNotificationSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileChange = (key, value) => {
    setProfileSettings((prev) => ({ ...prev, [key]: value }));
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
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Settings</h1>
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
                      placeholder="Search settings..."
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
            {/* Settings Sections */}
            <div className="xl:col-span-2 space-y-6">
              {/* Theme Settings */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${currentTheme.textMuted}`}>Theme</label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {Object.keys(themes).map((themeName) => (
                        <button
                          key={themeName}
                          onClick={() => setTheme(themeName)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                            theme === themeName ? 'border-cyan-500' : currentTheme.border
                          } ${currentTheme.hover} text-left`}
                        >
                          <div className={`w-full h-6 rounded-lg ${themes[themeName].accent} mb-2`}></div>
                          <span className={`text-sm font-medium ${currentTheme.text} capitalize`}>{themeName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${currentTheme.textMuted}`}>Accent Color</label>
                    <div className="flex space-x-2 mt-2">
                      {accentColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setAccentColor(color)}
                          className={`w-8 h-8 rounded-full bg-${color}-500 border-2 ${
                            accentColor === color ? 'border-cyan-300' : 'border-transparent'
                          } hover:scale-110 transition-all duration-200`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email}
                      onChange={() => handleNotificationChange('email')}
                      className="h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500 bg-gray-700 border-gray-600"
                    />
                    <span className={`text-sm ${currentTheme.text}`}>Email Notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.push}
                      onChange={() => handleNotificationChange('push')}
                      className="h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500 bg-gray-700 border-gray-600"
                    />
                    <span className={`text-sm ${currentTheme.text}`}>Push Notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={notificationSettings.inApp}
                      onChange={() => handleNotificationChange('inApp')}
                      className="h-5 w-5 text-cyan-500 rounded focus:ring-cyan-500 bg-gray-700 border-gray-600"
                    />
                    <span className={`text-sm ${currentTheme.text}`}>In-App Notifications</span>
                  </label>
                </div>
              </div>

              {/* Profile Settings */}
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm font-medium ${currentTheme.textMuted}`}>Display Name</label>
                    <input
                      type="text"
                      value={profileSettings.displayName}
                      onChange={(e) => handleProfileChange('displayName', e.target.value)}
                      className={`w-full px-4 py-2 mt-2 bg-transparent border ${currentTheme.border} rounded-xl ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-medium ${currentTheme.textMuted}`}>Email</label>
                    <input
                      type="email"
                      value={profileSettings.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className={`w-full px-4 py-2 mt-2 bg-transparent border ${currentTheme.border} rounded-xl ${currentTheme.text} focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar with

 Quick Actions */}
            <div className="space-y-6">
              <div className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text}`}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Save, label: 'Save Settings', color: 'blue', action: handleSaveSettings },
                    { icon: User, label: 'Update Profile', color: 'green', action: () => alert('Update Profile clicked!') },
                    { icon: Bell, label: 'Test Notification', color: 'purple', action: () => alert('Test Notification sent!') },
                    { icon: Palette, label: 'Reset Theme', color: 'orange', action: () => setTheme('midnight') }
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

export default Settings;
