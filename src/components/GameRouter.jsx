import { useParams, Navigate } from 'react-router-dom'
import NumberNinja from './games/NumberNinja'
import MultiplicationMaze from './games/MultiplicationMaze'
import FractionFactory from './games/FractionFactory'
import GeometryGems from './games/GeometryGems'
import StoryBuilder from './games/StoryBuilder'
import PhonicsForest from './games/PhonicsForest'
import ComprehensionQuest from './games/ComprehensionQuest'

import WordWizard from './games/WordWizard'

const GAME_COMPONENTS = {
  'number-ninja': NumberNinja,
  'multiplication-maze': MultiplicationMaze,
  'word-wizard': WordWizard,
  'fraction-factory': FractionFactory,
  'geometry-gems': GeometryGems,

  'story-builder': StoryBuilder,
  'phonics-forest': PhonicsForest,
  'comprehension-quest': ComprehensionQuest

}

export default function GameRouter() {
  const { gameId } = useParams()
  
  const GameComponent = GAME_COMPONENTS[gameId]
  
  if (!GameComponent) {
    return <Navigate to="/mini-games" replace />
  }
  
  return <GameComponent />
}