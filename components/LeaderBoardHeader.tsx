import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';

const LeaderBoardHeader = ({ userInfo }: any) => {
    const appTheme = useSelector(selectAppTheme);

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const borderColor = appTheme === "dark" ? appColor.darkBorderColor : appColor.lightBorderColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    return (
        <div className="flex-row items-center pt-10 px-3">
            <div className='rounded-full' style={{ backgroundColor: appColor.primaryDarkColor }} onClick={() => {}}>
                <Image src={userInfo?.image} className="w-[35px] h-[35px] rounded-full" alt=''/>
            </div>
            <h2 className={`flex-1 text-center text-18 capitalize font-bold`} style={{ color, fontFamily: 'Lato-Bold' }}>Leaders Board</h2>
            <div className="flex-row items-center">
                <Image src={require("../assets/coins.png")} className="w-[15px] h-[12px]" alt=''/>
                <span className={`pl-1 text-14 text-${color} font-bold`} style={{ fontFamily: 'Lato-Bold' }}>{userInfo?.coins}</span>
            </div>
        </div>
    );
}

export default LeaderBoardHeader;
