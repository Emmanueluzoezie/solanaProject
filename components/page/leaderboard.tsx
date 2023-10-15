import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GET_USER_BY_EMAIL } from '../../graphql/queries'
import { selectAppTheme, selectIsUserLogin } from '../../slice/AppSlices'
import { selectUserInfo } from '../../slice/userSlice'
import { appColor } from '../AppColor'
import BottomNavigation from '../BottomNavigation'
import LeaderBoardComponent from '../LeaderBoardComponent'
import LeaderBoardHeader from '../LeaderBoardHeader'
import LoadingAppComponent from '../LoadingAppComponent'

const LeaderBoard = () => {
  const appTheme = useSelector(selectAppTheme)
  const getUserInfo = useSelector(selectUserInfo)

  const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: getUserInfo?.email
    }
  })

  const userInfo = data?.getUserByEmail[0]


  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const borderColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  return (
    <div className="h-screen" style={{ backgroundColor: bgColor }}>
      {loading ?
        <div className="h-full`">
          <LoadingAppComponent />
        </div>
        :
        error ?
          <div className='pt-10  px-3'>
            <h2 style={{ color, }} className="text-[16px] text-center">Oops! An error occur in our end. Check your internet connection and try again</h2>
            <div className='flex justify-center'>
              <button className='justify-center items-center px-4 mt-6 py-2 rounded-md' style={{ backgroundColor: borderColor }} onClick={() => { }}>Click to reload</button>
            </div>
          </div>
          :
          <div className=''>
            <LeaderBoardHeader userInfo={userInfo} />
            <LeaderBoardComponent />
          </div>
      }
      <BottomNavigation />
    </div>
  )
}

export default LeaderBoard