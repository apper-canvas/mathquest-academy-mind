import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

export default function WordWizard() {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameOver
  const [currentWord, setCurrentWord] = useState('')
  const [scrambledLetters, setScrambledLetters] = useState([])
  const [playerInput, setPlayerInput] = useState('')
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [magicPoints, setMagicPoints] = useState(3)
  const [achievements, setAchievements] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [wordDefinition, setWordDefinition] = useState('')
  
  // Word lists by difficulty
  const WORD_LISTS = {
    1: [
      { word: 'CAT', definition: 'A furry pet that says meow' },
      { word: 'DOG', definition: 'A loyal pet that barks' },
      { word: 'SUN', definition: 'The bright star in our sky' },
      { word: 'FUN', definition: 'Something enjoyable to do' },
      { word: 'RUN', definition: 'To move fast with your legs' },
      { word: 'HAT', definition: 'Something you wear on your head' },
      { word: 'BAT', definition: 'A flying animal or sports equipment' },
      { word: 'RED', definition: 'The color of strawberries' }
    ],
    2: [
      { word: 'MAGIC', definition: 'Special powers like wizards have' },
      { word: 'HAPPY', definition: 'Feeling good and joyful' },
      { word: 'BOOK', definition: 'Something with pages to read' },
      { word: 'STAR', definition: 'Bright lights in the night sky' },
      { word: 'TREE', definition: 'A tall plant with leaves' },
      { word: 'BIRD', definition: 'An animal that can fly' },
      { word: 'FISH', definition: 'An animal that lives in water' },
      { word: 'PLAY', definition: 'To have fun with games or toys' }
    ],
    3: [
      { word: 'WIZARD', definition: 'A magical person with special powers' },
      { word: 'CASTLE', definition: 'A large building where kings live' },
      { word: 'DRAGON', definition: 'A mythical creature that breathes fire' },
      { word: 'BRIGHT', definition: 'Full of light, not dark' },
      { word: 'FOREST', definition: 'A large area with many trees' },
      { word: 'CASTLE', definition: 'A fortress where royalty lives' },
      { word: 'FRIEND', definition: 'Someone you like and trust' },
      { word: 'GARDEN', definition: 'A place where plants grow' }
    ]
  }
  
  // Get random word for current level
  const getRandomWord = useCallback(() => {
    const wordLevel = Math.min(level, 3)
    const words = WORD_LISTS[wordLevel]
    return words[Math.floor(Math.random() * words.length)]
  }, [level])
  
  // Scramble letters
  const scrambleWord = (word) => {
    const letters = word.split('')
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[letters[i], letters[j]] = [letters[j], letters[i]]
    }
    return letters.map((letter, index) => ({
      id: index,
      letter,
      isUsed: false,
      position: { x: 50 + (index * 60), y: 300 }
    }))
  }
  
  // Start new word
  const startNewWord = useCallback(() => {
    const wordData = getRandomWord()
    setCurrentWord(wordData.word)
    setWordDefinition(wordData.definition)
    setScrambledLetters(scrambleWord(wordData.word))
    setPlayerInput('')
  }, [getRandomWord])
  
  // Start game
  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setLevel(1)
    setStreak(0)
    setTimeLeft(60)
    setMagicPoints(3)
    setAchievements([])
    setSparkles([])
    startNewWord()
    toast.success('Welcome, Word Wizard! Cast your spelling spells! 🧙‍♂️')
  }
  
  // Add sparkle effect
  const addSparkle = (x, y) => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }
    setSparkles(prev => [...prev, newSparkle])
    
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id))
    }, 1000)
  }
  
  // Use magic hint
  const useMagicHint = () => {
    if (magicPoints <= 0 || gameState !== 'playing') return
    
    // Find next correct letter
    const nextLetterIndex = playerInput.length
    if (nextLetterIndex < currentWord.length) {
      const nextLetter = currentWord[nextLetterIndex]
      const availableLetter = scrambledLetters.find(l => l.letter === nextLetter && !l.isUsed)
      
      if (availableLetter) {
        setPlayerInput(prev => prev + nextLetter)
        setScrambledLetters(prev => prev.map(l => 
          l.id === availableLetter.id ? { ...l, isUsed: true } : l
        ))
        setMagicPoints(prev => prev - 1)
        addSparkle(400, 200)
        toast.info(`Magic hint used! ✨ Next letter: ${nextLetter}`)
      }
    }
  }
  
  // Add letter to input
  const addLetter = (letterId) => {
    if (gameState !== 'playing') return
    
    const letter = scrambledLetters.find(l => l.id === letterId)
    if (!letter || letter.isUsed) return
    
    setPlayerInput(prev => prev + letter.letter)
    setScrambledLetters(prev => prev.map(l => 
      l.id === letterId ? { ...l, isUsed: true } : l
    ))
    
    addSparkle(letter.position.x, letter.position.y)
  }
  
  // Remove last letter
  const removeLastLetter = () => {
    if (playerInput.length === 0) return
    
    const lastLetter = playerInput[playerInput.length - 1]
    setPlayerInput(prev => prev.slice(0, -1))
    
    // Find the letter to make available again
    const usedLetters = [...playerInput.slice(0, -1)]
    setScrambledLetters(prev => prev.map(l => {
      if (l.letter === lastLetter && l.isUsed) {
        const letterCount = usedLetters.filter(ul => ul === lastLetter).length
        const sameLetters = prev.filter(pl => pl.letter === lastLetter)
        if (sameLetters.indexOf(l) === letterCount) {
          return { ...l, isUsed: false }
        }
      }
      return l
    }))
  }
  
  // Check if word is complete
  useEffect(() => {
    if (playerInput.length === currentWord.length && gameState === 'playing') {
      if (playerInput === currentWord) {
        // Correct word!
        const points = 100 + (streak * 20) + (level * 10) + (currentWord.length * 5)
        setScore(prev => prev + points)
        setStreak(prev => prev + 1)
        setTimeLeft(prev => Math.min(prev + 10, 60)) // Bonus time
        
        // Add magic point bonus
        if (streak > 0 && streak % 3 === 0) {
          setMagicPoints(prev => Math.min(prev + 1, 5))
          toast.success(`Spell streak! +1 Magic Point! ✨`)
        }
        
        toast.success(`Excellent spell! +${points} points! 🎉`)
        
        // Check achievements
        if (streak >= 4 && !achievements.includes('spell-master')) {
          setAchievements(prev => [...prev, 'spell-master'])
          toast.success('🏆 Achievement: Spell Master!')
        }
        
        if (score + points >= 1000 && !achievements.includes('grand-wizard')) {
          setAchievements(prev => [...prev, 'grand-wizard'])
          toast.success('🏆 Achievement: Grand Wizard!')
        }
        
        // Level up check
        if ((score + points) > level * 500) {
          setLevel(prev => prev + 1)
          toast.success(`Level up! Welcome to Level ${level + 1}! 🚀`)
        }
        
        // Generate sparkles
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            addSparkle(
              Math.random() * 800 + 100,
              Math.random() * 400 + 100
            )
          }, i * 100)
        }
        
        setTimeout(() => {
          startNewWord()
        }, 1500)
      } else {
        // Wrong word
        setStreak(0)
        toast.error(`That's not the right spell! Try again! 💥`)
        
        // Clear input and reset letters
        setTimeout(() => {
          setPlayerInput('')
          setScrambledLetters(prev => prev.map(l => ({ ...l, isUsed: false })))
        }, 1000)
      }
    }
  }, [playerInput, currentWord, gameState, streak, score, level, achievements, startNewWord])
  
  // Game timer
  useEffect(() => {
    if (gameState !== 'playing') return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState('gameOver')
          toast.error('Time\'s up! Your magic fades away! ⏰')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameState])
  
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full shadow-floating border border-white/20 dark:border-surface-700/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game animate-bounce">
              <ApperIcon name="Wand2" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
              Word Wizard 🧙‍♂️
            </h1>
            <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
              Cast magical spells through the power of words and letters!
            </p>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-3">How to Play:</h3>
              <ul className="text-left text-surface-600 dark:text-surface-300 space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Unscramble letters to spell the target word</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Use the definition clue to help you</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Build word streaks for bonus points</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Use magic hints when you're stuck!</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={startGame}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Cast Your First Spell!</span>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
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
              Magic Faded! ⏰
            </h2>
            
            <div className="bg-surface-50 dark:bg-surface-900/50 rounded-2xl p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600">{score}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Final Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-600">{level}</div>
                  <div className="text-sm text-surface-600 dark:text-surface-400">Wizard Level</div>
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
                        {achievement === 'spell-master' ? '🔮 Spell Master' : '🧙‍♂️ Grand Wizard'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={startGame}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Cast Again</span>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 relative overflow-hidden">
      {/* Sparkles */}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute w-4 h-4 rounded-full pointer-events-none z-10"
            style={{
              backgroundColor: sparkle.color,
              left: sparkle.x,
              top: sparkle.y
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1, 0], 
              opacity: [1, 1, 0],
              y: sparkle.y - 50
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>
      
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
                <span className="font-medium text-surface-800 dark:text-white">{timeLeft}s</span>
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
                <ApperIcon name="Zap" className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-surface-800 dark:text-white">{magicPoints}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Level and Streak */}
        <div className="text-center mb-6">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-floating border border-white/20 dark:border-surface-700/50">
            <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-2">
              Level {level} Word Wizard
            </h3>
            {streak > 0 && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg inline-block text-sm font-medium">
                🔥 Spell Streak: {streak}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Game Area */}
      <div className="relative z-10 px-4">
        {/* Word Definition */}
        <div className="text-center mb-6">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-floating border border-white/20 dark:border-surface-700/50">
            <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-2">
              🔮 Spell this word:
            </h4>
            <p className="text-surface-600 dark:text-surface-300 italic">
              "{wordDefinition}"
            </p>
          </div>
        </div>
        
        {/* Player Input */}
        <div className="text-center mb-8">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto shadow-floating border border-white/20 dark:border-surface-700/50">
            <div className="text-3xl font-bold text-purple-600 mb-4 min-h-[3rem] flex items-center justify-center">
              {playerInput || '___'}
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={removeLastLetter}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 flex items-center space-x-2"
              >
                <ApperIcon name="Delete" className="w-4 h-4" />
                <span>Remove</span>
              </button>
              
              <button
                onClick={useMagicHint}
                disabled={magicPoints <= 0}
                className={`px-4 py-2 rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 flex items-center space-x-2 ${
                  magicPoints > 0
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                <ApperIcon name="Wand2" className="w-4 h-4" />
                <span>Magic Hint ({magicPoints})</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Scrambled Letters */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-floating border border-white/20 dark:border-surface-700/50">
            <div className="flex flex-wrap gap-3 justify-center">
              {scrambledLetters.map((letter) => (
                <motion.button
                  key={letter.id}
                  onClick={() => addLetter(letter.id)}
                  className={`w-12 h-12 rounded-xl font-bold text-lg shadow-soft transition-all duration-300 ${
                    letter.isUsed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-br from-purple-400 to-pink-500 text-white hover:shadow-card hover:scale-105'
                  }`}
                  disabled={letter.isUsed}
                  whileHover={!letter.isUsed ? { scale: 1.1 } : {}}
                  whileTap={!letter.isUsed ? { scale: 0.95 } : {}}
                >
                  {letter.letter}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center text-surface-600 dark:text-surface-400">
          <p>Click letters to spell the word • Use magic hints when stuck!</p>
        </div>
      </div>
    </div>
  )
}