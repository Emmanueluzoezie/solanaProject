import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { appColor } from '../AppColor';
import { selectAppTheme, setAppScreen } from '../../slice/AppSlices';
import { selectUserId } from '../../slice/userSlice';
import { GET_ALL_HISTORY_BY_ID } from '../../graphql/queries';
import { useRouter } from 'next/router';
import { RotatingLines } from 'react-loader-spinner';
import { FaCaretDown } from 'react-icons/fa';
import SingleHistory from './SingleHistory';


const HistoryLink = () => {
    const [top3History, setTop3History] = useState([]);
    const appTheme = useSelector(selectAppTheme);
    const getUserId = useSelector(selectUserId);
    const dispatch = useDispatch()
    

    const { data, loading, error } = useQuery(GET_ALL_HISTORY_BY_ID, {
        variables: {
            user_id: getUserId,
        },
    });

    const historyList = data?.getHistoryByUser_Id;

    const textColor = appTheme === 'dark' ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    const borderColor = appTheme === 'dark' ? appColor.primaryDarkColor : appColor.primaryColor;

    const containerColor = appTheme === 'dark' ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === 'dark' ? appColor.darkTextColor : appColor.lightTextColor;

    useEffect(() => {
        if (data) {
            const sortedHistory = historyList?.slice().sort((a:any, b:any) => b.amount - a.amount)
            setTop3History(sortedHistory?.slice(0, 3))
        }
    }, [data]);

    return (
        <div className="">
            {loading ? (
                <div className="flex">
                    <RotatingLines
                        strokeColor={appColor.primaryColor}
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center">
                    <p className="text-16px" style={{ color, fontFamily: 'Lato-Bold' }}>
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <button
                        className="justify-center items-center px-4 mt-6 py-2 rounded-md"
                        style={{ backgroundColor: borderColor }}
                        onClick={() => window.location.reload()}
                    >
                        <span className="font-bold text-16px" style={{ color: appTheme === 'dark' ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }}>
                            Click to reload
                        </span>
                    </button>
                </div>
            ) : (
                <div className="mt-8 px-4">
                    {top3History.length > 0 ? (
                        <div>
                            <div className="flex items-center justify-between px-2">
                                <p className="text-16px pb-1 font-semibold" style={{ color }}>
                                    Top 3 Achievements
                                </p>
                                <button  className='flex items-center' onClick={() => dispatch(setAppScreen("history"))}>
                                    <p className="text-13px pb-1 font-semibold" style={{ color}}>
                                        See all
                                    </p>
                                    <FaCaretDown className='mt-[-4px]' style={{color}}/>
                                </button>
                            </div>
                            <div className="history-list">
                                {top3History.map((item:any) => (
                                    <div className="p-4 my-3 border-l-[12px] rounded-md" style={{ backgroundColor: containerColor, borderColor }}key={item.id}>
                                        <SingleHistory item={item}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="pt-6 px-4">
                            <p className="text-center text-14px" style={{ color: color, fontFamily: 'Lato-Bold' }}>
                                You have not attended any Quiz. Attend a quiz and get a chance of getting up to 50 coins.
                            </p>
                            <div className="button-row">
                                <button className="py-8px px-10 rounded-md" style={{ backgroundColor: borderColor }} onClick={() => {}}>
                                    <p className="font-bold text-14px" style={{ color: appTheme !== 'dark' ? appColor.darkTextColor : appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>
                                        Explore Quiz Categories
                                    </p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryLink;

