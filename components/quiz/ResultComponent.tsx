import { useDispatch, useSelector } from "react-redux"
import { selectAppTheme } from "../../slice/AppSlices"
import { appColor } from "../AppColor"
import { FaCheck } from "react-icons/fa"

const ResultComponent = ({ question, correctAnswer, userAnswers }: any) => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    return (
        <div className="relative">
            <div className={`p-3`}>
                <div className="absolute right-3 bottom-4 p-2">{userAnswers === correctAnswer ? <FaCheck style={{color:appColor.primaryColor}} className="text-[16px]"/> : <h2 className="font-extrabold text-red-600" >X</h2>}</div>
                <div className="p-3 rounded-md"
                style={{ backgroundColor: containerColor }}>
                    <h2 className="text-[17px] font-semibold" style={{ color }}>{question}</h2>
                    <p className="text-[15px] pt-2" style={{ color,}}>{correctAnswer}</p>
                    {}
                </div>
            </div>
        </div>
    )
}

export default ResultComponent