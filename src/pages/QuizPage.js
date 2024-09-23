import React, { useState } from 'react';
import InfoPage from './InfoPage';
import Question from '../components/Question';
import AnswerOptions from '../components/AnswerOptions';
import ExplanationModal from '../components/ExplanationModal';
import ResultsPage from './ResultsPage'; // Import Results Page
import '../styling/QuizPageDesktop.css'; // Import your QuizPage CSS file
import '../styling/QuizPageTablet.css'; // Import your QuizPage CSS file

const correctSound = new Audio('/assets/audio/correct-bell.mp3'); // Correct answer sound
const wrongSound = new Audio('/assets/audio/wrong-buzzer.mp3');
const applause = new Audio('/assets/audio/applause.mp3');

const questions = [
  {
    questionText: 'How many products does Algorithm currently have within the Blood Thinners Portfolio?',
    answers: ['1', '2', '3', '4'],
    type: 'text-entry',
    correctNumber: 3,
    correctAnswers: ['Ribavan', 'Avixan', 'Klotego'],
    explanation: 'Algorithm is the Unique company with a Complete Blood Thinners Portfolio since 2021',
    reference: 'IMS-2024',
  },
  {
    questionText: 'Till date, the total number of patients on RIBAVAN® AVIXAN® & KLOTEGO® is?',
    answers: ['5000', '7000', '9000'],
    correctAnswer: 2,
    explanation: 'Algorithm is the leading Pharmaceutical company in the Blood Thinners Portfolio with over 9000 patients on treatment in 2024',
    reference: 'IMS-2024',
  },
  {
    type: 'info', // Custom type for this page
  },
  {
    questionText: 'In what year was RIBAVAN® Introduced into the Lebanese Market?',
    answers: ['2020', '2021', '2022', '2023'],
    correctAnswer: 2,
    explanation: 'RIBAVAN® is a highly trusted Rivaroxaban with over 3 years of experience in the Lebanese market',
    reference: 'IMS-2024',
  },
  {
    questionText: 'Which of the below is correct?',
    answers: ['Ribavan® is the 1st Blood Thinner Product launched by Algorithm', 'The Active Pharmaceutical Ingredients of Ribavan is Certified by European Pharmacopoeia', 'Ribavan® is Bioequivalent to the originator', 'All are correct'],
    correctAnswer: 3,
    explanation: 'RIBAVAN® is a High-Quality Bioequivalent Rivaroxaban Generic',
    reference: 'Ribavan Patient Information Leaflet. Revision date 05-2020. Sridhar et al. An open label, randomized, balanced, two-treatment, two-period, two sequence, single-dose, crossover, oral bioequivalence study of Rivaroxaban 20 mg Film coated tablets from Labormed Pharma S.A., Romania and Xarelto® 20 mg film-coated tablets (rivaroxaban) of Bayer AG, 51368 Leverkusen, Germany, in healthy, adult, human subjects under fed conditions. 2019.',
  },
  {
    questionText: 'RIBAVAN® is .......... more affordable than the originator?',
    answers: ['40%', '50%', '60%', '70%'],
    correctAnswer: 3,
    explanation: 'RIBAVAN® is a Cost-Effective Rivaroxaban which provides patients with the Power of Efficacy at an affordable price with an average public price of 1.3 MLBP',
    reference: 'Lebanon National Drugs Database 2024 Ribavan Patient Information Leaflet. Revision date 05-2020.',
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [persistedState, setPersistedState] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState(Array(questions.length).fill(false));
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  // Handling answer click for non-text-entry questions
  const handleAnswerClick = (index) => {
    if (!submittedQuestions[currentQuestionIndex] && currentQuestion.correctAnswer !== undefined) {
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

  // Handling text-entry question (for question 1)
  const handleTextEntrySubmit = (userTextAnswers, correctList) => {
    if (!submittedQuestions[currentQuestionIndex]) {
      const correctAnswers = currentQuestion.correctAnswers;
      let feedback = 'incorrect';
      const correctCount = correctList.length;
  
      if (userTextAnswers.length === currentQuestion.correctNumber) {
        feedback = correctCount === correctAnswers.length ? 'correct' : 'half-correct';
      }
  
      let missingList = correctAnswers.filter((answer) => !correctList.includes(answer));
  
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
       setCorrectAnswersCount((prev) => prev + 1); // Increment only if fully correct and only once
      }
      setShowExplanation(false);
    }
  };
  

  // Function to skip info pages and exclude them from the count
  const isInfoPage = currentQuestion?.type === 'info';
  const totalQuestions = questions.filter((q) => q.type !== 'info').length;

  const handleSubmit = () => {
    // Ensure the current question is not already submitted
    if (!submittedQuestions[currentQuestionIndex] && !isInfoPage) {
      const userAnswer = persistedState[currentQuestionIndex]?.userAnswer;
  
      if (userAnswer !== undefined) {
        // Check if the user answer is correct for non-text-entry questions
        if (userAnswer === currentQuestion.correctAnswer) {
          correctSound.play();
         setCorrectAnswersCount((prev) => prev + 1); // Increment only once
        } else {
          wrongSound.play();
        }
      }
      // Mark the current question as submitted to prevent further submissions
      setSubmittedQuestions((prev) =>
        prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted))
      );
  
      // Hide the explanation modal if open
      setShowExplanation(false);
    }
  };
  
  const handleNextQuestion = () => {
    setShowExplanation(true);
  };

  const handleResultsNext = () => {
    setShowExplanation(true);
    applause.play();
  };

  const handleInfoNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
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
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (isInfoPage) {
    return <InfoPage onNext={handleInfoNextQuestion} onPrev={handlePrevQuestion} />;
  }

  if (quizCompleted) {
    return (
      <ResultsPage
        correctAnswersCount={correctAnswersCount}
        totalQuestions={totalQuestions} // Excluding info pages
      />
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4">
      {currentQuestionIndex > 2 && (
        <img
          src="/assets/images/RibaLogo.png"
          alt="Slogan"
          id="RibaLogo"
          className="absolute top-[4%] left-[3%] h-[5%]"
        />
      )}

      <div className="absolute top-[4%] right-[3%]">
        <button
          id="restartBtn"
          className="text-xl font-bold text-white bg-[#E02334] hover:bg-[#BC202E] px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Restart Quiz
        </button>
      </div>

      <Question questionText={currentQuestion.questionText} />

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

      {!submittedQuestions[currentQuestionIndex] ? (
        <button
          id="SubmitBtn"
          onClick={handleSubmit}
          disabled={persistedState[currentQuestionIndex]?.userAnswer === undefined}
          className={`${
            persistedState[currentQuestionIndex]?.userAnswer === undefined
              ? 'opacity-50 cursor-not-allowed'
              : ''
          } text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
        >
          Submit
        </button>
      ) : currentQuestionIndex === questions.length - 1 ? (
        <button
          id="SubmitQzBtn"
          onClick={() => handleResultsNext()}
          className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
        >
          Submit Quiz
        </button>
      ) : (
        <button
          id="NextBtn"
          onClick={handleNextQuestion}
          className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
        >
          Next
        </button>
      )}

      {showExplanation && (
        <ExplanationModal
          explanation={questions[currentQuestionIndex].explanation}
          closeExplanation={closeExplanation}
          type={questions[currentQuestionIndex].type}
          currentQuestionIndex={currentQuestionIndex}
          reference={questions[currentQuestionIndex].reference}
        />
      )}
    </div>
  );
};

export default QuizPage;
