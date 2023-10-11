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
        <div className={`mt-4`} style={{ backgroundColor: bgColor}}>
            <div className="flex justify-between mb-1  px-2 ">
                <h2 className={`font-semibold `} style={{ color: color, fontFamily: 'Lato-Bold' }}>
                    Quiz Challenge
                </h2>
                <button>
                    <div className='flex items-center'>
                        <p className='px-1' style={{ color: color, fontFamily: 'Lato-Bold'}}>
                            See all
                        </p>
                        <FaCaretDown />
                    </div>
                </button>
            </div>

            <div className='flex'>
                <div className={`px-3 py-1 justify-between rounded-lg mr-2 flex-1 relative h-[140px]`} style={{ backgroundColor: appColor.ternaryColor, }}>
                    <h2 className={`font-semibold text-17 mt-2 pb-4`} style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>
                        In Progress Quiz
                    </h2>
                    <p className={`text-14 pb-2`} style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }}>
                        Explore this week quiz challenge
                    </p>
                    <p className={`font-semibold text-12 absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, fontFamily: 'Lato-Bold' }}>
                        2/7
                    </p>
                </div>
                <div className={`px-3 py-1 flex-1 rounded-lg mx-2 relative h-[140px]`} style={{ backgroundColor: appColor.secondaryColor }}>
                    <h2 className={`font-semibold text-18 mt-2 pb-4`} style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Bold' }}>
                        Available Quiz
                    </h2>
                    <p className={`text-14 pb-2`} style={{ color: appColor.lightTextColor, fontFamily: 'Lato-Regular' }}>
                        Explore this month quiz challenge
                    </p>
                    <p className={`font-semibold text-12 absolute bottom-2 right-2`} style={{ color: appColor.primaryColor, fontFamily: 'Lato-Bold' }}>
                        10/30
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QuizChallenge;