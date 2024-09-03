import React, { useState } from 'react';
import Question from '../components/Question';
import AnswerOptions from '../components/AnswerOptions';
import ExplanationModal from '../components/ExplanationModal';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answers: ['Berlin', 'Madrid', 'Paris'],
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

  const handleAnswerClick = (index) => {
    if (!submittedQuestions[currentQuestionIndex]) {
      const updatedState = {
        ...persistedState,
        [currentQuestionIndex]: {
          ...persistedState[currentQuestionIndex],
          userAnswer: index,
        },
      };
      setPersistedState(updatedState);
    }
  };

  const handleTextEntrySubmit = (userTextAnswers) => {
    const correctAnswers = currentQuestion.correctAnswers;
    const correctCount = correctAnswers.filter((ans, idx) => ans === userTextAnswers[idx]).length;

    let feedback = 'incorrect';
    if (userTextAnswers.length === currentQuestion.correctNumber) {
      feedback = correctCount === correctAnswers.length ? 'correct' : 'half-correct';
    }

    const updatedState = {
      ...persistedState,
      [currentQuestionIndex]: {
        ...persistedState[currentQuestionIndex],
        userAnswer: userTextAnswers,
        feedback,
      },
    };
    setPersistedState(updatedState);

    setSubmittedQuestions((prev) => prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted)));
  };

  const handleSubmit = () => {
    setSubmittedQuestions((prev) => prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted)));
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
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      {/* Question */}
      <Question questionText={currentQuestion.questionText} />

      {/* Answer Options with Prev/Next Buttons */}
      <AnswerOptions
        question={currentQuestion}
        userAnswer={persistedState[currentQuestionIndex]?.userAnswer || null}
        handleAnswerClick={handleAnswerClick}
        isSubmitted={submittedQuestions[currentQuestionIndex]}
        handleTextEntrySubmit={handleTextEntrySubmit}
        handleNextQuestion={handleNextQuestion}
        handlePrevQuestion={handlePrevQuestion}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />

      {/* Submit Button */}
      {!submittedQuestions[currentQuestionIndex] ? (
        <button
          onClick={handleSubmit}
          disabled={persistedState[currentQuestionIndex]?.userAnswer === null}
          className="mt-4 disabled:opacity-50"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="mt-4"
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next Question
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
