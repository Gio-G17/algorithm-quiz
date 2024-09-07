import React, { useState } from 'react';
import InfoPage from './InfoPage';
import Question from '../components/Question';
import AnswerOptions from '../components/AnswerOptions';
import ExplanationModal from '../components/ExplanationModal';

const questions = [
  {
    questionText: 'How many products does Algorithm currently have within the Blood Thinners Portfolio?',
    answers: ['1', '2', '3', '4'],
    type: 'text-entry',
    correctNumber: 3,
    correctAnswers: ['Ribavan', 'Avixan', 'Klotego'],
    explanation: 'Algorithm is the Unique company with a Complete Blood Thinners Portfolio since 2021',
  },
  {
    questionText: 'Till date, the total number of patients on RIBAVAN®, AVIXAN® & KLOTEGO® is?',
    answers: ['5000', '7000', '9000',],
    correctAnswer: 2,
    explanation: 'Algorithm is the leading Pharmaceutical company in the Blood Thinners Portfolio with over 9000 patients on treatment in 2024',
  },
  {
    type: 'info', // Custom type for this page
  },
  {
    questionText: 'Which of these is not a programming language?',
    answers: ['Python', 'JavaScript', 'HTML', 'C#'],
    correctAnswer: 2,
    explanation: 'HTML is a markup language, not a programming language.',
  },
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


  const handleTextEntrySubmit = (userTextAnswers, correctList) => {
    const correctAnswers = currentQuestion.correctAnswers;

    let feedback = 'incorrect';

    // Use the correctList passed from handlePopupSubmit
    const correctCount = correctList.length;

    // Set feedback based on the correct count and number of correct answers
    if (userTextAnswers.length === currentQuestion.correctNumber) {
      feedback = correctCount === correctAnswers.length ? 'correct' : 'half-correct';
    }

    // Calculate missing list: correctAnswers not in correctList
    let missingList = [];
    for (let i = 0; i < correctAnswers.length; i++) {
      let found = false;
      for (let j = 0; j < correctList.length; j++) {
        if (correctAnswers[i] === correctList[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        missingList.push(correctAnswers[i]);
      }
    }

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

    setShowExplanation(true); 
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
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  
  const isInfoPage = currentQuestion?.type === 'info';

  // Show the InfoPage when it's time
  if (isInfoPage) {
    return <InfoPage onNext={handleNextQuestion}  onPrev={handlePrevQuestion}/>;
  }


  // Determine if Submit button should be disabled
  const isSubmitDisabled = persistedState[currentQuestionIndex]?.userAnswer === undefined;
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4">
      
      {/* Exit Quiz Button */}
      <div className="absolute top-[4%] right-[3%]">
        <button
          className="text-xl font-bold text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()} // Refreshes the page
        >
          Exit Quiz
        </button>
      </div>
  
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
          disabled={isSubmitDisabled}
          className={`mt-4 ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''} text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.3rem', paddingTop: '0'
          }}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={handleNextQuestion}
          className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.3rem', paddingTop: '0'
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
