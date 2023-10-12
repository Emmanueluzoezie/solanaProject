import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { selectCurrentQuizScreen } from '../../slice/QuizSlice'
import { appColor } from '../AppColor'
import HeaderComponent from '../HeaderComponent'
import BudgetQuiz from '../quiz/BudgetQuiz'
import DailyQuiz from '../quiz/DailyQuiz'
import FriendsQuiz from '../quiz/FriendsQuiz'
import InvestmentQuiz from '../quiz/InvestmentQuiz'
import LinkToQuiz from '../quiz/LinkToQuiz'
import SavingQuiz from '../quiz/SavingQuiz'

const clientId = process.env.NEXT_PUBLIC_SWEB3AUTH_CLIENT_ID

const Quiz = () => {
    const appTheme = useSelector(selectAppTheme)

    const  currentQuizPage = useSelector(selectCurrentQuizScreen)

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const buttonColor = appTheme === "dark" ? appColor.primaryColor : appColor.primaryDarkColor
  return (
      <div className='flex justify-center h-screen' style={{ backgroundColor: bgColor }}>
          <div className='w-[650px] h-inherit border-2'>
              {currentQuizPage === "home_quiz" &&
                  <div className='h-screen'>
                      <HeaderComponent title="Quiz" />
                      <LinkToQuiz />
                  </div>
              }
              {currentQuizPage === "saving_quiz" &&
                  <div className='h-screen'>
                      <SavingQuiz />
                  </div>
              }
              {currentQuizPage === "budget_quiz" &&
                  <div className='h-screen'>
                      <BudgetQuiz />
                  </div>
              }
              {currentQuizPage === "friends_quiz" &&
                  <FriendsQuiz />
              }
              {currentQuizPage === "daily_quiz" &&
                  <div className='h-screen'>
                      <DailyQuiz />
                  </div>
              }
              {currentQuizPage === "investment_quiz" &&
                  <InvestmentQuiz />
              }
          </div>
      </div>
  )
}

export default Quiz