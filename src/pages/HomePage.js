import React, { useState } from 'react';
import QuizPage from './QuizPage';
import '../styling/HomePage.css'; // Import your CSS file
import '../styling/HomePageTablet.css'; // Import your CSS file

const HomePage = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    const clock = document.getElementById('clock');
    const titlestart = document.getElementById('titles');
    const startBtn = document.getElementById('start-button-container');

    clock.classList.add('animate-fadeOut');
    titlestart.classList.add('animate-fadeOut');
    startBtn.classList.add('animate-fadeOutRight');
    setTimeout(() => {
      setQuizStarted(true);
    }, 1000); // Wait for animation to complete before showing quiz
  };

  return (
    <div id='homeLayout' className="relative w-full h-screen bg-cover bg-center flex justify-center items-start bg-no-repeat bg-[url('/public/assets/images/WavesBg.png')]">
      {!quizStarted ? (
        <>
          <div id="clock-container" className="absolute top-0 left-0">
            <img id="clock" src="/assets/images/QuarterClock.png" alt="Clock" />
          </div>

          <div id="title-start-container" className="w-[60%] flex flex-col justify-start items-center text-center ml-[40%] mt-[10%]">
            <div id="titles">
              <h1 id='titlept1' className="font-thin m-0">Test your Knowledge of</h1>
              <h1 id='titlept2' className="font-bold mt-[75px] mb-[75px]">Algorithm's Blood <br/> Thinners Portfolio</h1>
            </div>
            
            <div id="start-button-container" className="flex justify-center items-center">
              <button onClick={handleStartQuiz} className="bg-none border-none p-0 cursor-pointer">
                <img src="/assets/icons/startButton.png" alt="Start Quiz" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <QuizPage />
      )}
      <div id='alogSlogan'>
      <img id='AlgoLogo' src="/assets/images/AlgoLogo.png" alt="AlgoLogo" className="absolute bottom-[5%] left-[3%] h-[4%]" />
      <img id='Slogan' src="/assets/images/Slogan.png" alt="Slogan" className="absolute bottom-[4%] right-[3%] h-[5%]" />
      </div>
    </div>
  );
};

export default HomePage;
