
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAppTheme, selectIsHomeLoading, selectIsUserLogin, setIsHomeLoading } from '../slice/AppSlices';
import { selectProvider, selectWeb3Auth, setAddress, setProvider, setTokenId, setUserInfo, setWeb3Auth } from '../slice/userSlice';
import RPC from "../solanaRPC";
import { appColor } from './AppColor';
import BottomNavigation from './BottomNavigation';
import HomeHeader from './HomeHeader';
import LeaderBoardRank from './LeaderboardRank';
import LoadingAppComponent from './LoadingAppComponent';
import QuizChallenge from './QuizChallenge';
import QuizReminder from './QuizReminder';

const HomeComponent = () => {
    const provider = useSelector(selectProvider)
    const isAppLoading = useSelector(selectIsHomeLoading)
    const isUserLogin = useSelector(selectIsUserLogin)
    const web3auth = useSelector(selectWeb3Auth)
    const dispatch = useDispatch()
    const appTheme = useSelector(selectAppTheme)


    const navigateToQuiz = () => {
        // Navigate to the Quiz screen
        console.log('Navigating to Quiz Screen');
    };

    const logout = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        await web3auth.logout();
        dispatch(setProvider(null))

    };

    const authenticateUser = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const idToken = await web3auth.authenticateUser();
        dispatch(setTokenId(idToken));
    };

    const getUserInfo = async () => {
        if (!web3auth) {
            console.log("web3auth not initialized yet");
            return;
        }
        const user = await web3auth.getUserInfo();
        dispatch(setUserInfo(user))
        console.log("want to know", user)
    };
    const getAccounts = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        dispatch(setAddress(address))
    };

    useEffect(() => {

        const loaded = async() => {
            dispatch(setIsHomeLoading(true))
            authenticateUser()
            getUserInfo()
            getAccounts()
            setTimeout(() => {
                dispatch(setIsHomeLoading(false))
            }, 3000)
        }

        loaded()
    }, [provider])

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const buttonColor = appTheme === "dark" ? appColor.primaryColor : appColor.primaryDarkColor

    return (
        <div style={{ backgroundColor: bgColor, }} className="h-screen">
            {isAppLoading?
            <LoadingAppComponent />
            :
            <div className="h-screen">
                <div className='h-[92%] px-4'>
                    <HomeHeader />
                    <QuizReminder />
                    <QuizChallenge />
                    <LeaderBoardRank />
                        <button className='p-1 px-4 rounded-md mt-3' style={{ backgroundColor: appColor.primaryColor }} onClick={getAccounts}>
                        <p style={{ fontWeight: 'bold', fontSize: '1rem', color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }}>
                            logout
                        </p>
                    </button>
                </div>
                <BottomNavigation />
            </div>
            }
        </div>
    )
}

export default HomeComponent