import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { users } from '../utilies/AppObjects';
import { selectUserInfo } from '../slice/userSlice';
import { useQuery } from '@apollo/client';
import { GET_ALL_USER } from '../graphql/queries';
import LoadingAppComponent from './LoadingAppComponent';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';
import { FaSortDown } from 'react-icons/fa';
import Image from 'next/image';

const LeaderBoardComponent = () => {
    const [userRank, setUserRank] = useState(0);
    const [userDetails, setUserDetails] = useState<any>({});
    const appTheme = useSelector(selectAppTheme);
    const getUserInfo = useSelector(selectUserInfo);

    const { data, loading, error } = useQuery(GET_ALL_USER);

    const userInfo = data?.getUserList;

    const Top20Leader = userInfo?.sort((a:any, b:any) => b.coins - a.coins).slice(0, 20);

    useEffect(() => {
        const sortedUsers = userInfo.sort((a: any, b: any) => b.coins - a.coins);

        const currentUserIndex = sortedUsers.findIndex((user:any) => user.full_name === getUserInfo.name);

        if (currentUserIndex !== -1) {
            const currentUser = sortedUsers[currentUserIndex];
            setUserDetails(currentUser);
            setUserRank(currentUserIndex + 1);
        } else {
            return;
        }
    }, []);

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    return (
        <div className="flex-1 pb-[80px]" style={{ backgroundColor: bgColor }}>
            {loading ? (
                <LoadingAppComponent />
            ) : error ? (
                <div className="flex-1 justify-center items-center">
                    <p className={`text-[16px] ${color}`} style={{ fontFamily: "Lato-Bold" }}>
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <button className={`justify-center items-center px-4 mt-6 py-2 rounded-md ${buttonColor}`} onClick={() => {}}>
                        <p className={`font-bold text-[16px] ${appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor}`} style={{ fontFamily: 'Lato-Bold' }}>
                            Click to reload
                        </p>
                    </button>
                </div>
            ) : (
                <div className="">
                    <div className="flex justify-center items-end px-6 pb-2">
                        <div className="flex-1 flex flex-col items-center">
                            <div className={`flex flex-col items-center rounded-full p-2 m-1 relative bg-${appColor.secondaryColor}`}>
                               <div className='w-fit' style={{borderColor: appColor.secondaryColor}}>
                                            <Image src={Top20Leader[1]?.image} alt={Top20Leader[0]?.full_name} className="w-[75px] h-[75px] border-[10px] rounded-full" style={{ borderColor: appColor.secondaryColor }} width={100} height={100} />
                               </div>
                                <div className="">
                                    <div className='w-[16px] mt-[-8px] h-[16px] flex items-center  justify-center rounded-full ' style={{backgroundColor: appColor.ternaryColor}}>
                                        <p className="font-semibold text-[12px] text-black" style={{ color: appColor.primaryColor }}>2</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[100px]">
                                <p className={` truncate font-semibold text-[14px] text-center capitalize`} style={{ color }}>
                                    {Top20Leader[1]?.full_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className={`flex flex-col items-center rounded-full p-2 m-1 relative`}>
                                <div className='w-fit'>
                                    <Image src={Top20Leader[0]?.image} alt={Top20Leader[0]?.full_name} className="w-[100px] h-[100px] border-[10px] rounded-full" style={{ borderColor: appColor.primaryDarkColor }} width={100} height={100} />
                                </div>
                                <div className={`w-[20px] mt-[-8px] h-[20px] rounded-full flex justify-center items-center`} style={{ backgroundColor: appColor.primaryDarkColor }}>
                                    <p className="font-bold" style={{color: "black"  }}>1</p>
                                </div>
                            </div>
                            <div className="w-[100px]">
                                        <p className={`mt-1 font-semibold text-[14px] text-center truncate  capitalize`} style={{ color }} >
                                    {Top20Leader[0]?.full_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                            <div className="">
                                <div className='w-fit' style={{ borderColor: appColor.primaryColor }}>
                                    <Image src={Top20Leader[2]?.image} alt={Top20Leader[2]?.full_name} className="w-[100%] h-[100%] rounded-full border-[10px]" style={{ borderColor: appColor.primaryColor }} width={100} height={100} />
                                </div>
                            </div>
                            <div className="w-[14px] mt-[-6px] flex flex-col items-center justify-center rounded-full h-[14px]" style={{backgroundColor: appColor.primaryColor}}>
                                <p className="font-bold text-white text-[10px]" style={{ color: appColor.darkTextColor}}>3</p>
                            </div>
                            <div className="w-[100px]">
                                <p className={`truncate font-semibold text-[14px] text-center capitalize`} style={{ color }}>
                                    {Top20Leader[2]?.full_name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" px-4 mt-10">
                        <div className="flex justify-between items-center mt-3 pb-2">
                            <p className={`font-semibold text-[18px]`} style={{ }}>Top 20 overall Leaders board</p>
                            <div className="flex items-center">
                                <p className={`pr-1 font-semibold`} style={{ fontFamily: 'Lato-Bold', color }}>Sort</p>
                                <FaSortDown className="mt-[-4px]" style={{ color: buttonColor }}/>
                            </div>
                        </div>
                            <div className={`p-2 rounded-md my-2 `} style={{ backgroundColor: appColor.primaryDarkColor }}>
                            <h2 className={`pl-4 font-semibold`} style={{ color}}>Your rank</h2>
                            <div className="flex items-center px-2">
                                <h2 className='font-bold' style={{ color: appColor.primaryColor, }}>{userRank}</h2>
                                        <Image src={userDetails?.image} alt={userDetails?.full_name} className="w-[45px] h-[45px] mx-3 rounded-full" width={100} height={100} />
                                <div className="flex-1">
                                    <p className={`font-semibold capitalize pb-1 text-[16px]`} style={{color:textColor}}>{userDetails?.full_name}</p>
                                        <p className="text-[13px] mt-[-8px]" style={{ color: textColor, }}>Over all Quiz</p>
                                </div>
                                <div className='flex items-center'>
                                    <h2 className='font-semibold text-[14px]' style={{color:appColor.primaryColor}}>{userDetails?.coins} Points</h2>
                                    <button className={`w-[18px] ml-3 flex justify-center items-center rounded-sm h-[18px] bg-white`}> <FaSortDown className="mt-[-6px]" style={{ color: buttonColor }} />
                                            </button>
                                </div>
                            </div>
                        </div>
                        {Top20Leader.map((item:any, index:any) => {
                            if (item?.full_name === userDetails?.full_name) {
                                return null; 
                            }
                            return (
                                <div className={`p-3 rounded-md my-2 ${item?.full_name === userDetails?.full_name && ""}`} style={{ backgroundColor: containerColor, color: textColor }}>
                                    <div className="flex items-center px-2">
                                        <h2 className='font-bold' style={{ color: appColor.primaryColor,}}>{index + 1}</h2>
                                        <Image src={item?.image} alt={item?.full_name} className="w-[45px] h-[45px] mx-3 rounded-full" width={100} height={100} />
                                        <div className="flex-1">
                                            <h2 className={`font-semibold pb-1 capitalize text-[16px]`} style={{ color: textColor}}>{item?.full_name}</h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <h2 className='font-semibold text-[14px]'>{item?.coins} Points</h2>
                                            <button className={`w-[18px] ml-3 flex justify-center items-center rounded-sm h-[18px] bg-white`}> <FaSortDown className="mt-[-6px]" style={{ color: buttonColor }} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default LeaderBoardComponent;