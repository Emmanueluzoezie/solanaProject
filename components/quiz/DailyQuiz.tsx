import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_QUESTION_BY_TYPE } from '../../graphql/queries';
import { selectAppTheme } from '../../slice/AppSlices';
import { appColor } from '../AppColor';
import HeaderWithTwoItems from '../HeaderWithTwoItems'
import ResultParentComponent from '../ResultParentComponent'
import QuizLoadingComponent from './QuizLoadingComponent';
import SingleQuizComponent from './SingleQuizComponent';
import { setCurrentQuizScreen } from "../../slice/QuizSlice"
import { selectWeb3Auth, setUserInfo } from '../../slice/userSlice';
import QuizHeader from './QuizHeader';

const DailyQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResultComponent, setShowResultComponent] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [remainingTime, setRemainingTime] = useState(300);
  const appTheme = useSelector(selectAppTheme)
  const [percentage, setPercentage] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<any>()
  const web3auth  = useSelector(selectWeb3Auth)
  const route = useRouter()
  const dispatch = useDispatch()

  const { data, loading, error } = useQuery(GET_ALL_QUESTION_BY_TYPE, {
    variables: {
      question_type: "Budget"
    }
  })

  const bgColor = appTheme === "dark" ? appColor.darkBackground : appColor.lightBackground

  const buttonColor = appTheme === "dark" ? appColor.primaryDarkColor : appColor.primaryColor

  const containerColor = appTheme === "dark" ? appColor.darkContainerBackground : appColor.lightContainerBackground

  const color = appTheme === "dark" ? appColor.darkTextColor : appColor.lightTextColor

  const buttonTextColor = appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor

  const questions = data?.getQuestionsByType?.slice(0, 5)

  const handleStartQuiz = () => {
    setStartQuiz(true)
    setRemainingTime(120);
    setShowResultComponent(false);

    const interval = setInterval(() => {
      setRemainingTime((prevTime: any) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setShowResultComponent(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };


  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (showInstruction === true) {
        setShowInstruction(false)
      }
    } else {
      setShowResultComponent(true)
    }
  };

  useEffect(() => {
    if (questions && currentQuestionIndex !== undefined && currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const totalQuestions = questions.length;
      const eachQuestionPercent = 100 / totalQuestions;
      const percentage = (currentQuestionIndex + 1) * eachQuestionPercent;
      setCurrentQuestion(currentQuestion)
      setPercentage(percentage);
    }
  }, [currentQuestionIndex, data])

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className='h-screen relative'>
      {loading?
       <QuizLoadingComponent />
        : error ? (
          <div className='pt-20'>
            <p style={{ color, }}>
              Oops! An error occurred on our end. Check your internet connection and try again.
            </p>
            <div className='flex justify-center '>
              <button className='p-1 px-4 rounded-md mt-3' style={{ backgroundColor: buttonColor }} onClick={() => dispatch(setCurrentQuizScreen("home_quiz"))}>
                <p style={{ color: appTheme === "dark" ? appColor.lightTextColor : appColor.darkTextColor, }}>
                  Click to reload
                </p>
              </button>
            </div>
          </div>
        )
       :
        <div className=''>
          <div className=''>
            {showResultComponent ?
              <ResultParentComponent questions={questions} questionType="Daily quiz" />
              :
              <div className='h-inherit'>
                  <QuizHeader title="Daily quiz" />

                {!startQuiz ?
                  <div className='items-center justify-center'>
                    <h2 className="pt-4 px-3 text-[18px] text-center mt-[100px]" style={{ color}}>Answer five questions in 2 minutes. Click Start Quiz to begin. No going back after you click Next. Keep an eye on the timer</h2>
                    <div className='px-10 mt-10 flex justify-center items-center'>
                      <button className=' py-2 px-10 rounded-md' style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={handleStartQuiz}>Start Quiz</button>
                    </div>
                  </div>
                  :
                  <div className='h-full relative'>
                    <div className='p-4'>
                        <div className='h-4 relative rounded-md' style={{ width: "100", backgroundColor: containerColor }}>
                          <div className='h-4 rounded-md' style={{backgroundColor: buttonColor, width:  `${percentage}%`}}/>
                        </div>
                      <h2 className='text-center mt-2 font-bold' style={{ color, }}> Question {currentQuestionIndex + 1} out {questions?.length} questions</h2>
                    </div>
                    <div className='absolute flex items-center flex-col right-4 top-[60px]'>
                      <h2 className='font-semibold' style={{ color: buttonColor }}>Time Remaining</h2>
                      <div >
                        <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center  border-[6px]' style={{ borderColor: buttonColor }}>
                          <h2 className="font-extrabold" style={{ color: buttonColor }}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
                        </div>
                      </div>
                    </div>
                    <SingleQuizComponent
                      answerOne={currentQuestion?.answer_a}
                      answerTwo={currentQuestion?.answer_b}
                      answerThree={currentQuestion?.answer_c}
                      question={currentQuestion?.question}
                      correctAnswer={currentQuestion?.correct_answer}
                      handleNext={handleNext}
                      id={currentQuestion?.id}
                    />
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default DailyQuiz