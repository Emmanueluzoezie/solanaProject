import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currencies, dailyTreat, treatTime } from '../utilies/WelcomeArrayItems'
import { appColor } from './AppColor'
import { selectedCurrencyInfo, selectNameOfItem, selectTimes, setCurrencyInfo, setNameOfItem, setShowResult, setTimes, setWelcomeAmount  } from "../slice/welcomeSlice"
import { FaRegCheckCircle, FaSortDown } from 'react-icons/fa'
import { selectAppTheme } from '../slice/AppSlices'
import { SubmitHandler, useForm } from 'react-hook-form'

type Inputs = {
    amount: string;
};

const LandingQuestion = () => {
    const [ShowTreat, setShowTreat] = useState(false)
    const [showError, setShowError] = useState("");
    const [showCurrencies, setShowCurrencies] = useState(false)
    const [showDaily, setShowDaily] = useState(false)
    const getCurrencyInfo = useSelector(selectedCurrencyInfo)
    const nameOfItem = useSelector(selectNameOfItem)
    const appTheme = useSelector(selectAppTheme);
    const getTimes = useSelector(selectTimes);
    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const textColor = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor
    
    const buttonColor = appTheme === "dark"?  appColor.primaryDarkColor :  appColor.primaryColor

    const handleChangeTreat = (treat: any) => {
        dispatch(setNameOfItem(treat));
        setShowTreat(false)
    };

    const handleCurrencyChange = (currency: any) => {
        dispatch(setCurrencyInfo({
            name: currency.name,
            country: currency.country,
            symbol: currency.symbol
        }));
        setShowCurrencies(false)
    };

    const handleTimeChange = (time: any) => {
        dispatch(setTimes(time));
        setShowDaily(false)
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const amount = parseFloat(data.amount);
        if (!isNaN(amount)) {
            dispatch(setWelcomeAmount(amount.toString()));
            dispatch(setShowResult(true));
        } else {
            setShowError("Enter a valid number");
        }
    };

  return (
    <div className='w-full relative pt-20 h-full'>
          <h2 className='pl-[6px] font-semibold'>What's your daily treat?</h2>
          <div className=' hide'>
              <div className='flex'>
                  <div className='flex'>
                      {dailyTreat.map((item) => (
                          <div className='w-[160px] shadow-2xl m-2 p-4 flex flex-col rounded-xl border-b-[4px] items-center relative' style={{ backgroundColor: appColor.primaryDarkColor, borderColor: appColor.primaryColor }} key={item.treat} onClick={() => handleChangeTreat(item.treat)}>
                              {item.treat === nameOfItem && <FaRegCheckCircle style={{ color: appColor.primaryColor }} className="text-[20px] mr-4 absolute right-[-3px] top-2" />}
                              <Image
                                  src={item.image}
                                  className='w-[100px] h-[100px]'
                                  alt="Logo"
                                  width={30}
                                  height={30}
                              />
                              <h2 className='text-center font-semibold p' style={{ color: appColor.primaryColor }}>{item.treat}</h2>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
          <div className='mt-14 relative'>
              <h2>How much do you spend on it?</h2>
              <div className='flex mt-2'>
                <div className='flex py-2 cursor-pointer px-8 rounded-md font-semibold' style={{backgroundColor: containerColor}} onClick={() => setShowCurrencies(!showCurrencies)}>
                     <button>{getCurrencyInfo.name}</button>
                      <FaSortDown className='pl-2 text-[18px]'/>
                </div>
                  <form onSubmit={handleSubmit(onSubmit)} className='pl-3 flex-1'>
                      <input
                          step="any"
                          {...register("amount", { required: true })}
                          className="p-2 rounded-md w-full  outline-none" style={{ backgroundColor: containerColor, color: color }}
                      />
                      {errors.amount && (
                          <span className="text-red-500 text-[14px] pl-4">
                              {errors.amount.type === "required" ? "Amount is required" : "Invalid amount format"}
                          </span>
                      )}

                      <div className='fixed z-20 bottom-[100px] md:bottom-0 left-24 '>
                          <input
                              type="submit"
                              placeholder='Find out'
                              className='w-[270px] font-semibold py-2 rounded-md' style={{ backgroundColor: buttonColor, color: textColor }}
                          />
                      </div>
                  </form>
              </div>
          </div>
          <div className='mt-10'>
            <h2>How much do you spend on it?</h2>
            <div>
                  <div className='flex justify-between py-2 px-8 rounded-md font-semibold cursor-pointer' style={{ backgroundColor: containerColor }} onClick={() => setShowDaily(!showDaily)}>
                    <h2>{getTimes}</h2>
                    <FaSortDown className='pl-2 text-[18px]' />
                  </div>
            </div>
              {showDaily &&
                  <div className='w-[400px] mt-4 rounded-md p-3 border-2 z-20' style={{ backgroundColor: textColor }}>
                      {treatTime.map(time => (
                          <div className='flex space-x-2 p-2 border-[4px] font-semibold cursor-pointer' onClick={() => handleTimeChange(time)}>
                              <h2>{time}</h2>
                          </div>
                      ))}
                  </div>
            }
            {showCurrencies && 
                  <div className='fixed bottom-[0px] w-[400px] rounded-md p-3 border-2 z-20' style={{backgroundColor: textColor}}>
                      {currencies.map(currency => (
                          <div className='flex space-x-2 p-2 border-[4px] font-bold cursor-pointer' onClick={() => handleCurrencyChange(currency)}>
                            <h2>{currency.name}</h2>
                            <h2>{currency.symbol}</h2>
                        </div>
                      ))}
                </div>
            }
          </div>
    </div>
  )
}

export default LandingQuestion