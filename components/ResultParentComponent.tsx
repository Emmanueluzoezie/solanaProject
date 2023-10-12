import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { selectUserId, selectUserInfo,} from '../slice/userSlice';
import {selectAppTheme,} from '../slice/AppSlices';
import {resetAnsweredQuestions,selectAnswerQuestions, setCurrentQuizScreen,} from '../slice/QuizSlice';
import { GET_USER_BY_EMAIL,} from '../graphql/queries';
import { ADD_USER_HISTORY, UPDATE_POINTS} from '../graphql/mutations';
import HeaderWithTwoItems from './HeaderWithTwoItems';
import LoadingAppComponent from './LoadingAppComponent';
import { appColor } from './AppColor';
import { useMutation, useQuery } from '@apollo/client';
import ResultComponent from './quiz/ResultComponent';
import QuizHeader from './quiz/QuizHeader';
import { MdArrowBackIosNew } from 'react-icons/md';
import { toast } from 'react-hot-toast';

const ResultParentComponent = ({ questions, questionType }: any) => {
    const [updatingPoint, setUpdatingPoint] = useState(false);
    const getUserResult = useSelector(selectAnswerQuestions);
    const appTheme = useSelector(selectAppTheme);
    const getUserInfo = useSelector(selectUserInfo);
    const [pointAdded,  setPointAdded] = useState(false)
    const dispatch = useDispatch();

    const [addHistoryToDatabase] = useMutation(ADD_USER_HISTORY);
    const [addUserPoints] = useMutation(UPDATE_POINTS, {
        refetchQueries: [GET_USER_BY_EMAIL, "getUserByEmail"],
    });

    const getUserId = useSelector(selectUserId);

    const { data, loading, error } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: getUserInfo?.email,
        },
    });

    const correctAnswersCount = getUserResult.filter((question) => question.isCorrect).length;

    const wrongAnswers = getUserResult.filter((answer) => answer.userAnswer !== answer.correctAnswer)

    const coinsToAward = correctAnswersCount * 10;

    const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground;
    const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor;
    const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground;
    const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor;

    const userDetails = data?.getUserByEmail[0];

    const handleBack = () => {
        dispatch(resetAnsweredQuestions());
        dispatch(setCurrentQuizScreen("home_quiz"))
    };

    const updateUserPoints = async () => {

        // const notification = toast.
        const notification = toast.loading("Claiming points...")
        try {
            if (coinsToAward <= 0)return
            else{
                const userCurrentPoints = userDetails.coins + coinsToAward;
                await addUserPoints({
                    variables: {
                        id: getUserId,
                        coins: userCurrentPoints,
                    },
                });
                await addHistoryToDatabase({
                    variables: {
                        title: questionType,
                        user_id: getUserId,
                        amount: coinsToAward,
                        created_at: new Date(),
                        descriptions: `You have been rewarded ${coinsToAward} points for answering ${correctAnswersCount} correctly.`,
                    },
                })
                toast.success("You successfully claimed your point.", {id:  notification})
                setPointAdded(true)
        }
    }
         catch (error) {
            // Handle the error, e.g., display an error message or log it.
            toast.error("Oop! An error, check your internet connection.", { id: notification })
        }
    };

    return (
        <div className="h-full" style={{ backgroundColor: bgColor }}>
            {loading || updatingPoint ? (
                <LoadingAppComponent />
            ) : error ? (
                <div className="h-[90%] border-2 flex flex-col justify-center items-center">
                    <p style={{ color: color }} className="text-center">
                        Oops! An error occurred on our end. Check your internet connection and try again.
                    </p>
                    <button style={{fontWeight: "bold", color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor,fontFamily: 'Lato-Bold', backgroundColor: buttonColor}} className="px-10 py-2 text-[18px] mt-10 rounded-md">Click to reload</button>
                </div>
            ) : (
                <div className="pb-10">
                    <div className="flex items-center w-full" style={{ backgroundColor: containerColor }}>
                        <div className='py-5 px-3 flex items-center w-full' style={{ backgroundColor: containerColor }}>
                            <div className='p-2 rounded-full cursor-pointer hover:bg-gray-400  '>
                                <MdArrowBackIosNew style={{ color }} className="text-[20px] cursor-pointer" onClick={handleBack} />
                            </div>
                            <div className='flex-1 flex justify-center'>
                                <h2 className='text-[20px] font-semibold text-center'>Result</h2>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8  px-4">
                        {/* <h2>Y</h2> */}
                        {coinsToAward > 0 &&
                        <h2 className='text-center' style={{ color,}}
                        >You have been awarded{" "}<span className='font-bold' style={{ color: buttonColor }}>won {coinsToAward}</span>{" "}points for answering {correctAnswersCount} questions correctly.make sure to claim your points</h2>
                        }
                    </div>
                    <h2 className=' text-center py-8 font-semibold text-[20px]' style={{color, }}>
                        Here are the answers
                    </h2>
                    <div>
                        {getUserResult?.map((item:any) => (
                           <div key={item?.id}>
                                <ResultComponent question={item.question} correctAnswer={item.correctAnswer} userAnswers={item.userAnswer}/>
                           </div>
                        ))}
                        {!pointAdded &&
                        <div className='mt-6 px-4'>
                            <button className='w-full p-[10px]  rounded-md font-semibold' style={{ backgroundColor: buttonColor, color: bgColor}} onClick={updateUserPoints}> Claim points</button>
                        </div>
                        }
                        <div className='mt-6 px-4'>
                        <button className='w-full border-2 p-[10px]  rounded-md font-semibold' style={{ borderColor: buttonColor, color: buttonColor }} onClick={handleBack}> Go to quiz session</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultParentComponent;