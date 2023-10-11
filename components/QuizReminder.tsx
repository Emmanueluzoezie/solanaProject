import React from 'react';
import { appColor } from './AppColor';
import Image from 'next/image'; // Import the next/image component
import quizImage from '../assets/quizss.png'; // Import your quiz image
import investorImage from '../assets/investor.png'; // Import your investor image

function QuizReminder() {
    return (
        <div className='p-3' style={{ backgroundColor: appColor.primaryDarkColor, borderRadius: 10, margin: "10px 0px" }}>
            <h2 className={`text-16 font-bold`} style={{ color: appColor.lightTextColor, }}>
                Daily Quiz
            </h2>
            <div className="flex items-center my-2" style={{marginTop: "10px"}}>
                <p className={`flex-1 pr-2 text-[14px]`} style={{ color: appColor.lightTextColor, }}>
                    Take your daily quiz, and win an extra prize to add to your rank
                </p>
                <Image
                    src={investorImage}
                    alt="Investor"
                    className="w-12 h-15"
                    width={25}
                    height={25}
                />
            </div>
            <p className={`text-13 font-semibold `} style={{ color: appColor.primaryColor, }}>
                12hrs Left
            </p>
        </div>
    );
}

export default QuizReminder;