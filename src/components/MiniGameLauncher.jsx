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
        description: 'Master arithmetic through fast-paced number slicing action',
        skills: ['Addition', 'Subtraction', 'Quick Thinking', 'Mental Math'],
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        icon: 'Zap',
        preview: 'Become a mathematical warrior in this exciting action game! Slice falling numbers with precision to create correct equations and defeat mathematical monsters. Perfect for building speed and accuracy in basic arithmetic.',
        objectives: [
          'Master addition and subtraction facts up to 20',
          'Develop rapid mental calculation skills',
          'Build confidence with number recognition',
          'Improve hand-eye coordination through gameplay'
        ],
        outcomes: 'Players will gain fluency in basic arithmetic operations and develop the mental agility needed for more complex mathematical concepts.',
        unlocked: true
      },
      {
        id: 'multiplication-maze',
        name: 'Multiplication Maze',
        description: 'Navigate challenging mazes using multiplication mastery',
        skills: ['Multiplication', 'Times Tables', 'Problem Solving', 'Pattern Recognition'],
        difficulty: 'Medium',
        estimatedTime: '10-15 minutes',
        icon: 'Puzzle',
        preview: 'Embark on an epic adventure through mysterious mathematical mazes! Guide your character by solving multiplication problems to unlock paths and discover hidden treasures. Each correct answer opens new routes to explore.',
        objectives: [
          'Memorize multiplication tables 1-12',
          'Apply multiplication in problem-solving contexts',
          'Develop strategic thinking and planning skills',
          'Recognize patterns in multiplication facts'
        ],
        outcomes: 'Students will achieve automatic recall of multiplication facts and develop strategic thinking skills through maze navigation challenges.',
        unlocked: true
      },
      {
        id: 'fraction-factory',
        name: 'Fraction Factory',
        description: 'Engineer fraction solutions in this industrial puzzle adventure',
        skills: ['Fractions', 'Equivalent Fractions', 'Addition', 'Visual Reasoning'],
        difficulty: 'Hard',
        estimatedTime: '15-20 minutes',
        icon: 'Cog',
        preview: 'Welcome to the amazing Fraction Factory! Operate complex machinery to create, combine, and transform fractions. Use conveyor belts, mixing chambers, and fraction processors to solve increasingly challenging puzzles.',
        objectives: [
          'Understand fraction concepts and representations',
          'Create and identify equivalent fractions',
          'Add and subtract fractions with like denominators',
          'Visualize fractions using concrete models'
        ],
        outcomes: 'Players will develop a deep conceptual understanding of fractions and gain confidence working with fractional quantities in various contexts.',
        unlocked: false
      },
      {
        id: 'geometry-gems',
        name: 'Geometry Gems',
        description: 'Explore magical caves while discovering geometric wonders',
        skills: ['Shapes', 'Geometry', 'Spatial Reasoning', 'Properties'],
        difficulty: 'Medium',
        estimatedTime: '8-12 minutes',
        icon: 'Diamond',
        preview: 'Journey through enchanted crystal caves filled with geometric treasures! Identify shapes, measure angles, and discover properties of 2D and 3D figures while collecting precious gems and unlocking ancient secrets.',
        objectives: [
          'Identify and classify 2D and 3D shapes',
          'Understand properties of geometric figures',
          'Develop spatial visualization skills',
          'Apply geometric knowledge to solve puzzles'
        ],
        outcomes: 'Students will strengthen their spatial reasoning abilities and develop a solid foundation in geometric concepts and vocabulary.',
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
        description: 'Cast magical spells through the power of words and letters',
        skills: ['Spelling', 'Vocabulary', 'Word Formation', 'Phonics'],
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        icon: 'Wand2',
        preview: 'Become a powerful Word Wizard in this enchanting spelling adventure! Use your magical wand to combine letters, create words, and cast spells to defeat mischievous creatures and save the kingdom.',
        objectives: [
          'Master age-appropriate spelling patterns',
          'Build vocabulary through context clues',
          'Understand word formation rules',
          'Develop phonemic awareness skills'
        ],
        outcomes: 'Players will improve their spelling accuracy and expand their vocabulary while developing a deeper understanding of how words are constructed.',
        unlocked: true
      },
      {
        id: 'story-builder',
        name: 'Story Builder',
        description: 'Create epic adventures through interactive storytelling',
        skills: ['Reading Comprehension', 'Creative Writing', 'Vocabulary', 'Narrative Structure'],
        difficulty: 'Medium',
        estimatedTime: '10-15 minutes',
        icon: 'FileText',
        preview: 'Unleash your creativity as a master storyteller! Choose characters, settings, and plot elements to build unique adventure stories. Make decisions that shape the narrative and watch your stories come to life.',
        objectives: [
          'Understand story structure and elements',
          'Make predictions and inferences',
          'Expand vocabulary through context',
          'Develop creative writing skills'
        ],
        outcomes: 'Students will enhance their reading comprehension and creative writing abilities while developing an appreciation for narrative structure.',
        unlocked: true
      },
      {
        id: 'phonics-forest',
        name: 'Phonics Forest',
        description: 'Discover the magical sounds of letters in an enchanted woodland',
        skills: ['Phonics', 'Letter Sounds', 'Reading Basics', 'Sound Blending'],
        difficulty: 'Easy',
        estimatedTime: '8-12 minutes',
        icon: 'TreePine',
        preview: 'Venture into the mystical Phonics Forest where every tree, flower, and creature teaches you about letter sounds! Match sounds to letters, blend phonemes, and unlock the secrets of reading.',
        objectives: [
          'Learn letter-sound relationships',
          'Practice blending sounds to form words',
          'Recognize common phonics patterns',
          'Build foundational reading skills'
        ],
        outcomes: 'Young learners will develop essential phonics skills that serve as the foundation for successful reading and spelling.',
        unlocked: true
      },
      {
        id: 'comprehension-quest',
        name: 'Comprehension Quest',
        description: 'Embark on literary adventures that challenge your understanding',
        skills: ['Reading Comprehension', 'Critical Thinking', 'Analysis', 'Inference'],
        difficulty: 'Hard',
        estimatedTime: '15-25 minutes',
        icon: 'ScrollText',
        preview: 'Join brave heroes on epic reading quests! Read engaging stories, answer thought-provoking questions, and make critical decisions that affect the storyline. Each chapter unlocks new adventures and challenges.',
        objectives: [
          'Analyze character motivations and themes',
          'Make inferences from textual evidence',
          'Evaluate different perspectives',
          'Synthesize information across texts'
        ],
        outcomes: 'Advanced readers will develop sophisticated comprehension strategies and critical thinking skills essential for academic success.',
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

      {/* Enhanced Game Preview Modal */}
      {showGamePreview && selectedGame && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeGamePreview}
        >
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-floating"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${MINI_GAMES_DATA[selectedCategory].color} rounded-2xl flex items-center justify-center shadow-game`}>
                  <ApperIcon name={selectedGame.icon} className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-surface-800 dark:text-white">
                    {selectedGame.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-2">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Game Details */}
              <div className="space-y-6">
                {/* Game Preview */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3 flex items-center space-x-2">
                    <ApperIcon name="Eye" className="w-5 h-5" />
                    <span>Game Preview</span>
                  </h4>
                  <div className="bg-surface-50 dark:bg-surface-900/50 rounded-xl p-4 border border-surface-200 dark:border-surface-700">
                    <p className="text-surface-600 dark:text-surface-300 leading-relaxed">
                      {selectedGame.preview}
                    </p>
                  </div>
                </div>

                {/* Skills Practice */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3 flex items-center space-x-2">
                    <ApperIcon name="Target" className="w-5 h-5" />
                    <span>Skills You'll Practice</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGame.skills.map((skill, index) => (
                      <div
                        key={skill}
                        className={`px-3 py-2 rounded-xl text-sm font-medium ${MINI_GAMES_DATA[selectedCategory].bgColor} ${MINI_GAMES_DATA[selectedCategory].textColor} flex items-center space-x-2`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Learning Objectives */}
              <div className="space-y-6">
                {/* Learning Objectives */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3 flex items-center space-x-2">
                    <ApperIcon name="CheckSquare" className="w-5 h-5" />
                    <span>Learning Objectives</span>
                  </h4>
                  <div className="space-y-3">
                    {selectedGame.objectives?.map((objective, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                          {objective}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3 flex items-center space-x-2">
                    <ApperIcon name="TrendingUp" className="w-5 h-5" />
                    <span>Expected Outcomes</span>
                  </h4>
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                    <p className="text-surface-700 dark:text-surface-300 leading-relaxed text-sm">
                      {selectedGame.outcomes}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t border-surface-200 dark:border-surface-700">
              <button
                onClick={() => handlePlayGame(selectedGame.id)}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <ApperIcon name="Play" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Start Learning Adventure</span>
              </button>
              <button
                onClick={closeGamePreview}
                className="px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span>Browse More Games</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  )
}