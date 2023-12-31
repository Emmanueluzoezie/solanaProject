import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';
import LoadingLogo from './LoadingLogo'
import { dailyTreat } from "../utilies/WelcomeArrayItems"
import Image from 'next/image';
import LandingQuestion from './LandingQuestion';
import LandingResult from './LandingResult';
import { selectShowResult } from '../slice/welcomeSlice';

const LandingCompoent = () => {
    const [loading, setLoading] =useState(false)
    const appTheme = useSelector(selectAppTheme);
    const showResult = useSelector(selectShowResult)

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

  return (
    <div className='h-inherit'>
      <div className=' md:py-20 h-inherit md:rounded-2xl hide px-4' style={{ backgroundColor: bgColor, }}>
        {!showResult?
          <LandingQuestion  /> 
          :
          <LandingResult />
          }
      </div>
    </div>
  )
}

export default LandingCompoent