import { useRouter } from 'next/router'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { selectAppTheme } from '../slice/AppSlices'
import { appColor } from './AppColor'

type Props ={
    title: string
}

const HeaderComponent = ({ title }: Props) => {
    const appTheme = useSelector(selectAppTheme)
    const router = useRouter()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.darkTextColor: appColor.lightTextColor 

    const buttonColor = appTheme === "dark" ? appColor.primaryColor : appColor.primaryDarkColor

    
    
  return (
      <div className='py-5 px-3 flex' style={{ backgroundColor: containerColor }}>
        <div className='p-2 rounded-full cursor-pointer hover:bg-gray-400  '>
          <MdArrowBackIosNew style={{ color }} className="text-[20px] cursor-pointer" onClick={() => router.back()} />
        </div>

        <div className='flex-1 flex justify-center'>
            <h2 className='text-[20px] font-semibold' style={{color}}>{title}</h2>
        </div>
    </div>
  )
}

export default HeaderComponent