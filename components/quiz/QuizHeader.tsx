import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectPreviousAppScreen, setAppScreen } from '../../slice/AppSlices'
import { selectCurrentQuizScreen, setCurrentQuizScreen } from '../../slice/QuizSlice'
import { appColor } from '../AppColor'

type Props = {
    title: string
}

const QuizHeader = ({ title }: Props) => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()
    const currentQuizScreen = useSelector(selectCurrentQuizScreen)
    const getPreviousPageScreen = useSelector(selectPreviousAppScreen)

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const buttonColor = appTheme === "dark" ? appColor.primaryColor : appColor.primaryDarkColor

    const handleBack = () => {
        if (currentQuizScreen === "home_quiz"){
            dispatch(setAppScreen(getPreviousPageScreen))
        } else {
            dispatch(setCurrentQuizScreen("home_quiz"))
        }
    }


    return (
        <div className='py-5 px-3 flex items-center w-full' style={{ backgroundColor: containerColor }}>
            <div className='p-2 rounded-full cursor-pointer hover:bg-gray-400  '>
            <MdArrowBackIosNew style={{ color }} className="text-[20px] cursor-pointer" onClick={handleBack}/>
            </div>

            <div className='flex-1 flex justify-center'>
                <h2 className='text-[20px] font-semibold text-center' style={{color}}>{title}</h2>
            </div>
        </div>
    )
}

export default QuizHeader