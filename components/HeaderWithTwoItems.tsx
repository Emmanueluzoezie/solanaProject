import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from './AppColor';
import tailwind from 'tailwindcss';
import { selectAppTheme } from '../slice/AppSlices';
import { FaSearch } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { setCurrentQuizScreen } from '../slice/QuizSlice';

type Props = {
    title: string
}

const HeaderWithTwoItems = ({ title }: any) => {
    const appTheme = useSelector(selectAppTheme);
    const dispatch = useDispatch()

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    return (
        <div className="flex items-center px-3 py-5" style={{ backgroundColor: containerColor }}>
            <MdArrowBackIosNew style={{ color }} className="text-[20px]  cursor-pointer" onClick={() => dispatch(setCurrentQuizScreen("home_quiz"))} />
            <div className="flex-1 flex justify-center">
                <span className='' style={{color}}>{title}</span>
            </div>
            <FaSearch />
        </div>
    );
};

export default HeaderWithTwoItems;