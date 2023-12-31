
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


    const logout = async () => {
        if (!web3auth) {
            return;
        }
        await web3auth.logout();
        dispatch(setProvider(null))

    };

    const authenticateUser = async () => {
        if (!web3auth) {
            return;
        }
        const idToken = await web3auth.authenticateUser();
        dispatch(setTokenId(idToken));
    };

    const getUserInfo = async () => {
        if (!web3auth) {
            return;
        }
        const user = await web3auth.getUserInfo();
        dispatch(setUserInfo(user))
    };
    const getAccounts = async () => {
        if (!provider) {
            return;
        }
        const rpc = new RPC(provider);
        const address = await rpc.getAccounts();
        dispatch(setAddress(address))
    };

    const sendTransaction = async () => {
        if (!provider) {
            return;
        }
        const rpc = new RPC(provider);
        const receipt = await rpc.sendTransaction();
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

    const getBalance = async () => {
        if (!provider) {
            return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
    };

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const buttonColor = appTheme === "dark" ? appColor.primaryColor : appColor.primaryDarkColor

    return (
        <div style={{ backgroundColor: bgColor, }} className="h-inherit">
            {isAppLoading?
            <LoadingAppComponent />
            :
            <div className="h-inherit">
                <div className='h-[92%] px-4'>
                    <HomeHeader />
                    <QuizReminder />
                    <QuizChallenge />
                    <LeaderBoardRank />
                        {/* <button onClick={getBalance}>get setTransaction</button> */}
                </div>
                <BottomNavigation />
            </div>
            }z
        </div>
    )
}

export default HomeComponent