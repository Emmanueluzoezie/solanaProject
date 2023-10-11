import React from 'react';
import { appColor } from './AppColor';
import { selectAppTheme } from '../slice/AppSlices';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { setCurrentToolScreen } from '../slice/ScreenSlice';

const ToolsComponent = () => {
    const appTheme = useSelector(selectAppTheme);
    const router = useRouter()
    const dispatch = useDispatch()

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;
    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;

    return (
        <div className=" pb-4 px-3 mt-4">
            <button className={`px-3 flex py-4 w-full my-1 mt-2 rounded-md flex-row items-center`} style={{ borderColor: bgColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentToolScreen("calculators"))}>
                <div className="flex-1 text-start">
                    <h2 className={`text-[18px]`} style={{color }}>Calculators</h2>
                    <p className={`text-[13px] pt-1 `} style={{ color: textColor }}>Investment and compound calculator</p>
                </div>
                <FaAngleRight style={{color}} className="text-[18px]"/>
            </button>
            <button className={`px-3 flex py-4 w-full my-1 mt-2 rounded-md flex-row items-center`} style={{ borderColor: bgColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentToolScreen("articles"))}>
                <div className="flex-1 text-start">
                    <h2 className={`text-[18px]`} style={{color}}>Explore Finance Articles</h2>
                    <p className={`text-[13px] pt-1`} style={{ color: textColor }}>Enhance your financial knowledge by delving into finance articles</p>
                </div>
                <FaAngleRight style={{color}} className="text-[18px]"/>
            </button>
            <button className={`px-3 flex py-4 w-full my-1 mt-2 rounded-md flex-row items-center`} style={{ borderColor: bgColor, backgroundColor: containerColor }} onClick={() => dispatch(setCurrentToolScreen("point_conversion"))}>
                <div className="flex-1 text-start">
                    <h2 className={`text-[18px]`} style={{color}}>Point Conversion</h2>
                    <p className={`text-[13px] pt-1`} style={{color: textColor}}>Convert your points to token</p>
                </div>
                <FaAngleRight style={{color}} className="text-[18px]" />
            </button>
        </div>
    );
}

export default ToolsComponent;