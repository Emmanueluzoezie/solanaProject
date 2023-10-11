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

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    return (
        <div className="flex-1 pt-6">
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
                <div className="flex-1 pt-6">
                    {/* Top 3 Leaders with highest coins */}
                    <div className="flex-row justify-center items-end px-6 pb-2">
                        <div className="flex-1 justify-center items-center">
                            <div className={`rounded-full p-2 m-1 relative bg-${appColor.secondaryColor}`}>
                                <Image src={Top20Leader[1]?.image} alt={Top20Leader[1]?.full_name} className="w-[52px] h-[52px] rounded-full"/>
                                <div className={`absolute bottom-[-3] p-1 left-[30%] rounded-full w-5 items-center justify-center bg-${appColor.primaryDarkColor}`}>
                                    <p className="font-bold text-black" style={{ fontFamily: 'Lato-Bold' }}>2</p>
                                </div>
                            </div>
                            <div className="w-[100px]">
                                <p className={`mt-4 truncate font-semibold text-[12px] text-center ${color}`} style={{ fontFamily: 'Lato-Bold' }}>
                                    {Top20Leader[1]?.full_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 justify-center items-center">
                            <div className={`rounded-full p-2 m-1 relative bg-${appColor.primaryDarkColor}`}>
                                <Image src={Top20Leader[0]?.image} alt={Top20Leader[0]?.full_name} className="w-[75px] h-[75px] rounded-full" />
                                <div className={`absolute bottom-[-3] bg-${appColor.secondaryColor} left-[40%] rounded-full w-6 items-center justify-center h-6`}>
                                    <p className="font-bold text-white" style={{ fontFamily: 'Lato-Bold' }}>1</p>
                                </div>
                            </div>
                            <div className="w-[100px]">
                                <p className={`mt-4 font-semibold text-[12px] text-center`} style={{ fontFamily: 'Lato-Bold', color }} >
                                    {Top20Leader[0]?.full_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 justify-center items-center">
                            <div className={`rounded-full p-2 m-1 relative bg-${appColor.ternaryColor}`}>
                                <Image src={Top20Leader[2]?.image} alt={Top20Leader[2]?.full_name} className="w-[42px] h-[42px] rounded-full" />
                                <div className={`absolute bottom-[-2] left-[25%] rounded-full w-4 items-center justify-center h-4 bg-${appColor.primaryColor}`}>
                                    <p className="font-bold text-white text-[12px]" style={{ fontFamily: 'Lato-Bold' }}>3</p>
                                </div>
                            </div>
                            <div className="w-[100px]">
                                <p className={`mt-4 font-semibold text-[12px] text-center`} style={{ fontFamily: 'Lato-Bold',  color }}>
                                    {Top20Leader[2]?.full_name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 px-4">
                        <div className="flex-row justify-between items-center mt-3 pb-2">
                            <p className={`font-semibold text-[16px] ${color}`} style={{ fontFamily: 'Lato-Bold' }}>Top 20 overall Leaders board</p>
                            <div className="flex-row items-center">
                                <p className={`pr-1 font-semibold`} style={{ fontFamily: 'Lato-Bold', color }}>Sort</p>
                                        <FaSortDown className="" style={{ color: buttonColor }}/>
                            </div>
                        </div>
                        <div className={`p-2 rounded-md my-2 bg-${appColor.primaryDarkColor}`}>
                            <p className={`pl-4 font-semibold ${color}`} style={{ fontFamily: 'Lato-Bold' }}>Your rank</p>
                            <div className="flex-row items-center px-2">
                                <p style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>{userRank}</p>
                                <Image src={userDetails?.image} alt={userDetails?.full_name} className="w-10 h-10 mx-3 rounded-full" />
                                <div className="flex-1">
                                    <p className={`font-semibold pb-1 text-[16px] ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{userDetails?.full_name}</p>
                                    <p className="text-[13px]" style={{ color: "black", fontFamily: 'Lato-Regular' }}>Over all Quiz</p>
                                </div>
                                <button className={`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`}>
                                    <FaSortDown className="" style={{ color:buttonColor }}/>
                                </button>
                            </div>
                        </div>
                        {Top20Leader.map((item:any, index:any) => {
                            if (item?.full_name === userDetails?.full_name) {
                                return null; // Hide the item
                            }
                            return (
                                <div className={`p-2 rounded-md my-2 ${item?.full_name === userDetails?.full_name && "hidden"}`} style={{ backgroundColor: containerColor }}>
                                    <div className="flex-row items-center px-2">
                                        <p style={{ color, fontFamily: 'Lato-Bold' }}>{index + 1}</p>
                                        <Image src={item?.image} alt={item?.full_name} className="w-10 h-10 mx-3 rounded-full" />
                                        <div className="flex-1">
                                            <p className={`font-semibold pb-1 text-[16px] ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{item?.full_name}</p>
                                        </div>
                                        <button className={`w-[18px] justify-center items-center rounded-sm h-[18px] bg-white`}>
                                            {/* <AntDesign name="caretdown" size={12} color={buttonColor} /> */}
                                        </button>
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