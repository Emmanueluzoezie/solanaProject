import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const calculatorValidation = yup.object().shape({
    amount: yup
        .string()
        .matches(/^[0-9]+$/, 'Invalid amount')
        .required('Amount is required'),
    timeInYears: yup
        .string()
        .matches(/^[0-9]+$/, 'Invalid number')
        .required('Invest year is required'),
});

const depositScheduleChoices = [
    { id: 1, period: "daily" },
    { id: 2, period: "weekly" },
    { id: 3, period: "2 week" },
    { id: 4, period: "monthly" },
];

function InvestmentCalculator() {
    const [result, setResult] = useState("");
    const [depositSchedule, setDepositSchedule] = useState("daily");
    const [openSchedule, setOpenSchedule] = useState(false);
    const [amount, setAmount] = useState(0)
    const [timeInYears, setTimeInYears] = useState(0)

    function calculateFutureValue(values: any) {
        let futureValue = 0;
        let compoundFrequency = 0;

        // Determine the deposit frequency based on the deposit schedule
        switch (depositSchedule) {
            case 'daily':
                compoundFrequency = 365;
                break;
            case 'weekly':
                compoundFrequency = 52;
                break;
            case '2 week':
                compoundFrequency = 26;  // 52 weeks in a year divided by 2
                break;
            case 'monthly':
                compoundFrequency = 12;
                break;
            default:
                return "Invalid deposit schedule";
        }

        // Calculate the future value without interest
        futureValue = parseInt(values.amount) * compoundFrequency * values.timeInYears;
        const formattedTotalAmount = Number(futureValue.toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        setResult(formattedTotalAmount);  // Round to 2 decimal places
    }

    const handleScheduleChoice = (newSchedule: any) => {
        setDepositSchedule(newSchedule);
        setOpenSchedule(false);
    }

    return (
        <div className="p-4">
            <div>
                <p className="text-center text-15px">Use this calculator to estimate the future value of an investment.</p>
                {result && (
                    <div className="py-1 mt-8 mb-4 rounded-md">
                        <p className="text-center font-bold text-15px">
                            The future value of your investment will be ${result}
                        </p>
                    </div>
                )}
                <div>
                    <div className="text-center font-semibold mt-6 text-16px">
                        <p className="pl-2 font-semibold">Investment Amount</p>
                        <input type="" name='amount' className="mt-1 text-15px p-3 rounded-md" />
                        <h2>{}</h2>
                        <Field
                            type="number"
                            name="amount"
                            
                            placeholder="0"
                        />
                        <ErrorMessage name="amount" component="p" className="pl-6 text-#e33010 text-10px" />
                    </div>
                    <div className="mt-4">
                        <p className="pl-2 font-semibold">Investment Years</p>
                        <Field
                            type="number"
                            name="timeInYears"
                            className="mt-1 text-15px p-3 rounded-md"
                            placeholder="0"
                        />
                        <ErrorMessage name="timeInYears" component="p" className="pl-6 text-#e33010 text-10px" />
                    </div>
                    <div className="mt-4">
                        <p className="pl-2 pb-1 font-semibold">Deposit Schedule</p>
                        <button onClick={() => setOpenSchedule(!openSchedule)}>
                            <div className="p-3 rounded-md mt-1 flex-row justify-between">
                                <div className="flex-row">
                                    <p className="font-semibold pr-4 capitalize">{depositSchedule}</p>
                                </div>
                                <AntDesign name="caretdown" size={14} color={color} />
                            </div>
                        </button>
                        {openSchedule && (
                            <div className="absolute top-[-90px] shadow-2xl">
                                {depositScheduleChoices.map((item) => (
                                    <button className="flex-row items-center p-3 rounded-md w-[210px]" key={item.id} onClick={() => handleScheduleChoice(item.period)}>
                                        <p className="text-15px font-semibold">{item.period}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        {amount && timeInYears && depositSchedule ? (
                            <button className="py-2 my-4 rounded-md" onClick={() => handleSubmit()}>
                                <p className="text-center font-bold text-18px">Calculate</p>
                            </button>
                        ) : (
                            <button className="py-2 my-4 rounded-md">
                                <p className="text-center font-bold text-18px">Calculate</p>
                            </button>
                        )}
                        <button className="border-2 py-2 my-4 rounded-md" onClick={() => resetForm()}>
                            <p className="text-center font-bold text-18px">Reset</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvestmentCalculator;