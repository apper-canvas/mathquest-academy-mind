import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MainFeature() {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [gameStarted, setGameStarted] = useState(false)
  const [achievements, setAchievements] = useState([])
  
  const mathQuestions = [
    {
      question: "What is 12 + 8?",
      options: [18, 20, 22, 24],
      correct: 1,
      type: "math",
      points: 10
    },
    {
      question: "If you have 15 apples and eat 7, how many are left?",
      options: [6, 7, 8, 9],
      correct: 2,
      type: "math",
      points: 15
    },
    {
      question: "What is 6 × 4?",
      options: [20, 22, 24, 26],
      correct: 2,
      type: "math",
      points: 20
    }
  ]

  const readingQuestions = [
    {
      question: "Which word rhymes with 'cat'?",
      options: ["dog", "hat", "run", "big"],
      correct: 1,
      type: "reading",
      points: 10
    },
    {
      question: "What is the opposite of 'hot'?",
      options: ["warm", "cool", "cold", "fire"],
      correct: 2,
      type: "reading",
      points: 15
    },
    {
      question: "Complete the sentence: 'The bird can ___'",
      options: ["swim", "fly", "dig", "crawl"],
      correct: 1,
      type: "reading",
      points: 20
    }
  ]

  const [questions] = useState([...mathQuestions, ...readingQuestions])
  const [currentQuestionData, setCurrentQuestionData] = useState(questions[0])

  useEffect(() => {
    setCurrentQuestionData(questions[currentQuestion])
  }, [currentQuestion, questions])

  const startGame = () => {
    if (!playerName.trim()) {
      toast.error("Please enter your name to start the adventure!")
      return
    }
    setGameStarted(true)
    toast.success(`Welcome ${playerName}! Let's begin your learning quest!`)
  }

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer!")
      return
    }

    const isCorrect = selectedAnswer === currentQuestionData.correct
    setShowResult(true)

    if (isCorrect) {
      const newScore = score + currentQuestionData.points
      const newStreak = streak + 1
      setScore(newScore)
      setStreak(newStreak)
      toast.success(`Correct! +${currentQuestionData.points} points`)
      
      // Check for achievements
      if (newStreak === 3 && !achievements.includes('streak-master')) {
        setAchievements([...achievements, 'streak-master'])
        toast.success("🏆 Achievement Unlocked: Streak Master!")
      }
      if (newScore >= 100 && !achievements.includes('century-scorer')) {
        setAchievements([...achievements, 'century-scorer'])
        toast.success("🏆 Achievement Unlocked: Century Scorer!")
      }
    } else {
      setStreak(0)
      toast.error("Not quite right! Keep trying!")
    }

    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Game complete
      setCurrentLevel(currentLevel + 1)
      toast.success(`Level ${currentLevel} Complete! Moving to Level ${currentLevel + 1}`)
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setPlayerName('')
    setScore(0)
    setStreak(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setCurrentLevel(1)
    setAchievements([])
    toast.success("Game reset! Ready for a new adventure?")
  }

  if (!gameStarted) {
    return (
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 shadow-floating border border-white/20 dark:border-surface-700/50">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-game animate-float">
              <ApperIcon name="Rocket" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-800 dark:text-white mb-3 sm:mb-4">
              Start Your Quest
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-surface-600 dark:text-surface-300">
              Enter your name and begin an exciting learning adventure!
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-surface-700 dark:text-surface-300 mb-2 sm:mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your hero name..."
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-surface-200 dark:border-surface-600 bg-white/80 dark:bg-surface-700/80 text-surface-800 dark:text-white placeholder-surface-400 dark:placeholder-surface-400 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-sm sm:text-base"
                onKeyPress={(e) => e.key === 'Enter' && startGame()}
              />
            </div>

            <motion.button
              onClick={startGame}
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Play" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Begin Adventure</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center shadow-game">
              <ApperIcon name="User" className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-white">
                {playerName}
              </h3>
              <p className="text-sm sm:text-base text-surface-600 dark:text-surface-300">
                Level {currentLevel} Explorer
              </p>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="self-start sm:self-auto px-4 sm:px-6 py-2 sm:py-3 bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg sm:rounded-xl font-medium hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors duration-300 text-sm sm:text-base"
          >
            New Game
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/20 dark:border-surface-700/50">
            <div className="text-xl sm:text-2xl font-bold text-primary">{score}</div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Points</div>
          </div>
          <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/20 dark:border-surface-700/50">
            <div className="text-xl sm:text-2xl font-bold text-secondary">{streak}</div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Streak</div>
          </div>
          <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/20 dark:border-surface-700/50">
            <div className="text-xl sm:text-2xl font-bold text-accent">{currentQuestion + 1}</div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Question</div>
          </div>
          <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-white/20 dark:border-surface-700/50">
            <div className="text-xl sm:text-2xl font-bold text-game-green">{achievements.length}</div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">Badges</div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-floating border border-white/20 dark:border-surface-700/50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium ${
              currentQuestionData.type === 'math' 
                ? 'bg-game-blue/20 text-game-blue' 
                : 'bg-game-green/20 text-game-green'
            }`}>
              {currentQuestionData.type === 'math' ? '🧮 Math' : '📚 Reading'}
            </div>
            <div className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">
              {currentQuestionData.points} points
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-surface-800 dark:text-white mb-6 sm:mb-8 leading-relaxed">
            {currentQuestionData.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {currentQuestionData.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-left ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQuestionData.correct
                        ? 'border-game-green bg-game-green/10 text-game-green'
                        : 'border-red-500 bg-red-50 text-red-600'
                      : 'border-primary bg-primary/10 text-primary'
                    : showResult && index === currentQuestionData.correct
                    ? 'border-game-green bg-game-green/10 text-game-green'
                    : 'border-surface-200 dark:border-surface-600 bg-white/60 dark:bg-surface-700/60 text-surface-800 dark:text-white hover:border-primary/50 hover:bg-primary/5'
                }`}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                disabled={showResult}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-medium ${
                    selectedAnswer === index && showResult
                      ? index === currentQuestionData.correct
                        ? 'border-game-green bg-game-green text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : selectedAnswer === index
                      ? 'border-primary bg-primary text-white'
                      : showResult && index === currentQuestionData.correct
                      ? 'border-game-green bg-game-green text-white'
                      : 'border-current'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm sm:text-base lg:text-lg font-medium">
                    {option}
                  </span>
                  {showResult && index === currentQuestionData.correct && (
                    <ApperIcon name="Check" className="w-4 h-4 sm:w-5 sm:h-5 text-game-green ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {!showResult ? (
            <motion.button
              onClick={submitAnswer}
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="Send" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Answer</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={nextQuestion}
              className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-game-green to-game-blue text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name="ArrowRight" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Level'}
              </span>
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Achievements */}
      {achievements.length > 0 && (
        <motion.div 
          className="mt-6 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-white mb-3 sm:mb-4">
            🏆 Your Achievements
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-soft"
              >
                {achievement === 'streak-master' ? '🔥 Streak Master' : '💯 Century Scorer'}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}