import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppScreen } from '../../slice/AppSlices'
import HomeComponent from '../HomeComponet'
import History from './History'
import LeaderBoard from './leaderboard'
import Quiz from './quiz'
import Settings from './settings'
import Tools from './tools'

const PageChecker = () => {
    const getPage = useSelector(selectAppScreen)

  return (
    <div className='h-full'>
          {getPage === "home" && <HomeComponent />}
          {getPage === "history" && <History />}
          {getPage === "quiz" && <Quiz />}
          {getPage === "settings" && <Settings />}
          {getPage === "tools" && <Tools />}
          {getPage === "leaderboard" && <LeaderBoard />}
    </div>
  )
}

export default PageChecker