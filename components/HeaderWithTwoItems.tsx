import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from './AppColor';
import tailwind from 'tailwindcss';
import { selectAppTheme, selectPreviousAppScreen, setAppScreen } from '../slice/AppSlices';
import { FaAngleLeft, FaSearch } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { setCurrentQuizScreen } from '../slice/QuizSlice';

type Props = {
    title: string
}

const HeaderWithTwoItems = ({ title }: any) => {
    const appTheme = useSelector(selectAppTheme);
    const previousScreen = useSelector(selectPreviousAppScreen)
    const dispatch = useDispatch()

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    return (
        <div className="flex items-center px-3 py-5 w-full" style={{ backgroundColor: containerColor }}>
            <div className='p-2 rounded-full cursor-pointer hover:bg-gray-400 '>
            <FaAngleLeft style={{ color }} className="text-[25px]  cursor-pointer" onClick={() => dispatch(setAppScreen(previousScreen))} />
            </div>
            <div className="flex-1 flex justify-center">
                <span className='text-[20px] font-semibold' style={{color}}>{title}</span>
            </div>
            <FaSearch />
        </div>
    );
};

export default HeaderWithTwoItems;