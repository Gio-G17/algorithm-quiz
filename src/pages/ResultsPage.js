import React from 'react';

const ResultsPage = ({ correctAnswersCount, totalQuestions }) => {
  const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <h1 className="text-4xl font-bold">Quiz Completed!</h1>
      <p className="text-2xl mt-4">
        You answered {correctAnswersCount} out of {totalQuestions} questions correctly!
      </p>
      <p className="text-xl mt-2">Your score: {scorePercentage.toFixed(2)}%</p>
      <button
        className="text-xl font-bold text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg mt-4"
        onClick={() => window.location.reload()} // Reloads the page to restart the quiz
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default ResultsPage;
