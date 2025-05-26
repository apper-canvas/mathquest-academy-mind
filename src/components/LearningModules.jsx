import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MATH_MODULES = {
  counting: {
    name: 'Counting Adventures',
    icon: 'Hash',
    color: 'from-blue-400 to-blue-600',
    description: 'Learn to count from 1 to 100 with fun activities',
    levels: [
      {
        name: 'Count to 10',
        exercises: [
          { type: 'count-objects', objects: 5, answer: 5 },
          { type: 'count-objects', objects: 8, answer: 8 },
          { type: 'count-objects', objects: 3, answer: 3 }
        ]
      },
      {
        name: 'Count to 20',
        exercises: [
          { type: 'count-objects', objects: 15, answer: 15 },
          { type: 'count-objects', objects: 12, answer: 12 },
          { type: 'count-objects', objects: 18, answer: 18 }
        ]
      },
      {
        name: 'Count to 100',
        exercises: [
          { type: 'skip-counting', pattern: 'by-2', start: 2, sequence: [2, 4, 6, 8, 10] },
          { type: 'skip-counting', pattern: 'by-5', start: 5, sequence: [5, 10, 15, 20, 25] },
          { type: 'skip-counting', pattern: 'by-10', start: 10, sequence: [10, 20, 30, 40, 50] }
        ]
      }
    ]
  },
  addition: {
    name: 'Addition Kingdom',
    icon: 'Plus',
    color: 'from-green-400 to-green-600',
    description: 'Master addition with interactive problem solving',
    levels: [
      {
        name: 'Single Digit Addition',
        exercises: [
          { type: 'addition', operand1: 3, operand2: 4, answer: 7 },
          { type: 'addition', operand1: 5, operand2: 2, answer: 7 },
          { type: 'addition', operand1: 6, operand2: 3, answer: 9 }
        ]
      },
      {
        name: 'Double Digit Addition',
        exercises: [
          { type: 'addition', operand1: 12, operand2: 15, answer: 27 },
          { type: 'addition', operand1: 23, operand2: 14, answer: 37 },
          { type: 'addition', operand1: 35, operand2: 22, answer: 57 }
        ]
      },
      {
        name: 'Addition with Carrying',
        exercises: [
          { type: 'addition', operand1: 47, operand2: 38, answer: 85 },
          { type: 'addition', operand1: 29, operand2: 56, answer: 85 },
          { type: 'addition', operand1: 68, operand2: 45, answer: 113 }
        ]
      }
    ]
  },
  subtraction: {
    name: 'Subtraction Valley',
    icon: 'Minus',
    color: 'from-purple-400 to-purple-600',
    description: 'Explore subtraction through visual problem solving',
    levels: [
      {
        name: 'Basic Subtraction',
        exercises: [
          { type: 'subtraction', operand1: 10, operand2: 3, answer: 7 },
          { type: 'subtraction', operand1: 15, operand2: 6, answer: 9 },
          { type: 'subtraction', operand1: 12, operand2: 5, answer: 7 }
        ]
      },
      {
        name: 'Borrowing Basics',
        exercises: [
          { type: 'subtraction', operand1: 32, operand2: 15, answer: 17 },
          { type: 'subtraction', operand1: 45, operand2: 27, answer: 18 },
          { type: 'subtraction', operand1: 63, operand2: 38, answer: 25 }
        ]
      },
      {
        name: 'Multi-Digit Subtraction',
        exercises: [
          { type: 'subtraction', operand1: 100, operand2: 47, answer: 53 },
          { type: 'subtraction', operand1: 85, operand2: 39, answer: 46 },
          { type: 'subtraction', operand1: 76, operand2: 28, answer: 48 }
        ]
      }
    ]
  },
  multiplication: {
    name: 'Multiplication Mountains',
    icon: 'X',
    color: 'from-red-400 to-red-600',
    description: 'Conquer multiplication tables and beyond',
    levels: [
      {
        name: 'Times Tables',
        exercises: [
          { type: 'multiplication', operand1: 3, operand2: 4, answer: 12 },
          { type: 'multiplication', operand1: 5, operand2: 6, answer: 30 },
          { type: 'multiplication', operand1: 7, operand2: 8, answer: 56 }
        ]
      },
      {
        name: 'Double Digits',
        exercises: [
          { type: 'multiplication', operand1: 12, operand2: 3, answer: 36 },
          { type: 'multiplication', operand1: 15, operand2: 4, answer: 60 },
          { type: 'multiplication', operand1: 18, operand2: 2, answer: 36 }
        ]
      },
      {
        name: 'Advanced Multiplication',
        exercises: [
          { type: 'multiplication', operand1: 23, operand2: 4, answer: 92 },
          { type: 'multiplication', operand1: 17, operand2: 5, answer: 85 },
          { type: 'multiplication', operand1: 26, operand2: 3, answer: 78 }
        ]
      }
    ]
  },
  division: {
    name: 'Division Desert',
    icon: 'Divide',
    color: 'from-orange-400 to-orange-600',
    description: 'Navigate through division challenges',
    levels: [
      {
        name: 'Simple Division',
        exercises: [
          { type: 'division', operand1: 12, operand2: 3, answer: 4 },
          { type: 'division', operand1: 20, operand2: 4, answer: 5 },
          { type: 'division', operand1: 18, operand2: 6, answer: 3 }
        ]
      },
      {
        name: 'Division with Remainders',
        exercises: [
          { type: 'division-remainder', operand1: 13, operand2: 4, quotient: 3, remainder: 1 },
          { type: 'division-remainder', operand1: 17, operand2: 5, quotient: 3, remainder: 2 },
          { type: 'division-remainder', operand1: 22, operand2: 7, quotient: 3, remainder: 1 }
        ]
      },
      {
        name: 'Long Division',
        exercises: [
          { type: 'division', operand1: 144, operand2: 12, answer: 12 },
          { type: 'division', operand1: 156, operand2: 13, answer: 12 },
          { type: 'division', operand1: 168, operand2: 14, answer: 12 }
        ]
      }
    ]
  },
  patterns: {
    name: 'Pattern Playground',
    icon: 'Repeat',
    color: 'from-teal-400 to-teal-600',
    description: 'Discover mathematical patterns and sequences',
    levels: [
      {
        name: 'Number Patterns',
        exercises: [
          { type: 'pattern', sequence: [2, 4, 6, 8], next: 10 },
          { type: 'pattern', sequence: [5, 10, 15, 20], next: 25 },
          { type: 'pattern', sequence: [1, 3, 5, 7], next: 9 }
        ]
      },
      {
        name: 'Shape Patterns',
        exercises: [
          { type: 'shape-pattern', pattern: ['circle', 'square', 'circle', 'square'], next: 'circle' },
          { type: 'shape-pattern', pattern: ['triangle', 'triangle', 'circle', 'triangle'], next: 'triangle' },
          { type: 'shape-pattern', pattern: ['square', 'circle', 'triangle', 'square'], next: 'circle' }
        ]
      },
      {
        name: 'Color Patterns',
        exercises: [
          { type: 'color-pattern', pattern: ['red', 'blue', 'red', 'blue'], next: 'red' },
          { type: 'color-pattern', pattern: ['yellow', 'green', 'yellow', 'green'], next: 'yellow' },
          { type: 'color-pattern', pattern: ['blue', 'red', 'yellow', 'blue'], next: 'red' }
        ]
      }
    ]
  },
  shapes: {
    name: 'Shape Safari',
    icon: 'Square',
    color: 'from-pink-400 to-pink-600',
    description: 'Explore geometry and shape recognition',
    levels: [
      {
        name: 'Basic Shapes',
        exercises: [
          { type: 'shape-recognition', shape: 'circle', options: ['circle', 'square', 'triangle'] },
          { type: 'shape-recognition', shape: 'square', options: ['circle', 'square', 'triangle'] },
          { type: 'shape-recognition', shape: 'triangle', options: ['circle', 'square', 'triangle'] }
        ]
      },
      {
        name: 'Shape Properties',
        exercises: [
          { type: 'shape-sides', shape: 'triangle', sides: 3 },
          { type: 'shape-sides', shape: 'square', sides: 4 },
          { type: 'shape-sides', shape: 'pentagon', sides: 5 }
        ]
      },
      {
        name: 'Area and Perimeter',
        exercises: [
          { type: 'area-rectangle', width: 4, height: 3, area: 12 },
          { type: 'perimeter-rectangle', width: 5, height: 2, perimeter: 14 },
          { type: 'area-square', side: 4, area: 16 }
        ]
      }
    ]
  }
}

export default function LearningModules() {
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [progress, setProgress] = useState({})
  const [exerciseComplete, setExerciseComplete] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('mathModulesProgress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const saveProgress = (moduleId, levelIndex, exerciseIndex, isCorrect) => {
    const newProgress = { ...progress }
    if (!newProgress[moduleId]) {
      newProgress[moduleId] = {}
    }
    if (!newProgress[moduleId][levelIndex]) {
      newProgress[moduleId][levelIndex] = { completed: [], score: 0 }
    }
    
    if (!newProgress[moduleId][levelIndex].completed.includes(exerciseIndex)) {
      newProgress[moduleId][levelIndex].completed.push(exerciseIndex)
    }
    
    if (isCorrect) {
      newProgress[moduleId][levelIndex].score += 10
    }
    
    setProgress(newProgress)
    localStorage.setItem('mathModulesProgress', JSON.stringify(newProgress))
  }

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId)
    setSelectedLevel(null)
    setCurrentExercise(0)
    setScore(0)
    setCorrectAnswers(0)
    setExerciseComplete(false)
  }

  const handleLevelSelect = (levelIndex) => {
    setSelectedLevel(levelIndex)
    setCurrentExercise(0)
    setUserAnswer('')
    setShowResult(false)
    setScore(0)
    setCorrectAnswers(0)
    setExerciseComplete(false)
  }

  const handleAnswerSubmit = () => {
    if (!userAnswer) {
      toast.error('Please provide an answer!')
      return
    }

    const module = MATH_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const exercise = level.exercises[currentExercise]
    
    let isCorrect = false
    
    // Check answer based on exercise type
    switch (exercise.type) {
      case 'count-objects':
      case 'addition':
      case 'subtraction':
      case 'multiplication':
      case 'division':
        isCorrect = parseInt(userAnswer) === exercise.answer
        break
      case 'division-remainder':
        const [quotient, remainder] = userAnswer.split(' r ')
        isCorrect = parseInt(quotient) === exercise.quotient && parseInt(remainder) === exercise.remainder
        break
      case 'pattern':
        isCorrect = parseInt(userAnswer) === exercise.next
        break
      case 'shape-pattern':
      case 'color-pattern':
        isCorrect = userAnswer.toLowerCase() === exercise.next.toLowerCase()
        break
      case 'shape-recognition':
        isCorrect = userAnswer.toLowerCase() === exercise.shape.toLowerCase()
        break
      case 'shape-sides':
        isCorrect = parseInt(userAnswer) === exercise.sides
        break
      case 'area-rectangle':
      case 'area-square':
        isCorrect = parseInt(userAnswer) === exercise.area
        break
      case 'perimeter-rectangle':
        isCorrect = parseInt(userAnswer) === exercise.perimeter
        break
      default:
        isCorrect = false
    }

    setShowResult(true)
    
    if (isCorrect) {
      setScore(score + 10)
      setCorrectAnswers(correctAnswers + 1)
      toast.success('Correct! Great job! 🎉')
      saveProgress(selectedModule, selectedLevel, currentExercise, true)
    } else {
      toast.error('Not quite right. Try again!')
      saveProgress(selectedModule, selectedLevel, currentExercise, false)
    }

    setTimeout(() => {
      nextExercise()
    }, 2000)
  }

  const nextExercise = () => {
    const module = MATH_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    
    if (currentExercise < level.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowResult(false)
    } else {
      setExerciseComplete(true)
      const percentage = Math.round((correctAnswers / level.exercises.length) * 100)
      
      if (percentage >= 90) {
        toast.success(`Outstanding! ${percentage}% correct! 🏆`)
      } else if (percentage >= 70) {
        toast.success(`Great job! ${percentage}% correct! 🌟`)
      } else {
        toast.warning(`Keep practicing! ${percentage}% correct. 📚`)
      }
    }
  }

  const resetLevel = () => {
    setCurrentExercise(0)
    setUserAnswer('')
    setShowResult(false)
    setScore(0)
    setCorrectAnswers(0)
    setExerciseComplete(false)
  }

  const renderExercise = () => {
    const module = MATH_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const exercise = level.exercises[currentExercise]

    switch (exercise.type) {
      case 'count-objects':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Count the objects below:
            </h3>
            <div className="grid grid-cols-5 gap-4 mb-6 max-w-md mx-auto">
              {Array.from({ length: exercise.objects }).map((_, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-soft animate-bounce-slow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-white font-bold">⭐</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="How many objects?"
                className="w-32 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                disabled={showResult}
              />
            </div>
          </div>
        )

      case 'addition':
      case 'subtraction':
      case 'multiplication':
      case 'division':
        const operators = {
          addition: '+',
          subtraction: '-',
          multiplication: '×',
          division: '÷'
        }
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Solve the problem:
            </h3>
            <div className="text-6xl font-bold text-primary mb-6">
              {exercise.operand1} {operators[exercise.type]} {exercise.operand2} = ?
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Answer"
                className="w-32 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                disabled={showResult}
              />
            </div>
          </div>
        )

      case 'division-remainder':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Solve with remainder:
            </h3>
            <div className="text-6xl font-bold text-primary mb-6">
              {exercise.operand1} ÷ {exercise.operand2} = ?
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="e.g., 3 r 1"
                className="w-40 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                disabled={showResult}
              />
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Format: quotient r remainder (e.g., 3 r 1)
              </p>
            </div>
          </div>
        )

      case 'pattern':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What comes next in the pattern?
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              {exercise.sequence.map((num, index) => (
                <div key={index} className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-game">
                  {num}
                </div>
              ))}
              <div className="w-16 h-16 border-2 border-dashed border-surface-400 rounded-xl flex items-center justify-center text-surface-400 text-2xl">
                ?
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Next number"
                className="w-32 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                disabled={showResult}
              />
            </div>
          </div>
        )

      case 'shape-pattern':
        const shapeIcons = {
          circle: '⭕',
          square: '⬜',
          triangle: '🔺'
        }
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What shape comes next?
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              {exercise.pattern.map((shape, index) => (
                <div key={index} className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center text-3xl shadow-game">
                  {shapeIcons[shape]}
                </div>
              ))}
              <div className="w-16 h-16 border-2 border-dashed border-surface-400 rounded-xl flex items-center justify-center text-surface-400 text-2xl">
                ?
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              {Object.entries(shapeIcons).map(([shape, icon]) => (
                <button
                  key={shape}
                  onClick={() => setUserAnswer(shape)}
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 ${
                    userAnswer === shape
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        )

      case 'shape-recognition':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Which shape is this?
            </h3>
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-6xl text-white shadow-game">
              {exercise.shape === 'circle' && '⭕'}
              {exercise.shape === 'square' && '⬜'}
              {exercise.shape === 'triangle' && '🔺'}
            </div>
            <div className="flex justify-center space-x-4">
              {exercise.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setUserAnswer(option)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    userAnswer === option
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Exercise coming soon!
            </h3>
          </div>
        )
    }
  }

  if (exerciseComplete) {
    const module = MATH_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const percentage = Math.round((correctAnswers / level.exercises.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center px-4">
        <motion.div 
          className="max-w-2xl w-full bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-floating border border-white/20 dark:border-surface-700/50 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${module.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game animate-bounce-slow`}>
            <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
            Level Complete!
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{score}</div>
              <div className="text-sm text-surface-600 dark:text-surface-400">Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">{correctAnswers}/{level.exercises.length}</div>
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
                onClick={() => {
                  setSelectedModule(null)
                  setSelectedLevel(null)
                  setExerciseComplete(false)
                }}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Home" className="w-5 h-5" />
                <span>Back to Modules</span>
              </button>
              
              <button
                onClick={resetLevel}
                className="flex-1 py-3 px-6 bg-white dark:bg-surface-700 text-surface-800 dark:text-white border border-surface-200 dark:border-surface-600 rounded-xl font-semibold hover:bg-surface-50 dark:hover:bg-surface-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (selectedModule && selectedLevel !== null) {
    const module = MATH_MODULES[selectedModule]
    const level = module.levels[selectedLevel]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-game`}>
                  <ApperIcon name={module.icon} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-surface-800 dark:text-white">
                    {module.name}
                  </h1>
                  <p className="text-sm text-surface-600 dark:text-surface-300">
                    {level.name}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedLevel(null)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                <span>Back to Levels</span>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
                  Exercise {currentExercise + 1} of {level.exercises.length}
                </span>
                <span className="text-sm font-medium text-surface-600 dark:text-surface-300">
                  Score: {score}
                </span>
              </div>
              <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${((currentExercise + 1) / level.exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Exercise Card */}
            <motion.div
              key={currentExercise}
              className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-floating border border-white/20 dark:border-surface-700/50"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderExercise()}

              {!showResult && (
                <div className="mt-8 text-center">
                  <motion.button
                    onClick={handleAnswerSubmit}
                    className={`px-8 py-4 bg-gradient-to-r ${module.color} text-white rounded-2xl font-semibold text-lg shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-3 mx-auto`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name="Send" className="w-5 h-5" />
                    <span>Submit Answer</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  if (selectedModule) {
    const module = MATH_MODULES[selectedModule]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        {/* Header */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <nav className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-game`}>
                  <ApperIcon name={module.icon} className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-surface-800 dark:text-white">
                  {module.name}
                </h1>
              </div>
              
              <button
                onClick={() => setSelectedModule(null)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
              >
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                <span>Back to Modules</span>
              </button>
            </div>
          </nav>
        </header>

        {/* Levels Grid */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
                Choose Your Level
              </h2>
              <p className="text-lg text-surface-600 dark:text-surface-300">
                {module.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {module.levels.map((level, index) => {
                const levelProgress = progress[selectedModule]?.[index]
                const completedExercises = levelProgress?.completed?.length || 0
                const totalExercises = level.exercises.length
                const completionPercentage = Math.round((completedExercises / totalExercises) * 100)

                return (
                  <motion.div
                    key={index}
                    className="group relative cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => handleLevelSelect(index)}
                  >
                    <div className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-floating transition-all duration-300 border border-white/20 dark:border-surface-700/50 game-card-hover">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-surface-800 dark:text-white">
                          {level.name}
                        </h3>
                        <div className={`w-8 h-8 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center`}>
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-surface-600 dark:text-surface-400">
                            Progress: {completedExercises}/{totalExercises}
                          </span>
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {completionPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${completionPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
                        {totalExercises} exercises
                      </p>
                      
                      {levelProgress?.score && (
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Star" className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                            {levelProgress.score} points earned
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </main>
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-game">
                <ApperIcon name="BookOpen" className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">
                Interactive Learning Modules
              </h1>
            </div>
            
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-xl font-medium shadow-soft hover:shadow-card transition-all duration-300 text-surface-700 dark:text-surface-300"
            >
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-surface-800 dark:text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Master Math Through
              <span className="text-gradient block sm:inline sm:ml-3">
                Interactive Learning
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-surface-600 dark:text-surface-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore comprehensive math modules with hands-on exercises and instant feedback
            </motion.p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(MATH_MODULES).map(([moduleId, module], index) => {
              const moduleProgress = progress[moduleId]
              const totalLevels = module.levels.length
              const completedLevels = moduleProgress ? Object.keys(moduleProgress).length : 0
              const completionPercentage = Math.round((completedLevels / totalLevels) * 100)

              return (
                <motion.div
                  key={moduleId}
                  className="group relative cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleModuleSelect(moduleId)}
                >
                  <div className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-6 shadow-soft hover:shadow-floating transition-all duration-300 border border-white/20 dark:border-surface-700/50 game-card-hover">
                    <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-game group-hover:animate-bounce-slow`}>
                      <ApperIcon name={module.icon} className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-surface-800 dark:text-white mb-2 text-center">
                      {module.name}
                    </h3>
                    
                    <p className="text-surface-600 dark:text-surface-300 text-center mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-surface-600 dark:text-surface-400">
                          Progress: {completedLevels}/{totalLevels} levels
                        </span>
                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                          {completionPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm text-surface-600 dark:text-surface-400">
                        {totalLevels} levels • Interactive exercises
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}