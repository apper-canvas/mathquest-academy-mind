import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'

const CHARACTERS = [
  {
    id: 'maya',
    name: 'Maya the Explorer',
    description: 'A curious adventurer who loves discovering new places',
    avatar: '🗺️',
    traits: ['Brave', 'Curious', 'Resourceful']
  },
  {
    id: 'zach',
    name: 'Zach the Inventor',
    description: 'A young genius who creates amazing gadgets',
    avatar: '🔧',
    traits: ['Creative', 'Smart', 'Helpful']
  },
  {
    id: 'luna',
    name: 'Luna the Dreamer',
    description: 'A magical girl who can communicate with animals',
    avatar: '🌙',
    traits: ['Kind', 'Imaginative', 'Gentle']
  },
  {
    id: 'alex',
    name: 'Alex the Athlete',
    description: 'A sporty kid who never gives up on challenges',
    avatar: '⚽',
    traits: ['Determined', 'Strong', 'Fair']
  }
]

const SETTINGS = [
  {
    id: 'enchanted-forest',
    name: 'Enchanted Forest',
    description: 'A magical woodland filled with talking animals and mysterious creatures',
    emoji: '🌲',
    atmosphere: 'mysterious'
  },
  {
    id: 'space-station',
    name: 'Space Station Alpha',
    description: 'A futuristic outpost among the stars with alien visitors',
    emoji: '🚀',
    atmosphere: 'futuristic'
  },
  {
    id: 'underwater-city',
    name: 'Underwater City',
    description: 'A beautiful city beneath the waves with mermaids and sea creatures',
    emoji: '🏙️',
    atmosphere: 'aquatic'
  },
  {
    id: 'mountain-village',
    name: 'Mountain Village',
    description: 'A cozy village high in the mountains where dragons are friends',
    emoji: '🏔️',
    atmosphere: 'peaceful'
  }
]

const STORY_PATHS = {
  'enchanted-forest': {
    start: 'You enter the enchanted forest and hear a strange sound...',
    choices: [
      { text: 'Follow the sound deeper into the forest', outcome: 'discovery', points: 15 },
      { text: 'Call out to see if someone needs help', outcome: 'friendship', points: 20 },
      { text: 'Carefully investigate from a distance', outcome: 'wisdom', points: 18 }
    ]
  },
  'space-station': {
    start: 'Alarms are blinking on the space station control panel...',
    choices: [
      { text: 'Check the computer systems immediately', outcome: 'technical', points: 20 },
      { text: 'Look for other crew members first', outcome: 'teamwork', points: 18 },
      { text: 'Try to contact Earth for help', outcome: 'communication', points: 15 }
    ]
  },
  'underwater-city': {
    start: 'The underwater city\'s protective dome is cracking...',
    choices: [
      { text: 'Swim quickly to warn the mermaids', outcome: 'heroic', points: 20 },
      { text: 'Look for repair materials nearby', outcome: 'practical', points: 18 },
      { text: 'Use your special abilities to fix it', outcome: 'magical', points: 22 }
    ]
  },
  'mountain-village': {
    start: 'A baby dragon has lost its way home...',
    choices: [
      { text: 'Gently approach and offer to help', outcome: 'compassion', points: 20 },
      { text: 'Ask the villagers what to do', outcome: 'community', points: 16 },
      { text: 'Follow the dragon\'s footprints backward', outcome: 'detective', points: 18 }
    ]
  }
}

const VOCABULARY_WORDS = [
  { word: 'adventurous', definition: 'willing to take risks and try new things' },
  { word: 'courageous', definition: 'brave and not afraid of danger' },
  { word: 'perseverance', definition: 'continuing to try despite difficulties' },
  { word: 'empathy', definition: 'understanding how others feel' },
  { word: 'ingenuity', definition: 'cleverness in solving problems' },
  { word: 'curiosity', definition: 'wanting to learn and discover new things' }
]

export default function StoryBuilder() {
  const [gamePhase, setGamePhase] = useState('instructions') // instructions, character, setting, story, vocabulary, completion
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [storyChoices, setStoryChoices] = useState([])
  const [currentVocabulary, setCurrentVocabulary] = useState(null)
  const [score, setScore] = useState(0)
  const [creativity, setCreativity] = useState(0)
  const [coherence, setCoherence] = useState(0)
  const [vocabulary, setVocabulary] = useState(0)
  const [timeStarted, setTimeStarted] = useState(null)
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    if (gamePhase === 'character') {
      setTimeStarted(Date.now())
    }
  }, [gamePhase])

  const startGame = () => {
    setGamePhase('character')
    toast.success('Welcome to Story Builder! Let\'s create an amazing adventure! 📚')
  }

  const selectCharacter = (character) => {
    setSelectedCharacter(character)
    setCreativity(prev => prev + 10)
    setGamePhase('setting')
    toast.info(`Great choice! ${character.name} is ready for adventure! 🌟`)
  }

  const selectSetting = (setting) => {
    setSelectedSetting(setting)
    setCreativity(prev => prev + 15)
    setGamePhase('story')
    toast.info(`Perfect! The ${setting.name} awaits your story! ${setting.emoji}`)
  }

  const makeStoryChoice = (choice) => {
    const newChoices = [...storyChoices, choice]
    setStoryChoices(newChoices)
    setScore(prev => prev + choice.points)
    setCoherence(prev => prev + choice.points)
    
    if (newChoices.length < 3) {
      toast.success(`Great choice! +${choice.points} points! Continue your story...`)
    } else {
      setGamePhase('vocabulary')
      const randomVocab = VOCABULARY_WORDS[Math.floor(Math.random() * VOCABULARY_WORDS.length)]
      setCurrentVocabulary(randomVocab)
      toast.success('Excellent storytelling! Now let\'s learn a new word! 📖')
    }
  }

  const answerVocabulary = (isCorrect) => {
    if (isCorrect) {
      const vocabPoints = 25
      setScore(prev => prev + vocabPoints)
      setVocabulary(prev => prev + vocabPoints)
      toast.success(`Perfect! You understand "${currentVocabulary.word}"! +${vocabPoints} points! 🎉`)
    } else {
      toast.error(`Not quite! "${currentVocabulary.word}" means: ${currentVocabulary.definition}`)
    }
    
    setTimeout(() => {
      setGamePhase('completion')
      calculateFinalResults()
    }, 2000)
  }

  const calculateFinalResults = () => {
    const timeSpent = (Date.now() - timeStarted) / 1000
    const timeBonus = Math.max(0, 300 - timeSpent) * 2 // Bonus for quick completion
    setScore(prev => prev + timeBonus)
    
    const newAchievements = []
    if (creativity >= 50) newAchievements.push('Creative Genius')
    if (coherence >= 60) newAchievements.push('Master Storyteller')
    if (vocabulary >= 20) newAchievements.push('Word Wizard')
    if (timeSpent < 180) newAchievements.push('Speed Writer')
    if (score >= 200) newAchievements.push('Story Champion')
    
    setAchievements(newAchievements)
    
    newAchievements.forEach(achievement => {
      toast.success(`🏆 Achievement Unlocked: ${achievement}!`)
    })
  }

  const restartGame = () => {
    setGamePhase('instructions')
    setSelectedCharacter(null)
    setSelectedSetting(null)
    setStoryChoices([])
    setCurrentVocabulary(null)
    setScore(0)
    setCreativity(0)
    setCoherence(0)
    setVocabulary(0)
    setTimeStarted(null)
    setAchievements([])
    toast.info('Story Builder reset! Ready to create a new adventure! 📝')
  }

  if (gamePhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center p-4">
        <motion.div 
          className="max-w-2xl bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-game">
              <ApperIcon name="FileText" className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-surface-800 dark:text-white mb-2">Story Builder</h1>
            <p className="text-lg text-surface-600 dark:text-surface-300">Create amazing adventures through interactive storytelling!</p>
          </div>

          <div className="space-y-4 text-surface-700 dark:text-surface-300">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <p>Choose your main character from our diverse cast of heroes</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <p>Select an exciting setting for your adventure to unfold</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <p>Make story choices that shape your unique narrative</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">4</span>
              </div>
              <p>Learn new vocabulary words and earn achievements!</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={startGame}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Play" className="w-5 h-5" />
              <span>Start Creating</span>
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

  if (gamePhase === 'character') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Story Builder</h1>
                  <p className="text-blue-100">Choose Your Hero</p>
                </div>
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
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-surface-800 dark:text-white mb-4">Choose Your Main Character</h2>
            <p className="text-lg text-surface-600 dark:text-surface-300">Who will be the hero of your story?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {CHARACTERS.map((character) => (
              <motion.div
                key={character.id}
                className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-floating transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                onClick={() => selectCharacter(character)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{character.avatar}</div>
                  <h3 className="text-xl font-bold text-surface-800 dark:text-white mb-2">{character.name}</h3>
                  <p className="text-surface-600 dark:text-surface-300 mb-4">{character.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {character.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'setting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Story Builder</h1>
                  <p className="text-blue-100">Choose Your Setting</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{creativity}</div>
                  <div className="text-sm text-blue-100">Creativity</div>
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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">{selectedCharacter.avatar}</div>
              <div>
                <h2 className="text-3xl font-bold text-surface-800 dark:text-white">{selectedCharacter.name} needs an adventure!</h2>
                <p className="text-lg text-surface-600 dark:text-surface-300">Where will your story take place?</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {SETTINGS.map((setting) => (
              <motion.div
                key={setting.id}
                className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft hover:shadow-floating transition-all duration-300 cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                onClick={() => selectSetting(setting)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-pulse">{setting.emoji}</div>
                  <h3 className="text-xl font-bold text-surface-800 dark:text-white mb-2">{setting.name}</h3>
                  <p className="text-surface-600 dark:text-surface-300">{setting.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'story') {
    const currentPath = STORY_PATHS[selectedSetting.id]
    const storyStep = storyChoices.length
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Story Builder</h1>
                  <p className="text-blue-100">Chapter {storyStep + 1}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{score}</div>
                  <div className="text-sm text-blue-100">Score</div>
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
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-4xl">{selectedCharacter.avatar}</div>
                <div className="text-4xl">{selectedSetting.emoji}</div>
              </div>
              <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">
                {selectedCharacter.name} in the {selectedSetting.name}
              </h2>
            </div>

            <motion.div 
              className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-floating mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">Your Story Continues...</h3>
              <p className="text-lg text-surface-700 dark:text-surface-300 leading-relaxed mb-6">
                {storyStep === 0 ? currentPath.start : 
                 storyStep === 1 ? `After your first choice, you discover something unexpected in the ${selectedSetting.name}. The adventure deepens as new challenges appear...` :
                 `Your journey reaches its climax! The choices you've made have led to this moment. How will your story end?`}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-surface-800 dark:text-white">What does {selectedCharacter.name} do next?</h4>
                <div className="grid gap-4">
                  {currentPath.choices.map((choice, index) => (
                    <motion.button
                      key={index}
                      onClick={() => makeStoryChoice(choice)}
                      className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-soft hover:shadow-floating transition-all duration-300 text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <span>{choice.text}</span>
                        <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded">+{choice.points} pts</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {storyChoices.length > 0 && (
              <motion.div 
                className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h4 className="text-lg font-semibold text-surface-800 dark:text-white mb-4">Your Story So Far:</h4>
                <div className="space-y-3">
                  {storyChoices.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="text-surface-700 dark:text-surface-300">{choice.text}</span>
                      <span className="text-green-600 font-medium">+{choice.points}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'vocabulary') {
    const options = [
      currentVocabulary.definition,
      'a type of magical creature',
      'something that makes loud noises',
      'a way to travel quickly'
    ].sort(() => Math.random() - 0.5)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ApperIcon name="BookOpen" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Vocabulary Challenge</h1>
                  <p className="text-blue-100">Learn New Words</p>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{score}</div>
                <div className="text-sm text-blue-100">Score</div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-floating text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-game">
                <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">Vocabulary Builder</h2>
              <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
                Your story used some wonderful words! Let's learn more about this one:
              </p>
              
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 mb-6">
                <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                  {currentVocabulary.word}
                </h3>
                <p className="text-surface-600 dark:text-surface-300">What do you think this word means?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerVocabulary(option === currentVocabulary.definition)}
                    className="p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-medium shadow-soft hover:shadow-floating transition-all duration-300 hover:scale-105"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  if (gamePhase === 'completion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
        <main className="container mx-auto px-4 py-12">
          <motion.div 
            className="max-w-3xl mx-auto bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-floating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-game">
              <ApperIcon name="Trophy" className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-surface-800 dark:text-white mb-4">Story Complete!</h1>
            <p className="text-xl text-surface-600 dark:text-surface-300 mb-8">
              🎉 Congratulations! You've created an amazing adventure with {selectedCharacter.name} in the {selectedSetting.name}!
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-blue-600 font-medium">Total Score</div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-purple-600">{creativity}</div>
                <div className="text-sm text-purple-600 font-medium">Creativity</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-600">{coherence}</div>
                <div className="text-sm text-green-600 font-medium">Coherence</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-4">
                <div className="text-3xl font-bold text-yellow-600">{vocabulary}</div>
                <div className="text-sm text-yellow-600 font-medium">Vocabulary</div>
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
                className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Create New Story</span>
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