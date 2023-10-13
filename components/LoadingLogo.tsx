import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';

const LoadingLogo = () => {
    const appTheme = useSelector(selectAppTheme);
    const [stopSpin, setStopSpin] = useState(false); // State to control stopping the spin animation

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

    useEffect(() => {
        // Stop the spin animation after 2 seconds
        const spinTimer = setTimeout(() => {
            setStopSpin(true); // Update state to stop the spin animation
        }, 2000);

        return () => {
            clearTimeout(spinTimer); // Clear the timer when the component unmounts
        };
    }, []);

    return (
        <div className='h-full shadow-2xl rounded-2xl flex justify-center items-center' style={{backgroundColor: bgColor}}>
            <div className='flex flex-col items-center relative'>
                <Image
                    src={require("../assets/finsmatlogo.png")}
                    className={`w-[150px] h-[150px] animate-pulse ${stopSpin ? '' : 'animate-spin'}`}
                    alt="Logo"
                    width={30}
                    height={30}
                />
                <h1
                    className={`text-[34px] ${stopSpin ? '' : 'animate-spin'} text-center font-bold`}
                    style={{ color: appColor.primaryColor }}
                >
                    <span className='text-[80px]'>F</span> INSMAT
                </h1>
                <h3 className='text-[24px]' style={{ fontFamily: "Lato-Bold", color: appColor.primaryColor }}>
                    Get smarter with your money
                </h3>
            </div>
        </div>
    );
};

export default LoadingLogo;