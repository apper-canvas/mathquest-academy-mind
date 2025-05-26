import { useParams, Navigate } from 'react-router-dom'
import NumberNinja from './games/NumberNinja'
import MultiplicationMaze from './games/MultiplicationMaze'
import WordWizard from './games/WordWizard'

const GAME_COMPONENTS = {
  'number-ninja': NumberNinja,
  'multiplication-maze': MultiplicationMaze,
  'word-wizard': WordWizard,
  'fraction-factory': null, // Locked game
  'geometry-gems': null, // Placeholder for future implementation
  'story-builder': null, // Placeholder for future implementation
  'phonics-forest': null, // Placeholder for future implementation
  'comprehension-quest': null // Locked game
}

export default function GameRouter() {
  const { gameId } = useParams()
  
  const GameComponent = GAME_COMPONENTS[gameId]
  
  if (!GameComponent) {
    return <Navigate to="/mini-games" replace />
  }
  
  return <GameComponent />
}