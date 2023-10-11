import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';  // Update this import based on your project setup
import { useQuery } from '@apollo/client';
import { GET_ALL_USER } from '../graphql/queries';
import { selectUserInfo, selectUserRank, setUserRank } from '../slice/userSlice';
import { FaCaretDown } from 'react-icons/fa';
import Image from 'next/image';
import { MdArrowDropDown, MdOutlineArrowDropDown } from 'react-icons/md';

const LeaderBoardRank = () => {
    const [userDetails, setUserDetails] = useState<any>();
    const appTheme = useSelector(selectAppTheme);
    const userRank = useSelector(selectUserRank); // Update this line based on your project setup
    const dispatch = useDispatch();
    const getUserInfo = useSelector(selectUserInfo);

    const { data, loading, error } = useQuery(GET_ALL_USER); // Update this line based on your project setup

    const userInfo = data?.getUserList;

    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const primary = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const TopFiveLeader = userInfo?.sort((a:any, b:any) => b.coins - a.coins).slice(0, 5);

    useEffect(() => {
        if (data && userInfo) {
            const sortedUsers = userInfo?.sort((a:any, b:any) => b.coins - a.coins);
            const currentUserIndex = sortedUsers?.findIndex((user: any) => user.full_name === getUserInfo.name);

            console.log(currentUserIndex)

            if (currentUserIndex !== -1) {
                const currentUser = sortedUsers[currentUserIndex];
                setUserDetails(currentUser);
                console.log(currentUser)
                dispatch(setUserRank(currentUserIndex + 1));
            }
        }
    }, []);

    if(userDetails){
        console.log(userDetails)
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem' }}>
                <p className='text-[18px] font-semibold' style={{ color, }}>
                    Top 5 LeaderBoard
                </p>
                <button className='flex items-center'>
                    <p className='text-[14px] font-semibold' style={{ color, }}>See all</p>
                    <MdOutlineArrowDropDown className='text-[30px]'/>
                </button>
            </div>
            {loading ? (
                <div style={{ width: '100%', height: '70px', borderRadius: '4px', backgroundColor: containerColor }} />
            ) : error ? (
                <div className=''>
                    <p style={{ color, }}>
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <div className='flex justify-center'>
                        <button className='p-1 px-4 rounded-md mt-3' style={{ backgroundColor: primary }}>
                            <p style={{ color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, }}>
                                Click to reload
                            </p>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='pb-8'>
                    {userDetails &&
                                <div style={{ padding: '0.5rem', borderRadius: '4px', marginTop: '0.5rem', backgroundColor: appColor.primaryDarkColor }}>
                                    <p className='font-semibold pl-3'>
                                        Your rank
                                    </p>
                                    <div className='flex items-center space-x-3'>
                                        <h1 style={{ color: appColor.lightTextColor, }} className="font-bold">{userRank}</h1>
                                        <Image src={userDetails.image} alt="" width={100} height={100} className="w-[45px] h-[45px] rounded-full" />
                                        <div className='flex-1'>
                                            <h1  className='font-semibold text-[18px]' style={{ color: appColor.lightTextColor, }}>
                                                {userDetails?.full_name}
                                            </h1>
                                            <h3 className='text-[14px] mt-[-4px]' style={{color: "black" }}> Over all Quiz</h3>
                                        </div>
                                        <MdOutlineArrowDropDown className='text-[25px] rounded-md mt-[-16px]' style={{color: appColor.primaryColor, backgroundColor: "white"}}/>
                                    </div>
                                </div>}

                    {TopFiveLeader.map((item:any, index:any) => {
                        // if (item.name === userDetails?.name) {
                        //     return null;
                        // }
                        return (
                            <div className='p-3 rounded-md my-2' style={{ backgroundColor: containerColor }} key={item.id}>
                                <div className='flex items-center space-x-3'>
                                    <h1 style={{ color: appColor.lightTextColor, }} className="font-bold">{userRank}</h1>
                                    <Image src={userDetails.image} alt="" width={100} height={100} className="w-[45px] h-[45px] rounded-full" />
                                    <div className='flex-1'>
                                        <h1 className='font-semibold text-[18px]' style={{ color: appColor.lightTextColor, }}>
                                            {userDetails?.full_name}
                                        </h1>
                                        <h3 className='text-[14px] mt-[-4px]' style={{ color: "black" }}> Over all Quiz</h3>
                                    </div>
                                    <MdOutlineArrowDropDown className='text-[25px] rounded-md mt-[-16px]' style={{ color: appColor.primaryColor, backgroundColor: "white" }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LeaderBoardRank;