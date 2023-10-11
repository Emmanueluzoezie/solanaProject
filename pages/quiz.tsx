import React from 'react'
import { useSelector } from 'react-redux'
import { appColor } from '../components/AppColor'
import HeaderComponent from '../components/HeaderComponent'
import BudgetQuiz from '../components/quiz/BudgetQuiz'
import DailyQuiz from '../components/quiz/DailyQuiz'
import FriendsQuiz from '../components/quiz/FriendsQuiz'
import InvestmentQuiz from '../components/quiz/InvestmentQuiz'
import LinkToQuiz from '../components/quiz/LinkToQuiz'
import SavingQuiz from '../components/quiz/SavingQuiz'
import { selectAppTheme } from '../slice/AppSlices'
import { selectCurrentQuizScreen } from '../slice/QuizSlice'

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