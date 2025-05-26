import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

export default function NumberNinja() {
  const [gameState, setGameState] = useState('menu') // menu, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [fallingNumbers, setFallingNumbers] = useState([])
  const [targetEquation, setTargetEquation] = useState({ left: 5, operator: '+', right: 3, result: 8 })
  const [selectedNumbers, setSelectedNumbers] = useState([])
  const [achievements, setAchievements] = useState([])
  const [combo, setCombo] = useState(0)
  const [nextNumberId, setNextNumberId] = useState(1)

  // Generate random falling numbers
  const generateNumber = useCallback(() => {
    const value = Math.floor(Math.random() * (10 + level * 2)) + 1
    return {
      id: nextNumberId,
      value,
      x: Math.random() * 80 + 10, // 10-90% width
      y: -10,
      speed: 1 + level * 0.2 + Math.random() * 0.5,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }
  }, [level, nextNumberId])

  // Generate new target equation
  const generateEquation = useCallback(() => {
    const operations = ['+', '-']
    const operator = operations[Math.floor(Math.random() * operations.length)]
    
    let left, right, result
    if (operator === '+') {
      left = Math.floor(Math.random() * (5 + level * 2)) + 1
      right = Math.floor(Math.random() * (5 + level * 2)) + 1
      result = left + right
    } else {
      result = Math.floor(Math.random() * (10 + level * 2)) + 1
      right = Math.floor(Math.random() * result) + 1
      left = result + right
    }
    
    setTargetEquation({ left, operator, right, result })
  }, [level])

  // Start game
  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setLives(3)
    setLevel(1)
    setTimeLeft(60)
    setFallingNumbers([])
    setSelectedNumbers([])
    setCombo(0)
    setAchievements([])
    generateEquation()
    toast.success('Number Ninja activated! Slice those numbers!')
  }

  // Handle number click/slice
  const sliceNumber = (numberId) => {
    if (gameState !== 'playing') return
    
    const number = fallingNumbers.find(n => n.id === numberId)
    if (!number) return

    // Remove the sliced number
    setFallingNumbers(prev => prev.filter(n => n.id !== numberId))
    
    // Add to selected numbers
    const newSelected = [...selectedNumbers, number.value]
    setSelectedNumbers(newSelected)
    
    // Check if equation is complete
    if (newSelected.length === 3) {
      checkEquation(newSelected)
    }
    
    // Visual feedback
    toast.info(`Sliced ${number.value}! 🥷`)
  }

  // Check if selected numbers form the target equation
  const checkEquation = (numbers) => {
    const [a, b, c] = numbers.sort((x, y) => x - y)
    const { left, operator, right, result } = targetEquation
    
    let isCorrect = false
    if (operator === '+') {
      isCorrect = (a === left && b === right && c === result) ||
                  (a === right && b === left && c === result)
    } else {
      isCorrect = (a === right && b === result && c === left) ||
                  (a === result && b === left && c === right)
    }
    
    if (isCorrect) {
      const points = 100 + (combo * 20) + (level * 10)
      setScore(prev => prev + points)
      setCombo(prev => prev + 1)
      setTimeLeft(prev => Math.min(prev + 5, 60)) // Bonus time
      toast.success(`Perfect slice! +${points} points! 🔥`)
      
      // Check for achievements
      if (combo >= 4 && !achievements.includes('combo-master')) {
        setAchievements(prev => [...prev, 'combo-master'])
        toast.success('🏆 Achievement: Combo Master!')
      }
      
      generateEquation()
    } else {
      setLives(prev => prev - 1)
      setCombo(0)
      toast.error('Wrong equation! Try again! 💥')
    }
    
    setSelectedNumbers([])
  }

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const gameLoop = setInterval(() => {
      // Move falling numbers
      setFallingNumbers(prev => {
        const updated = prev.map(num => ({
          ...num,
          y: num.y + num.speed
        })).filter(num => num.y < 100) // Remove numbers that fall off screen
        
        // Add penalty for missed numbers
        const missed = prev.length - updated.length
        if (missed > 0) {
          setLives(current => Math.max(0, current - missed))
        }
        
        return updated
      })
      
      // Spawn new numbers
      if (Math.random() < 0.3 + level * 0.1) {
        setFallingNumbers(prev => {
          if (prev.length < 8) {
            const newNumber = generateNumber()
            setNextNumberId(current => current + 1)
            return [...prev, newNumber]
          }
          return prev
        })
      }
      
      // Decrease time
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(gameLoop)
  }, [gameState, level, generateNumber])

  // Level progression
  useEffect(() => {
    if (score > 0 && score % 1000 === 0) {
      setLevel(prev => prev + 1)
      toast.success(`Level up! Welcome to Level ${level + 1}! 🚀`)
    }
  }, [score, level])

  // Game over check
  useEffect(() => {
    if (lives <= 0 && gameState === 'playing') {
      setGameState('gameOver')
      toast.error('Game Over! Your ninja skills need more training! 🥲')
    }
  }, [lives, gameState])

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-floating border border-white/20 dark:border-surface-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game animate-bounce">
              <ApperIcon name="Zap" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
              Number Ninja 🥷
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
              Slice falling numbers with precision to create correct equations!
            </p>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">How to Play:</h3>
              <ul className="text-left text-surface-600 dark:text-surface-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Click falling numbers to slice them</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Select 3 numbers that form the target equation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Build combos for bonus points</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Don't let numbers hit the ground!</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={startGame}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Start Slicing!</span>
            </motion.button>
            
            <Link
              to="/mini-games"
              className="px-6 py-4 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4" />
              <span>Back to Games</span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-floating border border-white/20 dark:border-surface-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game">
              <ApperIcon name="X" className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
              Game Over! 🥲
            </h2>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600">{score}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Final Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{level}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Level Reached</div>
                </div>
              </div>
              
              {achievements.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">🏆 Achievements</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="px-3 py-1 bg-gradient-to-r from-secondary to-accent text-white rounded-lg text-sm font-medium"
                      >
                        {achievement === 'combo-master' ? '🔥 Combo Master' : achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={startGame}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Try Again</span>
              </motion.button>
              
              <Link
                to="/mini-games"
                className="px-6 py-4 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4" />
                <span>Back to Games</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Game UI Header */}
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/mini-games"
            className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Heart" className="w-4 h-4 text-red-500" />
                <span className="font-medium text-surface-800 dark:text-white">{lives}</span>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Clock" className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-surface-800 dark:text-white">{timeLeft}s</span>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Star" className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-surface-800 dark:text-white">{score}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Target Equation */}
        <div className="text-center mb-4">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-floating border border-white/20 dark:border-surface-700/50">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-2">
              Target Equation
            </h3>
            <div className="text-2xl font-bold text-orange-600">
              {targetEquation.left} {targetEquation.operator} {targetEquation.right} = {targetEquation.result}
            </div>
            
            {selectedNumbers.length > 0 && (
              <div className="mt-3">
                <div className="text-sm text-surface-600 dark:text-surface-400 mb-1">Selected:</div>
                <div className="flex justify-center space-x-2">
                  {selectedNumbers.map((num, index) => (
                    <span key={index} className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-orange-600 font-semibold">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {combo > 1 && (
          <div className="text-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl inline-block font-bold shadow-game animate-pulse">
              🔥 COMBO x{combo}
            </div>
          </div>
        )}
      </div>
      
      {/* Game Area */}
      <div className="relative h-96 overflow-hidden mx-4 bg-white/30 dark:bg-surface-800/30 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-surface-700/50">
        <AnimatePresence>
          {fallingNumbers.map((number) => (
            <motion.button
              key={number.id}
              className="absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-game cursor-pointer hover:scale-110 transition-transform"
              style={{
                backgroundColor: number.color,
                left: `${number.x}%`,
                top: `${number.y}%`
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sliceNumber(number.id)}
            >
              {number.value}
            </motion.button>
          ))}
        </AnimatePresence>
        
        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 opacity-50"></div>
      </div>
      
      <div className="text-center mt-4 text-surface-600 dark:text-surface-400">
        <p>Level {level} • Click the falling numbers to slice them!</p>
      </div>
    </div>
  )
}