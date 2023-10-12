import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAppTheme, setAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';;
import { useQuery } from '@apollo/client';
import { selectUserInfo } from '../slice/userSlice';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import LoadingAppComponent from './LoadingAppComponent';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { FaAngleRight } from 'react-icons/fa';

const SettingComponent = () => {
    const appTheme = useSelector(selectAppTheme);
    const dispatch = useDispatch();
    const getUserInfo = useSelector(selectUserInfo);

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserInfo?.email
        }
    });

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;
    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const handleChangeTheme = () => {
        if (appTheme === "dark") {
            dispatch(setAppTheme("light"));
        } else {
            dispatch(setAppTheme("dark"));
        }
    }

    const userInfo = data?.getUserByEmail[0];

    return (
        <div className="h-sc pb-4">
            {loading ? (
                <LoadingAppComponent />
            ) : error ? (
                <div className="flex-1 justify-center items-center">
                    <p className="text-16px" style={{ color, fontFamily: "Lato-Bold" }}>
                        Oops! An error occurred on our end. Check your internet connection and try again
                    </p>
                    <button
                        className="justify-center items-center px-4 mt-6 py-2 rounded-md"
                        style={{ backgroundColor: buttonColor }}
                        onClick={() => {}}
                    >
                        <p className="font-bold text-16px" style={{ color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, fontFamily: 'Lato-Bold' }}>
                            Click to reload
                        </p>
                    </button>
                </div>
            ) : (
                <div className="">
                    <button
                        className="px-3 py-4 my-1 mt-2 flex-row items-center"
                        style={{ backgroundColor: containerColor, borderColor: bgColor }}
                        onClick={() => {}}
                    >
                        <div className="">
                            <p className="text-[16px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>Account Information</p>
                            <p className="text-[13px] pt-1" style={{ color, fontFamily: 'Lato-Bold' }}>See all your account information like email and full name</p>
                        </div>
                        <FaAngleRight style={{ color }} className="text-[18px]" />
                    </button>
                    {userInfo.isAdminUser === true && (
                        <button
                            className="px-3 py-4 my-1 mt-2 flex-row items-center"
                            style={{ backgroundColor: containerColor, borderColor: bgColor }}
                            onClick={() => {}}
                        >
                            <div className="flex-1">
                                <p className="text-[16px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>Add Question</p>
                                <p className="text-[13px] pt-1" style={{ color, fontFamily: 'Lato-Bold' }}>Only admin users can add quiz questions</p>
                            </div>
                            <FaAngleRight style={{ color }} className="text-[18px]" />
                        </button>
                    )}
                    <button
                        className="px-3 py-4 my-1 flex-row items-center"
                        style={{ backgroundColor: containerColor, borderColor: bgColor }}
                        onClick={handleChangeTheme}
                    >
                        <div className="pr-6 flex-1">
                            <p className="text-[16px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>Theme</p>
                            <p className="text-[13px] pt-1" style={{ color, fontFamily: 'Lato-Bold' }}>Tap to change the theme</p>
                        </div>
                        {appTheme === "dark" ? (
                            <MdDarkMode style={{color }}/>
                        ) : (
                            <MdLightMode style={{color}}/>
                        )}
                    </button>
                    <button
                        className="px-3 py-4 my-1 mt-2 flex-row items-center"
                        style={{ backgroundColor: containerColor, borderColor: bgColor }}
                        onClick={() => {}}
                    >
                        <div className="flex-1">
                            <p className="text-[16px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>Referral</p>
                            <p className="text-[13px] pt-1" style={{ color, fontFamily: 'Lato-Bold' }}>Get your referral link</p>
                        </div>
                        <FaAngleRight style={{ color }} className="text-[18px]" />
                    </button>
                    <button
                        className="px-3 py-4 my-1 mt-2 flex-row items-center"
                        style={{ backgroundColor: containerColor, borderColor: bgColor }}
                        onClick={() => {}}
                    >
                        <FaAngleRight style={{ color }} className="text-[18px]" />
                        <div className="flex-1 pl-2">
                            <p className="text-[16px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>Friend List</p>
                            <p className="text-[13px] pt-1" style={{ color, fontFamily: 'Lato-Bold' }}>Find friends and pick who to challenge</p>
                        </div>
                        <FaAngleRight style={{ color }} className="text-[18px]" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SettingComponent;