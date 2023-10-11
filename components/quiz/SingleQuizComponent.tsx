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
            isCorrect: isCorrect,
            id: id,
        }));
        handleNext();
    };

    return (
        <div className="flex-1 pt-80 relative">
            <div className="w-full px-4">
                <h2 style={{ color, fontFamily: 'Lato-Bold' }}>{question}</h2>
                <div className="mt-4">
                    <div className={`my-2 flex-row items-center p-3 rounded-md ${selectedAnswer === answerOne ? `bg-${mainAppColor}` : ''}`}
                        onClick={() => handleClick(answerOne)}
                    >
                        <div className={`w-5 h-5 rounded-full ${selectedAnswer === answerOne ? 'border-4 border-bgColor' : `border-2 border-${mainAppColor}`}`} />
                        <h2 style={{
                            paddingLeft: '1rem',
                            fontFamily: 'Lato-Bold',
                            color: selectedAnswer === answerOne ? 'bgColor' : color,
                            fontWeight: selectedAnswer === answerOne ? 700 : 'normal',
                        }}>{answerOne}</h2>
                    </div>
                    <div className={`my-2 flex-row items-center p-3 rounded-md ${selectedAnswer === answerTwo ? `bg-${mainAppColor}` : ''}`}
                        onClick={() => handleClick(answerTwo)}
                    >
                        <div className={`w-5 h-5 rounded-full ${selectedAnswer === answerTwo ? 'border-4 border-bgColor' : `border-2 border-${mainAppColor}`}`} />
                        <h2 style={{
                            paddingLeft: '1rem',
                            fontFamily: 'Lato-Bold',
                            color: selectedAnswer === answerTwo ? 'bgColor' : color,
                            fontWeight: selectedAnswer === answerTwo ? 700 : 'normal',
                        }}>{answerTwo}</h2>
                    </div>
                    <div className={`my-2 flex-row items-center p-3 rounded-md ${selectedAnswer === answerThree ? `bg-${mainAppColor}` : ''}`}
                        onClick={() => handleClick(answerThree)}
                    >
                        <div className={`w-5 h-5 rounded-full ${selectedAnswer === answerThree ? 'border-4 border-bgColor' : `border-2 border-${mainAppColor}`}`} />
                        <h2 style={{
                            paddingLeft: '1rem',
                            fontFamily: 'Lato-Bold',
                            color: selectedAnswer === answerThree ? 'bgColor' : color,
                            fontWeight: selectedAnswer === answerThree ? 700 : 'normal',
                        }}>{answerThree}</h2>
                    </div>
                </div>
            </div>
            {selectedAnswer &&
                <div className="absolute bottom-20 px-4 w-full">
                    <div className={`py-2 rounded-md bg-${mainAppColor}`} onClick={handleNextQuestion}>
                        <h2 style={{
                            fontFamily: 'Lato-Bold',
                            color: appTheme === 'dark' ? appColor.lightTextColor : appColor.darkTextColor,
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                        }}>Next</h2>
                    </div>
                </div>
            }
        </div>
    );
};

export default SingleQuizComponent;