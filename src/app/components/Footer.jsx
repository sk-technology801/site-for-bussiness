
"use client";
import React, { useState, useEffect } from 'react';
import { Home, Users, SettingsIcon, Mail, Github, Twitter, Briefcase, BarChart3 } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const [theme, setTheme] = useState('midnight');
  const [accentColor, setAccentColor] = useState('blue');

  const themes = {
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

  // Sync theme with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'midnight';
    const savedAccent = localStorage.getItem('accentColor') || 'blue';
    setTheme(savedTheme in themes ? savedTheme : 'midnight');
    setAccentColor(savedAccent in accentColors ? savedAccent : 'blue');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('accentColor', accentColor);
  }, [theme, accentColor]);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
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
    { name: 'Settings', href: '/settings', icon: SettingsIcon }
  ];

  return (
    <footer className={`${currentTheme.bg} border-t ${currentTheme.border} mt-8 py-6 ${currentTheme.shadow}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className={`w-10 h-10 bg-gradient-to-br from-${accentColor}-500 to-${accentColor}-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-lg`}>
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900`}></div>
              </div>
              <div>
                <span className={`text-xl font-bold ${currentTheme.text} tracking-tight`}>ModernApp</span>
                <div className={`text-xs ${currentTheme.textMuted} font-medium`}>Pro Version</div>
              </div>
            </Link>
            <p className={`mt-2 text-sm ${currentTheme.textMuted}`}>
              Empowering your business with real-time insights and management tools.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className={`text-sm font-semibold ${currentTheme.textMuted} mb-3 uppercase tracking-wider`}>Navigation</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 text-sm ${currentTheme.textMuted} ${currentTheme.hover} p-2 rounded-lg transition-all duration-200 hover:scale-105 group`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-${accentColor}-500 group-hover:w-full transition-all duration-200`}></div>
                  </Link>
                  {item.dropdown && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {item.dropdown.map((dropItem) => (
                        <li key={dropItem.name}>
                          <Link
                            href={dropItem.href}
                            className={`block text-sm ${currentTheme.textMuted} ${currentTheme.hover} p-2 rounded-lg transition-all duration-200`}
                          >
                            {dropItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Social Links */}
          <div>
            <h4 className={`text-sm font-semibold ${currentTheme.textMuted} mb-3 uppercase tracking-wider`}>Contact Us</h4>
            <ul className="space-y-2">
              {[
                { href: 'mailto:support@example.com', label: 'Email Support', icon: Mail },
                { href: 'https://github.com/your-org', label: 'GitHub', icon: Github },
                { href: 'https://twitter.com/your-org', label: 'Twitter', icon: Twitter }
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex items-center space-x-2 text-sm ${currentTheme.textMuted} ${currentTheme.hover} p-2 rounded-lg transition-all duration-200 hover:scale-105 group`}
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-${accentColor}-500 group-hover:w-full transition-all duration-200`}></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-6 pt-4 border-t ${currentTheme.border} flex flex-col md:flex-row justify-between items-center`}>
          <p className={`text-sm ${currentTheme.textMuted}`}>
            &copy; {new Date().getFullYear()} ModernApp. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link
              href="/privacy"
              className={`text-sm ${currentTheme.textMuted} ${currentTheme.hover} p-2 rounded-lg transition-all duration-200`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`text-sm ${currentTheme.textMuted} ${currentTheme.hover} p-2 rounded-lg transition-all duration-200`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
