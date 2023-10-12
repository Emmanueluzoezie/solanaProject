import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme } from '../../slice/AppSlices'
import { selectCurrentToolScreen } from '../../slice/ScreenSlice'
import { appColor } from '../AppColor'
import Articules from '../Articules'
import BottomNavigation from '../BottomNavigation'
import CalculatorsComponent from '../calculatorsComponen'
import HeaderWithTwoItems from '../HeaderWithTwoItems'
import PointConversion from '../PointConversion'
import ToolsComponent from '../ToolsComponent'

const clientId = process.env.NEXT_PUBLIC_SWEB3AUTH_CLIENT_ID

const Tools = () => {
  const appTheme = useSelector(selectAppTheme)
  const currentToolScreen = useSelector(selectCurrentToolScreen)

  const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

  const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

  return (
    <div>
      { }
      {currentToolScreen === "home_view" &&
        <div className='h-screen' style={{ background: bgColor }}>
          <HeaderWithTwoItems title="Tools" />
          <ToolsComponent />
          <BottomNavigation />
        </div>
      }
      {currentToolScreen === "calculators" &&
        <CalculatorsComponent />
      }
      {currentToolScreen === "articles" &&
        <Articules />
      }
      {currentToolScreen === "point_conversion" &&
        <PointConversion />
      }
    </div>

  )
}

export default Tools