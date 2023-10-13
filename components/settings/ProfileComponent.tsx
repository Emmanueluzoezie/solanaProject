import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { appColor } from '../AppColor';
import HistoryLink from './HistoryLink';
import { FaCoins, FaCopy } from 'react-icons/fa';
import { selectBalance, selectProvider, selectUserInfo, selectUserRank, setBalance } from '../../slice/userSlice';
import { selectAppTheme } from '../../slice/AppSlices';
import { GET_USER_BY_EMAIL } from '../../graphql/queries';
import LoadingAppComponent from '../LoadingAppComponent';
import { MdPerson2 } from 'react-icons/md';
import Image from 'next/image';
import HeaderSettings from './HeaderSettings';
import RPC from "../../solanaRPC";

const ProfileComponent = () => {
    const provider = useSelector(selectProvider)
    const [copyMessage, setCopyMessage] = useState('');
    const getUserInfo = useSelector(selectUserInfo);
    const userRank = useSelector(selectUserRank);
    const appTheme = useSelector(selectAppTheme);
    const dispatch = useDispatch()
    const getUserBalance = useSelector(selectBalance)

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserInfo?.email,
        },
    });

    const userInfo = data?.getUserByEmail[0];

    const copyToClipboard = () => {
        const textField = document.createElement('textarea');
        textField.innerText = userInfo.user_sol_address;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        document.body.removeChild(textField);

        setCopyMessage('Copied');
        setTimeout(() => {
            setCopyMessage('');
        }, 2000);
    };

    const getBalance = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        const rpc = new RPC(provider);
        const balance = await rpc.getBalance();
        dispatch(setBalance(balance))
    };
 
    const solBalance = getUserBalance / 1000000000;

    useEffect(() => {
        getBalance()
    },[])

    const buttonColor = appTheme === 'dark' ? appColor.primaryDarkColor : appColor.primaryColor;

    const color = appTheme === 'dark' ? appColor.darkTextColor : appColor.lightTextColor;
    const secondColor = appTheme === 'dark' ? appColor.darkBorderColor : appColor.lightBorderColor;

    const textColor = appTheme === 'dark' ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    return (
        <div className="">
            {loading ? (
                <LoadingAppComponent />
            ) : error ? (
                <div className="flex justify-center items-center">
                    <p className="text-16px" style={{ color }}>
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <button
                        className="justify-center items-center px-4 mt-6 py-2 rounded-md"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => window.location.reload()}
                    >
                        <span className="font-bold text-16px" style={{ color: appTheme === 'dark' ? appColor.lightTextColor : appColor.darkTextColor }}>
                            Click to reload
                        </span>
                    </button>
                </div>
            ) : (
                <div className="h-screen">
                    <HeaderSettings title='Profile'/>
                    <div className="flex justify-center py-4">
                        <Image src={userInfo?.image} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} width={100} height={100} />
                    </div>

                    <div className="pl-2 flex flex-col items-center text-center">
                        <p className="text-[26px] pb-1 font-semibold mb-2" style={{ color }}>
                            {userInfo?.full_name}
                        </p>
                        <div className="w-[200px] mt-[-20px] flex items-center">
                            <p className="text-[13px] font-semibold truncate" style={{ color: secondColor }}>
                                {userInfo?.user_sol_address}
                            </p>
                            <FaCopy onClick={copyToClipboard} className="text-[28px] cursor-pointer" style={{ color: buttonColor }} />
                        </div>
                        <p className="text-[16px] font-semibold mt-[-10px] py-1" style={{ color: secondColor }}>
                            {userInfo?.email}
                        </p>
                    </div>
                    <p className="font-semibold text-center text-12px" style={{ color }}>{copyMessage}</p>
                    <div className="mt-4 p-2 flex items-center">
                        <div className="border-r-2 py-3 flex items-center justify-center flex-1 flex-col" style={{ borderColor: color }}>
                            <div className="flex items-center justify-center">
                                <MdPerson2 style={{ color }} className="text-[18px]" />
                                <p className="text-15px font-semibold pl-1" style={{ color }}>Rank</p>
                            </div>
                            <p className="text-12px mt-2 font-semibold" style={{ color: textColor }}>{userRank}</p>
                        </div>
                        <div className="border-r-2 py-3 flex items-center justify-center flex-1 flex-col" style={{ borderColor: color }}>
                            <div className="flex items-center justify-center">
                                        <Image src={require('../../assets/investor.png')} alt="Badge" style={{ width: '15px', height: '15px' }} width={100} height={100} />
                                <p className="text-15px font-semibold pl-1" style={{ color }}>Badge</p>
                            </div>
                            <p className="text-12px mt-2 font-semibold capitalize" style={{ color: textColor }}>{userInfo?.badge}</p>
                        </div>
                        <div className=" py-3 flex items-center justify-center border-r-[2px] flex-1 flex-col" style={{ borderColor: color }}>
                            <div className="flex items-center justify-center">
                                        <Image src={require('../../assets/coins.png')} alt="Coins" style={{ width: '15px', height: '12px' }} width={100} height={100} />
                                <p className="text-15px font-semibold pl-1" style={{ color }}>Points</p>
                            </div>
                            <p className="text-12px mt-2 font-semibold capitalize" style={{ color: textColor }}>{userInfo?.coins}</p>
                        </div>
                        <div className="flex items-center flex-col justify-center px-2 pr-6">
                            <div className="flex items-center justify-center">
                                {/* <FaCoins style={{color:appColor.secondaryColor}} className="text-[18px]"/> */}
                                <p className="text-15px font-semibold pl-1" style={{ color }}>Bal</p>
                            </div>
                            <p className="text-12px mt-2 font-semibold" style={{ color: textColor }}>{solBalance} SOL</p>
                        </div>
                    </div>
                    <HistoryLink />
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;