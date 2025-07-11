import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LearningMap from './components/LearningMap'
import SkillArea from './components/SkillArea'
import MiniGameLauncher from './components/MiniGameLauncher'
import GameRouter from './components/GameRouter'
import ReadingModules from './components/ReadingModules'
import LearningModules from './components/LearningModules'




function App() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning-map" element={<LearningMap />} />
        <Route path="/skill/:skillId" element={<SkillArea />} />
        <Route path="/mini-games" element={<MiniGameLauncher />} />
        <Route path="/mini-games/:gameId" element={<GameRouter />} />
        <Route path="/learning-modules" element={<LearningModules />} />
        <Route path="/reading-modules" element={<ReadingModules />} />


        <Route path="/skill/:skillId/level/:levelId" element={<SkillArea />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="rounded-xl shadow-soft"
      />
    </div>
  )
}

export default App