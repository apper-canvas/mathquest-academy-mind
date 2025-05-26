import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-game">
            <ApperIcon name="MapPin" className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-6xl sm:text-8xl font-bold text-gradient mb-2 sm:mb-4">404</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-surface-800 dark:text-white mb-2 sm:mb-4">
            Quest Not Found
          </h2>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-300 mb-6 sm:mb-8">
            Oops! This learning adventure seems to have wandered off the map.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl font-semibold shadow-game hover:shadow-floating transition-all duration-300 transform hover:scale-105"
          >
            <ApperIcon name="Home" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Return Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}