"use client"
import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Search, Bell, User, Home, BarChart3, Briefcase, Users, Settings, 
  ChevronDown, Globe, Sun, Moon, Monitor, Palette, Zap, Shield 
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('blue');
  const [showThemePanel, setShowThemePanel] = useState(false);

  const themes = {
    light: {
      bg: 'bg-white/95 backdrop-blur-md',
      scrollBg: 'bg-white/90 backdrop-blur-lg',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      border: 'border-gray-200',
      hover: 'hover:bg-gray-50',
      shadow: 'shadow-sm'
    },
    dark: {
      bg: 'bg-gray-900/95 backdrop-blur-md',
      scrollBg: 'bg-gray-900/90 backdrop-blur-lg',
      text: 'text-white',
      textMuted: 'text-gray-300',
      border: 'border-gray-700',
      hover: 'hover:bg-gray-800',
      shadow: 'shadow-2xl shadow-black/20'
    },
    midnight: {
      bg: 'bg-slate-950/95 backdrop-blur-md',
      scrollBg: 'bg-slate-950/90 backdrop-blur-lg',
      text: 'text-white',
      textMuted: 'text-slate-300',
      border: 'border-slate-700',
      hover: 'hover:bg-slate-800',
      shadow: 'shadow-2xl shadow-black/40'
    }
  };

  const accentColors = {
    blue: 'text-blue-500 bg-blue-500',
    purple: 'text-purple-500 bg-purple-500',
    green: 'text-emerald-500 bg-emerald-500',
    orange: 'text-orange-500 bg-orange-500',
    pink: 'text-pink-500 bg-pink-500',
    red: 'text-red-500 bg-red-500'
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { 
      name: 'Analytics', 
      href: '/analytics', 
      icon: BarChart3,
      badge: '2',
      dropdown: [
        { name: 'Overview', href: '/analytics', description: 'Main dashboard view' },
        { name: 'Reports', href: '/analytics/reports', description: 'Detailed reports' },
       
      ]
    },
    { 
      name: 'Projects', 
      href: '/projects', 
      icon: Briefcase,
      dropdown: [
        { name: 'All Projects', href: '/projects', description: 'View all projects' },
        { name: 'Active', href: '/projects/active', description: 'Currently active' },
        { name: 'Archived', href: '/projects/archived', description: 'Completed projects' }
      ]
    },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const NavLink = ({ href, children, className = '', onClick }) => (
    <a
      href={href}
      className={`transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </a>
  );

  const getThemeIcon = () => {
    switch(theme) {
      case 'dark': return Moon;
      case 'midnight': return Shield;
      default: return Sun;
    }
  };

  const ThemeIcon = getThemeIcon();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? `${currentTheme.scrollBg} border-b ${currentTheme.border} ${currentTheme.shadow}` 
        : `${currentTheme.bg}`
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <NavLink href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className={`w-10 h-10 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg`}>
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 ${theme === 'light' ? 'border-white' : 'border-gray-900'}`}></div>
            </div>
            <div>
              <span className={`text-xl font-bold ${currentTheme.text} tracking-tight`}>ModernApp</span>
              <div className={`text-xs ${currentTheme.textMuted} font-medium`}>Pro Version</div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => item.dropdown ? setActiveDropdown(activeDropdown === index ? null : index) : null}
                  className={`flex items-center space-x-2 px-4 py-2.5 text-sm font-medium ${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200 relative group`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className={`ml-1 px-1.5 py-0.5 text-xs font-semibold bg-${accentColor}-500 text-white rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                  {item.dropdown && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                      activeDropdown === index ? 'rotate-180' : ''
                    }`} />
                  )}
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-${accentColor}-500 group-hover:w-full transition-all duration-200`}></div>
                </button>

                {/* Enhanced Dropdown */}
                {item.dropdown && activeDropdown === index && (
                  <div className={`absolute top-full left-0 mt-2 w-64 ${currentTheme.bg} backdrop-blur-xl rounded-2xl ${currentTheme.shadow} border ${currentTheme.border} py-3 z-50`}>
                    <div className="px-3 pb-2">
                      <div className={`text-xs font-semibold ${currentTheme.textMuted} uppercase tracking-wider`}>
                        {item.name}
                      </div>
                    </div>
                    {item.dropdown.map((dropItem) => (
                      <NavLink
                        key={dropItem.name}
                        href={dropItem.href}
                        className={`flex flex-col px-4 py-3 ${currentTheme.text} ${currentTheme.hover} transition-all duration-200 group`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="font-medium">{dropItem.name}</span>
                        {dropItem.description && (
                          <span className={`text-xs ${currentTheme.textMuted} mt-0.5`}>
                            {dropItem.description}
                          </span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            
            {/* Search */}
            <button className={`p-2.5 ${currentTheme.textMuted} hover:${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200 group`}>
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Theme Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowThemePanel(!showThemePanel)}
                className={`p-2.5 ${currentTheme.textMuted} hover:${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200 group`}
              >
                <ThemeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* Theme Panel */}
              {showThemePanel && (
                <div className={`absolute top-full right-0 mt-2 w-72 ${currentTheme.bg} backdrop-blur-xl rounded-2xl ${currentTheme.shadow} border ${currentTheme.border} p-4 z-50`}>
                  <div className={`text-sm font-semibold ${currentTheme.text} mb-3`}>Customize Theme</div>
                  
                  {/* Theme Options */}
                  <div className="space-y-3">
                    <div>
                      <div className={`text-xs ${currentTheme.textMuted} mb-2 uppercase tracking-wider`}>Mode</div>
                      <div className="grid grid-cols-3 gap-2">
                        {['light', 'dark', 'midnight'].map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`p-2 rounded-lg border-2 transition-all duration-200 ${
                              theme === t 
                                ? `border-${accentColor}-500 bg-${accentColor}-50` 
                                : `${currentTheme.border} ${currentTheme.hover}`
                            }`}
                          >
                            <div className="flex items-center justify-center mb-1">
                              {t === 'light' && <Sun className="w-4 h-4" />}
                              {t === 'dark' && <Moon className="w-4 h-4" />}
                              {t === 'midnight' && <Shield className="w-4 h-4" />}
                            </div>
                            <div className={`text-xs font-medium capitalize ${currentTheme.text}`}>{t}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Colors */}
                    <div>
                      <div className={`text-xs ${currentTheme.textMuted} mb-2 uppercase tracking-wider`}>Accent</div>
                      <div className="flex space-x-2">
                        {Object.keys(accentColors).map((color) => (
                          <button
                            key={color}
                            onClick={() => setAccentColor(color)}
                            className={`w-6 h-6 rounded-full bg-${color}-500 border-2 transition-all duration-200 ${
                              accentColor === color ? 'border-white scale-110' : 'border-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className={`p-2.5 ${currentTheme.textMuted} hover:${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200 group`}>
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className={`absolute -top-1 -right-1 w-4 h-4 bg-${accentColor}-500 text-white text-xs rounded-full flex items-center justify-center font-semibold`}>
                  3
                </span>
              </button>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className={`flex items-center space-x-2 p-2 ${currentTheme.hover} rounded-xl transition-all duration-200`}>
                <div className={`w-9 h-9 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 rounded-xl flex items-center justify-center shadow-lg`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <div className={`text-sm font-semibold ${currentTheme.text}`}>John Doe</div>
                  <div className={`text-xs ${currentTheme.textMuted}`}>Administrator</div>
                </div>
                <ChevronDown className={`w-3 h-3 ${currentTheme.textMuted}`} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 ${currentTheme.textMuted} hover:${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden ${currentTheme.bg} border-t ${currentTheme.border}`}>
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.name}>
              <NavLink
                href={item.href}
                className={`flex items-center justify-between p-3 ${currentTheme.text} ${currentTheme.hover} rounded-xl transition-all duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-xs font-semibold bg-${accentColor}-500 text-white rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </NavLink>
              {item.dropdown && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.dropdown.map((dropItem) => (
                    <NavLink
                      key={dropItem.name}
                      href={dropItem.href}
                      className={`block p-2 text-sm ${currentTheme.textMuted} hover:${currentTheme.text} ${currentTheme.hover} rounded-lg transition-colors`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;