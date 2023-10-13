import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';

type Inputs = {
    email: string;
};

const SignupWithEmail = () => {
    const { register,handleSubmit,formState: { errors },} = useForm<Inputs>();
    const appTheme = useSelector(selectAppTheme);
    const [showError, setShowError] = useState("")

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;
    const secondColor = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor
    const containerColor = appTheme === "dark" ? appColor.inputDarkBgColor : appColor.inputLightBgColor;
    const textColor = appTheme === "dark" ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;
    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const notification = toast.loading("Getting your points...")

        setTimeout(() => {
            toast.error("Oop! An error, check your internet connection and refresh the page", { id: notification })
        }, 3000)
        if (isValidEmail(data.email)) {
            toast.success("You have successfully receive 20 points.", { id: notification })
        } else {
            toast.error("Oop! An error, check your internet connection and refresh the page", { id: notification })
            setShowError("Enter a valid email")
        }
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

  return (
    <div className='mt-10'>
        <h2 className='text-center font-bold text-[22px]' style={{color}}>Or</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            
            <label className='text-center font-semibold text-[16px] pl-4' style={{ color }}>Email</label>
            <input {...register("email", { required: true })} className="w-full p-3 text-[17px] rounded-md outline-none" style={{backgroundColor: containerColor}}/>
            
            {errors.email && (
                <span className='text-red-500 text-[14px] pl-4'>
                    {errors.email.type === "required"
                        ? "Email is required"
                        : "Invalid email format"}
                </span>
            )}
              <input type="submit" className=' mt-8 w-full text-lg p-2 rounded-lg font-semibold' style={{ backgroundColor: buttonColor, color: secondColor }}/>
        </form>
    </div>
  )
}

export default SignupWithEmail