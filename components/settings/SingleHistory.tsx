import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../../slice/AppSlices';
import { appColor } from '../AppColor';

const SingleHistory = ({item}:any) => {
    const [date, setDate] = useState<any>()
    const appTheme = useSelector(selectAppTheme);

    function getDate(dateString: string) {
        const dateObject = new Date(dateString);
        const currentDate = new Date();
        if (
            dateObject.getDate() === currentDate.getDate() &&
            dateObject.getMonth() === currentDate.getMonth() &&
            dateObject.getFullYear() === currentDate.getFullYear()
        ) {
            return 'Today';
        } else {
            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);
            if (
                dateObject.getDate() === yesterday.getDate() &&
                dateObject.getMonth() === yesterday.getMonth() &&
                dateObject.getFullYear() === yesterday.getFullYear()
            ) {
                return 'Yesterday';
            } else {
                return`on ${ dateObject.toLocaleDateString()}`
            }
        }
    }

    const dat = getDate(item.created_at)

    const textColor = appTheme === 'dark' ? appColor.secondaryDarkTextColor : appColor.secondaryLightTextColor;


    const color = appTheme === 'dark' ? appColor.darkTextColor : appColor.lightTextColor;

  return (
   <div>
        <p className="text-[18px] capitalize font-semibold" style={{ color: textColor }}>
{item.title}</p>
        <p className="text-[13px] pt-2 font-semibold" style={{ color: textColor, }}>You won {item.amount} coins {dat}</p>
   </div>
  )
}

export default SingleHistory