import React from 'react'
import { appColor } from './AppColor'
import { MdHome, MdOutlineSettings, MdQuiz } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { selectAppScreen, selectAppTheme, setAppScreen, setPreviousAppScreen } from '../slice/AppSlices'
import { FaList, FaTools } from 'react-icons/fa'
import { useRouter } from 'next/router'

const BottomNavigation = () => {
    const appTheme  = useSelector(selectAppTheme)
    const dispatch = useDispatch()
    const getCurrentAppScreen = useSelector(selectAppScreen)

    const handleScreenChange = (screen:string, previous:string) => {
        dispatch(setAppScreen(screen))
        dispatch(setPreviousAppScreen(previous))
    }

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

  return (
      <div className={`py-2 fixed bottom-0 w-full sm:w-[500px]`} style={{backgroundColor: containerColor}}>
        <div className='flex'>
              <button className='w-[20%] py-2' onClick={() => handleScreenChange("home", getCurrentAppScreen)}>
                <div className='flex flex-col items-center'>
                    <MdHome className='text-[20px]' style={{ color: getCurrentAppScreen === "home" ? primary : color}} />
                    <h2 className={`text-[14px] font-semibold`} style={{ color: getCurrentAppScreen === "home" ? primary : color }}>Home</h2>
                </div>
            </button>
              <button className='w-[20%] py-2' onClick={() => handleScreenChange("quiz", getCurrentAppScreen)}>
                  <div className='flex flex-col items-center'>
                      <MdQuiz className='text-[20px]' style={{ color: getCurrentAppScreen === "quiz" ? primary : color }} />
                      <h2 className={`text-[14px] font-semibold`} style={{ color: getCurrentAppScreen === "quiz" ? primary : color }}>Quiz</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => handleScreenChange("leaderboard", getCurrentAppScreen)}>
                  <div className='flex flex-col items-center'>
                      <FaList className='text-[16px]' style={{ color: getCurrentAppScreen === "leaderboard" ? primary : color }} />
                      <h2 className={`text-[14px] font-semibold pt-1`} style={{ color: getCurrentAppScreen === "leaderboard" ? primary : color }}>LeaderBoard</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => handleScreenChange("tools", getCurrentAppScreen)}>
                  <div className='flex flex-col items-center'>
                      <FaTools className='text-[16px]' style={{ color: getCurrentAppScreen === "tools" ? primary : color }} />
                      <h2 className={`text-[14px] font-semibold pt-1`} style={{ color: getCurrentAppScreen === "tools" ? primary : color }}>Tools</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => handleScreenChange("settings", getCurrentAppScreen)}>
                  <div className='flex flex-col items-center'>
                      <MdOutlineSettings className='text-[20px]' style={{color:getCurrentAppScreen === "settings" ? primary : color}}/>
                      <h2 className={`text-[14px] font-semibold`} style={{ color: getCurrentAppScreen === "settings" ? primary : color }}>Settings</h2>
                  </div>
              </button>
        </div>
    </div>
  )
}

export default BottomNavigation