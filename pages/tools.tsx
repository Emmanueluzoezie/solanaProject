import React from 'react'
import { useSelector } from 'react-redux'
import { appColor } from '../components/AppColor'
import Articules from '../components/Articules'
import BottomNavigation from '../components/BottomNavigation'
import CalculatorsComponent from '../components/calculatorsComponen'
import HeaderWithTwoItems from '../components/HeaderWithTwoItems'
import PointConversion from '../components/PointConversion'
import ToolsComponent from '../components/ToolsComponent'
import { selectAppTheme } from '../slice/AppSlices'
import { selectCurrentToolScreen } from '../slice/ScreenSlice'

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