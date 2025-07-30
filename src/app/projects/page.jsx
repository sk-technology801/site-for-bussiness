
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Folder, FolderOpen, Plus, Search, Filter, Calendar, Clock, 
  Users, Target, CheckCircle, AlertTriangle, PauseCircle, 
  PlayCircle, MoreVertical, Star, Bookmark, Share2, Settings,
  TrendingUp, TrendingDown, BarChart3, PieChart, Activity,
  User, Mail, Phone, MapPin, Globe, Github, Slack, Figma,
  Edit3, Trash2, Copy, Download, Upload, RefreshCw, Bell,
  ChevronRight, ChevronDown, ExternalLink, Award, Zap,
  Calendar as CalendarIcon, Grid, List, Kanban, Timeline,
  Sun, Moon, Palette, Eye, EyeOff, Lock, Unlock, Archive,
  MessageSquare, FileText, Image, Video, Code, Database,
  Lightbulb, Brain, Rocket, Flag, Shield, Heart, Coffee, X,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [theme, setTheme] = useState('midnight');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    category: 'development',
    priority: 'medium',
    status: 'planning',
    budget: '',
    startDate: '',
    endDate: '',
    client: ''
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

  const [projectsData, setProjectsData] = useState({
    projects: [
      {
        id: 1,
        name: 'E-commerce Platform Redesign',
        description: 'Complete overhaul of the e-commerce platform with focus on mobile experience and conversion optimization.',
        status: 'active',
        priority: 'high',
        progress: 68,
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        budget: 125000,
        spent: 84500,
        category: 'design',
        tags: ['UI/UX', 'Mobile', 'E-commerce'],
        team: [
          { id: 1, name: 'Sarah Chen', role: 'Lead Designer', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 2, name: 'Mike Johnson', role: 'Frontend Dev', avatar: '/api/placeholder/32/32', status: 'busy' },
          { id: 3, name: 'Lisa Wang', role: 'UX Researcher', avatar: '/api/placeholder/32/32', status: 'offline' },
          { id: 4, name: 'David Kim', role: 'Product Manager', avatar: '/api/placeholder/32/32', status: 'online' }
        ],
        tasks: {
          total: 47,
          completed: 32,
          inProgress: 8,
          pending: 7
        },
        milestones: [
          { name: 'Research & Discovery', date: '2024-01-30', status: 'completed' },
          { name: 'Design System', date: '2024-02-15', status: 'completed' },
          { name: 'Prototype Development', date: '2024-02-28', status: 'active' },
          { name: 'Testing & QA', date: '2024-03-10', status: 'pending' },
          { name: 'Launch', date: '2024-03-15', status: 'pending' }
        ],
        client: 'TechCorp Solutions',
        isStarred: true,
        lastActivity: '2024-01-28T14:30:00Z',
        attachments: 23,
        comments: 156
      },
      {
        id: 2,
        name: 'Analytics Dashboard v3.0',
        description: 'Next-generation analytics dashboard with AI-powered insights and real-time data visualization.',
        status: 'active',
        priority: 'high',
        progress: 45,
        startDate: '2024-01-20',
        endDate: '2024-04-20',
        budget: 180000,
        spent: 67200,
        category: 'development',
        tags: ['Analytics', 'AI', 'Dashboard'],
        team: [
          { id: 5, name: 'Alex Rodriguez', role: 'Tech Lead', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 6, name: 'Emma Thompson', role: 'Data Scientist', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 7, name: 'Ryan Park', role: 'Backend Dev', avatar: '/api/placeholder/32/32', status: 'busy' }
        ],
        tasks: {
          total: 62,
          completed: 28,
          inProgress: 12,
          pending: 22
        },
        milestones: [
          { name: 'Architecture Planning', date: '2024-02-01', status: 'completed' },
          { name: 'Core Development', date: '2024-03-01', status: 'active' },
          { name: 'AI Integration', date: '2024-03-15', status: 'pending' },
          { name: 'Testing Phase', date: '2024-04-01', status: 'pending' },
          { name: 'Production Release', date: '2024-04-20', status: 'pending' }
        ],
        client: 'Internal Project',
        isStarred: true,
        lastActivity: '2024-01-28T16:45:00Z',
        attachments: 89,
        comments: 234
      },
      {
        id: 3,
        name: 'Mobile App MVP',
        description: 'Development of minimum viable product for the company mobile application with core features.',
        status: 'planning',
        priority: 'medium',
        progress: 15,
        startDate: '2024-02-01',
        endDate: '2024-05-01',
        budget: 95000,
        spent: 14250,
        category: 'mobile',
        tags: ['Mobile', 'MVP', 'iOS', 'Android'],
        team: [
          { id: 8, name: 'Jen Martinez', role: 'Mobile Dev', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 9, name: 'Tom Wilson', role: 'QA Engineer', avatar: '/api/placeholder/32/32', status: 'offline' }
        ],
        tasks: {
          total: 34,
          completed: 5,
          inProgress: 3,
          pending: 26
        },
        milestones: [
          { name: 'Requirements Gathering', date: '2024-02-10', status: 'active' },
          { name: 'UI/UX Design', date: '2024-02-25', status: 'pending' },
          { name: 'Development Sprint 1', date: '2024-03-15', status: 'pending' },
          { name: 'Beta Testing', date: '2024-04-15', status: 'pending' },
          { name: 'App Store Release', date: '2024-05-01', status: 'pending' }
        ],
        client: 'StartupXYZ',
        isStarred: false,
        lastActivity: '2024-01-27T10:20:00Z',
        attachments: 12,
        comments: 45
      },
      {
        id: 4,
        name: 'Marketing Automation System',
        description: 'Implementation of comprehensive marketing automation platform with email campaigns and lead nurturing.',
        status: 'completed',
        priority: 'low',
        progress: 100,
        startDate: '2023-11-01',
        endDate: '2024-01-15',
        budget: 75000,
        spent: 72500,
        category: 'marketing',
        tags: ['Marketing', 'Automation', 'Email'],
        team: [
          { id: 10, name: 'Amy Chen', role: 'Marketing Tech', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 11, name: 'Steve Miller', role: 'Integration Specialist', avatar: '/api/placeholder/32/32', status: 'offline' }
        ],
        tasks: {
          total: 28,
          completed: 28,
          inProgress: 0,
          pending: 0
        },
        milestones: [
          { name: 'Platform Selection', date: '2023-11-15', status: 'completed' },
          { name: 'Setup & Configuration', date: '2023-12-01', status: 'completed' },
          { name: 'Integration Testing', date: '2023-12-15', status: 'completed' },
          { name: 'Team Training', date: '2024-01-05', status: 'completed' },
          { name: 'Go Live', date: '2024-01-15', status: 'completed' }
        ],
        client: 'Internal Project',
        isStarred: false,
        lastActivity: '2024-01-15T12:00:00Z',
        attachments: 34,
        comments: 89
      },
      {
        id: 5,
        name: 'Security Audit & Compliance',
        description: 'Comprehensive security audit and implementation of compliance measures for data protection.',
        status: 'on-hold',
        priority: 'high',
        progress: 30,
        startDate: '2024-01-10',
        endDate: '2024-02-28',
        budget: 65000,
        spent: 19500,
        category: 'security',
        tags: ['Security', 'Compliance', 'GDPR'],
        team: [
          { id: 12, name: 'Marcus Johnson', role: 'Security Expert', avatar: '/api/placeholder/32/32', status: 'busy' },
          { id: 13, name: 'Nina Patel', role: 'Compliance Officer', avatar: '/api/placeholder/32/32', status: 'online' }
        ],
        tasks: {
          total: 19,
          completed: 6,
          inProgress: 1,
          pending: 12
        },
        milestones: [
          { name: 'Initial Assessment', date: '2024-01-20', status: 'completed' },
          { name: 'Vulnerability Testing', date: '2024-02-05', status: 'active' },
          { name: 'Compliance Review', date: '2024-02-15', status: 'pending' },
          { name: 'Implementation', date: '2024-02-25', status: 'pending' },
          { name: 'Final Audit', date: '2024-02-28', status: 'pending' }
        ],
        client: 'Internal Project',
        isStarred: true,
        lastActivity: '2024-01-26T09:15:00Z',
        attachments: 67,
        comments: 112
      },
      {
        id: 6,
        name: 'Customer Portal Development',
        description: 'Self-service customer portal with account management, billing, and support ticket features.',
        status: 'active',
        priority: 'medium',
        progress: 78,
        startDate: '2023-12-01',
        endDate: '2024-02-15',
        budget: 110000,
        spent: 95700,
        category: 'development',
        tags: ['Portal', 'Customer Service', 'Self-service'],
        team: [
          { id: 14, name: 'Carlos Rivera', role: 'Full Stack Dev', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 15, name: 'Sophie Green', role: 'UX Designer', avatar: '/api/placeholder/32/32', status: 'online' },
          { id: 16, name: 'James Lee', role: 'DevOps', avatar: '/api/placeholder/32/32', status: 'busy' }
        ],
        tasks: {
          total: 41,
          completed: 32,
          inProgress: 6,
          pending: 3
        },
        milestones: [
          { name: 'User Research', date: '2023-12-15', status: 'completed' },
          { name: 'Core Development', date: '2024-01-15', status: 'completed' },
          { name: 'Integration Testing', date: '2024-01-30', status: 'completed' },
          { name: 'User Acceptance Testing', date: '2024-02-10', status: 'active' },
          { name: 'Production Deployment', date: '2024-02-15', status: 'pending' }
        ],
        client: 'Enterprise Client',
        isStarred: false,
        lastActivity: '2024-01-28T11:30:00Z',
        attachments: 156,
        comments: 278
      }
    ],
    stats: {
      totalProjects: 6,
      activeProjects: 3,
      completedProjects: 1,
      totalBudget: 650000,
      totalSpent: 354650,
      teamMembers: 16,
      avgProgress: 56
    },
    recentActivity: [
      { user: 'Sarah Chen', action: 'updated', target: 'E-commerce Platform Redesign', time: '2 hours ago' },
      { user: 'Alex Rodriguez', action: 'completed task', target: 'Analytics Dashboard v3.0', time: '4 hours ago' },
      { user: 'Mike Johnson', action: 'commented on', target: 'E-commerce Platform Redesign', time: '6 hours ago' },
      { user: 'Emma Thompson', action: 'uploaded file to', target: 'Analytics Dashboard v3.0', time: '8 hours ago' },
      { user: 'Carlos Rivera', action: 'created task in', target: 'Customer Portal Development', time: '1 day ago' }
    ],
    categories: [
      { id: 'all', name: 'All Projects', count: 6, color: 'gray' },
      { id: 'design', name: 'Design', count: 1, color: 'cyan' },
      { id: 'development', name: 'Development', count: 2, color: 'blue' },
      { id: 'mobile', name: 'Mobile', count: 1, color: 'green' },
      { id: 'marketing', name: 'Marketing', count: 1, color: 'pink' },
      { id: 'security', name: 'Security', count: 1, color: 'orange' }
    ]
  });

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-400 bg-green-400/20',
      planning: 'text-blue-400 bg-blue-400/20',
      'on-hold': 'text-orange-400 bg-orange-400/20',
      completed: 'text-purple-400 bg-purple-400/20',
      cancelled: 'text-red-400 bg-red-400/20'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/20';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-400 bg-red-400/20',
      medium: 'text-orange-400 bg-orange-400/20',
      low: 'text-green-400 bg-green-400/20'
    };
    return colors[priority] || 'text-gray-400 bg-gray-400/20';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      design: Figma,
      development: Code,
      mobile: Globe,
      marketing: Target,
      security: Shield,
      data: Database
    };
    return icons[category] || Folder;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const filteredProjects = projectsData.projects.filter(project => {
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const toggleProjectStar = (projectId) => {
    setProjectsData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId
          ? { ...project, isStarred: !project.isStarred }
          : project
      )
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setProjectsData(prev => ({
      ...prev,
      projects: [
        {
          id: prev.projects.length + 1,
          name: newProject.name,
          description: newProject.description,
          status: newProject.status,
          priority: newProject.priority,
          progress: 0,
          startDate: newProject.startDate,
          endDate: newProject.endDate,
          budget: parseFloat(newProject.budget),
          spent: 0,
          category: newProject.category,
          tags: [],
          team: [],
          tasks: { total: 0, completed: 0, inProgress: 0, pending: 0 },
          milestones: [],
          client: newProject.client,
          isStarred: false,
          lastActivity: new Date().toISOString(),
          attachments: 0,
          comments: 0
        },
        ...prev.projects
      ],
      stats: {
        ...prev.stats,
        totalProjects: prev.stats.totalProjects + 1,
        totalBudget: prev.stats.totalBudget + parseFloat(newProject.budget),
        avgProgress: Math.round(
          (prev.stats.avgProgress * prev.stats.totalProjects) / (prev.stats.totalProjects + 1)
        )
      },
      categories: prev.categories.map(cat =>
        cat.id === newProject.category || cat.id === 'all'
          ? { ...cat, count: cat.count + 1 }
          : cat
      )
    }));

    setShowCreateModal(false);
    setNewProject({
      name: '',
      description: '',
      category: 'development',
      priority: 'medium',
      status: 'planning',
      budget: '',
      startDate: '',
      endDate: '',
      client: ''
    });
    setIsLoading(false);
  };

  const ProjectCard = ({ project }) => {
    const CategoryIcon = getCategoryIcon(project.category);
    
    return (
      <motion.div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)]`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          setSelectedProject(project);
          setShowDetailsModal(true);
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <CategoryIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className={`font-semibold ${currentTheme.text} group-hover:text-cyan-400 transition-colors line-clamp-1`}>
                  {project.name}
                </h3>
                <p className={`text-sm ${currentTheme.textSecondary}`}>{project.client}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProjectStar(project.id);
                }}
                className={`p-1 rounded-lg transition-colors ${project.isStarred ? 'text-yellow-400' : currentTheme.textSecondary}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={project.isStarred ? 'Unstar project' : 'Star project'}
              >
                <Star className={`w-4 h-4 ${project.isStarred ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                onClick={(e) => e.stopPropagation()}
                className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className={`px-2 py-1 text-xs rounded-lg font-medium capitalize ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`px-2 py-1 text-xs rounded-lg font-medium capitalize ${getPriorityColor(project.priority)}`}>
              {project.priority}
            </span>
            <span className={`text-xs ${currentTheme.textSecondary}`}>
              {getTimeRemaining(project.endDate)}
            </span>
          </div>

          <p className={`text-sm ${currentTheme.textMuted} mb-4 line-clamp-2`}>
            {project.description}
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${currentTheme.text}`}>Progress</span>
              <span className={`text-sm ${currentTheme.textSecondary}`}>{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {project.team.slice(0, 4).map((member, index) => (
                  <motion.div
                    key={member.id}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-gray-800 flex items-center justify-center text-xs font-semibold text-white relative"
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    style={{ zIndex: project.team.length - index }}
                    title={member.name}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-gray-800 ${
                      member.status === 'online' ? 'bg-green-400' :
                      member.status === 'busy' ? 'bg-orange-400' : 'bg-gray-400'
                    }`}></div>
                  </motion.div>
                ))}
                {project.team.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center text-xs font-semibold text-white">
                    +{project.team.length - 4}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>{project.comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-3 h-3" />
                <span>{project.attachments}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className={`text-sm ${currentTheme.textSecondary}`}>Budget</span>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-semibold ${currentTheme.text}`}>
                  {formatCurrency(project.spent)}
                </span>
                <span className={`text-sm ${currentTheme.textSecondary}`}>
                  / {formatCurrency(project.budget)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm ${project.spent > project.budget * 0.9 ? 'text-red-400' : 'text-green-400'}`}>
                {Math.round((project.spent / project.budget) * 100)}% used
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const ProjectListItem = ({ project }) => {
    const CategoryIcon = getCategoryIcon(project.category);
    
    return (
      <motion.div
        className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-xl p-4 hover:scale-[1.01] transition-all duration-200 group cursor-pointer shadow-[0_0_10px_rgba(34,211,238,0.2)]`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 5, boxShadow: '0 0 15px rgba(34, 211, 238, 0.4)' }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          setSelectedProject(project);
          setShowDetailsModal(true);
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="p-2 rounded-lg bg-cyan-500/20">
              <CategoryIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-medium ${currentTheme.text} group-hover:text-cyan-400 transition-colors truncate`}>
                  {project.name}
                </h3>
                <span className={`px-2 py-0.5 text-xs rounded-lg font-medium capitalize ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-2 py-0.5 text-xs rounded-lg font-medium capitalize ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
              <p className={`text-sm ${currentTheme.textSecondary} truncate`}>
                {project.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className={`text-sm ${currentTheme.textSecondary} min-w-[3rem]`}>
                {project.progress}%
              </span>
            </div>

            <div className="flex -space-x-1">
              {project.team.slice(0, 3).map((member, index) => (
                <div
                  key={member.id}
                  className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border border-gray-800 flex items-center justify-center text-xs font-semibold text-white"
                  title={member.name}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              {project.team.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-600 border border-gray-800 flex items-center justify-center text-xs font-semibold text-white">
                  +{project.team.length - 3}
                </div>
              )}
            </div>

            <div className="text-right min-w-[6rem]">
              <div className={`text-sm font-medium ${currentTheme.text}`}>
                {formatCurrency(project.spent)}
              </div>
              <div className={`text-xs ${currentTheme.textSecondary}`}>
                / {formatCurrency(project.budget)}
              </div>
            </div>

            <div className="text-right min-w-[5rem]">
              <div className={`text-sm ${currentTheme.textSecondary}`}>
                {getTimeRemaining(project.endDate)}
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleProjectStar(project.id);
                }}
                className={`p-1 rounded-lg transition-colors ${project.isStarred ? 'text-yellow-400' : currentTheme.textSecondary}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={project.isStarred ? 'Unstar project' : 'Star project'}
              >
                <Star className={`w-4 h-4 ${project.isStarred ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                onClick={(e) => e.stopPropagation()}
                className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="More options"
              >
                <MoreVertical className="w-4 h-4" />
              </motion.button>
            </div>
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
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Projects</h1>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-green-500/20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className={`text-xs text-green-400`}>
                    {projectsData.stats.activeProjects} Active
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 w-64 transition-all duration-200`}
                  aria-label="Search projects"
                />
              </div>

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

              <motion.button
                onClick={() => setShowCreateModal(true)}
                className={`px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Create new project"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Project
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create Project Modal */}
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
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>Create New Project</h2>
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
              <form onSubmit={handleCreateProject}>
                <div className="space-y-4">
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Project Name</label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Enter project name"
                      required
                      aria-label="Project name"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Description</label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 resize-y`}
                      placeholder="Describe the project"
                      rows={3}
                      aria-label="Project description"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Project category"
                    >
                      {projectsData.categories.filter(cat => cat.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Priority</label>
                    <select
                      value={newProject.priority}
                      onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Project priority"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Status</label>
                    <select
                      value={newProject.status}
                      onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      aria-label="Project status"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Budget (USD)</label>
                    <input
                      type="number"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Enter budget"
                      required
                      aria-label="Project budget"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Start Date</label>
                    <input
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      required
                      aria-label="Project start date"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>End Date</label>
                    <input
                      type="date"
                      value={newProject.endDate}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      required
                      aria-label="Project end date"
                    />
                  </div>
                  <div>
                    <label className={`text-sm ${currentTheme.textMuted} mb-1 block`}>Client</label>
                    <input
                      type="text"
                      value={newProject.client}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      className={`w-full px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                      placeholder="Enter client name"
                      required
                      aria-label="Project client"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3 mt-6">
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Create project"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 inline mr-2" />
                    )}
                    {isLoading ? 'Creating...' : 'Create Project'}
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

      {/* Project Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${currentTheme.text}`}>{selectedProject.name}</h2>
                <motion.button
                  onClick={() => setShowDetailsModal(false)}
                  className={`p-1 rounded-lg ${currentTheme.hover} ${currentTheme.text}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}`}>Overview</h3>
                  <p className={`text-sm ${currentTheme.textMuted}`}>{selectedProject.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Status</span>
                    <p className={`text-sm font-medium capitalize ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Priority</span>
                    <p className={`text-sm font-medium capitalize ${getPriorityColor(selectedProject.priority)}`}>{selectedProject.priority}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Client</span>
                    <p className={`text-sm ${currentTheme.text}`}>{selectedProject.client}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Category</span>
                    <p className={`text-sm ${currentTheme.text}`}>{selectedProject.category}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Start Date</span>
                    <p className={`text-sm ${currentTheme.text}`}>{selectedProject.startDate}</p>
                  </div>
                  <div>
                    <span className={`text-sm ${currentTheme.textSecondary}`}>End Date</span>
                    <p className={`text-sm ${currentTheme.text}`}>{selectedProject.endDate}</p>
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}`}>Budget</h3>
                  <div className="flex items-center justify-between">
                    <p className={`text-lg font-semibold ${currentTheme.text}`}>
                      {formatCurrency(selectedProject.spent)} / {formatCurrency(selectedProject.budget)}
                    </p>
                    <p className={`text-sm ${selectedProject.spent > selectedProject.budget * 0.9 ? 'text-red-400' : 'text-green-400'}`}>
                      {Math.round((selectedProject.spent / selectedProject.budget) * 100)}% used
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}`}>Team</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.team.map(member => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-gray-800 flex items-center justify-center text-xs font-semibold text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className={`text-sm ${currentTheme.text}`}>{member.name}</p>
                          <p className={`text-xs ${currentTheme.textSecondary}`}>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}`}>Milestones</h3>
                  <div className="space-y-2">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full ${milestone.status === 'completed' ? 'bg-green-400' : milestone.status === 'active' ? 'bg-blue-400' : 'bg-gray-400'}`}></div>
                          <span className={`text-sm ${currentTheme.text}`}>{milestone.name}</span>
                        </div>
                        <span className={`text-sm ${currentTheme.textSecondary}`}>{milestone.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-medium ${currentTheme.text}`}>Tasks</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>Total</span>
                      <p className={`text-lg font-semibold ${currentTheme.text}`}>{selectedProject.tasks.total}</p>
                    </div>
                    <div>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>Completed</span>
                      <p className={`text-lg font-semibold ${currentTheme.text}`}>{selectedProject.tasks.completed}</p>
                    </div>
                    <div>
                      <span className={`text-sm ${currentTheme.textSecondary}`}>In Progress</span>
                      <p className={`text-lg font-semibold ${currentTheme.text}`}>{selectedProject.tasks.inProgress}</p>
                    </div>
                  </div>
                </div>
              </div>
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="planning">Planning</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={`px-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500`}
                aria-label="Filter by priority"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <motion.button
                onClick={() => {
                  setSelectedStatus('all');
                  setSelectedPriority('all');
                }}
                className={`px-4 py-2 rounded-xl ${currentTheme.accent} text-white font-medium hover:opacity-90 transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Reset filters"
              >
                Reset Filters
              </motion.button>
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
                title: 'Total Projects', 
                value: projectsData.stats.totalProjects, 
                icon: Folder, 
                color: 'blue',
                change: '+2'
              },
              { 
                title: 'Active Projects', 
                value: projectsData.stats.activeProjects, 
                icon: PlayCircle, 
                color: 'green',
                change: '+1'
              },
              { 
                title: 'Total Budget', 
                value: formatCurrency(projectsData.stats.totalBudget), 
                icon: DollarSign, 
                color: 'purple',
                change: '+12%'
              },
              { 
                title: 'Team Members', 
                value: projectsData.stats.teamMembers, 
                icon: Users, 
                color: 'cyan',
                change: '+3'
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.3)]`}
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

          {/* Categories & Recent Activity */}
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
                {projectsData.categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedStatus(category.id === 'all' ? 'all' : category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedStatus === category.id
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

            {/* Recent Activity */}
            <motion.div
              className={`lg:col-span-3 ${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className={`text-lg font-semibold ${currentTheme.text} mb-4`}>Recent Activity</h3>
              <div className="space-y-4">
                {projectsData.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${currentTheme.hover}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <User className={`w-4 h-4 ${currentTheme.textSecondary}`} />
                      <span className={`text-sm ${currentTheme.text}`}>
                        <strong>{activity.user}</strong> {activity.action} <strong>{activity.target}</strong>
                      </span>
                    </div>
                    <span className={`text-xs ${currentTheme.textSecondary}`}>{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Projects List */}
          <motion.div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Recent Projects</h3>
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
                  aria-label="Export selected projects"
                  disabled={selectedProjects.length === 0}
                >
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Selected ({selectedProjects.length})
                </motion.button>
              </div>
            </div>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProjects.length > 0 ? (
                filteredProjects.map(project => (
                  viewMode === 'grid' ? (
                    <ProjectCard key={project.id} project={project} />
                  ) : (
                    <ProjectListItem key={project.id} project={project} />
                  )
                ))
              ) : (
                <div className={`text-center py-8 ${currentTheme.textSecondary}`}>
                  No projects found matching your criteria.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
