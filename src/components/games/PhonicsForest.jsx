import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const PHONICS_LEVELS = [
  {
    id: 1,
    title: 'Letter Sounds with Forest Friends',
    description: 'Match letters to their animal sounds in the magical forest',
    difficulty: 'Easy',
    exercises: [
      { letter: 'B', sound: 'Bear says "/b/ /b/ /b/"', animal: '🐻', word: 'BEAR' },
      { letter: 'C', sound: 'Cat says "/c/ /c/ /c/"', animal: '🐱', word: 'CAT' },
      { letter: 'D', sound: 'Deer says "/d/ /d/ /d/"', animal: '🦌', word: 'DEER' },
      { letter: 'F', sound: 'Fox says "/f/ /f/ /f/"', animal: '🦊', word: 'FOX' }
    ]
  },
  {
    id: 2,
    title: 'Blending Sounds in the Woods',
    description: 'Help forest creatures build words by blending sounds together',
    difficulty: 'Medium',
    exercises: [
      { sounds: ['C', 'A', 'T'], word: 'CAT', animal: '🐱', meaning: 'A furry pet' },
      { sounds: ['D', 'O', 'G'], word: 'DOG', animal: '🐕', meaning: 'A loyal friend' },
      { sounds: ['B', 'I', 'G'], word: 'BIG', animal: '🐘', meaning: 'Very large' },
      { sounds: ['R', 'U', 'N'], word: 'RUN', animal: '🐰', meaning: 'Move fast' }
    ]
  },
  {
    id: 3,
    title: 'Forest Word Building',
    description: 'Create magical forest words using your phonics knowledge',
    difficulty: 'Hard',
    exercises: [
      { pattern: '_EE', options: ['S', 'B', 'T'], correct: 'T', word: 'TREE', animal: '🌳' },
      { pattern: 'F_SH', options: ['I', 'A', 'O'], correct: 'I', word: 'FISH', animal: '🐠' },
      { pattern: 'B_RD', options: ['I', 'A', 'U'], correct: 'I', word: 'BIRD', animal: '🐦' },
      { pattern: 'FLO_ER', options: ['W', 'V', 'X'], correct: 'W', word: 'FLOWER', animal: '🌸' }
    ]
  }
]

const FOREST_ANIMALS = ['🐻', '🦊', '🐰', '🦌', '🐿️', '🦜', '🐸', '🦋']
const FOREST_TREES = ['🌲', '🌳', '🍄', '🌿', '🌾', '🌺', '🌻', '⭐']

export default function PhonicsForest() {
  const [gamePhase, setGamePhase] = useState('instructions') // instructions, playing, levelComplete, gameComplete
  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [completedLevels, setCompletedLevels] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [forestSparkles, setForestSparkles] = useState([])

  const currentLevelData = PHONICS_LEVELS[currentLevel]
  const currentExerciseData = currentLevelData?.exercises[currentExercise]

  const startGame = () => {
    setGamePhase('playing')
    setCurrentLevel(0)
    setCurrentExercise(0)
    setScore(0)
    setCorrectAnswers(0)
    setStreak(0)
    setMaxStreak(0)
    setCompletedLevels(0)
    setAchievements([])
    toast.success('Welcome to Phonics Forest! Ollie the Owl will guide you! 🦉')
  }

  const addForestSparkle = () => {
    const newSparkle = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: FOREST_TREES[Math.floor(Math.random() * FOREST_TREES.length)]
    }
    setForestSparkles(prev => [...prev, newSparkle])
    
    setTimeout(() => {
      setForestSparkles(prev => prev.filter(s => s.id !== newSparkle.id))
    }, 2000)
  }

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.warning('Please select an answer first!')
      return
    }

    setShowResult(true)
    let isCorrect = false

    // Check answer based on level type
    if (currentLevel === 0) {
      // Letter-sound matching
      isCorrect = selectedAnswer === currentExerciseData.letter
    } else if (currentLevel === 1) {
      // Sound blending
      isCorrect = selectedAnswer === currentExerciseData.word
    } else if (currentLevel === 2) {
      // Word building
      isCorrect = selectedAnswer === currentExerciseData.correct
    }

    if (isCorrect) {
      const points = 20 + (streak * 5) + (currentLevel * 10)
      setScore(prev => prev + points)
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
      setMaxStreak(prev => Math.max(prev, streak + 1))
      
      addForestSparkle()
      toast.success(`Excellent! +${points} points! 🌟`)
      
      // Check for achievements
      if (streak + 1 >= 5 && !achievements.includes('Phonics Champion')) {
        setAchievements(prev => [...prev, 'Phonics Champion'])
        toast.success('🏆 Achievement: Phonics Champion!')
      }
    } else {
      setStreak(0)
      toast.error('Not quite right! Ollie the Owl will help you try again! 🦉')
    }

    setTimeout(() => {
      if (currentExercise < currentLevelData.exercises.length - 1) {
        setCurrentExercise(prev => prev + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Level complete
        setGamePhase('levelComplete')
        const levelBonus = (currentLevel + 1) * 50
        setScore(prev => prev + levelBonus)
        setCompletedLevels(prev => prev + 1)
        toast.success(`🎉 Level ${currentLevel + 1} complete! +${levelBonus} bonus points!`)
      }
    }, 2500)
  }

  const nextLevel = () => {
    if (currentLevel < PHONICS_LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1)
      setCurrentExercise(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setGamePhase('playing')
      toast.info(`Starting Level ${currentLevel + 2}! New challenges await! 🌲`)
    } else {
      setGamePhase('gameComplete')
      
      // Final achievements
      const newAchievements = []
      if (correctAnswers >= 8) newAchievements.push('Forest Master')
      if (maxStreak >= 10) newAchievements.push('Sound Streak Legend')
      if (score >= 500) newAchievements.push('Phonics Wizard')
      if (correctAnswers === PHONICS_LEVELS.reduce((total, level) => total + level.exercises.length, 0)) {
        newAchievements.push('Perfect Reader')
      }
      
      setAchievements(prev => [...prev, ...newAchievements])
      newAchievements.forEach(achievement => {
        toast.success(`🏆 Achievement: ${achievement}!`)
      })
    }
  }

  const restartGame = () => {
    setGamePhase('instructions')
    setCurrentLevel(0)
    setCurrentExercise(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCorrectAnswers(0)
    setStreak(0)
    setMaxStreak(0)
    setCompletedLevels(0)
    setAchievements([])
    setForestSparkles([])
    toast.info('Phonics Forest reset! Ready for a new adventure! 🌿')
  }

  const renderExercise = () => {
    if (currentLevel === 0) {
      // Letter-sound matching
      return (
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">{currentExerciseData.animal}</div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">
            {currentExerciseData.sound}
          </h3>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            Which letter makes this sound?
          </p>
          
          <div className="flex justify-center space-x-4">
            {['A', 'B', 'C', 'D', 'E', 'F'].map((letter) => (
              <button
                key={letter}
                onClick={() => selectAnswer(letter)}
                className={`w-16 h-16 rounded-xl font-bold text-2xl transition-all duration-300 ${
                  selectedAnswer === letter
                    ? showResult
                      ? letter === currentExerciseData.letter
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showResult && letter === currentExerciseData.letter
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-surface-700 text-surface-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
                disabled={showResult}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (currentLevel === 1) {
      // Sound blending
      return (
        <div className="text-center">
          <div className="text-8xl mb-6 animate-pulse">{currentExerciseData.animal}</div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">
            Blend these sounds together:
          </h3>
          <div className="flex justify-center space-x-2 mb-6">
            {currentExerciseData.sounds.map((sound, index) => (
              <div key={index} className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                {sound}
              </div>
            ))}
          </div>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            {currentExerciseData.meaning}
          </p>
          
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {[currentExerciseData.word, 'HAT', 'SUN', 'PIG'].sort(() => Math.random() - 0.5).map((word) => (
              <button
                key={word}
                onClick={() => selectAnswer(word)}
                className={`p-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedAnswer === word
                    ? showResult
                      ? word === currentExerciseData.word
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showResult && word === currentExerciseData.word
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-surface-700 text-surface-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
                disabled={showResult}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (currentLevel === 2) {
      // Word building
      return (
        <div className="text-center">
          <div className="text-8xl mb-6 animate-wiggle">{currentExerciseData.animal}</div>
          <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">
            Complete the word:
          </h3>
          <div className="text-6xl font-bold text-green-600 mb-6 font-mono">
            {currentExerciseData.pattern}
          </div>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            What letter belongs in the blank?
          </p>
          
          <div className="flex justify-center space-x-4">
            {currentExerciseData.options.map((option) => (
              <button
                key={option}
                onClick={() => selectAnswer(option)}
                className={`w-16 h-16 rounded-xl font-bold text-2xl transition-all duration-300 ${
                  selectedAnswer === option
                    ? showResult
                      ? option === currentExerciseData.correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : showResult && option === currentExerciseData.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-surface-700 text-surface-800 dark:text-white hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    }
  }

  if (gamePhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
              <ApperIcon name="TreePine" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-2">Phonics Forest</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">Discover the magical sounds of letters with Ollie the Owl! 🦉</p>
          </div>

          <div className="space-y-4 text-surface-700 dark:text-surface-300">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p>Learn letter sounds with friendly forest animals</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p>Practice blending sounds to create words</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p>Build forest words using phonics patterns</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p>Earn achievements and become a reading master!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Enter the Forest</span>
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

  if (gamePhase === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Star" className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
            🎉 Level {currentLevel + 1} Complete!
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            {currentLevelData.title} mastered! Ollie the Owl is proud of you! 🦉
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-green-600">Total Score</div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-600">{maxStreak}</div>
              <div className="text-sm text-blue-600">Best Streak</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={nextLevel}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="ChevronRight" className="w-5 h-5" />
              <span>{currentLevel < PHONICS_LEVELS.length - 1 ? 'Next Level' : 'Complete Forest'}</span>
            </button>
            <Link
              to="/mini-games"
              className="px-6 py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Home" className="w-4 h-4" />
              <span>Game Hub</span>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  if (gamePhase === 'gameComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <main className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-3xl mx-auto bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game">
              <ApperIcon name="Crown" className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
              🎉 Phonics Forest Master!
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-300 mb-8">
              Congratulations! You've completed all levels and mastered the magic of phonics! Ollie the Owl declares you a Reading Champion! 🦉👑
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-green-600 font-medium">Final Score</div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{correctAnswers}</div>
                <div className="text-sm text-blue-600 font-medium">Correct Answers</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{maxStreak}</div>
                <div className="text-sm text-purple-600 font-medium">Best Streak</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-600">{completedLevels}</div>
                <div className="text-sm text-yellow-600 font-medium">Levels Mastered</div>
              </div>
            </div>

            {achievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">🏆 Achievements Earned</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white rounded-lg font-medium shadow-soft"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {achievement}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={restartGame}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
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
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 relative overflow-hidden">
      {/* Forest Sparkles */}
      {forestSparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-2xl pointer-events-none z-10"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], y: sparkle.y - 100 }}
          transition={{ duration: 2 }}
        >
          {sparkle.emoji}
        </motion.div>
      ))}
      
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ApperIcon name="TreePine" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Phonics Forest</h1>
                <p className="text-green-100">{currentLevelData.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{score}</div>
                <div className="text-sm text-green-100">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{streak}</div>
                <div className="text-sm text-green-100">Streak</div>
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

      <main className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="text-center mb-8">
          <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-4 inline-block shadow-floating">
            <div className="flex items-center space-x-4">
              <div className="text-4xl animate-bounce">🦉</div>
              <div>
                <h3 className="text-lg font-semibold text-surface-800 dark:text-white">
                  Level {currentLevel + 1}: {currentLevelData.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-300">
                  Exercise {currentExercise + 1} of {currentLevelData.exercises.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-soft"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`${currentLevel}-${currentExercise}`}
        >
          {renderExercise()}
          
          {!showResult && (
            <div className="text-center mt-8">
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-game hover:shadow-floating'
                }`}
              >
                Check Answer
              </button>
            </div>
          )}
          
          {showResult && (
            <motion.div 
              className="mt-8 p-6 bg-surface-50 dark:bg-surface-900/50 rounded-xl border border-surface-200 dark:border-surface-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedAnswer === (currentLevel === 0 ? currentExerciseData.letter : 
                                    currentLevel === 1 ? currentExerciseData.word : 
                                    currentExerciseData.correct) ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  <ApperIcon name={selectedAnswer === (currentLevel === 0 ? currentExerciseData.letter : 
                                                      currentLevel === 1 ? currentExerciseData.word : 
                                                      currentExerciseData.correct) ? 'Check' : 'X'} className="w-4 h-4 text-white" />
                </div>
                <p className="text-lg font-semibold text-surface-800 dark:text-white">
                  {selectedAnswer === (currentLevel === 0 ? currentExerciseData.letter : 
                                      currentLevel === 1 ? currentExerciseData.word : 
                                      currentExerciseData.correct) ? 
                    'Excellent work! 🌟' : 
                    `The correct answer is ${currentLevel === 0 ? currentExerciseData.letter : 
                                           currentLevel === 1 ? currentExerciseData.word : 
                                           currentExerciseData.correct}. Keep learning! 🦉`}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Level Progress */}
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">{currentLevel + 1}</div>
            <div className="text-sm text-surface-600 dark:text-surface-300">Current Level</div>
          </div>
          <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{currentExercise + 1}/{currentLevelData.exercises.length}</div>
            <div className="text-sm text-surface-600 dark:text-surface-300">Exercise Progress</div>
          </div>
          <div className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl p-6 shadow-soft text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">{correctAnswers}</div>
            <div className="text-sm text-surface-600 dark:text-surface-300">Correct Answers</div>
          </div>
        </div>
      </main>
    </div>
  )
}