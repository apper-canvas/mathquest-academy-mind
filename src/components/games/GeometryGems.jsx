import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const GEOMETRY_CHALLENGES = [
  {
    id: 1,
    type: 'shape-identification',
    question: 'Which shape has 3 sides and 3 angles?',
    options: ['Circle', 'Triangle', 'Square', 'Pentagon'],
    correct: 1,
    gem: 'Ruby',
    points: 100,
    explanation: 'A triangle has exactly 3 sides and 3 angles.'
  },
  {
    id: 2,
    type: 'shape-properties',
    question: 'How many sides does a hexagon have?',
    options: ['4', '5', '6', '8'],
    correct: 2,
    gem: 'Emerald',
    points: 150,
    explanation: 'A hexagon has 6 sides. Think of a honeycomb cell!'
  },
  {
    id: 3,
    type: 'angle-recognition',
    question: 'What type of angle is exactly 90 degrees?',
    options: ['Acute', 'Right', 'Obtuse', 'Straight'],
    correct: 1,
    gem: 'Sapphire',
    points: 200,
    explanation: 'A right angle is exactly 90 degrees, like the corner of a square.'
  },
  {
    id: 4,
    type: '3d-shapes',
    question: 'Which 3D shape has 6 faces, all squares?',
    options: ['Sphere', 'Cylinder', 'Cube', 'Pyramid'],
    correct: 2,
    gem: 'Diamond',
    points: 250,
    explanation: 'A cube has 6 square faces, 12 edges, and 8 vertices.'
  },
  {
    id: 5,
    type: 'symmetry',
    question: 'How many lines of symmetry does a regular pentagon have?',
    options: ['3', '4', '5', '6'],
    correct: 2,
    gem: 'Amethyst',
    points: 300,
    explanation: 'A regular pentagon has 5 lines of symmetry, one through each vertex.'
  },
  {
    id: 6,
    type: 'perimeter',
    question: 'What is the perimeter of a rectangle with length 6 and width 4?',
    options: ['10', '20', '24', '30'],
    correct: 1,
    gem: 'Topaz',
    points: 350,
    explanation: 'Perimeter = 2(length + width) = 2(6 + 4) = 20 units.'
  }
]

const GEM_COLORS = {
  'Ruby': 'from-red-400 to-red-600',
  'Emerald': 'from-green-400 to-green-600',
  'Sapphire': 'from-blue-400 to-blue-600',
  'Diamond': 'from-gray-100 to-white',
  'Amethyst': 'from-purple-400 to-purple-600',
  'Topaz': 'from-yellow-400 to-yellow-600'
}

const SHAPE_ICONS = {
  'Circle': 'Circle',
  'Triangle': 'Triangle',
  'Square': 'Square',
  'Pentagon': 'Pentagon',
  'Hexagon': 'Hexagon'
}

export default function GeometryGems() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [collectedGems, setCollectedGems] = useState([])
  const [showInstructions, setShowInstructions] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(45)
  const [gameOver, setGameOver] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const currentChallenge = GEOMETRY_CHALLENGES[currentLevel]

  useEffect(() => {
    let timer
    if (gameStarted && timeRemaining > 0 && !gameOver && !showResult) {
      timer = setTimeout(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setGameOver(true)
            toast.error('Time\'s up! The crystal cave has sealed itself!')
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [gameStarted, timeRemaining, gameOver, showResult])

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setTimeRemaining(45)
    setGameOver(false)
    toast.success('Welcome to the Geometry Gems cave! Your adventure begins!')
  }

  const restartGame = () => {
    setCurrentLevel(0)
    setScore(0)
    setGameStarted(false)
    setSelectedAnswer(null)
    setShowResult(false)
    setCollectedGems([])
    setShowInstructions(true)
    setTimeRemaining(45)
    setGameOver(false)
    setStreak(0)
    setMaxStreak(0)
    toast.info('Cave reset! Ready for a new geometric adventure.')
  }

  const selectAnswer = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.warning('Please select an answer first!')
      return
    }

    setShowResult(true)
    const isCorrect = selectedAnswer === currentChallenge.correct

    if (isCorrect) {
      const newScore = score + currentChallenge.points
      const newStreak = streak + 1
      setScore(newScore)
      setStreak(newStreak)
      setMaxStreak(Math.max(maxStreak, newStreak))
      setCollectedGems([...collectedGems, currentChallenge.gem])
      toast.success(`Correct! You found a ${currentChallenge.gem}! +${currentChallenge.points} points`)
    } else {
      setStreak(0)
      toast.error('Incorrect answer. The gem crumbles away...')
    }

    setTimeout(() => {
      if (currentLevel < GEOMETRY_CHALLENGES.length - 1) {
        setCurrentLevel(currentLevel + 1)
        setSelectedAnswer(null)
        setShowResult(false)
        setTimeRemaining(timeRemaining + 10) // Bonus time for progression
      } else {
        setGameOver(true)
        toast.success('🎉 You\'ve explored the entire crystal cave! Geometry Master achieved!')
      }
    }, 3000)
  }

  const skipInstructions = () => {
    setShowInstructions(false)
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
              <ApperIcon name="Diamond" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-2">Geometry Gems</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">Discover geometric treasures in enchanted crystal caves!</p>
          </div>

          <div className="space-y-4 text-surface-700 dark:text-surface-300">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p>Answer geometry questions correctly to collect precious gems</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p>Each correct answer earns points and adds a gem to your collection</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p>Build answer streaks for bonus points and time extensions</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p>Complete all cave chambers to become a Geometry Master!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Enter the Cave</span>
            </button>
            <Link
              to="/mini-games"
              className="px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span>Back to Games</span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ApperIcon name="Diamond" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Geometry Gems</h1>
                <p className="text-purple-100">Chamber {currentLevel + 1} of {GEOMETRY_CHALLENGES.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-purple-100">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-purple-100">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeRemaining}</div>
                <div className="text-sm text-purple-100">Time</div>
              </div>
              <Link
                to="/mini-games"
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors flex items-center space-x-2"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span>Exit</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {gameOver ? (
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-2xl mx-auto bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Crown" className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
              {collectedGems.length === GEOMETRY_CHALLENGES.length ? 'Geometry Master!' : 'Cave Exploration Complete!'}
            </h2>
            <div className="space-y-3 mb-8">
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Final Score: <span className="font-bold text-purple-600">{score}</span>
              </p>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Gems Collected: <span className="font-bold text-blue-600">{collectedGems.length}/{GEOMETRY_CHALLENGES.length}</span>
              </p>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Max Streak: <span className="font-bold text-green-600">{maxStreak}</span>
              </p>
              {collectedGems.length === GEOMETRY_CHALLENGES.length && (
                <p className="text-purple-600 font-semibold">🎉 Geometry Master Badge Earned!</p>
              )}
            </div>
            
            {/* Collected Gems Display */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-4">Your Gem Collection</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {collectedGems.map((gem, index) => (
                  <motion.div
                    key={index}
                    className={`w-12 h-12 bg-gradient-to-br ${GEM_COLORS[gem]} rounded-lg flex items-center justify-center shadow-game`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ApperIcon name="Diamond" className="w-6 h-6 text-white" />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={restartGame}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Explore Again</span>
              </button>
              <Link
                to="/mini-games"
                className="flex-1 px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Home" className="w-4 h-4" />
                <span>Game Hub</span>
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8">
          {/* Current Challenge */}
          <motion.div 
            className="max-w-4xl mx-auto bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Gem Display */}
            <div className="text-center mb-8">
              <motion.div 
                className={`w-20 h-20 bg-gradient-to-br ${GEM_COLORS[currentChallenge.gem]} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game`}
                animate={{ rotate: showResult ? 360 : 0, scale: showResult ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
              >
                <ApperIcon name="Diamond" className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-2">
                {currentChallenge.gem} Chamber
              </h2>
              <p className="text-surface-600 dark:text-surface-300">Answer correctly to claim this precious gem!</p>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-6">
                {currentChallenge.question}
              </h3>
              
              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {currentChallenge.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={`p-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentChallenge.correct
                            ? 'bg-green-500 text-white border-green-600 shadow-game'
                            : 'bg-red-500 text-white border-red-600 shadow-game'
                          : 'bg-purple-500 text-white border-purple-600 shadow-game'
                        : showResult && index === currentChallenge.correct
                        ? 'bg-green-500 text-white border-green-600 shadow-game'
                        : 'bg-white dark:bg-surface-700 text-surface-800 dark:text-white border-surface-200 dark:border-surface-600 hover:border-purple-400 hover:shadow-card'
                    }`}
                    whileHover={{ scale: showResult ? 1 : 1.05 }}
                    whileTap={{ scale: showResult ? 1 : 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            {!showResult && (
              <div className="text-center">
                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    selectedAnswer === null
                      ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-game hover:shadow-floating'
                  }`}
                >
                  Claim the Gem
                </button>
              </div>
            )}

            {/* Result Explanation */}
            {showResult && (
              <motion.div 
                className="mt-8 p-6 bg-surface-50 dark:bg-surface-900/50 rounded-xl border border-surface-200 dark:border-surface-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedAnswer === currentChallenge.correct ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    <ApperIcon name={selectedAnswer === currentChallenge.correct ? 'Check' : 'X'} className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-surface-800 dark:text-white mb-2">
                      {selectedAnswer === currentChallenge.correct ? 'Excellent!' : 'Not quite right'}
                    </h4>
                    <p className="text-surface-600 dark:text-surface-300">
                      {currentChallenge.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Progress and Stats */}
          <motion.div 
            className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{currentLevel + 1}/{GEOMETRY_CHALLENGES.length}</div>
              <div className="text-sm text-surface-600 dark:text-surface-300">Chamber Progress</div>
            </div>
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{collectedGems.length}</div>
              <div className="text-sm text-surface-600 dark:text-surface-300">Gems Collected</div>
            </div>
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{streak}</div>
              <div className="text-sm text-surface-600 dark:text-surface-300">Current Streak</div>
            </div>
          </motion.div>
        </main>
      )}
    </div>
  )
}