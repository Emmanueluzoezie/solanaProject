import { useRouter } from 'next/router';
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme, selectPreviousAppScreen, setAppScreen } from '../../slice/AppSlices';
import { selectCurrentSettingScreen, setCurrentSettingScreen } from '../../slice/ScreenSlice';
import { appColor } from '../AppColor';

type Props = {
    title: string
}

const HeaderSettings = ({title}: Props) => {
    const appTheme = useSelector(selectAppTheme);
    const currentSettingScreen = useSelector(selectCurrentSettingScreen)
    const getCurrentPreviousAppScreen = useSelector(selectPreviousAppScreen)
    const dispatch = useDispatch()
    const router = useRouter()

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const handleBack = (previousScreen:string) => {
        if (currentSettingScreen === "home_settings"){
            dispatch(setAppScreen(previousScreen))
        } else{
            dispatch(setCurrentSettingScreen("home_settings"))
        }
    }

    return (
        <div className="flex items-center px-3 py-5" style={{ backgroundColor: containerColor }}>
            <MdArrowBackIosNew style={{ color }} className="text-[20px]  cursor-pointer" onClick={() => handleBack(getCurrentPreviousAppScreen)} />
            <div className="flex-1 flex justify-center">
                <span className='text-[20px] font-bold' style={{ color }}>{title}</span>
            </div>
        </div>
    );
}

export default HeaderSettings