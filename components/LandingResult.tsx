import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAppTheme, setNewUser } from '../slice/AppSlices';
import { gifImage, hashTagWord } from '../utilies/WelcomeArrayItems';
import { appColor } from './AppColor';
import { FaRegCheckCircle } from "react-icons/fa"
import { selectedCurrencyInfo, selectNameOfItem, selectWelcomeAmount } from '../slice/welcomeSlice';

const LandingResult = () => {
    const appTheme = useSelector(selectAppTheme)
    const welcomeAmount = useSelector(selectWelcomeAmount);
    const userTreatItem = useSelector(selectNameOfItem);
    const getCurrencyInfo = useSelector(selectedCurrencyInfo)
    const dispatch = useDispatch()

    const amount: number = Number(welcomeAmount) * 365;
    const oneYearReturn: string = amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fiveYearReturn: string = (amount * 5).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const textColor = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    const color = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

    function getRandomGif() {
        const randomIndex = Math.floor(Math.random() * gifImage.length);
        return gifImage[randomIndex];
    }

    function getHashTag() {
        const hashIndex = Math.floor(Math.random() * hashTagWord.length);
        return hashTagWord[hashIndex];
    }

    const randomGif = getRandomGif();
    const hashword = getHashTag();

    const handleNewClient = () => {
      dispatch(setNewUser(false))
    }
  return (
    <div className='pt-10 h-full relative' style={{backgroundColor: bgColor}}>
         <div className='h-[250px] px-3'>
              <img
                  src={randomGif}
                  className='w-[100%] h-[100%]'
                  alt="Logo"
                  width={30}
                  height={30}
                  loading="lazy"
              />
         </div>
         <div className='mt-16 text-center'>
              <h2 className='font-semibold text-[22px]' style={{ color: textColor }}>In one year you lost <span className='' style={{ color: buttonColor }}>{getCurrencyInfo.symbol}{oneYearReturn} on {userTreatItem}</span></h2>

              <h2 className='font-semibold text-[30px] mt-10' style={{ color: textColor }}>#{hashword}</h2>
         </div>
         <div className='absolute bottom-10 w-full'>
            <div className='space-y-4 w-full'>
              {/* <button className='w-full font-bold border-2 py-2 rounded-md' style={{ backgroundColor: containerColor, color: buttonColor, borderColor: buttonColor }} >Find out</button> */}
                  <button className='w-full font-bold py-2 rounded-md' style={{ backgroundColor: buttonColor, color: color }} onClick={handleNewClient}>Find out</button>
            </div>
              <div className='w-full flex mt-20  justify-center' >
                  <div className='w-[300px] p-2 rounded-md justify-center font-bold py-2rounded-md  flex items-center shadow-4xl shadow-white' style={{ backgroundColor: appColor.primaryDarkColor, color: textColor }} >
                      <FaRegCheckCircle style={{ color: "white" }} className="text-[20px] mr-4" />
                      <h2 style={{ color: appColor.primaryColor }}>You earn + 20 points</h2>
                  </div>
              </div>

         </div>
    </div>
  )
}

export default LandingResult