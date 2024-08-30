import React, { useState } from 'react';
import Question from './Question';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris'],
    correctAnswer: 2,
    explanation: 'Paris is the capital and most populous city of France.'
  },
  {
    questionText: 'Which of these is not a programming language?',
    answers: ['Python', 'JavaScript', 'HTML', 'C#'],
    correctAnswer: 2,
    explanation: 'HTML is a markup language, not a programming language.'
  },
  {
    questionText: 'List the prime factors of 30',
    answers: ['1', '2', '3', '4'],
    type: 'text-entry',
    correctNumber: 3, // This indicates that 3 text fields are required for a full correct answer
    correctAnswers: ['2', '3', '5'], // The correct text answers
    explanation: 'The prime factors of 30 are 2, 3, and 5.'
  },
  // Add more questions as needed
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null)); // Array to store user answers
  const [submittedQuestions, setSubmittedQuestions] = useState(Array(questions.length).fill(false)); // Track if a question was submitted
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (index) => {
    if (!submittedQuestions[currentQuestionIndex]) { // Only allow answer selection if not submitted
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = index; // Store the selected answer
      setUserAnswers(updatedAnswers);
    }
  };

  const handleTextEntrySubmit = (userTextAnswers) => {
    const correctCount = currentQuestion.correctAnswers.length;
    const correctMatches = currentQuestion.correctAnswers.filter((ans, idx) => ans === userTextAnswers[idx]).length;

    let result = '';
    if (userTextAnswers.length === correctCount && correctMatches === correctCount) {
      result = 'full-tick';
    } else if (userTextAnswers.length === correctCount) {
      result = 'half-tick';
    } else {
      result = 'wrong';
    }

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = {
      numberSelected: userTextAnswers.length,
      result,
      userTextAnswers,
    };
    setUserAnswers(updatedAnswers);
    setSubmittedQuestions(prev => prev.map((submitted, idx) => idx === currentQuestionIndex ? true : submitted));
  };

  const handleSubmit = () => {
    setSubmittedQuestions(prev => prev.map((submitted, idx) => idx === currentQuestionIndex ? true : submitted));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowExplanation(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const closeExplanation = () => {
    setShowExplanation(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {currentQuestion && (
        <div className="flex items-center justify-between w-full max-w-3xl">
          {/* Previous Button */}
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="disabled:opacity-70"
          >
            <img
              src="/assets/icons/leftArrow.png"
              alt="Previous"
              className="w-12.5 h-25"
            />
          </button>

          {/* Question Component */}
          <Question
            question={currentQuestion}
            userAnswer={userAnswers[currentQuestionIndex]} // Pass stored answer for this question
            handleAnswerClick={handleAnswerClick}
            handleTextEntrySubmit={handleTextEntrySubmit} // Pass the text entry submission handler
            isSubmitted={submittedQuestions[currentQuestionIndex]} // Pass whether the question is submitted
          />

          {/* Next Arrow Button */}
          <button
            onClick={handleNextQuestion}
            disabled={!submittedQuestions[currentQuestionIndex] || currentQuestionIndex === questions.length - 1}
            className="disabled:opacity-50"
          >
            <img
              src="/assets/icons/rightArrow.png"
              alt="Next"
              className="w-12.5 h-25"
            />
          </button>
        </div>
      )}

      {/* Submit Button or Next Button */}
      {!submittedQuestions[currentQuestionIndex] ? (
        <button
          onClick={handleSubmit}
          disabled={userAnswers[currentQuestionIndex] === null} // Disable if no answer is selected
          className="mt-4 disabled:opacity-50"
        >
          <img
            src="/assets/icons/submit.png"  // Use the image for the submit button
            alt="Submit"
            className="w-32 h-16"  // Adjust size as needed
          />
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="mt-4"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          <img
            src="/assets/icons/nextButton.png"  // Use the image for the next button after submission
            alt="Next"
            className="w-32 h-16"  // Adjust size as needed
          />
        </button>
      )}

      {showExplanation && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full">
            <p>{questions[currentQuestionIndex].explanation}</p>
            <button
              onClick={closeExplanation}
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
