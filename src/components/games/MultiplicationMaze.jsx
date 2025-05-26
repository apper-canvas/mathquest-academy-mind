import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

export default function MultiplicationMaze() {
  const [gameState, setGameState] = useState('menu') // menu, playing, completed, gameOver
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [maze, setMaze] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [treasuresFound, setTreasuresFound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [achievements, setAchievements] = useState([])
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionAnswered, setQuestionAnswered] = useState(false)
  
  const MAZE_SIZE = 8
  
  // Generate multiplication question
  const generateQuestion = useCallback(() => {
    const factor1 = Math.floor(Math.random() * (6 + level * 2)) + 1
    const factor2 = Math.floor(Math.random() * (6 + level * 2)) + 1
    const correct = factor1 * factor2
    
    // Generate wrong answers
    const options = [correct]
    while (options.length < 4) {
      const wrong = correct + (Math.floor(Math.random() * 20) - 10)
      if (wrong > 0 && !options.includes(wrong)) {
        options.push(wrong)
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }
    
    return {
      factor1,
      factor2,
      correct,
      options,
      correctIndex: options.indexOf(correct)
    }
  }, [level])
  
  // Generate maze
  const generateMaze = useCallback(() => {
    const newMaze = Array(MAZE_SIZE).fill().map(() => Array(MAZE_SIZE).fill(0))
    
    // Create paths (1 = path, 0 = wall)
    for (let i = 0; i < MAZE_SIZE; i++) {
      for (let j = 0; j < MAZE_SIZE; j++) {
        if (i === 0 || j === 0 || i === MAZE_SIZE - 1 || j === MAZE_SIZE - 1) {
          newMaze[i][j] = 0 // Walls around border
        } else if ((i + j) % 2 === 0 || Math.random() > 0.3) {
          newMaze[i][j] = 1 // Path
        }
      }
    }
    
    // Ensure start and end are accessible
    newMaze[1][1] = 1 // Start
    newMaze[MAZE_SIZE - 2][MAZE_SIZE - 2] = 3 // Exit
    
    // Add treasures (2 = treasure)
    let treasureCount = 0
    while (treasureCount < 3 + level) {
      const x = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1
      const y = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1
      if (newMaze[y][x] === 1 && !(x === 1 && y === 1)) {
        newMaze[y][x] = 2
        treasureCount++
      }
    }
    
    return newMaze
  }, [level])
  
  // Start game
  const startGame = () => {
    setGameState('playing')
    setPlayerPos({ x: 1, y: 1 })
    setMaze(generateMaze())
    setScore(0)
    setLevel(1)
    setTreasuresFound(0)
    setTimeLeft(300)
    setAchievements([])
    setShowQuestion(false)
    setQuestionAnswered(false)
    toast.success('Welcome to the Multiplication Maze! 🗺️')
  }
  
  // Move player
  const movePlayer = (direction) => {
    if (gameState !== 'playing' || showQuestion) return
    
    const { x, y } = playerPos
    let newX = x
    let newY = y
    
    switch (direction) {
      case 'up':
        newY = Math.max(0, y - 1)
        break
      case 'down':
        newY = Math.min(MAZE_SIZE - 1, y + 1)
        break
      case 'left':
        newX = Math.max(0, x - 1)
        break
      case 'right':
        newX = Math.min(MAZE_SIZE - 1, x + 1)
        break
    }
    
    // Check if move is valid (not a wall)
    if (maze[newY] && maze[newY][newX] !== 0) {
      setPlayerPos({ x: newX, y: newY })
      
      // Check what player stepped on
      const cell = maze[newY][newX]
      if (cell === 2) { // Treasure
        setShowQuestion(true)
        setCurrentQuestion(generateQuestion())
        setQuestionAnswered(false)
      } else if (cell === 3) { // Exit
        // Level complete
        const levelBonus = level * 100
        setScore(prev => prev + levelBonus)
        setLevel(prev => prev + 1)
        setMaze(generateMaze())
        setPlayerPos({ x: 1, y: 1 })
        setTreasuresFound(0)
        toast.success(`Level ${level} complete! +${levelBonus} bonus points! 🎉`)
        
        // Check achievements
        if (level >= 3 && !achievements.includes('maze-master')) {
          setAchievements(prev => [...prev, 'maze-master'])
          toast.success('🏆 Achievement: Maze Master!')
        }
      }
    }
  }
  
  // Handle question answer
  const answerQuestion = (selectedIndex) => {
    if (questionAnswered) return
    
    const isCorrect = selectedIndex === currentQuestion.correctIndex
    setQuestionAnswered(true)
    
    if (isCorrect) {
      const points = 50 + (level * 10)
      setScore(prev => prev + points)
      setTreasuresFound(prev => prev + 1)
      
      // Remove treasure from maze
      const newMaze = [...maze]
      newMaze[playerPos.y][playerPos.x] = 1
      setMaze(newMaze)
      
      toast.success(`Correct! +${points} points! Treasure collected! 💰`)
      
      // Check for speed achievement
      if (treasuresFound >= 2 && !achievements.includes('treasure-hunter')) {
        setAchievements(prev => [...prev, 'treasure-hunter'])
        toast.success('🏆 Achievement: Treasure Hunter!')
      }
    } else {
      toast.error(`Wrong answer! The correct answer was ${currentQuestion.correct}. Try the next treasure! 💥`)
    }
    
    setTimeout(() => {
      setShowQuestion(false)
      setCurrentQuestion(null)
    }, 2000)
  }
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault()
          movePlayer('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault()
          movePlayer('down')
          break
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          movePlayer('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          movePlayer('right')
          break
      }
    }
    
    if (gameState === 'playing') {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameState, playerPos, maze, showQuestion])
  
  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver')
          toast.error('Time\'s up! The maze consumed you! ⏰')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState])
  
  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  // Get cell style
  const getCellStyle = (cellType, x, y) => {
    const isPlayer = playerPos.x === x && playerPos.y === y
    
    if (isPlayer) {
      return 'bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300 animate-pulse'
    }
    
    switch (cellType) {
      case 0: // Wall
        return 'bg-gray-800 dark:bg-gray-900'
      case 1: // Path
        return 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
      case 2: // Treasure
        return 'bg-yellow-400 border-2 border-yellow-300 animate-pulse'
      case 3: // Exit
        return 'bg-purple-500 border-2 border-purple-300 animate-bounce'
      default:
        return 'bg-gray-200'
    }
  }
  
  // Get cell content
  const getCellContent = (cellType, x, y) => {
    const isPlayer = playerPos.x === x && playerPos.y === y
    
    if (isPlayer) {
      return <ApperIcon name="User" className="w-4 h-4 text-white" />
    }
    
    switch (cellType) {
      case 2: // Treasure
        return <ApperIcon name="Gem" className="w-4 h-4 text-yellow-800" />
      case 3: // Exit
        return <ApperIcon name="Flag" className="w-4 h-4 text-white" />
      default:
        return null
    }
  }
  
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-floating border border-white/20 dark:border-surface-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game animate-bounce">
              <ApperIcon name="Puzzle" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
              Multiplication Maze 🗺️
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
              Navigate through mysterious mazes using multiplication mastery!
            </p>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">How to Play:</h3>
              <ul className="text-left text-surface-600 dark:text-surface-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Use arrow keys or WASD to move through the maze</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Collect treasures by solving multiplication problems</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Find the exit to advance to the next level</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Complete levels before time runs out!</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={startGame}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Enter the Maze!</span>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
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
              Game Over! ⏰
            </h2>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Final Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{treasuresFound}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Treasures Found</div>
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
                        {achievement === 'maze-master' ? '🗺️ Maze Master' : '💰 Treasure Hunter'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={startGame}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-green-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
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
                <ApperIcon name="Clock" className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-surface-800 dark:text-white">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Star" className="w-4 h-4 text-yellow-500" />
                <span className="font-medium text-surface-800 dark:text-white">{score}</span>
              </div>
            </div>
            
            <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Gem" className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-surface-800 dark:text-white">{treasuresFound}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-floating border border-white/20 dark:border-surface-700/50">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-2">
              Level {level} - Multiplication Maze
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Use arrow keys or WASD to move • Collect treasures • Find the exit!
            </p>
          </div>
        </div>
      </div>
      
      {/* Maze */}
      <div className="flex justify-center px-4 mb-4">
        <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-floating border border-white/20 dark:border-surface-700/50">
          <div className="grid grid-cols-8 gap-1">
            {maze.map((row, y) => (
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCellStyle(cell, x, y)}`}
                >
                  {getCellContent(cell, x, y)}
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Controls */}
      <div className="flex justify-center space-x-4 px-4 sm:hidden">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onClick={() => movePlayer('up')}
            className="w-12 h-12 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-soft hover:shadow-card transition-all duration-300"
          >
            <ApperIcon name="ChevronUp" className="w-6 h-6 text-surface-700 dark:text-surface-300" />
          </button>
          <div></div>
          
          <button
            onClick={() => movePlayer('left')}
            className="w-12 h-12 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-soft hover:shadow-card transition-all duration-300"
          >
            <ApperIcon name="ChevronLeft" className="w-6 h-6 text-surface-700 dark:text-surface-300" />
          </button>
          <div></div>
          <button
            onClick={() => movePlayer('right')}
            className="w-12 h-12 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-soft hover:shadow-card transition-all duration-300"
          >
            <ApperIcon name="ChevronRight" className="w-6 h-6 text-surface-700 dark:text-surface-300" />
          </button>
          
          <div></div>
          <button
            onClick={() => movePlayer('down')}
            className="w-12 h-12 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-soft hover:shadow-card transition-all duration-300"
          >
            <ApperIcon name="ChevronDown" className="w-6 h-6 text-surface-700 dark:text-surface-300" />
          </button>
          <div></div>
        </div>
      </div>
      
      {/* Question Modal */}
      {showQuestion && currentQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            className="bg-white dark:bg-surface-800 rounded-3xl p-6 max-w-md w-full shadow-floating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
                <ApperIcon name="Gem" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-2">
                Treasure Question! 💰
              </h3>
              <p className="text-lg font-semibold text-surface-700 dark:text-surface-300">
                {currentQuestion.factor1} × {currentQuestion.factor2} = ?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => answerQuestion(index)}
                  className={`p-4 rounded-xl border-2 font-semibold text-lg transition-all duration-300 ${
                    questionAnswered
                      ? index === currentQuestion.correctIndex
                        ? 'border-green-500 bg-green-100 text-green-700'
                        : 'border-red-500 bg-red-100 text-red-700 opacity-50'
                      : 'border-surface-200 dark:border-surface-600 bg-surface-50 dark:bg-surface-700 text-surface-800 dark:text-white hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                  }`}
                  disabled={questionAnswered}
                  whileHover={!questionAnswered ? { scale: 1.02 } : {}}
                  whileTap={!questionAnswered ? { scale: 0.98 } : {}}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            
            {questionAnswered && (
              <div className="text-center text-surface-600 dark:text-surface-400">
                {currentQuestion.options.indexOf(currentQuestion.correct) === currentQuestion.correctIndex ? 'Correct!' : `Wrong! Answer was ${currentQuestion.correct}`}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}