import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const READING_PASSAGES = [
  {
    id: 1,
    title: 'The Brave Little Mouse',
    difficulty: 'Easy',
    passage: `Once upon a time, in a cozy little house, lived a tiny mouse named Max. Max was much smaller than all the other mice, but he had the biggest heart in the whole mouse family. 

One dark night, Max heard a strange noise coming from the kitchen. All the other mice were too scared to investigate, but Max knew he had to be brave. He tiptoed quietly through the house, his little heart beating fast.

When Max reached the kitchen, he discovered that a family of hungry birds had found their way inside through an open window. The birds were looking for food, just like the mice often did. Instead of being frightened, Max had an idea. 

He gathered some breadcrumbs and seeds that had fallen on the floor and showed the birds where to find them. The birds were so grateful that they promised to share any food they found outside with the mouse family. From that day on, Max was known as the bravest and kindest mouse in the house.`,
    questions: [
      {
        question: 'What made Max different from the other mice?',
        options: [
          'He was much smaller than the others',
          'He was the fastest runner',
          'He was the oldest mouse',
          'He had the longest tail'
        ],
        correct: 0,
        explanation: 'The passage states that "Max was much smaller than all the other mice, but he had the biggest heart."'
      },
      {
        question: 'Why did Max go to the kitchen?',
        options: [
          'He was hungry and wanted food',
          'He heard a strange noise and wanted to investigate',
          'He was looking for his family',
          'He wanted to clean up the mess'
        ],
        correct: 1,
        explanation: 'Max heard a strange noise from the kitchen and decided to investigate, even though other mice were too scared.'
      },
      {
        question: 'How did Max solve the problem with the birds?',
        options: [
          'He chased them away',
          'He called for help from other mice',
          'He shared food with them and made friends',
          'He hid until they left'
        ],
        correct: 2,
        explanation: 'Max showed kindness by gathering breadcrumbs and seeds for the hungry birds, making them friends instead of enemies.'
      }
    ]
  },
  {
    id: 2,
    title: 'The Mystery of the Disappearing Books',
    difficulty: 'Medium',
    passage: `Sarah loved spending time in the old town library. Every afternoon after school, she would curl up in her favorite corner with a good book. But lately, something strange had been happening.

Books were disappearing from the shelves, but they weren't being checked out. The librarian, Mrs. Chen, was puzzled and worried. Some of her most valuable old books had vanished without a trace.

"I don't understand it," Mrs. Chen told Sarah one afternoon. "The books are here in the morning, but by evening, they're gone. I've checked the checkout records, and none of these books have been borrowed."

Sarah decided to solve this mystery. She noticed that the missing books all came from the same section – the rare books area near the back wall. She also observed that the disappearances only happened on days when the library stayed open late.

One evening, Sarah hid behind a tall bookshelf and waited. As the sun set, she heard a soft rustling sound. To her amazement, she saw a family of raccoons climbing through a loose window screen! The clever animals had learned to open the simple latches on the display cases and were taking the books back to their den.

Sarah quickly but quietly alerted Mrs. Chen. Together, they gently guided the raccoons back outside and secured the window. The next day, they found all the missing books in a neat pile in a tree hollow, completely undamaged. The raccoons, it seemed, just enjoyed collecting interesting objects!`,
    questions: [
      {
        question: 'What pattern did Sarah notice about the missing books?',
        options: [
          'They were all the same color',
          'They all came from the rare books section and disappeared on late-night days',
          'They were all written by the same author',
          'They were all very thick books'
        ],
        correct: 1,
        explanation: 'Sarah observed that all missing books came from the rare books area and only disappeared on days when the library stayed open late.'
      },
      {
        question: 'How did Sarah solve the mystery?',
        options: [
          'She asked the librarian for help',
          'She checked the security cameras',
          'She hid and observed what was happening',
          'She followed footprints'
        ],
        correct: 2,
        explanation: 'Sarah decided to hide behind a bookshelf and wait to see what was causing the books to disappear.'
      },
      {
        question: 'What can we infer about the raccoons from this story?',
        options: [
          'They were trying to destroy the books',
          'They were intelligent and liked to collect things',
          'They were looking for food in the books',
          'They were trying to learn to read'
        ],
        correct: 1,
        explanation: 'The raccoons were clever enough to open latches and seemed to enjoy collecting interesting objects, as shown by their careful handling of the books.'
      }
    ]
  },
  {
    id: 3,
    title: 'The Time Capsule Discovery',
    difficulty: 'Hard',
    passage: `When the old oak tree in Maplewood Park had to be removed due to storm damage, nobody expected what the work crew would find buried beneath its massive roots. Wrapped in oiled cloth and sealed in a metal box was a time capsule from 1923, nearly a century old.

The discovery created quite a stir in the small town. Mayor Johnson called a special town meeting, and Dr. Martinez, the local historian, was asked to oversee the opening of the capsule. The entire community gathered in the park on a sunny Saturday morning to witness this historic moment.

Inside the time capsule, they found a collection of items that painted a vivid picture of life in 1923: handwritten letters from schoolchildren describing their hopes for the future, photographs of the town's main street lined with Model T cars, a newspaper announcing the first transatlantic radio broadcast, and a small leather journal belonging to the town's founder.

But perhaps the most intriguing item was a detailed map showing the locations of three more time capsules hidden throughout the town. The map was signed by the "Maplewood Future Society," a group of townspeople who had apparently made it their mission to preserve pieces of their time for future generations.

Dr. Martinez explained to the crowd that this discovery was significant not just for its historical value, but for what it revealed about human nature. "These people understood something profound," she said. "They knew that connecting the past to the future requires deliberate action. They weren't content to let their stories be forgotten."

The town council decided to create a new tradition: every 25 years, they would bury a new time capsule, and every 100 years, they would open the previous one. The first new capsule would include items from the present day, along with the children's written predictions about what life might be like in 2048.`,
    questions: [
      {
        question: 'Based on the passage, what was the main motivation of the "Maplewood Future Society"?',
        options: [
          'To become famous in their town',
          'To hide valuable treasures for their families',
          'To preserve their stories and connect with future generations',
          'To create a mystery for people to solve'
        ],
        correct: 2,
        explanation: 'Dr. Martinez explains that the society understood the importance of "connecting the past to the future" and weren\'t content to let their stories be forgotten.'
      },
      {
        question: 'What does the discovery suggest about the theme of time and legacy?',
        options: [
          'The past is not important to understand',
          'People have always been interested in preserving their legacy for the future',
          'Time capsules are just for fun and entertainment',
          'Only important people should be remembered'
        ],
        correct: 1,
        explanation: 'The story shows how people in 1923 deliberately took action to preserve their time period and connect with future generations, demonstrating a universal human desire to leave a legacy.'
      },
      {
        question: 'How does the town council\'s decision at the end reflect the story\'s message?',
        options: [
          'They want to copy exactly what the previous generation did',
          'They understand the value of the tradition and want to continue the cycle of connection',
          'They think time capsules are profitable for the town',
          'They want to find the other three time capsules quickly'
        ],
        correct: 1,
        explanation: 'By creating a regular tradition of burying and opening time capsules, the town council shows they understood and embraced the original society\'s vision of connecting past and future generations.'
      }
    ]
  }
]

export default function ComprehensionQuest() {
  const [gamePhase, setGamePhase] = useState('instructions') // instructions, reading, questions, results, gameComplete
  const [currentPassage, setCurrentPassage] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [comprehensionPoints, setComprehensionPoints] = useState(0)
  const [inferencePoints, setInferencePoints] = useState(0)
  const [analysisPoints, setAnalysisPoints] = useState(0)
  const [achievements, setAchievements] = useState([])
  const [startTime, setStartTime] = useState(null)

  const currentPassageData = READING_PASSAGES[currentPassage]
  const currentQuestionData = currentPassageData?.questions[currentQuestion]

  useEffect(() => {
    let timer
    if (gamePhase === 'reading' && startTime) {
      timer = setInterval(() => {
        setReadingTime(Date.now() - startTime)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gamePhase, startTime])

  const startGame = () => {
    setGamePhase('reading')
    setCurrentPassage(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setScore(0)
    setReadingTime(0)
    setComprehensionPoints(0)
    setInferencePoints(0)
    setAnalysisPoints(0)
    setAchievements([])
    setStartTime(Date.now())
    toast.success('Welcome to Comprehension Quest! Embark on your reading adventure! 📖')
  }

  const finishReading = () => {
    const timeSpent = Date.now() - startTime
    setReadingTime(timeSpent)
    setGamePhase('questions')
    setCurrentQuestion(0)
    toast.info('Great reading! Now let\'s test your comprehension! 🧠')
  }

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const submitAnswer = () => {
    if (selectedAnswer === null) {
      toast.warning('Please select an answer first!')
      return
    }

    const isCorrect = selectedAnswer === currentQuestionData.correct
    const newAnswer = {
      questionIndex: currentQuestion,
      selected: selectedAnswer,
      correct: currentQuestionData.correct,
      isCorrect
    }

    setAnswers(prev => [...prev, newAnswer])

    if (isCorrect) {
      const points = 25 + (currentPassage * 10) // More points for harder passages
      setScore(prev => prev + points)
      
      // Categorize points by skill type
      if (currentQuestion === 0) {
        setComprehensionPoints(prev => prev + points)
      } else if (currentQuestion === 1) {
        setInferencePoints(prev => prev + points)
      } else {
        setAnalysisPoints(prev => prev + points)
      }
      
      toast.success(`Excellent! +${points} points! 🌟`)
    } else {
      toast.error('Not quite right. Read the explanation to learn more! 📚')
    }

    setTimeout(() => {
      if (currentQuestion < currentPassageData.questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        setGamePhase('results')
        calculatePassageResults()
      }
    }, 3000)
  }

  const calculatePassageResults = () => {
    const passageAnswers = answers.slice(-currentPassageData.questions.length)
    const correctCount = passageAnswers.filter(a => a.isCorrect).length
    const totalQuestions = currentPassageData.questions.length
    
    const timeBonus = readingTime < 120000 ? 50 : readingTime < 180000 ? 25 : 0 // Bonus for efficient reading
    setScore(prev => prev + timeBonus)
    
    if (timeBonus > 0) {
      toast.success(`Time bonus! +${timeBonus} points for efficient reading! ⏰`)
    }
    
    // Check for achievements
    const newAchievements = []
    if (correctCount === totalQuestions) {
      newAchievements.push('Perfect Comprehension')
    }
    if (readingTime < 90000) {
      newAchievements.push('Speed Reader')
    }
    if (currentPassage === 2 && correctCount >= 2) {
      newAchievements.push('Analysis Master')
    }
    
    setAchievements(prev => [...prev, ...newAchievements])
    newAchievements.forEach(achievement => {
      toast.success(`🏆 Achievement: ${achievement}!`)
    })
    
    setTimeout(() => {
      if (currentPassage < READING_PASSAGES.length - 1) {
        setGamePhase('reading')
        setCurrentPassage(prev => prev + 1)
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setStartTime(Date.now())
        toast.info(`Starting ${READING_PASSAGES[currentPassage + 1].title}! 📖`)
      } else {
        setGamePhase('gameComplete')
        calculateFinalResults()
      }
    }, 4000)
  }

  const calculateFinalResults = () => {
    const totalCorrect = answers.filter(a => a.isCorrect).length
    const totalQuestions = READING_PASSAGES.reduce((total, passage) => total + passage.questions.length, 0)
    
    const finalAchievements = []
    if (totalCorrect === totalQuestions) {
      finalAchievements.push('Reading Champion')
    }
    if (totalCorrect >= totalQuestions * 0.8) {
      finalAchievements.push('Comprehension Master')
    }
    if (score >= 400) {
      finalAchievements.push('Quest Legend')
    }
    
    setAchievements(prev => [...prev, ...finalAchievements])
    finalAchievements.forEach(achievement => {
      toast.success(`🏆 Final Achievement: ${achievement}!`)
    })
  }

  const restartGame = () => {
    setGamePhase('instructions')
    setCurrentPassage(0)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setScore(0)
    setReadingTime(0)
    setComprehensionPoints(0)
    setInferencePoints(0)
    setAnalysisPoints(0)
    setAchievements([])
    setStartTime(null)
    toast.info('Comprehension Quest reset! Ready for a new reading adventure! 📚')
  }

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (gamePhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
              <ApperIcon name="ScrollText" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-2">Comprehension Quest</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">Embark on epic reading adventures that challenge your understanding!</p>
          </div>

          <div className="space-y-4 text-surface-700 dark:text-surface-300">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p>Read engaging stories and passages at your own pace</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p>Answer comprehension questions that test different reading skills</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p>Progress through increasingly challenging texts and concepts</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p>Develop critical thinking and analysis skills through literature!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Begin Quest</span>
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

  if (gamePhase === 'reading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="ScrollText" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Comprehension Quest</h1>
                  <p className="text-indigo-100">{currentPassageData.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold">{formatTime(readingTime)}</div>
                  <div className="text-sm text-indigo-100">Reading Time</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{currentPassage + 1}/{READING_PASSAGES.length}</div>
                  <div className="text-sm text-indigo-100">Passage</div>
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
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-floating mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-surface-800 dark:text-white">{currentPassageData.title}</h2>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPassageData.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                    currentPassageData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {currentPassageData.difficulty}
                  </span>
                </div>
                <div className="text-4xl">📖</div>
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none text-surface-700 dark:text-surface-300 leading-relaxed">
                {currentPassageData.passage.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <div className="text-center">
              <button
                onClick={finishReading}
                className="py-3 px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <ApperIcon name="CheckSquare" className="w-5 h-5" />
                <span>I've Finished Reading</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'questions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="Brain" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Comprehension Questions</h1>
                  <p className="text-indigo-100">{currentPassageData.title}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-xl font-bold">{score}</div>
                  <div className="text-sm text-indigo-100">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{currentQuestion + 1}/{currentPassageData.questions.length}</div>
                  <div className="text-sm text-indigo-100">Question</div>
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
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-floating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentQuestion}
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
                  <ApperIcon name="HelpCircle" className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-bold text-surface-800 dark:text-white mb-4">
                  Question {currentQuestion + 1}
                </h2>
                <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed">
                  {currentQuestionData.question}
                </p>
              </div>
              
              <div className="space-y-3 mb-8">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full p-4 text-left rounded-xl font-medium transition-all duration-300 border-2 ${
                      selectedAnswer === index
                        ? 'bg-indigo-500 text-white border-indigo-600 shadow-game'
                        : 'bg-white dark:bg-surface-700 text-surface-800 dark:text-white border-surface-200 dark:border-surface-600 hover:border-indigo-400 hover:shadow-card'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        selectedAnswer === index ? 'bg-white/20' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className={`py-3 px-8 rounded-xl font-semibold transition-all duration-300 ${
                    selectedAnswer === null
                      ? 'bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-game hover:shadow-floating'
                  }`}
                >
                  Submit Answer
                </button>
              </div>
              
              {answers.length > 0 && answers[answers.length - 1].questionIndex === currentQuestion && (
                <motion.div 
                  className="mt-8 p-6 bg-surface-50 dark:bg-surface-900/50 rounded-xl border border-surface-200 dark:border-surface-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      answers[answers.length - 1].isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <ApperIcon name={answers[answers.length - 1].isCorrect ? 'Check' : 'X'} className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-800 dark:text-white mb-2">
                        {answers[answers.length - 1].isCorrect ? 'Excellent!' : 'Learning Opportunity'}
                      </h4>
                      <p className="text-surface-600 dark:text-surface-300 text-sm">
                        {currentQuestionData.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'results') {
    const passageAnswers = answers.slice(-currentPassageData.questions.length)
    const correctCount = passageAnswers.filter(a => a.isCorrect).length
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">
            📖 {currentPassageData.title} Complete!
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            You answered {correctCount} out of {currentPassageData.questions.length} questions correctly!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-indigo-600">{score}</div>
              <div className="text-sm text-indigo-600">Total Score</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-600">{formatTime(readingTime)}</div>
              <div className="text-sm text-purple-600">Reading Time</div>
            </div>
          </div>
          
          <p className="text-surface-600 dark:text-surface-300">
            {currentPassage < READING_PASSAGES.length - 1 ? 
              'Get ready for the next passage!' : 
              'Preparing your final results...'}
          </p>
        </motion.div>
      </div>
    )
  }

  if (gamePhase === 'gameComplete') {
    const totalCorrect = answers.filter(a => a.isCorrect).length
    const totalQuestions = READING_PASSAGES.reduce((total, passage) => total + passage.questions.length, 0)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <main className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-4xl mx-auto bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game">
              <ApperIcon name="Crown" className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">
              🎉 Comprehension Quest Complete!
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-300 mb-8">
              Congratulations! You've completed all reading passages and demonstrated excellent comprehension skills!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-indigo-600">{score}</div>
                <div className="text-sm text-indigo-600 font-medium">Final Score</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{totalCorrect}/{totalQuestions}</div>
                <div className="text-sm text-purple-600 font-medium">Questions Correct</div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{comprehensionPoints}</div>
                <div className="text-sm text-blue-600 font-medium">Comprehension</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">{analysisPoints}</div>
                <div className="text-sm text-green-600 font-medium">Analysis</div>
              </div>
            </div>

            {achievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">🏆 Achievements Unlocked</h3>
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
                className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>New Quest</span>
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

  return null
}