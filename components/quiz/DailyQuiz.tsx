import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GET_ALL_QUESTION_BY_TYPE } from '../../graphql/queries';
import { selectAppTheme } from '../../slice/AppSlices';
import { appColor } from '../AppColor';
import HeaderWithTwoItems from '../HeaderWithTwoItems'
import ResultParentComponent from '../ResultParentComponent'
import SingleQuizComponent from './SingleQuizComponent';

const DailyQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResultComponent, setShowResultComponent] = useState(false)
  const [showInstruction, setShowInstruction] = useState(true)
  const [startQuiz, setStartQuiz] = useState(false)
  const [remainingTime, setRemainingTime] = useState(300);
  const appTheme = useSelector(selectAppTheme)
  const [percentage, setPercentage] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<any>()
  const route = useRouter()

  const { data, loading, error } = useQuery(GET_ALL_QUESTION_BY_TYPE, {
    variables: {
      question_type: "Budget"
    }
  })

  if(loading){
    console.log("loading..")
  }
  if(error){
    console.log(error)
  }
  if(data){
    console.log(data)
  }

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
    <div className='h-screen'>
      {/* {} */}
      <div className=''>
        <div className=''>
          {showResultComponent ?
            <ResultParentComponent questions={questions} questionType="daily_quiz" />
            :
            <div className='h-inherit'>
                <HeaderWithTwoItems title="Daily quiz" />

              {!startQuiz ?
                <div className='items-center justify-center'>
                  <h2 className="pt-4 px-3 text-[16px] text-center mt-[100px]" style={{ color, fontFamily: 'Lato-Regular' }}>You have 2 mins to answer five Questions, and your time start immediately you click on the start quiz button. please read the question and your selected answer carefully. Once you click Next button, you will not be able to return to the previous question. and make sure you click on the next button after answering the question before the time runs out</h2>
                  <div className='px-10 mt-10 flex justify-center items-center'>
                    <button className=' py-2 px-10 rounded-md' style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={handleStartQuiz}>Start Quiz</button>
                  </div>
                </div>
                :
                <div className='h-full'>
                  <div className='p-4'>
                    <div className='h-3 w-full rounded-full' style={
                      { backgroundColor: containerColor }}>
                      <div style={{ width: `${percentage}%`, backgroundColor: buttonColor }} />
                    </div>
                    <h2 className='text-center mt-2 font-bold' style={{ color, fontFamily: 'Lato-Bold' }}> Question {currentQuestionIndex + 1} out {questions?.length} questions</h2>
                  </div>
                  <div className='absolute right-4 top-[60px]'>
                    <h2 style={{ color: buttonColor, fontFamily: 'Lato-Bold' }}>Time Remaining</h2>
                    <div >
                      <div className='w-[50px] h-[50px] rounded-full justify-center items-center  border-[6px]' style={{ borderColor: buttonColor }}>
                        <h2 className="font-extrabold" style={{ color: buttonColor, fontFamily: 'Lato-Bold' }}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
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
    </div>
  )
}

export default DailyQuiz