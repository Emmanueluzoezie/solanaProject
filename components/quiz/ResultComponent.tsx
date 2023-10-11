import { useDispatch, useSelector } from "react-redux"
import { selectAppTheme } from "../../slice/AppSlices"
import { appColor } from "../AppColor"

const ResultComponent = ({ question, correctAnswer }: any) => {
    const appTheme = useSelector(selectAppTheme)
    const dispatch = useDispatch()

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

    return (
        <div>
            <div className={`p-3`}>
                <div className="p-3 rounded-md"
                style={{ backgroundColor: containerColor }}>
                    <h2 className="text-[15px] font-semibold" style={{ color, fontFamily: 'Lato-Bold' }}>{question}</h2>
                    <p className="text-[13px] pt-2" style={{ color, fontFamily: 'Lato-Bold' }}>{correctAnswer}</p>
                </div>
            </div>
        </div>
    )
}

export default ResultComponent