import React, { useState } from 'react';
import Question from '../components/Question';
import AnswerOptions from '../components/AnswerOptions';
import ExplanationModal from '../components/ExplanationModal';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris',],
    correctAnswer: 2,
    explanation: 'Paris is the capital and most populous city of France.',
  },
  {
    questionText: 'Which of these is not a programming language?',
    answers: ['Python', 'JavaScript', 'HTML', 'C#'],
    correctAnswer: 2,
    explanation: 'HTML is a markup language, not a programming language.',
  },
  {
    questionText: 'List the prime factors of 30',
    answers: ['1', '2', '3', '4'],
    type: 'text-entry',
    correctNumber: 3,
    correctAnswers: ['2', '3', '5'],
    explanation: 'The prime factors of 30 are 2, 3, and 5.',
  },
  // More questions as needed
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [persistedState, setPersistedState] = useState({}); // Stores state per question
  const [submittedQuestions, setSubmittedQuestions] = useState(Array(questions.length).fill(false));

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  // Handling answer click for non-text-entry questions
  const handleAnswerClick = (index) => {
    if (!submittedQuestions[currentQuestionIndex]) {
      const updatedState = {
        ...persistedState,
        [currentQuestionIndex]: {
          ...persistedState[currentQuestionIndex],
          userAnswer: index,  // Fix for the first answer selection (index can be 0)
        },
      };
      setPersistedState(updatedState);
    }
  };

  // Handling text-entry answers
  const handleTextEntrySubmit = (userTextAnswers) => {
    const correctAnswers = currentQuestion.correctAnswers;
    const correctCount = correctAnswers.filter((ans, idx) => ans === userTextAnswers[idx]).length;

    let feedback = 'incorrect';
    if (userTextAnswers.length === currentQuestion.correctNumber) {
      feedback = correctCount === correctAnswers.length ? 'correct' : 'half-correct';
    }

    // Calculate correct and missing answers
    const correctList = correctAnswers.filter((ans, idx) => ans === userTextAnswers[idx]);
    const missingList = correctAnswers.filter((ans, idx) => ans !== userTextAnswers[idx]);


    console.log("Submitting Text Entry:", {
      userTextAnswers,
      feedback,
      correctList,
      missingList
    });

    const updatedState = {
      ...persistedState,
      [currentQuestionIndex]: {
        ...persistedState[currentQuestionIndex],
        userAnswer: userTextAnswers,
        feedback,
        correctList,
        missingList
      },
    };

    setPersistedState(updatedState);
    console.log("Updated Persisted State: ", updatedState);

    setSubmittedQuestions((prev) =>
      prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted))
    );
  };


  // Handling Submit button click
  const handleSubmit = () => {
    setSubmittedQuestions((prev) => prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted)));
    setShowExplanation(true);
  };

  // Next question logic
  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  // Previous question logic
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setShowExplanation(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Close explanation modal
  const closeExplanation = () => {
    setShowExplanation(false);
  };

  // Determine if Submit button should be disabled
  const isSubmitDisabled = persistedState[currentQuestionIndex]?.userAnswer === undefined;

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Question */}
      <Question questionText={currentQuestion.questionText} />

      {/* Answer Options with Prev/Next Buttons */}
      <AnswerOptions
        question={currentQuestion}
        userAnswer={persistedState[currentQuestionIndex]?.userAnswer}
        handleAnswerClick={handleAnswerClick}
        isSubmitted={submittedQuestions[currentQuestionIndex]}
        handleTextEntrySubmit={handleTextEntrySubmit}
        handleNextQuestion={handleNextQuestion}
        handlePrevQuestion={handlePrevQuestion}
        currentQuestionIndex={currentQuestionIndex}  // Passed correctly
        totalQuestions={questions.length}
        persistedState={persistedState}  // Add this line
        setPersistedState={setPersistedState}  // Pass the setter function as well

      />
      {/* Submit Button */}
      {!submittedQuestions[currentQuestionIndex] ? (
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled} // Disable if no answer is selected
          className={`mt-4 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''} text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.3rem', paddingTop:'0'
          }}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.3rem', paddingTop:'0'
          }}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      )}


      {/* Explanation Modal */}
      {showExplanation && (
        <ExplanationModal
          explanation={questions[currentQuestionIndex].explanation}
          closeExplanation={closeExplanation}
        />
      )}
    </div>
  );
};

export default QuizPage;
