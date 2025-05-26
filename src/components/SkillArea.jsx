import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const SKILL_CONTENT = {
  'addition-world': {
    name: 'Addition Kingdom',
    icon: 'Plus',
    color: 'from-green-400 to-green-600',
    levels: {
      1: {
        name: 'Basic Addition',
        questions: [
          { question: '3 + 5 = ?', options: [6, 7, 8, 9], correct: 2, points: 10 },
          { question: '12 + 8 = ?', options: [18, 19, 20, 21], correct: 2, points: 10 },
          { question: '15 + 7 = ?', options: [21, 22, 23, 24], correct: 1, points: 10 },
          { question: '9 + 6 = ?', options: [14, 15, 16, 17], correct: 1, points: 10 },
          { question: '4 + 9 = ?', options: [12, 13, 14, 15], correct: 1, points: 10 }
        ]
      },
      2: {
        name: 'Two-Digit Addition',
        questions: [
          { question: '23 + 45 = ?', options: [67, 68, 69, 70], correct: 1, points: 15 },
          { question: '56 + 32 = ?', options: [87, 88, 89, 90], correct: 1, points: 15 },
          { question: '74 + 19 = ?', options: [92, 93, 94, 95], correct: 1, points: 15 }
        ]
      },
      3: {
        name: 'Addition with Carrying',
        questions: [
          { question: '47 + 38 = ?', options: [84, 85, 86, 87], correct: 1, points: 20 },
          { question: '29 + 57 = ?', options: [85, 86, 87, 88], correct: 1, points: 20 },
          { question: '68 + 45 = ?', options: [112, 113, 114, 115], correct: 1, points: 20 }
        ]
      }
    }
  },
  'reading-world': {
    name: 'Reading Realm',
    icon: 'BookOpen',
    color: 'from-pink-400 to-pink-600',
    levels: {
      1: {
        name: 'Phonics Fundamentals',
        questions: [
          { question: 'Which word rhymes with "cat"?', options: ['dog', 'hat', 'run', 'big'], correct: 1, points: 10 },
          { question: 'What sound does "ph" make in "phone"?', options: ['p', 'f', 'ph', 'h'], correct: 1, points: 10 },
          { question: 'Which word starts with the "sh" sound?', options: ['sun', 'ship', 'sit', 'sand'], correct: 1, points: 10 },
          { question: 'What is the opposite of "hot"?', options: ['warm', 'cool', 'cold', 'fire'], correct: 2, points: 10 },
          { question: 'Complete: "The bird can ___"', options: ['swim', 'fly', 'dig', 'crawl'], correct: 1, points: 10 }
        ]
      },
      2: {
        name: 'Reading Comprehension',
        questions: [
          { question: 'In the story, why was the dog happy?', options: ['It was raining', 'It found a bone', 'It was sleepy', 'It was hungry'], correct: 1, points: 15 },
          { question: 'What is the main character feeling?', options: ['Sad', 'Excited', 'Angry', 'Tired'], correct: 1, points: 15 },
          { question: 'Where does the story take place?', options: ['School', 'Park', 'Home', 'Store'], correct: 1, points: 15 }
        ]
      },
      3: {
        name: 'Advanced Vocabulary',
        questions: [
          { question: 'What does "enormous" mean?', options: ['Very small', 'Very big', 'Very fast', 'Very slow'], correct: 1, points: 20 },
          { question: 'Which word means the same as "happy"?', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1, points: 20 },
          { question: 'What is a synonym for "beautiful"?', options: ['Ugly', 'Pretty', 'Scary', 'Loud'], correct: 1, points: 20 }
        ]
      }
    }
  }
}

export default function SkillArea() {
  const { skillId, levelId } = useParams()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [userProgress, setUserProgress] = useState({})

  const skillData = SKILL_CONTENT[skillId]
  const levelData = skillData?.levels[parseInt(levelId)]
  const questions = levelData?.questions || []
  const currentQuestionData = questions[currentQuestion]

  useEffect(() => {
    // Load user progress
    const savedProgress = localStorage.getItem('learningProgress')
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }
  }, [])

  useEffect(() => {
    if (!skillData || !levelData) {
      toast.error('Skill area not found!')
      navigate('/learning-map')
    }
  }, [skillId, levelId, skillData, levelData, navigate])

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.error('Please select an answer!')
      return
    }

    const isCorrect = selectedAnswer === currentQuestionData.correct
    setShowResult(true)

    if (isCorrect) {
      setScore(score + currentQuestionData.points)
      setCorrectAnswers(correctAnswers + 1)
      toast.success(`Correct! +${currentQuestionData.points} points`)
    } else {
      toast.error('Not quite right! Keep trying!')
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
      completeLevel()
    }
  }

  const completeLevel = () => {
    setGameComplete(true)
    const percentage = Math.round((correctAnswers / questions.length) * 100)
    
    // Update progress
    const savedProgress = localStorage.getItem('learningProgress')
    const progress = savedProgress ? JSON.parse(savedProgress) : {}
    
    if (!progress[skillId]) {
      progress[skillId] = { unlockedLevels: [], completedLevels: [], totalScore: 0 }
    }
    
    // Mark level as completed
    if (!progress[skillId].completedLevels.includes(parseInt(levelId))) {
      progress[skillId].completedLevels.push(parseInt(levelId))
    }
    
    // Unlock next level if score is good enough
    if (percentage >= 70) {
      const nextLevel = parseInt(levelId) + 1
      if (skillData.levels[nextLevel] && !progress[skillId].unlockedLevels.includes(nextLevel)) {
        progress[skillId].unlockedLevels.push(nextLevel)
        toast.success(`Level ${nextLevel} unlocked!`)
      }
      
      // Unlock other worlds based on progress
      if (skillId === 'addition-world' && nextLevel > 2) {
        if (!progress['subtraction-world']) {
          progress['subtraction-world'] = { unlockedLevels: [1], completedLevels: [], totalScore: 0 }
          toast.success('Subtraction Valley unlocked!')
        }
      }
    }
    
    progress[skillId].totalScore += score
    localStorage.setItem('learningProgress', JSON.stringify(progress))
    
    if (percentage >= 90) {
      toast.success(`Outstanding! ${percentage}% correct!`)
    } else if (percentage >= 70) {
      toast.success(`Great job! ${percentage}% correct!`)
    } else {
      toast.warning(`Keep practicing! ${percentage}% correct.`)
    }
  }

  const restartLevel = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCorrectAnswers(0)
    setGameComplete(false)
  }

  if (!skillData || !levelData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">Skill Area Not Found</h2>
          <Link to="/learning-map" className="btn-primary">
            Return to Learning Map
          </Link>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    const percentage = Math.round((correctAnswers / questions.length) * 100)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center px-4">
        <motion.div 
          className="max-w-2xl w-full bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-floating border border-white/20 dark:border-surface-700/50 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${skillData.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game animate-bounce-slow`}>
            <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-surface-800 dark:text-white mb-4">
            Level Complete!
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{score}</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{correctAnswers}/{questions.length}</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{percentage}%</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Accuracy</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/learning-map')}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Map" className="w-5 h-5" />
                <span>Back to Map</span>
              </button>
              
              <button
                onClick={restartLevel}
                className="flex-1 py-3 px-6 bg-white dark:bg-surface-700 text-surface-800 dark:text-white border border-surface-200 dark:border-surface-600 rounded-xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
            
            {parseInt(levelId) < Object.keys(skillData.levels).length && (
              <button
                onClick={() => {
                  const nextLevelId = parseInt(levelId) + 1;
                  const savedProgress = localStorage.getItem('learningProgress');
                  const progress = savedProgress ? JSON.parse(savedProgress) : {};
                  
                  // Check if next level exists
                  if (!skillData.levels[nextLevelId]) {
                    toast.error('No more levels available in this skill area!');
                    return;
                  }
                  
                  // Check if next level is unlocked
                  const skillProgress = progress[skillId];
                  if (!skillProgress || !skillProgress.unlockedLevels.includes(nextLevelId)) {
                    toast.warning(`Level ${nextLevelId} is locked! Complete more challenges to unlock it.`);
                    return;
                  }
                  
                  // Success - navigate to next level
                  toast.success(`Starting Level ${nextLevelId}: ${skillData.levels[nextLevelId].name}!`);
                  navigate(`/skill/${skillId}/level/${nextLevelId}`);
                }}
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="ArrowRight" className="w-5 h-5" />
                <span>Next Level</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
        <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link to="/learning-map" className="flex items-center space-x-2 sm:space-x-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${skillData.color} rounded-xl flex items-center justify-center shadow-game`}>
                <ApperIcon name={skillData.icon} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-white">
                  {skillData.name}
                </h1>
                <p className="text-sm text-surface-600 dark:text-surface-300">
                  {levelData.name}
                </p>
              </div>
            </Link>
            
            <Link
              to="/learning-map"
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Back to Map</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
                Score: {score}
              </span>
            </div>
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
              <div 
                className={`bg-gradient-to-r ${skillData.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 shadow-floating border border-white/20 dark:border-surface-700/50"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${skillData.color} text-white`}>
                <ApperIcon name={skillData.icon} className="w-4 h-4" />
                <span>{levelData.name}</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-800 dark:text-white mb-8 leading-relaxed">
              {currentQuestionData.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQuestionData.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQuestionData.correct
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'border-primary bg-primary/10 text-primary'
                      : showResult && index === currentQuestionData.correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'border-surface-200 dark:border-surface-600 bg-white/60 dark:bg-surface-700/60 text-surface-800 dark:text-white hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  whileHover={{ scale: showResult ? 1 : 1.02 }}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  disabled={showResult}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      selectedAnswer === index && showResult
                        ? index === currentQuestionData.correct
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : selectedAnswer === index
                        ? 'border-primary bg-primary text-white'
                        : showResult && index === currentQuestionData.correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-current'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium">
                      {option}
                    </span>
                    {showResult && index === currentQuestionData.correct && (
                      <ApperIcon name="Check" className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {!showResult ? (
              <motion.button
                onClick={submitAnswer}
                className={`w-full py-4 px-8 bg-gradient-to-r ${skillData.color} text-white rounded-2xl font-semibold text-lg shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name="Send" className="w-5 h-5" />
                <span>Submit Answer</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={nextQuestion}
                className="w-full py-4 px-8 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold text-lg shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ApperIcon name="ArrowRight" className="w-5 h-5" />
                <span>
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Level'}
                </span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}