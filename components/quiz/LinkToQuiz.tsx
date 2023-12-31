import React from 'react'
import { MdNotifications } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { setCurrentQuizScreen } from '../../slice/QuizSlice'
import { appColor } from '../AppColor'
import BottomNavigation from '../BottomNavigation'

const LinkToQuiz = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  return (
    <div className="h-inherit overflow-scroll pb-[50px]" >
          <div className="p-4" >
              <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen("daily_quiz"))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Daily Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications style={{color: buttonColor}} className="text-[23px]" />
            </div>
              <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen("saving_quiz"))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Saving Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications onClick={() => dispatch(setCurrentQuizScreen(""))} style={{ color: buttonColor }} className="text-[23px]" />
            </div>
              <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen("budget_quiz"))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Budget Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications style={{ color: buttonColor }} className="text-[23px]" />
            </div>
            <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen(""))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Investment Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications style={{ color: buttonColor }} className="text-[23px]" />
            </div>
            <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen(""))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Friends Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications style={{ color: buttonColor }} className="text-[23px]" />
            </div>
            <div className='border-l-4 px-2 my-4 py-4 flex items-center rounded-md cursor-pointer' style={{ borderColor: buttonColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentQuizScreen(""))}>
                <div className='flex-1'>
                    <h2 className='text-[18px]  font-bold' style={{color: textColor}}>Friends Quiz</h2>
                    <span className='text-[12px] font-semibold' style={{color: textColor}}>Click to play now and get all question right to earn 50 points. 10 points for each.</span>
                </div>
                <MdNotifications style={{ color: buttonColor }} className="text-[23px]" />
            </div>
          </div>
          <BottomNavigation />
    </div>
  )
}

export default LinkToQuiz