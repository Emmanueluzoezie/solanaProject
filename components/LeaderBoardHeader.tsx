import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme, setIsHomeLoading } from '../slice/AppSlices';
import { selectProvider, selectUserInfo, selectWeb3Auth, setAddress, setTokenId, setUserInfo } from '../slice/userSlice';
import { appColor } from './AppColor';
import RPC from "../solanaRPC";
import { FaCoins } from 'react-icons/fa';

const LeaderBoardHeader = ({ userInfo }: any) => {
    const appTheme = useSelector(selectAppTheme);
    const router = useRouter()
    const provider = useSelector(selectProvider)
    const web3auth = useSelector(selectWeb3Auth)
    const dispatch = useDispatch()



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

        const loaded = async () => {
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


    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    return (
        <div className="flex items-center p-3">
            <div className='rounded-full' style={{ backgroundColor: appColor.primaryDarkColor }} onClick={() => router.push("profile")}>
                <Image src={userInfo?.image} className="w-[40px] h-[40px] rounded-full" alt='' width={100} height={100}/>
            </div>
            <h2 className={`flex-1 text-center text-[20px] capitalize font-bold`} style={{ color }}>Leaders Board</h2>
            <div className="flex items-center" style={{color: appColor.ternaryColor}}>
                <FaCoins  />
                <span className={`pl-1 text-[14px] text-${color} font-bold`}>{userInfo?.coins} Points</span>
            </div>
        </div>
    );
}

export default LeaderBoardHeader;
