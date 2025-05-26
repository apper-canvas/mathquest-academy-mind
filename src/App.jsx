import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LearningMap from './components/LearningMap'
import SkillArea from './components/SkillArea'
import MiniGameLauncher from './components/MiniGameLauncher'



function App() {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learning-map" element={<LearningMap />} />
        <Route path="/skill/:skillId" element={<SkillArea />} />
        <Route path="/mini-games" element={<MiniGameLauncher />} />

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