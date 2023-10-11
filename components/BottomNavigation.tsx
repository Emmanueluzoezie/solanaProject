import React from 'react'
import { appColor } from './AppColor'
import { MdHome, MdOutlineSettings, MdQuiz } from "react-icons/md"
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { FaList, FaTools } from 'react-icons/fa'
import { useRouter } from 'next/router'

const BottomNavigation = () => {
    const appTheme  = useSelector(selectAppTheme)
    const router = useRouter();

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

  return (
    <div className={`py-2 fixed bottom-0 w-full`} style={{backgroundColor: containerColor}}>
        <div className='flex'>
              <button className='w-[20%] py-2' onClick={() => router.push("/")}>
                <div className='flex flex-col items-center'>
                    <MdHome className='text-[20px]' style={{ color: router.pathname === "/" ? primary : color}} />
                    <h2 className={`text-[14px]`} style={{ color: router.pathname === "/" ? primary : color }}>Home</h2>
                </div>
            </button>
              <button className='w-[20%] py-2' onClick={() => router.push("/quiz")}>
                  <div className='flex flex-col items-center'>
                      <MdQuiz className='text-[20px]' style={{ color: router.pathname === "/quiz" ? primary : color }} />
                      <h2 className={`text-[14px]`} style={{ color: router.pathname === "/quiz" ? primary : color }}>Quiz</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => router.push("/leaderboard")}>
                  <div className='flex flex-col items-center'>
                      <FaList className='text-[16px]' style={{ color: router.pathname === "/leaderboard" ? primary : color }} />
                      <h2 className={`text-[14px] pt-1`} style={{ color: router.pathname === "/leaderboard" ? primary : color }}>LeaderBoard</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => router.push("/tools")}>
                  <div className='flex flex-col items-center'>
                      <FaTools className='text-[16px]' style={{ color: router.pathname === "/tools" ? primary : color }} />
                      <h2 className={`text-[14px] pt-1`} style={{ color: router.pathname === "/tools" ? primary : color }}>Tools</h2>
                  </div>
              </button>
              <button className='w-[20%] py-2' onClick={() => router.push("/settings")}>
                  <div className='flex flex-col items-center'>
                      <MdOutlineSettings className='text-[20px]' />
                      <h2 className={`text-[14px]`} style={{ color: color }}>Settings</h2>
                  </div>
              </button>
        </div>
    </div>
  )
}

export default BottomNavigation