import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectIsUserLogin } from '../../slice/AppSlices'
import { selectCurrentSettingScreen } from '../../slice/ScreenSlice'
import { selectProvider, selectWeb3Auth } from '../../slice/userSlice'
import { appColor } from '../AppColor'
import FriendList from '../settings/FriendList'
import ProfileComponent from '../settings/ProfileComponent'
import SettingsComponent from '../settings/SettingsComponent'

const Settings = () => {
  const appTheme = useSelector(selectAppTheme)
  const currentSettingScreen = useSelector(selectCurrentSettingScreen)
  
  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

  const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
  
  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

  return (
    <div className='h-screen relative' style={{ backgroundColor: bgColor }}>
      {currentSettingScreen === "home_settings" &&
        <SettingsComponent />
      }
      {currentSettingScreen === "profile" &&
        <ProfileComponent />
      }
      {currentSettingScreen === "friends" &&
        <FriendList />
      }
      <div className='' p>
        <button>Logout</button>
      </div>
    </div>
  )
}

export default Settings