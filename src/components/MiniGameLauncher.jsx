import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MINI_GAMES_DATA = {
  math: {
    category: 'Math Games',
    icon: 'Calculator',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    games: [
      {
        id: 'number-ninja',
        name: 'Number Ninja',
        description: 'Slice and dice numbers to solve addition and subtraction problems',
        skills: ['Addition', 'Subtraction', 'Quick Thinking'],
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        icon: 'Zap',
        preview: 'Fast-paced number cutting game where you slice falling numbers to create correct equations',
        unlocked: true
      },
      {
        id: 'multiplication-maze',
        name: 'Multiplication Maze',
        description: 'Navigate through mazes by solving multiplication tables',
        skills: ['Multiplication', 'Times Tables', 'Problem Solving'],
        difficulty: 'Medium',
        estimatedTime: '10-15 minutes',
        icon: 'Puzzle',
        preview: 'Guide your character through challenging mazes by solving multiplication problems',
        unlocked: true
      },
      {
        id: 'fraction-factory',
        name: 'Fraction Factory',
        description: 'Build and combine fractions in this industrial puzzle game',
        skills: ['Fractions', 'Equivalent Fractions', 'Addition'],
        difficulty: 'Hard',
        estimatedTime: '15-20 minutes',
        icon: 'Cog',
        preview: 'Operate factory machines to create and combine fractions in increasingly complex puzzles',
        unlocked: false
      },
      {
        id: 'geometry-gems',
        name: 'Geometry Gems',
        description: 'Collect gems by identifying shapes and their properties',
        skills: ['Shapes', 'Geometry', 'Spatial Reasoning'],
        difficulty: 'Medium',
        estimatedTime: '8-12 minutes',
        icon: 'Diamond',
        preview: 'Explore magical caves while learning about shapes, angles, and geometric properties',
        unlocked: true
      }
    ]
  },
  reading: {
    category: 'Reading Games',
    icon: 'BookOpen',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    games: [
      {
        id: 'word-wizard',
        name: 'Word Wizard',
        description: 'Cast spells by building words from magical letter combinations',
        skills: ['Spelling', 'Vocabulary', 'Word Formation'],
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        icon: 'Wand2',
        preview: 'Use magic wands to combine letters and create words to defeat monsters',
        unlocked: true
      },
      {
        id: 'story-builder',
        name: 'Story Builder',
        description: 'Create interactive stories by choosing words and plot elements',
        skills: ['Reading Comprehension', 'Creative Writing', 'Vocabulary'],
        difficulty: 'Medium',
        estimatedTime: '10-15 minutes',
        icon: 'FileText',
        preview: 'Build your own adventure stories by selecting words and making narrative choices',
        unlocked: true
      },
      {
        id: 'phonics-forest',
        name: 'Phonics Forest',
        description: 'Journey through enchanted forests learning letter sounds',
        skills: ['Phonics', 'Letter Sounds', 'Reading Basics'],
        difficulty: 'Easy',
        estimatedTime: '8-12 minutes',
        icon: 'TreePine',
        preview: 'Explore magical forests while learning how letters make different sounds',
        unlocked: true
      },
      {
        id: 'comprehension-quest',
        name: 'Comprehension Quest',
        description: 'Embark on reading adventures with interactive story challenges',
        skills: ['Reading Comprehension', 'Critical Thinking', 'Analysis'],
        difficulty: 'Hard',
        estimatedTime: '15-25 minutes',
        icon: 'ScrollText',
        preview: 'Read engaging stories and answer questions to unlock new chapters and adventures',
        unlocked: false
      }
    ]
  }
}

export default function MiniGameLauncher() {
  const [selectedCategory, setSelectedCategory] = useState('math')
  const [selectedGame, setSelectedGame] = useState(null)
  const [showGamePreview, setShowGamePreview] = useState(false)

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    toast.info(`Switched to ${MINI_GAMES_DATA[category].category}`)
  }

  const handleGameSelect = (game) => {
    if (!game.unlocked) {
      toast.warning('This game is locked! Complete other games to unlock it.')
      return
    }
    setSelectedGame(game)
    setShowGamePreview(true)
  }

  const handlePlayGame = (gameId) => {
    toast.success(`Launching ${selectedGame.name}! Get ready to learn!`)
    // Here would be the actual game launch logic
    setShowGamePreview(false)
    setSelectedGame(null)
  }

  const closeGamePreview = () => {
    setSelectedGame(null)
    setShowGamePreview(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-game">
                <ApperIcon name="Gamepad2" className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gradient">
                MathQuest Academy
              </h1>
            </Link>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                to="/learning-map"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
              >
                <ApperIcon name="Map" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Learning Map</span>
              </Link>
              
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
              >
                <ApperIcon name="Home" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Home</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-800 dark:text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mini-Game
            <span className="text-gradient block sm:inline sm:ml-3">
              Launcher
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-surface-600 dark:text-surface-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose from exciting educational games designed to reinforce specific skills
          </motion.p>
        </div>

        {/* Category Selection */}
        <motion.div 
          className="flex justify-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-2 shadow-soft border border-white/20 dark:border-surface-700/50">
            {Object.entries(MINI_GAMES_DATA).map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(key)}
                className={`flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-game`
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <ApperIcon name={category.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{category.category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {MINI_GAMES_DATA[selectedCategory].games.map((game, index) => (
            <motion.div
              key={game.id}
              className={`group relative cursor-pointer ${
                game.unlocked ? '' : 'opacity-60'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              onClick={() => handleGameSelect(game)}
            >
              <div className="relative p-4 sm:p-6 bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 dark:border-surface-700/50 shadow-soft hover:shadow-floating transition-all duration-300 game-card-hover">
                {/* Lock overlay for locked games */}
                {!game.unlocked && (
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gray-900/20 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="bg-white dark:bg-surface-800 rounded-full p-3 shadow-game">
                      <ApperIcon name="Lock" className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </div>
                  </div>
                )}
                
                {/* Game Icon */}
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${MINI_GAMES_DATA[selectedCategory].color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:animate-bounce-slow`}>
                  <ApperIcon name={game.icon} className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                
                {/* Game Info */}
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-bold text-surface-800 dark:text-white mb-2">
                    {game.name}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-300 mb-3 leading-relaxed">
                    {game.description}
                  </p>
                  
                  {/* Difficulty Badge */}
                  <div className="flex justify-center mb-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                  </div>
                  
                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {game.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 px-2 py-1 rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Time Estimate */}
                  <div className="flex items-center justify-center space-x-1 text-xs text-surface-500 dark:text-surface-400">
                    <ApperIcon name="Clock" className="w-3 h-3" />
                    <span>{game.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Game Preview Modal */}
      {showGamePreview && selectedGame && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGamePreview}
        >
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-floating"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${MINI_GAMES_DATA[selectedCategory].color} rounded-2xl flex items-center justify-center`}>
                  <ApperIcon name={selectedGame.icon} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-surface-800 dark:text-white">
                    {selectedGame.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`text-sm font-medium px-3 py-1 rounded-lg ${getDifficultyColor(selectedGame.difficulty)}`}>
                      {selectedGame.difficulty}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-surface-500 dark:text-surface-400">
                      <ApperIcon name="Clock" className="w-4 h-4" />
                      <span>{selectedGame.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={closeGamePreview}
                className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5 text-surface-600 dark:text-surface-300" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Game Description */}
              <div>
                <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">
                  Game Overview
                </h4>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                  {selectedGame.preview}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">
                  Skills You'll Practice
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedGame.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-2 rounded-xl text-sm font-medium ${MINI_GAMES_DATA[selectedCategory].bgColor} ${MINI_GAMES_DATA[selectedCategory].textColor}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
                <button
                  onClick={() => handlePlayGame(selectedGame.id)}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="Play" className="w-5 h-5" />
                  <span>Play Now</span>
                </button>
                <button
                  onClick={closeGamePreview}
                  className="px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300"
                >
                  Browse More
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
