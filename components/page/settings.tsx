import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectIsUserLogin, setIsUserLogin } from '../../slice/AppSlices'
import { selectCurrentSettingScreen } from '../../slice/ScreenSlice'
import { selectProvider, selectWeb3Auth, setProvider } from '../../slice/userSlice'
import { appColor } from '../AppColor'
import FriendList from '../settings/FriendList'
import ProfileComponent from '../settings/ProfileComponent'
import SettingsComponent from '../settings/SettingsComponent'

const Settings = () => {
  const appTheme = useSelector(selectAppTheme)
  const currentSettingScreen = useSelector(selectCurrentSettingScreen)
  const web3auth = useSelector(selectWeb3Auth)
  const dispatch = useDispatch()
  
  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

  const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
  
  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    dispatch(setProvider(null))
    dispatch(setIsUserLogin(false))

  };

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
      <div className='px-4  absolute bottom-10 flex justify-center w-full' onClick={() => logout()}>
        <button className='p-2 font-bold rounded-md px-20' style={{background: appColor.primaryColor, color: appColor.darkTextColor}}>Logout</button>
      </div>
    </div>
  )
}

export default Settings