import React, { useState } from 'react';
import QuizPage from './QuizPage';

const HomePage = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    // Animate the clock out
    const clock = document.getElementById('clock');
    clock.classList.add('animate-fadeOut');
    setTimeout(() => {
      setQuizStarted(true);
    }, 1000); // Wait for animation to complete before showing quiz
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/assets/images/waves.png)', backgroundSize: '100% 100%', minHeight: '100vh' }}>
      {!quizStarted ? (
        <>
          <img
            id="clock"
            src="/assets/images/QuarterClock.png"
            alt="Clock"
            className="absolute top-0 left-0 w-1/3 h-2/3 transition-all duration-1000"
          />
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handleStartQuiz}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg animate-bounce"
            >
              Start Quiz
            </button>
          </div>
        </>
      ) : (
        <QuizPage />
      )}

      {/* Bottom-left logo */}
      <img src="/assets/images/AlgoLogo.png" alt="AlgoLogo" className="absolute bottom-5 left-3 w-1/4 h-auto" />

      {/* Bottom-right logo */}
      <img src="/assets/images/Slogan.png" alt="Slogan" className="absolute bottom-5 right-3 w-2/5 h-auto" />
    </div>
  );
};

export default HomePage;
