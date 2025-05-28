import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Award, 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Star,
  Volume2,
  Eye,
  Brain,
  Zap,
  Clock,
  BarChart3,
  Trophy,
  ChevronRight,
  Home
} from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ReadingModules = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('readingModulesProgress');
    const savedCompleted = localStorage.getItem('readingModulesCompleted');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedCompleted) {
      setCompletedLessons(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  const saveProgress = (newProgress, newCompleted) => {
    localStorage.setItem('readingModulesProgress', JSON.stringify(newProgress));
    localStorage.setItem('readingModulesCompleted', JSON.stringify(Array.from(newCompleted)));
  };

  const readingModules = [
    {
      id: 'phonics',
      title: 'Phonics Fundamentals',
      description: 'Master letter sounds and word formation',
      icon: Volume2,
      color: 'from-pink-500 to-rose-500',
      lessons: [
        {
          id: 'phonics-1',
          title: 'Letter Sounds A-M',
          description: 'Learn the sounds of letters A through M',
          duration: '15 min',
          exercises: [
            {
              type: 'sound-match',
              question: 'Which letter makes the /a/ sound?',
              options: ['A', 'E', 'I', 'O'],
              correct: 0,
              explanation: 'The letter A makes the /a/ sound as in "apple"'
            },
            {
              type: 'sound-match',
              question: 'Which letter makes the /b/ sound?',
              options: ['D', 'B', 'P', 'T'],
              correct: 1,
              explanation: 'The letter B makes the /b/ sound as in "ball"'
            },
            {
              type: 'word-build',
              question: 'Build the word "CAT" using the letters below',
              letters: ['C', 'A', 'T', 'R', 'S'],
              correct: ['C', 'A', 'T'],
              explanation: 'CAT is spelled C-A-T with the sounds /k/ /a/ /t/'
            }
          ]
        },
        {
          id: 'phonics-2',
          title: 'Letter Sounds N-Z',
          description: 'Complete your alphabet sound knowledge',
          duration: '18 min',
          exercises: [
            {
              type: 'sound-match',
              question: 'Which letter makes the /n/ sound?',
              options: ['M', 'N', 'R', 'H'],
              correct: 1,
              explanation: 'The letter N makes the /n/ sound as in "net"'
            },
            {
              type: 'sound-match',
              question: 'Which letter makes the /z/ sound?',
              options: ['S', 'C', 'Z', 'X'],
              correct: 2,
              explanation: 'The letter Z makes the /z/ sound as in "zoo"'
            }
          ]
        },
        {
          id: 'phonics-3',
          title: 'Blending Sounds',
          description: 'Combine letter sounds to read words',
          duration: '20 min',
          exercises: [
            {
              type: 'blend-practice',
              question: 'Blend these sounds: /d/ /o/ /g/',
              options: ['dig', 'dog', 'bag', 'big'],
              correct: 1,
              explanation: 'Blending /d/ /o/ /g/ makes the word "dog"'
            }
          ]
        }
      ]
    },
    {
      id: 'comprehension',
      title: 'Reading Comprehension',
      description: 'Understand and analyze what you read',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      lessons: [
        {
          id: 'comp-1',
          title: 'Main Ideas',
          description: 'Identify the central message of a text',
          duration: '25 min',
          exercises: [
            {
              type: 'passage-analysis',
              passage: 'The sun is very hot. It gives us light during the day. Plants need sunlight to grow. Without the sun, Earth would be very cold and dark.',
              question: 'What is the main idea of this passage?',
              options: [
                'Plants need water to grow',
                'The sun is important for life on Earth',
                'Earth is a planet',
                'Day and night cycle'
              ],
              correct: 1,
              explanation: 'The passage explains how the sun provides heat, light, and energy for plant growth, showing its importance for life.'
            }
          ]
        },
        {
          id: 'comp-2',
          title: 'Supporting Details',
          description: 'Find evidence that supports main ideas',
          duration: '22 min',
          exercises: [
            {
              type: 'detail-identification',
              passage: 'Butterflies are amazing insects. They start as caterpillars, then form a chrysalis, and finally emerge as beautiful butterflies. This process is called metamorphosis.',
              question: 'Which detail supports that butterflies are amazing?',
              options: [
                'They are insects',
                'They go through metamorphosis',
                'They have wings',
                'They eat flowers'
              ],
              correct: 1,
              explanation: 'The metamorphosis process shows how amazing butterflies are by describing their transformation.'
            }
          ]
        }
      ]
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary Building',
      description: 'Expand your word knowledge and usage',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      lessons: [
        {
          id: 'vocab-1',
          title: 'Context Clues',
          description: 'Use surrounding words to understand new vocabulary',
          duration: '20 min',
          exercises: [
            {
              type: 'context-clues',
              sentence: 'The enormous elephant trumpeted loudly in the zoo.',
              question: 'What does "enormous" mean?',
              options: ['small', 'very large', 'gray', 'friendly'],
              correct: 1,
              explanation: 'Context clues like "elephant" help us understand that enormous means very large.'
            }
          ]
        },
        {
          id: 'vocab-2',
          title: 'Synonyms and Antonyms',
          description: 'Learn words with similar and opposite meanings',
          duration: '18 min',
          exercises: [
            {
              type: 'synonym-match',
              question: 'Which word is a synonym for "happy"?',
              options: ['sad', 'joyful', 'angry', 'tired'],
              correct: 1,
              explanation: 'Joyful and happy both describe feeling good and pleased.'
            }
          ]
        }
      ]
    },
    {
      id: 'fluency',
      title: 'Reading Fluency',
      description: 'Read smoothly, accurately, and with expression',
      icon: Zap,
      color: 'from-purple-500 to-violet-500',
      lessons: [
        {
          id: 'fluency-1',
          title: 'Sight Words',
          description: 'Master common words for faster reading',
          duration: '15 min',
          exercises: [
            {
              type: 'sight-word-practice',
              question: 'Which is a sight word you should know instantly?',
              options: ['elephant', 'the', 'microscope', 'butterfly'],
              correct: 1,
              explanation: '"The" is a sight word that appears frequently and should be recognized instantly.'
            }
          ]
        },
        {
          id: 'fluency-2',
          title: 'Reading Pace',
          description: 'Develop appropriate reading speed',
          duration: '25 min',
          exercises: [
            {
              type: 'pace-practice',
              passage: 'The quick brown fox jumps over the lazy dog.',
              question: 'Read this sentence with good pace and expression.',
              instruction: 'Focus on reading smoothly without rushing.',
              correct: 0,
              explanation: 'Good reading pace means reading at a speed that allows for understanding while maintaining flow.'
            }
          ]
        }
      ]
    }
  ];

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedLesson(null);
    setCurrentExercise(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentExercise(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (exerciseIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseIndex]: answerIndex
    }));
  };

  const handleNextExercise = () => {
    if (currentExercise < selectedLesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleCompleteLesson = () => {
    const lessonId = selectedLesson.id;
    const moduleId = selectedModule.id;
    
    // Calculate score
    const totalExercises = selectedLesson.exercises.length;
    const correctAnswers = selectedLesson.exercises.filter((exercise, index) => 
      userAnswers[index] === exercise.correct
    ).length;
    const score = Math.round((correctAnswers / totalExercises) * 100);
    
    // Update progress
    const newProgress = {
      ...progress,
      [lessonId]: { score, completed: true, timestamp: new Date().toISOString() }
    };
    
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    
    setProgress(newProgress);
    setCompletedLessons(newCompleted);
    saveProgress(newProgress, newCompleted);
    
    // Show success message
    if (score >= 80) {
      toast.success(`🎉 Excellent work! You scored ${score}% on ${selectedLesson.title}`);
    } else if (score >= 60) {
      toast.success(`👍 Good job! You scored ${score}% on ${selectedLesson.title}`);
    } else {
      toast.info(`📚 Keep practicing! You scored ${score}% on ${selectedLesson.title}`);
    }
    
    // Return to module view
    setSelectedLesson(null);
    setCurrentExercise(0);
    setUserAnswers({});
    setShowResults(false);
  };

  const getModuleProgress = (module) => {
    const totalLessons = module.lessons.length;
    const completedCount = module.lessons.filter(lesson => 
      completedLessons.has(lesson.id)
    ).length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const getCurrentExercise = () => {
    if (!selectedLesson || !selectedLesson.exercises) return null;
    return selectedLesson.exercises[currentExercise];
  };

  const renderExercise = () => {
    const exercise = getCurrentExercise();
    if (!exercise) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"

      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">

              Exercise {currentExercise + 1} of {selectedLesson.exercises.length}
            </span>
            <div className="flex items-center space-x-2">
              {Array.from({ length: selectedLesson.exercises.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentExercise
                      ? 'bg-primary-500'
                      : 'bg-gray-200 dark:bg-gray-600'

                  }`}
                />
              ))}
            </div>
          </div>
          
          {exercise.passage && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">

              <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">

                Read the passage:
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">

                {exercise.passage}
              </p>
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">

            {exercise.question}
          </h3>
          
          {exercise.instruction && (
            <p className="text-gray-600 dark:text-gray-400 mb-4 italic">

              {exercise.instruction}
            </p>
          )}
        </div>

        <div className="space-y-3 mb-6">
          {exercise.options?.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(currentExercise, index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                userAnswers[currentExercise] === index
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'

              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  userAnswers[currentExercise] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-500'

                }`}>
                  {userAnswers[currentExercise] === index && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-gray-100">{option}</span>

              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentExercise(prev => Math.max(0, prev - 1))}
            disabled={currentExercise === 0}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"

          >
            Previous
          </button>
          
          <button
            onClick={handleNextExercise}
            disabled={userAnswers[currentExercise] === undefined}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"

          >
            {currentExercise === selectedLesson.exercises.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </motion.div>
    );
  };

  const renderResults = () => {
    const totalExercises = selectedLesson.exercises.length;
    const correctAnswers = selectedLesson.exercises.filter((exercise, index) => 
      userAnswers[index] === exercise.correct
    ).length;
    const score = Math.round((correctAnswers / totalExercises) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center"

      >
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
          score >= 80 ? 'bg-green-100 text-green-600' :
          score >= 60 ? 'bg-yellow-100 text-yellow-600' :
          'bg-red-100 text-red-600'
        }`}>
          {score >= 80 ? <Trophy className="w-10 h-10" /> :
           score >= 60 ? <Award className="w-10 h-10" /> :
           <Target className="w-10 h-10" />}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">

          Lesson Complete!
        </h3>
        
        <div className="text-4xl font-bold mb-4">
          <span className={score >= 80 ? 'text-green-600' :
                         score >= 60 ? 'text-yellow-600' :
                         'text-red-600'}>
            {score}%
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6">

          You got {correctAnswers} out of {totalExercises} questions correct.
        </p>
        
        <div className="space-y-4 mb-8">
          {selectedLesson.exercises.map((exercise, index) => {
            const isCorrect = userAnswers[index] === exercise.correct;
            return (
              <div key={index} className="text-left p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">

                <div className="flex items-start space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">✕</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-gray-100 font-medium mb-1">

                      {exercise.question}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">

                      {exercise.explanation}
                    </p>
                    {!isCorrect && (
                      <p className="text-red-600 text-sm mt-1">
                        Correct answer: {exercise.options[exercise.correct]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button
          onClick={handleCompleteLesson}
          className="px-8 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"

        >
          Continue Learning
        </button>
      </motion.div>
    );
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"

            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            <h1 className="text-3xl font-bold text-gradient">
              Reading Modules
            </h1>
            <div className="w-20" /> {/* Spacer */}
          </div>
          {renderResults()}
        </div>
      </div>
    );
  }

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"

            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {selectedModule.title}</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">

              {selectedLesson.title}
            </h1>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">

              <Clock className="w-4 h-4" />
              <span className="text-sm">{selectedLesson.duration}</span>
            </div>
          </div>
          {renderExercise()}
        </div>
      </div>
    );
  }

  if (selectedModule) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedModule(null)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"

            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Modules</span>
            </button>
            <h1 className="text-3xl font-bold text-gradient">
              {selectedModule.title}
            </h1>
            <div className="w-32" /> {/* Spacer */}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {selectedModule.lessons.map((lesson, index) => {
              const isCompleted = completedLessons.has(lesson.id);
              const lessonProgress = progress[lesson.id];
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"

                  onClick={() => handleLessonSelect(lesson)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedModule.color} flex items-center justify-center`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />

                      <span className="text-sm text-gray-500 dark:text-gray-400">

                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">

                    {lesson.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">

                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {isCompleted ? (
                        <>
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">

                            {lessonProgress?.score}% Complete
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">

                          {lesson.exercises.length} exercises
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"

          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <h1 className="text-4xl font-bold text-gradient">
            Reading Modules
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">

            Master essential reading skills through interactive lessons and engaging exercises.
            Build confidence in phonics, comprehension, vocabulary, and fluency.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {readingModules.map((module, index) => {
            const Icon = module.icon;
            const moduleProgress = getModuleProgress(module);
            const completedLessonsCount = module.lessons.filter(lesson => 
              completedLessons.has(lesson.id)
            ).length;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"

                onClick={() => handleModuleSelect(module)}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">

                      {moduleProgress}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">

                      Complete
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">

                  {module.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">

                  {module.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">

                      Progress
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">

                      {completedLessonsCount} of {module.lessons.length} lessons
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${moduleProgress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-2 rounded-full bg-gradient-to-r ${module.color}`}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">

                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{module.lessons.length} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>{moduleProgress > 0 ? 'In Progress' : 'Start Learning'}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadingModules;