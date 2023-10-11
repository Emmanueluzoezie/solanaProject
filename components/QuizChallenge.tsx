import React from 'react';
import { useSelector } from 'react-redux';
import { appColor } from './AppColor';
import { FaCaretDown } from "react-icons/fa"
import { selectAppTheme } from '../slice/AppSlices';

function QuizChallenge() {
    const appTheme = useSelector(selectAppTheme) // You can replace this with the actual theme logic
    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const containerColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    return (
        <div className={`mt-6`} style={{ backgroundColor: bgColor}}>
            <div className="flex justify-between px-2 ">
                <h2 className={`font-semibold text-[18px]`} style={{ color: color, }}>
                    Quiz Challenge
                </h2>
                <button>
                    <div className='flex items-center font-semibold'>
                        <p className='px-1 text-[14px]' style={{ color,}}>
                            See all
                        </p>
                        <FaCaretDown />
                    </div>
                </button>
            </div>

            <div className='flex'>
                <div className={`px-3 py-1 justify-between rounded-lg mr-2 flex-1 relative h-[140px]`} style={{ backgroundColor: appColor.ternaryColor, }}>
                    <h2 className={`font-semibold text-[18px] mt-2 pb-4`} style={{ color: appColor.lightTextColor, }}>
                        In Progress Quiz
                    </h2>
                    <p className={`text-[14px] pb-2`} style={{ color: appColor.lightTextColor}}>
                        Explore this week quiz challenge
                    </p>
                    <p className={`font-bold text-[12px] absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, }}>
                        2/7
                    </p>
                </div>
                <div className={`px-3 py-1 flex-1 rounded-lg mx-2 relative h-[140px]`} style={{ backgroundColor: appColor.secondaryColor }}>
                    <h2 className={`font-semibold text-[18px] mt-2 pb-4`} style={{ color: appColor.lightTextColor, }}>
                        Available Quiz
                    </h2>
                    <p className={`text-[14px] pb-2`} style={{ color: appColor.lightTextColor}}>
                        Explore this month quiz challenge
                    </p>
                    <p className={`font-bold text-[12px] absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, }}>
                        10/30
                    </p>
                </div>
            </div>
            <div className='flex mt-4'>
                <div className={`px-3 py-1 justify-between rounded-lg mr-2 flex-1 relative h-[140px]`} style={{ backgroundColor: appColor.ternaryColor, }}>
                    <h2 className={`font-semibold text-[18px] mt-2 pb-4`} style={{ color: appColor.lightTextColor, }}>
                        In Progress Quiz
                    </h2>
                    <p className={`text-[14px] pb-2`} style={{ color: appColor.lightTextColor}}>
                        Explore this week quiz challenge
                    </p>
                    <p className={`font-bold text-[12px] absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, }}>
                        2/7
                    </p>
                </div>
                <div className={`px-3 py-1 flex-1 rounded-lg mx-2 relative h-[140px]`} style={{ backgroundColor: appColor.secondaryColor }}>
                    <h2 className={`font-semibold text-[18px] mt-2 pb-4`} style={{ color: appColor.lightTextColor, }}>
                        Available Quiz
                    </h2>
                    <p className={`text-[14px] pb-2`} style={{ color: appColor.lightTextColor}}>
                        Explore this month quiz challenge
                    </p>
                    <p className={`font-bold text-[12px] absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, }}>
                        10/30
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QuizChallenge;