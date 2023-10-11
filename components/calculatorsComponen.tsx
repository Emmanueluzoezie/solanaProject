import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAppTheme } from '../slice/AppSlices';
import { appColor } from './AppColor';

interface CalculatorComponentProps { }

const CalculatorsComponent: React.FC<CalculatorComponentProps> = () => {
    const [currentNum, setCurrentNum] = useState('0');
    const [previousNum, setPreviousNum] = useState<string | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const appTheme = useSelector(selectAppTheme);

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;

    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;

    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const clear = () => {
        setCurrentNum('0');
        setPreviousNum(null);
        setOperation(null);
        setResult(null);
    };

    const appendNumber = (num: string) => {
        if (result !== null) {
            clear();
        }

        setCurrentNum((prevCurrentNum) => {
            if (prevCurrentNum === '0') {
                return num;
            } else {
                return prevCurrentNum + num;
            }
        });
    };

    const calculate = () => {
        let res: number | undefined;
        switch (operation) {
            case '+':
                res = parseFloat(previousNum || '0') + parseFloat(currentNum);
                break;
            case '-':
                res = parseFloat(previousNum || '0') - parseFloat(currentNum);
                break;
            case 'x':
                res = parseFloat(previousNum || '0') * parseFloat(currentNum);
                break;
            case '÷':
                res = parseFloat(previousNum || '0') / parseFloat(currentNum);
                break;
            default:
                break;
        }
        if (res !== undefined) {
            setResult(res.toString());
            setCurrentNum(res.toString());
        }
        setPreviousNum(null);
        setOperation(null);
    };

    const chooseOperation = (op: string) => {
        if (previousNum !== null && operation !== null && currentNum !== '') {
            // Perform the calculation if there's an existing operation
            calculate();
        }

        if (result !== null && result !== undefined) {
            setCurrentNum(result);
            setPreviousNum(null);
            setResult(null);
        }

        setOperation(op);
        if (previousNum === null) {
            setPreviousNum(currentNum);
        }
        setCurrentNum('');
    };

    return (
        <div className="flex-1 pb-20 pt-10" style={{ backgroundColor: bgColor }}>
            <div className="flex-1 px-4">
                <div className={`text-4xl text-right my-1 ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{previousNum}</div>
                <div className={`text-4xl text-right my-1 ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{operation}</div>
                <div className={`text-4xl text-right my-1 ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{currentNum}</div>
                <div className={`text-4xl text-right my-1 ${color}`} style={{ fontFamily: 'Lato-Bold' }}>{result}</div>
            </div>
            <div className="flex-row justify-center flex-wrap">
                <button className={`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`}
                    style={{ borderColor: bgColor, backgroundColor: containerColor, color }} onClick={() => clear()}>
                    <div className="text-3xl font-bold" style={{ fontFamily: 'Lato-Bold' }}>C</div>
                </button>
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map((num) => (
                    <button key={num} className={`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`}
                        style={{ borderColor: bgColor, backgroundColor: containerColor, color }} onClick={() => appendNumber(num)}>
                        <div className="text-3xl font-bold" style={{ fontFamily: 'Lato-Bold' }}>{num}</div>
                    </button>
                ))}
                {['+', '-', 'x', '÷'].map((op) => (
                    <button key={op} className={`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`}
                        style={{ borderColor: bgColor, backgroundColor: containerColor, color }} onClick={() => chooseOperation(op)}>
                        <div className="text-3xl font-bold" style={{ fontFamily: 'Lato-Bold' }}>{op}</div>
                    </button>
                ))}
                <button className={`m-2 w-[70px] h-[70px] rounded-md justify-center items-center`}
                    style={{ borderColor: bgColor, backgroundColor: containerColor, color }} onClick={() => calculate()}>
                    <div className="text-3xl font-bold" style={{ fontFamily: 'Lato-Bold' }}>=</div>
                </button>
            </div>
        </div>
    );
}

export default CalculatorsComponent;