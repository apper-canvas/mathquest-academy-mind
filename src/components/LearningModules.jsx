import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function LearningModules() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [progress, setProgress] = useState({})
  const [achievements, setAchievements] = useState([])
  const [currentExercise, setCurrentExercise] = useState(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [exerciseProgress, setExerciseProgress] = useState({})
  const [showTutorial, setShowTutorial] = useState(false)

  const mathModules = [
    {
      id: 'arithmetic',
      title: 'Arithmetic Operations',
      description: 'Master addition, subtraction, multiplication, and division',
      icon: 'Calculator',
      color: 'from-blue-500 to-blue-600',
      level: 'Beginner',
      exercises: [
        {
          id: 'addition',
          title: 'Addition Practice',
          type: 'calculation',
          problem: '25 + 17 = ?',
          answer: '42',
          tutorial: 'When adding numbers, line them up by place value and add from right to left.'
        },
        {
          id: 'subtraction',
          title: 'Subtraction Practice',
          type: 'calculation',
          problem: '68 - 29 = ?',
          answer: '39',
          tutorial: 'For subtraction, you may need to borrow from the next place value.'
        },
        {
          id: 'multiplication',
          title: 'Multiplication Practice',
          type: 'calculation',
          problem: '8 × 7 = ?',
          answer: '56',
          tutorial: 'Multiplication is repeated addition. 8 × 7 means adding 8 seven times.'
        },
        {
          id: 'division',
          title: 'Division Practice',
          type: 'calculation',
          problem: '84 ÷ 12 = ?',
          answer: '7',
          tutorial: 'Division asks: how many times does 12 go into 84?'
        }
      ]
    },
    {
      id: 'fractions',
      title: 'Fractions & Decimals',
      description: 'Understand parts of a whole and decimal notation',
      icon: 'PieChart',
      color: 'from-green-500 to-green-600',
      level: 'Intermediate',
      exercises: [
        {
          id: 'fraction-basics',
          title: 'Understanding Fractions',
          type: 'visual',
          problem: 'What fraction is shaded in the circle divided into 8 parts with 3 parts shaded?',
          answer: '3/8',
          tutorial: 'A fraction shows parts of a whole. The bottom number (denominator) shows total parts, the top (numerator) shows selected parts.'
        },
        {
          id: 'fraction-addition',
          title: 'Adding Fractions',
          type: 'calculation',
          problem: '1/4 + 2/4 = ?',
          answer: '3/4',
          tutorial: 'When adding fractions with the same denominator, add the numerators and keep the denominator.'
        },
        {
          id: 'decimal-conversion',
          title: 'Fraction to Decimal',
          type: 'conversion',
          problem: 'Convert 3/4 to decimal',
          answer: '0.75',
          tutorial: 'To convert a fraction to decimal, divide the numerator by the denominator.'
        }
      ]
    },
    {
      id: 'geometry',
      title: 'Geometry Basics',
      description: 'Explore shapes, angles, and spatial relationships',
      icon: 'Triangle',
      color: 'from-purple-500 to-purple-600',
      level: 'Intermediate',
      exercises: [
        {
          id: 'shape-recognition',
          title: 'Identify Shapes',
          type: 'visual',
          problem: 'How many sides does a hexagon have?',
          answer: '6',
          tutorial: 'A hexagon is a polygon with 6 sides and 6 angles.'
        },
        {
          id: 'area-calculation',
          title: 'Calculate Area',
          type: 'calculation',
          problem: 'What is the area of a rectangle with length 8 and width 5?',
          answer: '40',
          tutorial: 'Area of a rectangle = length × width'
        },
        {
          id: 'perimeter-calculation',
          title: 'Calculate Perimeter',
          type: 'calculation',
          problem: 'What is the perimeter of a square with side length 6?',
          answer: '24',
          tutorial: 'Perimeter of a square = 4 × side length'
        }
      ]
    },
    {
      id: 'algebra',
      title: 'Introduction to Algebra',
      description: 'Learn variables, equations, and problem solving',
      icon: 'Variable',
      color: 'from-red-500 to-red-600',
      level: 'Advanced',
      exercises: [
        {
          id: 'solve-for-x',
          title: 'Solve for X',
          type: 'equation',
          problem: 'Solve: x + 5 = 12',
          answer: '7',
          tutorial: 'To solve for x, subtract 5 from both sides: x = 12 - 5 = 7'
        },
        {
          id: 'simplify-expression',
          title: 'Simplify Expression',
          type: 'calculation',
          problem: 'Simplify: 3x + 2x',
          answer: '5x',
          tutorial: 'Combine like terms by adding the coefficients: 3x + 2x = (3 + 2)x = 5x'
        },
        {
          id: 'word-problem',
          title: 'Word Problem',
          type: 'problem',
          problem: 'Sarah has 3 more apples than Tom. If Tom has x apples, how many does Sarah have?',
          answer: 'x + 3',
          tutorial: 'Translate words to math: "3 more than Tom" means Tom\'s amount + 3'
        }
      ]
    },
    {
      id: 'word-problems',
      title: 'Word Problems',
      description: 'Apply math skills to real-world scenarios',
      icon: 'FileText',
      color: 'from-orange-500 to-orange-600',
      level: 'All Levels',
      exercises: [
        {
          id: 'money-problem',
          title: 'Money Math',
          type: 'problem',
          problem: 'If you buy 3 books for $8 each, how much do you spend in total?',
          answer: '24',
          tutorial: 'Total cost = number of items × price per item = 3 × $8 = $24'
        },
        {
          id: 'time-problem',
          title: 'Time Calculation',
          type: 'problem',
          problem: 'A movie starts at 2:30 PM and lasts 2 hours 15 minutes. What time does it end?',
          answer: '4:45 PM',
          tutorial: 'Add the duration to start time: 2:30 PM + 2:15 = 4:45 PM'
        },
        {
          id: 'measurement-problem',
          title: 'Measurement',
          type: 'problem',
          problem: 'A recipe calls for 2.5 cups of flour. If you double the recipe, how much flour do you need?',
          answer: '5 cups',
          tutorial: 'Double means multiply by 2: 2.5 × 2 = 5 cups'
        }
      ]
    }
  ]

  useEffect(() => {
    // Initialize progress for all modules
    const initialProgress = {}
    mathModules.forEach(module => {
      initialProgress[module.id] = {
        completed: 0,
        total: module.exercises.length,
        score: 0
      }
    })
    setProgress(initialProgress)
  }, [])

  const handleModuleSelect = (module) => {
    setSelectedModule(module)
    setCurrentExercise(null)
    setUserAnswer('')
    toast.info(`Starting ${module.title} module!`)
  }

  const handleExerciseStart = (exercise) => {
    setCurrentExercise(exercise)
    setUserAnswer('')
    setShowTutorial(false)
    toast.info(`Starting: ${exercise.title}`)
  }

  const handleAnswerSubmit = () => {
    if (!currentExercise || !userAnswer.trim()) {
      toast.warning('Please enter your answer')
      return
    }

    const isCorrect = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
    
    if (isCorrect) {
      toast.success('Correct! Well done! 🎉')
      
      // Update progress
      setProgress(prev => {
        const moduleProgress = prev[selectedModule.id] || { completed: 0, total: selectedModule.exercises.length, score: 0 }
        const newCompleted = moduleProgress.completed + 1
        const newScore = moduleProgress.score + 10
        
        return {
          ...prev,
          [selectedModule.id]: {
            ...moduleProgress,
            completed: Math.min(newCompleted, selectedModule.exercises.length),
            score: newScore
          }
        }
      })

      // Check for achievements
      checkAchievements()
      
      // Move to next exercise or complete module
      setTimeout(() => {
        const currentIndex = selectedModule.exercises.findIndex(ex => ex.id === currentExercise.id)
        if (currentIndex < selectedModule.exercises.length - 1) {
          setCurrentExercise(selectedModule.exercises[currentIndex + 1])
          setUserAnswer('')
          toast.info('Moving to next exercise!')
        } else {
          toast.success('Module completed! Great work! 🏆')
          setCurrentExercise(null)
          setSelectedModule(null)
        }
      }, 1500)
    } else {
      toast.error('Not quite right. Try again or check the tutorial!')
    }
  }

  const checkAchievements = () => {
    const totalCompleted = Object.values(progress).reduce((sum, p) => sum + p.completed, 0)
    const totalScore = Object.values(progress).reduce((sum, p) => sum + p.score, 0)
    
    const newAchievements = []
    
    if (totalCompleted >= 5 && !achievements.includes('first-5')) {
      newAchievements.push('first-5')
      toast.success('🏅 Achievement: First 5 Exercises!')
    }
    
    if (totalCompleted >= 10 && !achievements.includes('exercise-master')) {
      newAchievements.push('exercise-master')
      toast.success('🏆 Achievement: Exercise Master!')
    }
    
    if (totalScore >= 100 && !achievements.includes('score-100')) {
      newAchievements.push('score-100')
      toast.success('⭐ Achievement: 100 Points!')
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements])
    }
  }

  const showTutorialModal = () => {
    setShowTutorial(true)
    toast.info('Tutorial opened')
  }

  const getModuleProgress = (moduleId) => {
    const moduleProgress = progress[moduleId]
    if (!moduleProgress) return 0
    return (moduleProgress.completed / moduleProgress.total) * 100
  }

  const getTotalProgress = () => {
    const totalExercises = mathModules.reduce((sum, module) => sum + module.exercises.length, 0)
    const totalCompleted = Object.values(progress).reduce((sum, p) => sum + p.completed, 0)
    return totalExercises > 0 ? (totalCompleted / totalExercises) * 100 : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-surface-900 dark:to-surface-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm shadow-soft border-b border-surface-200/50 dark:border-surface-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-surface-600 dark:text-surface-300 hover:text-primary transition-colors"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-surface-300 dark:bg-surface-600"></div>
              <h1 className="text-2xl font-bold text-gradient">Learning Modules - Math</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-surface-600 dark:text-surface-300">
                <span className="font-medium">Overall Progress: </span>
                <span className="text-primary font-bold">{Math.round(getTotalProgress())}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedModule ? (
            // Module Selection View
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Progress Overview */}
              <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <h2 className="text-xl font-bold text-surface-800 dark:text-white mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {Object.values(progress).reduce((sum, p) => sum + p.completed, 0)}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Exercises Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {Object.values(progress).reduce((sum, p) => sum + p.score, 0)}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">
                      {achievements.length}
                    </div>
                    <div className="text-sm text-surface-600 dark:text-surface-300">Achievements</div>
                  </div>
                </div>
              </div>

              {/* Math Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mathModules.map((module, index) => {
                  const moduleProgress = getModuleProgress(module.id)
                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => handleModuleSelect(module)}
                    >
                      <div className="relative p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-surface-700/50 shadow-soft hover:shadow-floating transition-all duration-300 game-card-hover">
                        <div className={`w-12 h-12 bg-gradient-to-r ${module.color} rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce-slow`}>
                          <ApperIcon name={module.icon} className="w-6 h-6 text-white" />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-surface-800 dark:text-white mb-2">
                          {module.title}
                        </h3>
                        
                        <p className="text-sm text-surface-600 dark:text-surface-300 mb-4">
                          {module.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            module.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            module.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            module.level === 'Advanced' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {module.level}
                          </span>
                          <span className="text-sm text-surface-600 dark:text-surface-300">
                            {module.exercises.length} exercises
                          </span>
                        </div>
                        
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-2">
                          <div 
                            className={`h-2 bg-gradient-to-r ${module.color} rounded-full transition-all duration-300`}
                            style={{ width: `${moduleProgress}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-surface-600 dark:text-surface-300 text-center">
                          {Math.round(moduleProgress)}% Complete
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ) : !currentExercise ? (
            // Exercise Selection View
            <motion.div
              key="exercises"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="flex items-center space-x-2 text-surface-600 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                  <span>Back to Modules</span>
                </button>
                
                <h2 className="text-2xl font-bold text-surface-800 dark:text-white">
                  {selectedModule.title}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedModule.exercises.map((exercise, index) => {
                  const isCompleted = exerciseProgress[exercise.id]?.completed || false
                  return (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      onClick={() => handleExerciseStart(exercise)}
                    >
                      <div className="relative p-6 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-surface-700/50 shadow-soft hover:shadow-card transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-surface-800 dark:text-white">
                            {exercise.title}
                          </h3>
                          {isCompleted && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <ApperIcon name="Check" className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-surface-600 dark:text-surface-300 mb-4">
                          Type: {exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-surface-500 dark:text-surface-400">
                            Click to start
                          </span>
                          <ApperIcon name="ChevronRight" className="w-5 h-5 text-surface-400 group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            // Exercise View
            <motion.div
              key="exercise"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentExercise(null)}
                  className="flex items-center space-x-2 text-surface-600 dark:text-surface-300 hover:text-primary transition-colors"
                >
                  <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                  <span>Back to Exercises</span>
                </button>
                
                <button
                  onClick={showTutorialModal}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ApperIcon name="HelpCircle" className="w-4 h-4" />
                  <span>Tutorial</span>
                </button>
              </div>
              
              <div className="bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-soft">
                <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-6 text-center">
                  {currentExercise.title}
                </h2>
                
                <div className="text-center mb-8">
                  <p className="text-lg text-surface-700 dark:text-surface-200 mb-6">
                    {currentExercise.problem}
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Enter your answer here..."
                      className="w-full px-4 py-3 text-lg text-center border-2 border-surface-300 dark:border-surface-600 rounded-xl bg-white/50 dark:bg-surface-700/50 focus:border-primary focus:outline-none transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleAnswerSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Answer
                  </button>
                  
                  <button
                    onClick={showTutorialModal}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 transform hover:scale-105"
                  >
                    Need Help?
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && currentExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-lg w-full shadow-floating"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-surface-800 dark:text-white">
                  Tutorial: {currentExercise.title}
                </h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="p-2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-surface-600 dark:text-surface-300 mb-6">
                {currentExercise.tutorial}
              </p>
              
              <div className="flex justify-end">
                <button
                  onClick={() => setShowTutorial(false)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}