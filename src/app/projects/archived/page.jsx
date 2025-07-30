
"use client";
import React, { useState } from 'react';
import { 
  Folder, Plus, Search, Calendar, Users, Target, CheckCircle, 
  AlertTriangle, MoreVertical, Star, FileText, MessageSquare, 
  Globe, Figma, Code, Shield, Database, X, DollarSign, RefreshCw, Grid, List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Projects data with archived (completed/cancelled) projects
const projectsData = {
  projects: [
    {
      id: 7,
      name: 'Mobile App v1.0',
      description: 'Initial release of the mobile application for customer engagement.',
      status: 'completed',
      priority: 'high',
      progress: 100,
      startDate: '2023-06-01',
      endDate: '2023-12-31',
      budget: 150000,
      spent: 145000,
      category: 'mobile',
      tags: ['Mobile', 'Customer Engagement', 'React Native'],
      team: [
        { id: 17, name: 'Anna Smith', role: 'Mobile Dev', avatar: '/api/placeholder/32/32', status: 'online' },
        { id: 18, name: 'Mark Brown', role: 'QA Engineer', avatar: '/api/placeholder/32/32', status: 'offline' }
      ],
      tasks: { total: 50, completed: 50, inProgress: 0, pending: 0 },
      milestones: [
        { name: 'MVP Development', date: '2023-08-15', status: 'completed' },
        { name: 'Testing', date: '2023-11-30', status: 'completed' },
        { name: 'Launch', date: '2023-12-31', status: 'completed' }
      ],
      client: 'AppCorp',
      isStarred: true,
      lastActivity: '2023-12-31T10:00:00Z',
      attachments: 45,
      comments: 120
    },
    {
      id: 8,
      name: 'Marketing Campaign Q2',
      description: 'Digital marketing campaign for product launch.',
      status: 'cancelled',
      priority: 'medium',
      progress: 20,
      startDate: '2023-04-01',
      endDate: '2023-06-30',
      budget: 80000,
      spent: 20000,
      category: 'marketing',
      tags: ['Marketing', 'Digital', 'SEO'],
      team: [
        { id: 19, name: 'Emily Davis', role: 'Marketing Lead', avatar: '/api/placeholder/32/32', status: 'busy' },
        { id: 20, name: 'Tom Wilson', role: 'Content Creator', avatar: '/api/placeholder/32/32', status: 'offline' }
      ],
      tasks: { total: 30, completed: 6, inProgress: 0, pending: 24 },
      milestones: [
        { name: 'Campaign Planning', date: '2023-04-15', status: 'completed' },
        { name: 'Content Creation', date: '2023-05-15', status: 'cancelled' }
      ],
      client: 'BrandX',
      isStarred: false,
      lastActivity: '2023-05-01T14:00:00Z',
      attachments: 15,
      comments: 80
    }
  ],
  stats: {
    totalProjects: 2,
    activeProjects: 0,
    completedProjects: 1,
    cancelledProjects: 1,
    totalBudget: 230000,
    totalSpent: 165000,
    teamMembers: 4,
    avgProgress: 60
  },
  categories: [
    { id: 'all', name: 'All Projects', count: 2, color: 'gray' },
    { id: 'mobile', name: 'Mobile', count: 1, color: 'green' },
    { id: 'marketing', name: 'Marketing', count: 1, color: 'purple' }
  ]
};

const ArchivedProjectsPage = () => {
  const [theme, setTheme] = useState('midnight');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    category: 'development',
    priority: 'medium',
    status: 'active',
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
    
    if (diffDays < 0) return 'Ended';
    if (diffDays === 0) return 'Ended today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const filteredProjects = projectsData.projects.filter(project => {
    const matchesPriority = selectedPriority === 'all' || project.priority === selectedPriority;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const toggleProjectStar = (projectId) => {
    projectsData.projects = projectsData.projects.map(project =>
      project.id === projectId ? { ...project, isStarred: !project.isStarred } : project
    );
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    projectsData.projects.push({
      id: projectsData.projects.length + 1,
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
    });

    projectsData.stats.totalProjects += 1;
    if (newProject.status === 'completed') {
      projectsData.stats.completedProjects += 1;
    } else if (newProject.status === 'cancelled') {
      projectsData.stats.cancelledProjects += 1;
    }
    projectsData.stats.totalBudget += parseFloat(newProject.budget);
    projectsData.stats.avgProgress = Math.round(
      (projectsData.stats.avgProgress * (projectsData.stats.totalProjects - 1)) / projectsData.stats.totalProjects
    );
    projectsData.categories = projectsData.categories.map(cat =>
      cat.id === newProject.category || cat.id === 'all' ? { ...cat, count: cat.count + 1 } : cat
    );

    setShowCreateModal(false);
    setNewProject({
      name: '',
      description: '',
      category: 'development',
      priority: 'medium',
      status: 'active',
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
              <h1 className={`text-2xl font-bold ${currentTheme.text}`}>Archived Projects</h1>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-purple-500/20"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className={`text-xs text-purple-400`}>
                    {projectsData.stats.completedProjects + projectsData.stats.cancelledProjects} Archived
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.textSecondary}`} />
                <input
                  type="text"
                  placeholder="Search archived projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border ${currentTheme.border} bg-gray-800 ${currentTheme.text} focus:ring-2 focus:ring-cyan-500 w-64 transition-all duration-200`}
                  aria-label="Search archived projects"
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
                      <option value="active">Active</option>
                      <option value="planning">Planning</option>
                      <option value="on-hold">On Hold</option>
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
                  <div className="flex bolsaitems-center justify-between">
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

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: 'Completed Projects', 
                value: projectsData.stats.completedProjects, 
                icon: CheckCircle, 
                color: 'purple',
                change: '+1'
              },
              { 
                title: 'Cancelled Projects', 
                value: projectsData.stats.cancelledProjects, 
                icon: X, 
                color: 'red',
                change: '0'
              },
              { 
                title: 'Total Budget', 
                value: formatCurrency(projectsData.stats.totalBudget), 
                icon: DollarSign, 
                color: 'cyan',
                change: '+8%'
              },
              { 
                title: 'Team Members', 
                value: projectsData.stats.teamMembers, 
                icon: Users, 
                color: 'green',
                change: '+2'
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

          {/* Projects List */}
          <motion.div
            className={`${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Archived Projects</h3>
              <div className="flex items-center space-x-3">
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
                  No archived projects found matching your criteria.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedProjectsPage;