import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { appColor } from '../AppColor'

const QuizLoadingComponent = () => {
  const appTheme = useSelector(selectAppTheme)

  const loadingColor = appTheme === "dark"? appColor.primaryDarkColor : appColor.primaryColor
  return (
    <div  className='h-screen flex justify-center items-center'>
      <RotatingLines
        strokeColor={loadingColor}
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  )
}

export default QuizLoadingComponent