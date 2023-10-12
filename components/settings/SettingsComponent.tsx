import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, setAppTheme } from '../../slice/AppSlices'
import { setCurrentSettingScreen } from '../../slice/ScreenSlice'
import { appColor } from '../AppColor'
import HeaderWithTwoItems from '../HeaderWithTwoItems'
import HeaderSettings from './HeaderSettings'

const SettingsComponent = () => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark"? appColor.darkContainerBackground : appColor.lightContainerBackground

    const textColor = appTheme === "dark"? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor

    const handleChangeTheme = () => {
        if(appTheme === "dark"){
            dispatch(setAppTheme('light'))
        } else {
            dispatch(setAppTheme('dark'))
        }
    }
    
  return (
    <div>
        <HeaderSettings title="Settings" />
        <div className='p-2'>
              <div className='p-2 my-3  rounded-md cursor-pointer' style={{ backgroundColor: containerColor }} onClick={() => dispatch(setCurrentSettingScreen("profile"))}>
                <h2 className='text-[18px] font-semibold' style={{color:textColor}}>Account Information</h2>
                <span  className='text-[14px]' style={{color: textColor}}>See all your account information like email and full name</span>
            </div>
              <div className='p-2 my-3  rounded-md cursor-pointer' style={{ backgroundColor: containerColor }} onClick={() => dispatch(setCurrentSettingScreen("referral"))}>
                <h2 className='text-[18px] font-semibold' style={{color:textColor}}>Referral</h2>
                <span className='text-[14px]' style={{color: textColor}}>Get your referral link</span>
            </div>
              <div className='p-2 my-3  rounded-md cursor-pointer' style={{ backgroundColor: containerColor }} onClick={() => dispatch(setCurrentSettingScreen("friend_list"))}>
                <h2 className='text-[18px] font-semibold' style={{color:textColor}}>Friends list</h2>
                <span  className='text-[14px]' style={{color: textColor}}>Find friends and pick who to challenge.</span>
            </div>
              <div className='p-2 my-3 rounded-md' style={{ backgroundColor: containerColor }} onClick={handleChangeTheme}>
                <h2 className='text-[18px] font-semibold' style={{color:textColor}}>Change theme</h2>
                  <span className='text-[14px]' style={{ color: textColor }}>Click to change your theme to {appTheme === "dark"?  "light" : "dark"}</span>
            </div>
        </div>
    </div>
  )
}

export default SettingsComponent