import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const FRACTION_CHALLENGES = [
  {
    id: 1,
    description: 'Create 1/2 using the factory machines',
    target: { numerator: 1, denominator: 2 },
    difficulty: 'Easy',
    points: 100
  },
  {
    id: 2,
    description: 'Make 2/4 equivalent to 1/2',
    target: { numerator: 2, denominator: 4 },
    difficulty: 'Easy',
    points: 150
  },
  {
    id: 3,
    description: 'Combine fractions to make 3/4',
    target: { numerator: 3, denominator: 4 },
    difficulty: 'Medium',
    points: 200
  },
  {
    id: 4,
    description: 'Create 5/6 using multiple steps',
    target: { numerator: 5, denominator: 6 },
    difficulty: 'Medium',
    points: 250
  },
  {
    id: 5,
    description: 'Master challenge: Make 7/8',
    target: { numerator: 7, denominator: 8 },
    difficulty: 'Hard',
    points: 300
  }
]

const FRACTION_PIECES = [
  { id: 1, numerator: 1, denominator: 2, color: 'bg-red-400' },
  { id: 2, numerator: 1, denominator: 4, color: 'bg-blue-400' },
  { id: 3, numerator: 1, denominator: 8, color: 'bg-green-400' },
  { id: 4, numerator: 2, denominator: 4, color: 'bg-yellow-400' },
  { id: 5, numerator: 3, denominator: 6, color: 'bg-purple-400' },
  { id: 6, numerator: 1, denominator: 3, color: 'bg-pink-400' }
]

export default function FractionFactory() {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [selectedPieces, setSelectedPieces] = useState([])
  const [factoryActive, setFactoryActive] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [completedLevels, setCompletedLevels] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [gameOver, setGameOver] = useState(false)

  const currentChallenge = FRACTION_CHALLENGES[currentLevel]

  useEffect(() => {
    let timer
    if (gameStarted && timeRemaining > 0 && !gameOver) {
      timer = setTimeout(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setGameOver(true)
            toast.error('Time\'s up! Factory shutdown!')
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [gameStarted, timeRemaining, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setShowInstructions(false)
    setTimeRemaining(60)
    setGameOver(false)
    toast.success('Welcome to the Fraction Factory! Production has started!')
  }

  const restartGame = () => {
    setCurrentLevel(0)
    setScore(0)
    setGameStarted(false)
    setSelectedPieces([])
    setFactoryActive(false)
    setShowInstructions(true)
    setCompletedLevels(0)
    setTimeRemaining(60)
    setGameOver(false)
    toast.info('Factory reset! Ready for a new production cycle.')
  }

  const selectFractionPiece = (piece) => {
    if (selectedPieces.length < 3) {
      setSelectedPieces([...selectedPieces, piece])
      toast.info(`Added ${piece.numerator}/${piece.denominator} to the conveyor belt`)
    } else {
      toast.warning('Conveyor belt is full! Process current pieces first.')
    }
  }

  const removePiece = (index) => {
    const newPieces = selectedPieces.filter((_, i) => i !== index)
    setSelectedPieces(newPieces)
    toast.info('Piece removed from conveyor belt')
  }

  const processFractions = () => {
    if (selectedPieces.length === 0) {
      toast.warning('Add fraction pieces to the conveyor belt first!')
      return
    }

    setFactoryActive(true)
    
    setTimeout(() => {
      // Calculate the sum of selected fractions (simplified logic)
      let totalNumerator = 0
      let commonDenominator = currentChallenge.target.denominator
      
      selectedPieces.forEach(piece => {
        totalNumerator += (piece.numerator * commonDenominator) / piece.denominator
      })

      const isCorrect = totalNumerator === currentChallenge.target.numerator && 
                       commonDenominator === currentChallenge.target.denominator

      if (isCorrect) {
        const newScore = score + currentChallenge.points
        setScore(newScore)
        setCompletedLevels(completedLevels + 1)
        toast.success(`Perfect! You created ${currentChallenge.target.numerator}/${currentChallenge.target.denominator}! +${currentChallenge.points} points`)
        
        if (currentLevel < FRACTION_CHALLENGES.length - 1) {
          setTimeout(() => {
            setCurrentLevel(currentLevel + 1)
            setSelectedPieces([])
            toast.info('New production order received!')
          }, 2000)
        } else {
          setTimeout(() => {
            setGameOver(true)
            toast.success('🎉 Factory completed all orders! Master Engineer achievement unlocked!')
          }, 2000)
        }
      } else {
        toast.error('Incorrect fraction produced! Try a different combination.')
        setSelectedPieces([])
      }
      
      setFactoryActive(false)
    }, 2000)
  }

  const skipInstructions = () => {
    setShowInstructions(false)
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
              <ApperIcon name="Cog" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-2">Fraction Factory</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">Master fractions through industrial engineering!</p>
          </div>

          <div className="space-y-4 text-surface-700 dark:text-surface-300">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p>Select fraction pieces from the inventory to place on the conveyor belt</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p>Use the fraction processor to combine pieces and create the target fraction</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p>Complete production orders before time runs out to earn points</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p>Master all 5 production levels to become a Fraction Factory Engineer!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Start Production</span>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ApperIcon name="Cog" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Fraction Factory</h1>
                <p className="text-orange-100">Level {currentLevel + 1} of {FRACTION_CHALLENGES.length}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-orange-100">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{timeRemaining}</div>
                <div className="text-sm text-orange-100">Time</div>
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
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
              {completedLevels === FRACTION_CHALLENGES.length ? 'Factory Mastery Achieved!' : 'Production Complete!'}
            </h2>
            <div className="space-y-3 mb-8">
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Final Score: <span className="font-bold text-orange-600">{score}</span>
              </p>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                Levels Completed: <span className="font-bold text-green-600">{completedLevels}</span>
              </p>
              {completedLevels === FRACTION_CHALLENGES.length && (
                <p className="text-green-600 font-semibold">🎉 Master Engineer Badge Earned!</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={restartGame}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Restart Factory</span>
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
            className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-surface-800 dark:text-white mb-2">Production Order</h2>
                <p className="text-surface-600 dark:text-surface-300">{currentChallenge.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">
                  {currentChallenge.target.numerator}/{currentChallenge.target.denominator}
                </div>
                <div className="text-sm text-surface-500">Target Fraction</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fraction Inventory */}
            <motion.div 
              className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-lg font-bold text-surface-800 dark:text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="Package" className="w-5 h-5" />
                <span>Fraction Inventory</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {FRACTION_PIECES.map((piece) => (
                  <button
                    key={piece.id}
                    onClick={() => selectFractionPiece(piece)}
                    className={`${piece.color} p-4 rounded-xl text-white font-bold hover:scale-105 transition-transform shadow-soft hover:shadow-card`}
                  >
                    <div className="text-lg">{piece.numerator}/{piece.denominator}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Factory Conveyor Belt */}
            <motion.div 
              className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-surface-800 dark:text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="ArrowRight" className="w-5 h-5" />
                <span>Conveyor Belt</span>
              </h3>
              <div className="space-y-3 mb-4">
                {selectedPieces.map((piece, index) => (
                  <motion.div
                    key={index}
                    className={`${piece.color} p-3 rounded-lg text-white font-semibold flex items-center justify-between`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span>{piece.numerator}/{piece.denominator}</span>
                    <button
                      onClick={() => removePiece(index)}
                      className="text-white hover:text-red-200"
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                {selectedPieces.length === 0 && (
                  <div className="text-center py-8 text-surface-400 dark:text-surface-500">
                    <ApperIcon name="Package" className="w-8 h-8 mx-auto mb-2" />
                    <p>Empty conveyor belt</p>
                  </div>
                )}
              </div>
              <button
                onClick={processFractions}
                disabled={selectedPieces.length === 0 || factoryActive}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  factoryActive
                    ? 'bg-yellow-500 text-white'
                    : selectedPieces.length === 0
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-game hover:shadow-floating'
                }`}
              >
                {factoryActive ? (
                  <>
                    <ApperIcon name="Loader" className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ApperIcon name="Play" className="w-5 h-5" />
                    <span>Process Fractions</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Factory Status */}
            <motion.div 
              className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-bold text-surface-800 dark:text-white mb-4 flex items-center space-x-2">
                <ApperIcon name="Activity" className="w-5 h-5" />
                <span>Factory Status</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-surface-600 dark:text-surface-300">Production Level</span>
                  <span className="font-bold text-orange-600">{currentLevel + 1}/{FRACTION_CHALLENGES.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-surface-600 dark:text-surface-300">Orders Completed</span>
                  <span className="font-bold text-green-600">{completedLevels}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-surface-600 dark:text-surface-300">Difficulty</span>
                  <span className={`font-bold ${
                    currentChallenge.difficulty === 'Easy' ? 'text-green-600' :
                    currentChallenge.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {currentChallenge.difficulty}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-surface-600 dark:text-surface-300">Bonus Points</span>
                  <span className="font-bold text-blue-600">+{currentChallenge.points}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      )}
    </div>
  )
}