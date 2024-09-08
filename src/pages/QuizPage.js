import React, { useState } from 'react';
import InfoPage from './InfoPage';
import Question from '../components/Question';
import AnswerOptions from '../components/AnswerOptions';
import ExplanationModal from '../components/ExplanationModal';
import ResultsPage from './ResultsPage'; // Import Results Page

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
    questionText: 'RIBAVAN®: Efficacy and Beyond ',
    answers: ['21% RRR stroke and systemic embolism in Afib patients vs warfarin', '23% RRR stroke and systemic embolism in Afib patients vs warfarin', '23% RRR stroke and systemic embolism in Afib patients vs warfarin'],
    correctAnswer: 0,
    explanation: 'RIBAVAN® Provides patients with the Power of Efficacy',
  },
  {
    questionText: 'RIBAVAN®: Safety?',
    answers: ['Bioequivalent to Originator', 'Higher rates of major or nonmajor clinically relevant bleeding in the Rivaroxaban group vs warfarin', 'Higher rates of Intracranial and fatal bleeding in the Rivaroxaban group vs warfarin',],
    correctAnswer: 0,
    explanation: 'RIBAVAN®, the Bioequivalent Rivaroxaban, is safe with no significant difference for major or nonmajor clinically relevant bleeding and less Intracranial and fatal bleeding vs warfarin',
  },
  {
    questionText: 'In what year was RIBAVAN® Introduced into the Lebanese Market?',
    answers: ['2020', '2021', '2022', '2023'],
    correctAnswer: 0,
    explanation: 'RIBAVAN®, the Bioequivalent Rivaroxaban, is safe with no significant difference for major or nonmajor clinically relevant bleeding and less Intracranial and fatal bleeding vs warfarin',
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [persistedState, setPersistedState] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState(Array(questions.length).fill(false));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // New state to track correct answers
  const [quizCompleted, setQuizCompleted] = useState(false); // New state to track if quiz is completed

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
          userAnswer: index,
        },
      };
      setPersistedState(updatedState);

      // Track correct answer
      if (index === currentQuestion.correctAnswer) {
        setCorrectAnswersCount((prev) => prev + 1);
      }
    }
  };

  const handleTextEntrySubmit = (userTextAnswers, correctList) => {
    const correctAnswers = currentQuestion.correctAnswers;

    let feedback = 'incorrect';
    const correctCount = correctList.length;

    if (userTextAnswers.length === currentQuestion.correctNumber) {
      feedback = correctCount === correctAnswers.length ? 'correct' : 'half-correct';
    }

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

    const updatedState = {
      ...persistedState,
      [currentQuestionIndex]: {
        ...persistedState[currentQuestionIndex],
        userAnswer: userTextAnswers,
        feedback,
        correctList,
        missingList,
      },
    };

    setPersistedState(updatedState);

    setSubmittedQuestions((prev) =>
      prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted))
    );

    if (correctList.length === correctAnswers.length) {
      setCorrectAnswersCount((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleSubmit = () => {
    setSubmittedQuestions((prev) =>
      prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted))
    );
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true); // Mark the quiz as completed when the last question is answered
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
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

  const isInfoPage = currentQuestion?.type === 'info';

  if (isInfoPage) {
    return <InfoPage onNext={handleNextQuestion} onPrev={handlePrevQuestion} />;
  }

  const isSubmitDisabled = persistedState[currentQuestionIndex]?.userAnswer === undefined;

  if (quizCompleted) {
    console.log(correctAnswersCount);
    return (
      <ResultsPage correctAnswersCount={correctAnswersCount} totalQuestions={questions.length} /> // Show results page
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4">
      {/* Render the logo only after passing the info page */}
      {currentQuestionIndex > 2 && (
        <img src="/assets/images/RibaLogo.png" alt="Slogan" className="absolute top-[4%] left-[3%] h-[5%]" />
      )}

      {/* Exit Quiz Button */}
      <div className="absolute top-[4%] right-[3%]">
        <button
          className="text-xl font-bold text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
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
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        persistedState={persistedState}
        setPersistedState={setPersistedState}
      />

      {/* Submit/Next Button */}
      {!submittedQuestions[currentQuestionIndex] ? (
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={` ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''} text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.4rem', paddingTop: '0',
          }}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={currentQuestionIndex === questions.length - 1 ? () => setQuizCompleted(true) : handleNextQuestion}
          className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
          style={{
            height: '80px', width: '150px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.4rem', paddingTop: '0',
          }}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next'}
        </button>
      )}


      {/* Explanation Modal */}
      {showExplanation && (
        <ExplanationModal
          explanation={questions[currentQuestionIndex].explanation}
          closeExplanation={closeExplanation}
          type={questions[currentQuestionIndex].type}
        />
      )}
    </div>
  );
};

export default QuizPage;
