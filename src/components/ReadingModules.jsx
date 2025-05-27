import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const READING_MODULES = {
  phonics: {
    name: 'Phonics Playground',
    icon: 'Volume2',
    color: 'from-blue-400 to-blue-600',
    description: 'Learn letter sounds and phonetic patterns',
    levels: [
      {
        name: 'Letter Sounds',
        exercises: [
          { type: 'phonics-match', letter: 'A', sound: 'ay', words: ['apple', 'ant', 'arrow'] },
          { type: 'phonics-match', letter: 'B', sound: 'buh', words: ['ball', 'bear', 'book'] },
          { type: 'phonics-match', letter: 'C', sound: 'kuh', words: ['cat', 'car', 'cake'] }
        ]
      },
      {
        name: 'Blending Sounds',
        exercises: [
          { type: 'blend-words', sounds: ['c', 'a', 't'], word: 'cat' },
          { type: 'blend-words', sounds: ['d', 'o', 'g'], word: 'dog' },
          { type: 'blend-words', sounds: ['r', 'u', 'n'], word: 'run' }
        ]
      },
      {
        name: 'Rhyming Patterns',
        exercises: [
          { type: 'rhyme-match', word: 'cat', rhymes: ['bat', 'hat', 'mat'], nonRhyme: 'dog' },
          { type: 'rhyme-match', word: 'sun', rhymes: ['fun', 'run', 'bun'], nonRhyme: 'car' },
          { type: 'rhyme-match', word: 'book', rhymes: ['look', 'took', 'cook'], nonRhyme: 'pen' }
        ]
      }
    ]
  },
  vocabulary: {
    name: 'Vocabulary Village',
    icon: 'BookOpen',
    color: 'from-green-400 to-green-600',
    description: 'Build your word knowledge and understanding',
    levels: [
      {
        name: 'Basic Words',
        exercises: [
          { type: 'word-picture', word: 'house', image: '🏠', options: ['house', 'car', 'tree'] },
          { type: 'word-picture', word: 'apple', image: '🍎', options: ['orange', 'apple', 'banana'] },
          { type: 'word-picture', word: 'dog', image: '🐕', options: ['cat', 'bird', 'dog'] }
        ]
      },
      {
        name: 'Synonyms & Antonyms',
        exercises: [
          { type: 'synonym-match', word: 'happy', synonym: 'joyful', options: ['sad', 'joyful', 'angry'] },
          { type: 'antonym-match', word: 'big', antonym: 'small', options: ['large', 'huge', 'small'] },
          { type: 'synonym-match', word: 'fast', synonym: 'quick', options: ['slow', 'quick', 'lazy'] }
        ]
      },
      {
        name: 'Context Clues',
        exercises: [
          { type: 'context-clue', sentence: 'The cat was very _____ after playing all day.', word: 'tired', options: ['happy', 'tired', 'hungry'] },
          { type: 'context-clue', sentence: 'She opened her _____ to let in fresh air.', word: 'window', options: ['door', 'window', 'book'] },
          { type: 'context-clue', sentence: 'The bright _____ helped him see in the dark.', word: 'light', options: ['sound', 'light', 'smell'] }
        ]
      }
    ]
  },
  comprehension: {
    name: 'Reading Comprehension',
    icon: 'Eye',
    color: 'from-purple-400 to-purple-600',
    description: 'Understand and analyze what you read',
    levels: [
      {
        name: 'Short Stories',
        exercises: [
          { 
            type: 'story-comprehension', 
            story: 'Sam has a red ball. He plays with it in the park. The ball rolls under a tree. Sam runs to get it.',
            question: 'What color is Sam\'s ball?',
            answer: 'red',
            options: ['blue', 'red', 'green']
          },
          { 
            type: 'story-comprehension', 
            story: 'Maya loves to read books. She reads every night before bed. Her favorite books are about animals.',
            question: 'When does Maya read?',
            answer: 'before bed',
            options: ['in the morning', 'before bed', 'at lunch']
          },
          { 
            type: 'story-comprehension', 
            story: 'The sun is shining bright today. Birds are singing in the trees. It\'s a perfect day for a picnic.',
            question: 'What kind of day is it?',
            answer: 'sunny',
            options: ['rainy', 'cloudy', 'sunny']
          }
        ]
      },
      {
        name: 'Main Ideas',
        exercises: [
          { 
            type: 'main-idea', 
            passage: 'Dogs make great pets. They are loyal and friendly. Dogs can learn tricks and help people. Many families love having dogs.',
            mainIdea: 'Dogs make great pets',
            options: ['Dogs can learn tricks', 'Dogs make great pets', 'Dogs are animals']
          },
          { 
            type: 'main-idea', 
            passage: 'Plants need water, sunlight, and soil to grow. Without these things, plants will die. Taking care of plants helps them stay healthy.',
            mainIdea: 'Plants need care to grow',
            options: ['Plants are green', 'Plants need care to grow', 'Plants make oxygen']
          }
        ]
      },
      {
        name: 'Story Details',
        exercises: [
          { 
            type: 'detail-question', 
            passage: 'Emma packed her blue backpack with books, pencils, and an apple. She walked to school with her friend Jake.',
            question: 'What did Emma pack in her backpack?',
            answer: 'books, pencils, and an apple',
            options: ['toys and games', 'books, pencils, and an apple', 'lunch and water']
          }
        ]
      }
    ]
  },
  sightWords: {
    name: 'Sight Words Safari',
    icon: 'Target',
    color: 'from-red-400 to-red-600',
    description: 'Master high-frequency sight words',
    levels: [
      {
        name: 'Common Words',
        exercises: [
          { type: 'sight-word-flash', word: 'the', options: ['the', 'they', 'then'] },
          { type: 'sight-word-flash', word: 'and', options: ['an', 'and', 'end'] },
          { type: 'sight-word-flash', word: 'you', options: ['you', 'your', 'yes'] }
        ]
      },
      {
        name: 'Word Families',
        exercises: [
          { type: 'word-family', family: '-at', words: ['cat', 'bat', 'hat', 'mat'], nonFamily: 'dog' },
          { type: 'word-family', family: '-an', words: ['can', 'man', 'ran', 'pan'], nonFamily: 'sun' },
          { type: 'word-family', family: '-et', words: ['pet', 'net', 'wet', 'set'], nonFamily: 'car' }
        ]
      },
      {
        name: 'Reading Fluency',
        exercises: [
          { type: 'fluency-read', sentence: 'The cat sat on the mat.', words: ['The', 'cat', 'sat', 'on', 'the', 'mat'] },
          { type: 'fluency-read', sentence: 'I can see a big dog.', words: ['I', 'can', 'see', 'a', 'big', 'dog'] },
          { type: 'fluency-read', sentence: 'We like to play games.', words: ['We', 'like', 'to', 'play', 'games'] }
        ]
      }
    ]
  },
  grammar: {
    name: 'Grammar Garden',
    icon: 'Edit3',
    color: 'from-orange-400 to-orange-600',
    description: 'Learn proper grammar and sentence structure',
    levels: [
      {
        name: 'Nouns - People, Places, Things',
        exercises: [
          { type: 'part-of-speech', word: 'teacher', partOfSpeech: 'noun', category: 'person', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'school', partOfSpeech: 'noun', category: 'place', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'book', partOfSpeech: 'noun', category: 'thing', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'doctor', partOfSpeech: 'noun', category: 'person', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'park', partOfSpeech: 'noun', category: 'place', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'car', partOfSpeech: 'noun', category: 'thing', options: ['noun', 'verb', 'adjective'] },
          { type: 'noun-category', word: 'firefighter', category: 'person', options: ['person', 'place', 'thing'] },
          { type: 'noun-category', word: 'library', category: 'place', options: ['person', 'place', 'thing'] },
          { type: 'noun-category', word: 'bicycle', category: 'thing', options: ['person', 'place', 'thing'] }
        ]
      },
      {
        name: 'Verbs - Action Words',
        exercises: [
          { type: 'part-of-speech', word: 'run', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'jump', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'sing', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'write', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'dance', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective'] },
          { type: 'verb-tense', word: 'walked', tense: 'past', options: ['present', 'past', 'future'] },
          { type: 'verb-tense', word: 'running', tense: 'present', options: ['present', 'past', 'future'] },
          { type: 'verb-tense', word: 'will play', tense: 'future', options: ['present', 'past', 'future'] },
          { type: 'action-verb', sentence: 'The cat _____ on the mat.', verb: 'sits', options: ['sits', 'happy', 'big'] }
        ]
      },
      {
        name: 'Adjectives - Describing Words',
        exercises: [
          { type: 'part-of-speech', word: 'big', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'happy', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'red', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'fast', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective'] },
          { type: 'part-of-speech', word: 'small', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective'] },
          { type: 'adjective-sentence', sentence: 'The _____ dog barked loudly.', adjective: 'loud', options: ['loud', 'run', 'quickly'] },
          { type: 'adjective-sentence', sentence: 'She wore a _____ dress.', adjective: 'beautiful', options: ['beautiful', 'dance', 'tomorrow'] },
          { type: 'adjective-sentence', sentence: 'The _____ ice cream melted.', adjective: 'cold', options: ['cold', 'melt', 'spoon'] },
          { type: 'compare-adjectives', word: 'bigger', comparison: 'comparative', options: ['positive', 'comparative', 'superlative'] }
        ]
      },
      {
        name: 'Pronouns - Replacing Nouns',
        exercises: [
          { type: 'part-of-speech', word: 'he', partOfSpeech: 'pronoun', options: ['noun', 'verb', 'pronoun'] },
          { type: 'part-of-speech', word: 'she', partOfSpeech: 'pronoun', options: ['noun', 'verb', 'pronoun'] },
          { type: 'part-of-speech', word: 'it', partOfSpeech: 'pronoun', options: ['noun', 'verb', 'pronoun'] },
          { type: 'part-of-speech', word: 'they', partOfSpeech: 'pronoun', options: ['noun', 'verb', 'pronoun'] },
          { type: 'pronoun-replace', sentence: 'Tom likes pizza. _____ eats it every day.', pronoun: 'He', options: ['He', 'She', 'It'] },
          { type: 'pronoun-replace', sentence: 'The cat is sleeping. _____ looks peaceful.', pronoun: 'It', options: ['He', 'She', 'It'] },
          { type: 'pronoun-replace', sentence: 'My friends are coming. _____ will be here soon.', pronoun: 'They', options: ['He', 'She', 'They'] },
          { type: 'possessive-pronoun', sentence: 'This is _____ book.', pronoun: 'my', options: ['my', 'me', 'I'] },
          { type: 'possessive-pronoun', sentence: 'The dog wagged _____ tail.', pronoun: 'its', options: ['its', 'it', 'his'] }
        ]
      },
      {
        name: 'Adverbs - Describing Actions',
        exercises: [
          { type: 'part-of-speech', word: 'quickly', partOfSpeech: 'adverb', options: ['adjective', 'verb', 'adverb'] },
          { type: 'part-of-speech', word: 'slowly', partOfSpeech: 'adverb', options: ['adjective', 'verb', 'adverb'] },
          { type: 'part-of-speech', word: 'carefully', partOfSpeech: 'adverb', options: ['adjective', 'verb', 'adverb'] },
          { type: 'part-of-speech', word: 'loudly', partOfSpeech: 'adverb', options: ['adjective', 'verb', 'adverb'] },
          { type: 'adverb-sentence', sentence: 'She ran _____ to catch the bus.', adverb: 'quickly', options: ['quickly', 'quick', 'fast'] },
          { type: 'adverb-sentence', sentence: 'He spoke _____ to the baby.', adverb: 'softly', options: ['softly', 'soft', 'quiet'] },
          { type: 'adverb-sentence', sentence: 'They worked _____ on the project.', adverb: 'carefully', options: ['carefully', 'careful', 'care'] },
          { type: 'adverb-question', question: 'How did she sing?', adverb: 'beautifully', options: ['beautiful', 'beautifully', 'beauty'] },
          { type: 'adverb-question', question: 'When will we leave?', adverb: 'tomorrow', options: ['tomorrow', 'today', 'yesterday'] }
        ]
      },
      {
        name: 'Mixed Parts of Speech',
        exercises: [
          { type: 'identify-all-parts', sentence: 'The happy dog runs quickly.', words: [{ word: 'dog', part: 'noun' }, { word: 'happy', part: 'adjective' }, { word: 'runs', part: 'verb' }, { word: 'quickly', part: 'adverb' }] },
          { type: 'identify-all-parts', sentence: 'She carefully picked the red flowers.', words: [{ word: 'She', part: 'pronoun' }, { word: 'carefully', part: 'adverb' }, { word: 'picked', part: 'verb' }, { word: 'flowers', part: 'noun' }] },
          { type: 'part-of-speech', word: 'beautiful', partOfSpeech: 'adjective', options: ['noun', 'verb', 'adjective', 'adverb'] },
          { type: 'part-of-speech', word: 'teacher', partOfSpeech: 'noun', options: ['noun', 'verb', 'adjective', 'pronoun'] },
          { type: 'part-of-speech', word: 'whispered', partOfSpeech: 'verb', options: ['noun', 'verb', 'adjective', 'adverb'] },
          { type: 'complete-sentence', sentence: 'The _____ (adjective) cat _____ (verb) _____ (adverb).', words: { adjective: 'fluffy', verb: 'sleeps', adverb: 'peacefully' } },
          { type: 'sort-parts', words: ['run', 'happy', 'quickly', 'dog', 'she', 'beautiful'], categories: { nouns: ['dog'], verbs: ['run'], adjectives: ['happy', 'beautiful'], adverbs: ['quickly'], pronouns: ['she'] } }
        ]
      },
      {
        name: 'Periods - Ending Statements',
        exercises: [
          { type: 'punctuation', sentence: 'I like to read books', correct: 'I like to read books.', punctuation: '.' },
          { type: 'punctuation', sentence: 'The cat is sleeping', correct: 'The cat is sleeping.', punctuation: '.' },
          { type: 'punctuation', sentence: 'We went to the park', correct: 'We went to the park.', punctuation: '.' },
          { type: 'punctuation', sentence: 'My name is Sarah', correct: 'My name is Sarah.', punctuation: '.' },
          { type: 'punctuation', sentence: 'The sun is bright today', correct: 'The sun is bright today.', punctuation: '.' },
          { type: 'period-choice', sentence: 'Birds can fly', options: ['.', '?', '!'], correct: '.' },
          { type: 'period-choice', sentence: 'I have a pet dog', options: ['.', '?', '!'], correct: '.' },
          { type: 'period-choice', sentence: 'She likes ice cream', options: ['.', '?', '!'], correct: '.' },
          { type: 'statement-identify', sentence: 'The flowers are beautiful', type: 'statement', options: ['statement', 'question', 'exclamation'] }
        ]
      },
      {
        name: 'Question Marks - Asking Questions',
        exercises: [
          { type: 'punctuation', sentence: 'What is your name', correct: 'What is your name?', punctuation: '?' },
          { type: 'punctuation', sentence: 'How old are you', correct: 'How old are you?', punctuation: '?' },
          { type: 'punctuation', sentence: 'Where do you live', correct: 'Where do you live?', punctuation: '?' },
          { type: 'punctuation', sentence: 'Can you help me', correct: 'Can you help me?', punctuation: '?' },
          { type: 'punctuation', sentence: 'Do you like pizza', correct: 'Do you like pizza?', punctuation: '?' },
          { type: 'question-choice', sentence: 'Why is the sky blue', options: ['.', '?', '!'], correct: '?' },
          { type: 'question-choice', sentence: 'When will we eat lunch', options: ['.', '?', '!'], correct: '?' },
          { type: 'question-choice', sentence: 'Who is your teacher', options: ['.', '?', '!'], correct: '?' },
          { type: 'question-identify', sentence: 'Are you coming to the party', type: 'question', options: ['statement', 'question', 'exclamation'] }
        ]
      },
      {
        name: 'Exclamation Points - Showing Excitement',
        exercises: [
          { type: 'punctuation', sentence: 'Wow, that\'s amazing', correct: 'Wow, that\'s amazing!', punctuation: '!' },
          { type: 'punctuation', sentence: 'Help me', correct: 'Help me!', punctuation: '!' },
          { type: 'punctuation', sentence: 'What a beautiful day', correct: 'What a beautiful day!', punctuation: '!' },
          { type: 'punctuation', sentence: 'I won the game', correct: 'I won the game!', punctuation: '!' },
          { type: 'punctuation', sentence: 'Look out', correct: 'Look out!', punctuation: '!' },
          { type: 'exclamation-choice', sentence: 'That was incredible', options: ['.', '?', '!'], correct: '!' },
          { type: 'exclamation-choice', sentence: 'Stop right there', options: ['.', '?', '!'], correct: '!' },
          { type: 'exclamation-choice', sentence: 'Happy birthday', options: ['.', '?', '!'], correct: '!' },
          { type: 'exclamation-identify', sentence: 'What a surprise', type: 'exclamation', options: ['statement', 'question', 'exclamation'] }
        ]
      },
      {
        name: 'Commas - Lists and Pauses',
        exercises: [
          { type: 'comma-list', sentence: 'I like apples oranges and bananas', correct: 'I like apples, oranges, and bananas.', punctuation: ',' },
          { type: 'comma-list', sentence: 'We need pencils paper and erasers', correct: 'We need pencils, paper, and erasers.', punctuation: ',' },
          { type: 'comma-list', sentence: 'The colors are red blue and green', correct: 'The colors are red, blue, and green.', punctuation: ',' },
          { type: 'comma-address', sentence: 'Yes I will come to the party', correct: 'Yes, I will come to the party.', punctuation: ',' },
          { type: 'comma-address', sentence: 'Mom can we go to the store', correct: 'Mom, can we go to the store?', punctuation: ',' },
          { type: 'comma-compound', sentence: 'I wanted to play but it was raining', correct: 'I wanted to play, but it was raining.', punctuation: ',' },
          { type: 'comma-placement', sentence: 'My favorite foods are pizza burgers and tacos', positions: [4, 6], correct: 'My favorite foods are pizza, burgers, and tacos.' },
          { type: 'comma-series', items: ['dogs', 'cats', 'birds'], sentence: 'I love ___ ___ and ___.', correct: 'I love dogs, cats, and birds.' }
        ]
      },
      {
        name: 'Apostrophes - Contractions and Possession',
        exercises: [
          { type: 'contraction', words: 'do not', contraction: 'don\'t', options: ['dont', 'don\'t', 'do\'nt'] },
          { type: 'contraction', words: 'can not', contraction: 'can\'t', options: ['cant', 'can\'t', 'ca\'nt'] },
          { type: 'contraction', words: 'will not', contraction: 'won\'t', options: ['won\'t', 'will\'nt', 'wi\'nt'] },
          { type: 'contraction', words: 'I am', contraction: 'I\'m', options: ['Im', 'I\'m', 'I\'am'] },
          { type: 'possession', phrase: 'the toy of the dog', possessive: 'the dog\'s toy', options: ['the dogs toy', 'the dog\'s toy', 'the dogs\' toy'] },
          { type: 'possession', phrase: 'the book of Sarah', possessive: 'Sarah\'s book', options: ['Sarahs book', 'Sarah\'s book', 'Sarahs\' book'] },
          { type: 'apostrophe-choice', sentence: 'The cats tail is fluffy', correct: 'The cat\'s tail is fluffy.', options: ['cats', 'cat\'s', 'cats\''] },
          { type: 'expand-contraction', contraction: 'isn\'t', expanded: 'is not', options: ['is not', 'is\'nt', 'isnot'] }
        ]
      },
      {
        name: 'Mixed Punctuation Practice',
        exercises: [
          { type: 'punctuation-mixed', sentence: 'What time is it', options: ['.', '?', '!'], correct: '?' },
          { type: 'punctuation-mixed', sentence: 'I love chocolate cake', options: ['.', '?', '!'], correct: '.' },
          { type: 'punctuation-mixed', sentence: 'Watch out for that car', options: ['.', '?', '!'], correct: '!' },
          { type: 'punctuation-mixed', sentence: 'Where are my shoes', options: ['.', '?', '!'], correct: '?' },
          { type: 'multiple-punctuation', sentence: 'Wow can you believe that happened', correct: 'Wow! Can you believe that happened?', marks: ['!', '?'] },
          { type: 'comma-and-period', sentence: 'I like pizza pasta and salad', correct: 'I like pizza, pasta, and salad.', punctuation: [',', ',', '.'] },
          { type: 'dialogue-punctuation', sentence: 'She said I will be there soon', correct: 'She said, "I will be there soon."', marks: [',', '"', '.', '"'] },
          { type: 'punctuation-paragraph', text: 'What a great day it is The sun is shining Do you want to go outside', correct: 'What a great day it is! The sun is shining. Do you want to go outside?', marks: ['!', '.', '?'] }
        ]
      }
    ]
  },

  writing: {
    name: 'Story Studio',
    icon: 'PenTool',
    color: 'from-teal-400 to-teal-600',
    description: 'Create stories and improve writing skills',
    levels: [
      {
        name: 'Creative Writing',
        exercises: [
          { type: 'story-starter', prompt: 'Once upon a time, there was a magical...', minWords: 10 },
          { type: 'story-starter', prompt: 'The door creaked open and inside was...', minWords: 10 },
          { type: 'story-starter', prompt: 'If I could fly, I would...', minWords: 10 }
        ]
      },
      {
        name: 'Story Elements',
        exercises: [
          { type: 'story-element', element: 'character', question: 'Who is the main character in your story?', example: 'A brave knight named Sir Alex' },
          { type: 'story-element', element: 'setting', question: 'Where does your story take place?', example: 'In a magical forest full of talking animals' },
          { type: 'story-element', element: 'problem', question: 'What problem does the character face?', example: 'The character gets lost in a maze' }
        ]
      },
      {
        name: 'Character Development',
        exercises: [
          { type: 'character-trait', question: 'Describe your character\'s personality', traits: ['brave', 'kind', 'funny', 'smart', 'curious'] },
          { type: 'character-appearance', question: 'What does your character look like?', features: ['tall', 'short', 'curly hair', 'blue eyes', 'freckles'] },
          { type: 'character-goal', question: 'What does your character want to achieve?', goals: ['save the day', 'find treasure', 'make friends', 'learn something new'] }
        ]
      }
    ]
  }
}

export default function ReadingModules() {
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
  const [storyText, setStoryText] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('readingModulesProgress')
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
    localStorage.setItem('readingModulesProgress', JSON.stringify(newProgress))
  }

  const handleModuleSelect = (moduleId) => {
    setSelectedModule(moduleId)
    setSelectedLevel(null)
    setCurrentExercise(0)
    setScore(0)
    setCorrectAnswers(0)
    setExerciseComplete(false)
    setStoryText('')
    setSelectedOptions([])
  }

  const handleLevelSelect = (levelIndex) => {
    setSelectedLevel(levelIndex)
    setCurrentExercise(0)
    setUserAnswer('')
    setShowResult(false)
    setScore(0)
    setCorrectAnswers(0)
    setExerciseComplete(false)
    setStoryText('')
    setSelectedOptions([])
  }

  const handleAnswerSubmit = () => {
    const module = READING_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const exercise = level.exercises[currentExercise]
    
    let isCorrect = false
    
    // Check answer based on exercise type
    // Check answer based on exercise type
    switch (exercise.type) {
      case 'phonics-match':
      case 'word-picture':
      case 'synonym-match':
      case 'antonym-match':
      case 'context-clue':
      case 'story-comprehension':
      case 'main-idea':
      case 'detail-question':
      case 'sight-word-flash':
      case 'part-of-speech':
      case 'noun-category':
      case 'verb-tense':
      case 'adjective-sentence':
      case 'adverb-sentence':
      case 'pronoun-replace':
      case 'possessive-pronoun':
      case 'period-choice':
      case 'question-choice':
      case 'exclamation-choice':
      case 'punctuation-mixed':
      case 'contraction':
      case 'possession':
      case 'apostrophe-choice':
      case 'expand-contraction':
        const correctAnswer = exercise.answer || exercise.synonym || exercise.antonym || exercise.word || exercise.mainIdea || exercise.partOfSpeech || exercise.correct || exercise.category || exercise.tense || exercise.adjective || exercise.adverb || exercise.pronoun || exercise.verb || exercise.contraction || exercise.possessive || exercise.expanded || '';
        isCorrect = userAnswer && correctAnswer ? userAnswer.toLowerCase() === correctAnswer.toLowerCase() : false;
        break
      case 'blend-words':
        isCorrect = userAnswer.toLowerCase() === exercise.word.toLowerCase()
        break
      case 'rhyme-match':
        isCorrect = selectedOptions.some(option => exercise.rhymes.includes(option))
        break
      case 'word-family':
        isCorrect = selectedOptions.some(option => exercise.words.includes(option))
        break
      case 'sentence-order':
        isCorrect = userAnswer.trim() === exercise.correct
        break
      case 'punctuation':
      case 'comma-list':
      case 'comma-address':
      case 'comma-compound':
        isCorrect = userAnswer === exercise.correct
        break
      case 'story-starter':
        isCorrect = storyText.split(' ').length >= exercise.minWords
        break
      case 'story-element':
      case 'character-trait':
      case 'character-appearance':
      case 'character-goal':
        isCorrect = userAnswer.trim().length > 5 // Basic validation for creative responses
        break
      case 'fluency-read':
        isCorrect = selectedOptions.length === exercise.words.length
        break
      case 'identify-all-parts':
        isCorrect = selectedOptions.length >= exercise.words.length
        break
      case 'complete-sentence':
        isCorrect = userAnswer.trim().length > 10
        break
      case 'sort-parts':
        isCorrect = selectedOptions.length >= Object.values(exercise.categories).flat().length
        break
      case 'statement-identify':
      case 'question-identify':
      case 'exclamation-identify':
        isCorrect = userAnswer === exercise.type || userAnswer === exercise.correct
        break
      case 'comma-placement':
        isCorrect = userAnswer === exercise.correct
        break
      case 'comma-series':
        isCorrect = userAnswer === exercise.correct
        break
      case 'multiple-punctuation':
        isCorrect = userAnswer === exercise.correct
        break
      case 'comma-and-period':
        isCorrect = userAnswer === exercise.correct
        break
      case 'dialogue-punctuation':
        isCorrect = userAnswer === exercise.correct
        break
      case 'punctuation-paragraph':
        isCorrect = userAnswer === exercise.correct
        break
      case 'compare-adjectives':
        isCorrect = userAnswer === exercise.comparison
        break
      case 'adverb-question':
        isCorrect = userAnswer === exercise.adverb
        break
      case 'action-verb':
        isCorrect = userAnswer === exercise.verb
        break
      default:
        isCorrect = false
    }


    setShowResult(true)
    
    if (isCorrect) {
      setScore(score + 10)
      setCorrectAnswers(correctAnswers + 1)
      toast.success('Excellent reading! Great job! 📚')
      saveProgress(selectedModule, selectedLevel, currentExercise, true)
    } else {
      if (exercise.type === 'story-starter' || exercise.type === 'story-element' || exercise.type === 'character-trait' || exercise.type === 'character-appearance' || exercise.type === 'character-goal') {
        // For creative exercises, give encouragement rather than marking as wrong
        toast.success('Great creativity! Keep writing! ✏️')
        setScore(score + 5)
        saveProgress(selectedModule, selectedLevel, currentExercise, true)
      } else {
        toast.error('Not quite right. Try again!')
        saveProgress(selectedModule, selectedLevel, currentExercise, false)
      }
    }

    setTimeout(() => {
      nextExercise()
    }, 2000)
  }

  const nextExercise = () => {
    const module = READING_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    
    if (currentExercise < level.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
      setUserAnswer('')
      setShowResult(false)
      setStoryText('');

    } else {
      setExerciseComplete(true)
      const percentage = Math.round((correctAnswers / level.exercises.length) * 100)
      
      if (percentage >= 90) {
        toast.success(`Outstanding reading skills! ${percentage}% correct! 🏆`)
      } else if (percentage >= 70) {
        toast.success(`Great reading progress! ${percentage}% correct! 🌟`)
      } else {
        toast.warning(`Keep practicing your reading! ${percentage}% correct. 📖`)
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
    setStoryText('')
    setSelectedOptions([])
  }

  const handleOptionToggle = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    )
  }

  const renderExercise = () => {
    const module = READING_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const exercise = level.exercises[currentExercise]

    switch (exercise.type) {
      case 'phonics-match':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What sound does the letter "{exercise.letter}" make?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 text-6xl font-bold text-white shadow-game animate-pulse-slow">
              {exercise.letter}
            </div>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              {exercise.words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(exercise.letter.toLowerCase())}
                  className="p-4 bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 rounded-xl text-surface-800 dark:text-white font-semibold hover:border-primary transition-all duration-300 flex items-center space-x-3"
                >
                  <span className="text-2xl">🔊</span>
                  <span>{word}</span>
                </button>
              ))}
            </div>
          </div>
        )

      case 'blend-words':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Blend these sounds together:
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
              {exercise.sounds.map((sound, index) => (
                <div key={index} className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-game">
                  {sound}
                </div>
              ))}
              <div className="text-4xl text-primary mx-4">→</div>
              <div className="w-24 h-16 border-2 border-dashed border-surface-400 rounded-xl flex items-center justify-center text-surface-400 text-lg">
                ?
              </div>
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="What word?"
              className="w-40 px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center text-xl font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'word-picture':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Which word matches this picture?
            </h3>
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center text-6xl shadow-game">
              {exercise.image}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'story-comprehension':
      case 'main-idea':
      case 'detail-question':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Read the story and answer the question:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.story || exercise.passage}
              </p>
            </div>
            <h4 className="text-xl font-semibold text-surface-800 dark:text-white mb-4">
              {exercise.question}
            </h4>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'rhyme-match':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Which words rhyme with "{exercise.word}"?
            </h3>
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-game">
              {exercise.word}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[...exercise.rhymes, exercise.nonRhyme].sort().map((word) => (
                <button
                  key={word}
                  onClick={() => handleOptionToggle(word)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(word)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'story-starter':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Continue this story:
            </h3>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white font-medium">
                {exercise.prompt}
              </p>
            </div>
            <textarea
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Write your story here..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
              Write at least {exercise.minWords} words. Current: {storyText.split(' ').filter(word => word.length > 0).length}
            </p>
          </div>
        )

      case 'sentence-order':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Put these words in the correct order:
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {exercise.words.sort(() => Math.random() - 0.5).map((word, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-gradient-to-br from-secondary to-accent text-white rounded-xl font-semibold shadow-game cursor-move"
                >
                  {word}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the sentence here..."
              className="w-full max-w-md px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white text-center focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'synonym-match':
      case 'antonym-match':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              {exercise.type === 'synonym-match' ? 'Find a word with similar meaning:' : 'Find a word with opposite meaning:'}
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-xl font-bold shadow-game">
              {exercise.word}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'context-clue':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Fill in the blank using context clues:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'sight-word-flash':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Which sight word is this?
            </h3>
            <div className="w-40 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-game animate-pulse-slow">
              {exercise.word}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'word-family':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Which words belong to the "{exercise.family}" family?
            </h3>
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-lg font-bold shadow-game">
              {exercise.family}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {[...exercise.words, exercise.nonFamily].sort().map((word) => (
                <button
                  key={word}
                  onClick={() => handleOptionToggle(word)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(word)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        )

      case 'fluency-read':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Read the sentence and click each word in order:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-xl text-surface-800 dark:text-white font-medium">
                {exercise.sentence}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {exercise.words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionToggle(word)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(word)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {word}
                </button>
              ))}
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-4">
              Selected: {selectedOptions.length}/{exercise.words.length} words
            </p>
          </div>
        )

      case 'noun-category':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What type of noun is "{exercise.word}"?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-lg font-bold shadow-game">
              {exercise.word}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'verb-tense':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What tense is "{exercise.word}"?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-lg font-bold shadow-game">
              {exercise.word}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'action-verb':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete the sentence with the correct action verb:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'adjective-sentence':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete the sentence with the correct adjective:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'compare-adjectives':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What type of comparison is "{exercise.word}"?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-lg font-bold shadow-game">
              {exercise.word}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'pronoun-replace':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Replace the noun with the correct pronoun:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'possessive-pronoun':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete with the correct possessive pronoun:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'adverb-sentence':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete the sentence with the correct adverb:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'adverb-question':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Answer the question with an adverb:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.question}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'identify-all-parts':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Identify the parts of speech in this sentence:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {exercise.words.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionToggle(`${item.word}-${item.part}`)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(`${item.word}-${item.part}`)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  <span className="font-bold">{item.word}</span> - {item.part}
                </button>
              ))}
            </div>
          </div>
        )

      case 'complete-sentence':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete the sentence:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Complete the sentence..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
          </div>
        )

      case 'sort-parts':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Sort these words by their parts of speech:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {exercise.words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionToggle(word)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(word)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {word}
                </button>
              ))}
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              Click words to select them. Selected: {selectedOptions.length}/{exercise.words.length}
            </p>
          </div>
        )

      case 'period-choice':
      case 'question-choice':
      case 'exclamation-choice':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What punctuation mark should end this sentence?
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              {exercise.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setUserAnswer(option)}
                  className={`w-16 h-16 rounded-xl font-bold text-2xl transition-all duration-300 ${
                    userAnswer === option
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'statement-identify':
      case 'question-identify':
      case 'exclamation-identify':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What type of sentence is this?
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'comma-list':
      case 'comma-address':
      case 'comma-compound':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Add commas to this sentence:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the corrected sentence..."
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'comma-placement':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Where should the commas go?
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the corrected sentence..."
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'comma-series':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Complete the sentence with commas in the series:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                Items: {exercise.items.join(', ')}
              </p>
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed mt-2">
                {exercise.sentence}
              </p>
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Complete the sentence..."
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'contraction':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What is the contraction for "{exercise.words}"?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-sm font-bold shadow-game">
              {exercise.words}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'possession':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              How do you show possession for "{exercise.phrase}"?
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500 max-w-md mx-auto">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.phrase}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'apostrophe-choice':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Add the apostrophe to make this sentence correct:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'expand-contraction':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What does "{exercise.contraction}" stand for?
            </h3>
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-lg font-bold shadow-game">
              {exercise.contraction}
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
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'punctuation-mixed':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              What punctuation mark should end this sentence?
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              {exercise.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setUserAnswer(option)}
                  className={`w-16 h-16 rounded-xl font-bold text-2xl transition-all duration-300 ${
                    userAnswer === option
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )

      case 'multiple-punctuation':
      case 'comma-and-period':
      case 'dialogue-punctuation':
      case 'punctuation-paragraph':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Add the correct punctuation:
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white leading-relaxed">
                {exercise.sentence || exercise.text}
              </p>
            </div>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type the corrected sentence..."
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
              disabled={showResult}
            />
          </div>
        )

      case 'story-element':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              Story Element: {exercise.element}
            </h3>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-surface-700 dark:to-surface-600 rounded-2xl p-6 mb-6 border border-surface-200 dark:border-surface-500">
              <p className="text-lg text-surface-800 dark:text-white font-medium mb-4">
                {exercise.question}
              </p>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Example: {exercise.example}
              </p>
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Describe your story element..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
          </div>
        )

      case 'character-trait':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              {exercise.question}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {exercise.traits.map((trait) => (
                <button
                  key={trait}
                  onClick={() => handleOptionToggle(trait)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(trait)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {trait}
                </button>
              ))}
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Describe your character's personality..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
          </div>
        )

      case 'character-appearance':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              {exercise.question}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {exercise.features.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleOptionToggle(feature)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(feature)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {feature}
                </button>
              ))}
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Describe what your character looks like..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
          </div>
        )

      case 'character-goal':
        return (
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
              {exercise.question}
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {exercise.goals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleOptionToggle(goal)}
                  className={`p-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedOptions.includes(goal)
                      ? 'bg-primary text-white shadow-game'
                      : 'bg-white dark:bg-surface-700 border-2 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white hover:border-primary/50'
                  }`}
                  disabled={showResult}
                >
                  {goal}
                </button>
              ))}
            </div>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Describe what your character wants to achieve..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 resize-none"
              disabled={showResult}
            />
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
    const module = READING_MODULES[selectedModule]
    const level = module.levels[selectedLevel]
    const percentage = Math.round((correctAnswers / level.exercises.length) * 100)

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 flex items-center justify-center">
        <motion.div
          className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-3xl p-8 shadow-floating border border-white/20 dark:border-surface-700/50 text-center max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-20 h-20 bg-gradient-to-br ${module.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <ApperIcon name="CheckCircle" className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-4">
            Level Complete!
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-6">
            You scored {percentage}% on {level.name}
          </p>
          <div className="flex space-x-4">
            <button
              onClick={resetLevel}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300"
            >
              Try Again
            </button>
            <button
              onClick={() => setSelectedLevel(null)}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-game hover:shadow-floating transition-all duration-300"
            >
              Back to Levels
            </button>
          </div>
        </motion.div>
      </div>
    )
  }


}