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

const ResultParentComponent = ({ questions, questionType }) => {
    const [updatingPoint, setUpdatingPoint] = useState(false);
    const getUserResult = useSelector(selectAnswerQuestions);
    const appTheme = useSelector(selectAppTheme);
    const getUserInfo = useSelector(selectUserInfo);
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
        setUpdatingPoint(true);

        try {
            if (coinsToAward <= 0) return;
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
                    user_id: userDetails.id,
                    amount: coinsToAward,
                    created_at: new Date(),
                    descriptions: `You have been rewarded ${coinsToAward} points for answering ${correctAnswersCount} correctly.`,
                },
            });
            handleBack();
            setUpdatingPoint(false);
        } catch (error) {
            // Handle the error, e.g., display an error message or log it.
        }
    };

    return (
        <div className="h-screen p-3">
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
                <div className="">
                    <div className="flex items-center pt-10 mt-6 pb-3 px-3 pr-10" style={{ backgroundColor: containerColor }}>
                        <HeaderWithTwoItems title="Result" />
                    </div>
                    <div style={{ padding: "3px" }}>
                        <h2 style={{textAlign: "center", fontSize: "16px", fontWeight: "bold", color,fontFamily: 'Lato-Regular',}}
                        >You have been awarded{" "}<p style={{ fontFamily: "Lato-Bold", color: buttonColor }}>won {coinsToAward}</p>{" "}points for answering {correctAnswersCount}questions correctly</h2>
                    </div>
                    <h2 style={{textAlign: "center",fontSize: "18px",marginTop: "5px",fontWeight: "bold",color,fontFamily: 'Lato-Bold', }}>
                        Here are the answers
                    </h2>
                    <div>
                        {questions?.map((item:any) => (
                            <ResultComponent question={item.question} correctAnswer={item.correct_answer} />
                        ))}
                        <div style={{ position: "absolute", bottom: "20px", padding: "4px", width: "100%" }}>
                            <button style={{padding: "8px",borderRadius: "8px", backgroundColor: buttonColor,}} onClick={updateUserPoints}> Go to quiz session</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultParentComponent;