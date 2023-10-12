import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnsweredQuestions } from '../../slice/QuizSlice';
import { appColor } from '../AppColor';
import { selectAppTheme } from '../../slice/AppSlices';

const SingleQuizComponent = ({answerOne, answerTwo, answerThree, question, id,correctAnswer, handleNext}:any) => {
    const appTheme = useSelector(selectAppTheme);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const dispatch = useDispatch();

    const bgColor = appTheme === 'dark' ? appColor.darkBackground : appColor.lightBackground;
    const mainAppColor = appTheme === 'dark' ? appColor.primaryDarkColor : appColor.primaryColor;
    const containerColor = appTheme === 'dark' ? appColor.darkContainerBackground : appColor.lightContainerBackground;
    const color = appTheme === 'dark' ? appColor.darkTextColor : appColor.lightTextColor;

    const handleClick = (answer: string) => {
        setSelectedAnswer(answer);
    };

    const handleNextQuestion = () => {
        const isCorrect = selectedAnswer === correctAnswer ? true : false;
        dispatch(addAnsweredQuestions({
            question: question,
            correctAnswer: correctAnswer,
            userAnswer: selectedAnswer,
            isCorrect: isCorrect,
            id: id,
        }));
        handleNext();
    };

    return (
        <div className="flex-1 pt-[40px] h-[750px] relative">
            <div className="w-full px-4">
                <h2 className='font-semibold  text-[18px]' style={{ color }}>{question}</h2>
                <div className="mt-[40px]">
                    <div className={`my-2 cursor-pointer flex items-center p-3 rounded-md ${selectedAnswer === answerOne ? `bg-${mainAppColor}` : ''}`} style={{ backgroundColor: selectedAnswer === answerOne ? mainAppColor : "" }}
                        onClick={() => handleClick(answerOne)}
                    >
                        <div className={`w-5 h-5 rounded-full`} style={{ borderWidth: selectedAnswer === answerOne ? "4px" : "" }} />
                        <h2 className='pl-3' style={{
                            color: selectedAnswer === answerOne ? bgColor : color,
                            fontWeight: selectedAnswer === answerOne ? 600 : 'normal',
                        }}>{answerOne}</h2>
                    </div>
                    <div className={`my-2 cursor-pointer flex items-center p-3 rounded-md ${selectedAnswer === answerTwo ? `bg-${mainAppColor}` : ''}`} style={{ backgroundColor: selectedAnswer === answerTwo ? mainAppColor : ""}}
                        onClick={() => handleClick(answerTwo)}
                    >
                        <div className={`w-5 h-5 rounded-full`} style={{ borderWidth: selectedAnswer === answerTwo ? "4px": ""}}/>
                        <h2 className='pl-3' style={{color: selectedAnswer === answerTwo ? bgColor : color,
                            fontWeight: selectedAnswer === answerTwo ? 600 : 'normal',
                        }}>{answerTwo}</h2>
                    </div>
                    <div className={`my-2 flex items-center cursor-pointer p-3 rounded-md ${selectedAnswer === answerThree ? `bg-${mainAppColor}` : ''}`} style={{ backgroundColor: selectedAnswer === answerThree ? mainAppColor : "" }}
                        onClick={() => handleClick(answerThree)}
                    >
                        <div className={`w-5 h-5 rounded-full`} style={{ borderWidth: selectedAnswer === answerThree ? "4px" : "" }} />
                        <h2 className='pl-3' style={{
                            color: selectedAnswer === answerThree ? bgColor : color,
                            fontWeight: selectedAnswer === answerThree ? 600 : 'normal',
                        }}>{answerThree}</h2>
                    </div>
                </div>
            </div>
            {selectedAnswer &&
                <div className="absolute bottom-20 px-4 w-full">
                    <button className={`py-2 font-bold rounded-md w-full`} style={{ backgroundColor: mainAppColor, color: appTheme === 'dark' ? appColor.lightTextColor : appColor.darkTextColor }} onClick={handleNextQuestion}>Next
                    </button>
                </div>
            }
        </div>
    );
};

export default SingleQuizComponent;