import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import { Link } from 'react-router-dom'

import ApperIcon from '../components/ApperIcon'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const features = [
    {
      icon: 'Calculator',
      title: 'Math Adventures',
      description: 'Interactive problem solving with drag-and-drop exercises',
      color: 'bg-game-blue'
    },
    {
      icon: 'BookOpen',
      title: 'Reading Quests',
      description: 'Story-based challenges and vocabulary building games',
      color: 'bg-game-green'
    },
    {
      icon: 'Trophy',
      title: 'Achievement System',
      description: 'Earn badges and unlock new levels as you progress',
      color: 'bg-game-orange'
    },
    {
      icon: 'TrendingUp',
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics',
      color: 'bg-game-purple'
    }
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2 sm:space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-game">
                <ApperIcon name="Gamepad2" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">
                MathQuest Academy
              </h1>
            </motion.div>
            
              <Link
                to="/learning-modules"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
              >
                <ApperIcon name="BookOpen" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learning Modules</span>
              </Link>
              

              <Link
                to="/mini-games"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-secondary to-accent text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
              >
                <ApperIcon name="Gamepad" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Mini-Games</span>
              </Link>
              
              <Link
                to="/learning-map"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
              >
                <ApperIcon name="Map" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learning Map</span>
              </Link>

              
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm shadow-soft hover:shadow-card transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ApperIcon 
                  name={darkMode ? 'Sun' : 'Moon'} 
                  className="w-5 h-5 sm:w-6 sm:h-6 text-surface-600 dark:text-surface-300" 
                />
              </motion.button>
            </div>
        </nav>

        </nav>

      </header>

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-800 dark:text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Learn Through
              <span className="text-gradient block sm:inline sm:ml-3">
                Adventure
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-surface-600 dark:text-surface-300 mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Interactive learning games that make math and reading fun for children
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <div className="relative p-4 sm:p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 dark:border-surface-700/50 shadow-soft hover:shadow-floating transition-all duration-300 game-card-hover">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:animate-bounce-slow`}>
                    <ApperIcon name={feature.icon} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-surface-800 dark:text-white mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-surface-600 dark:text-surface-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 lg:mt-20 py-8 sm:py-12 bg-white/40 dark:bg-surface-900/40 backdrop-blur-sm border-t border-surface-200/50 dark:border-surface-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="Gamepad2" className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gradient">MathQuest Academy</span>
            </div>
            <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400">
              Making learning an adventure, one quest at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}