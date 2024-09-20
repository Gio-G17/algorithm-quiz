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
const questions = [
  {
    questionText: 'How many products does Algorithm currently have within the Blood Thinners Portfolio?',
    answers: ['1', '2', '3', '4'],
    type: 'text-entry',
    correctNumber: 3,
    correctAnswers: ['Ribavan', 'Avixan', 'Klotego'],
    explanation: 'Algorithm is the Unique company with a Complete Blood Thinners Portfolio since 2021',
    reference:'IMS-2024',
  },
  {
    questionText: 'Till date, the total number of patients on RIBAVAN® AVIXAN® & KLOTEGO® is?',
    answers: ['5000', '7000', '9000',],
    correctAnswer: 2,
    explanation: 'Algorithm is the leading Pharmaceutical company in the Blood Thinners Portfolio with over 9000 patients on treatment in 2024',
    reference:'IMS-2024',
  },
  {
    type: 'info', // Custom type for this page
  },
  {
    questionText: 'In what year was RIBAVAN® Introduced into the Lebanese Market?',
    answers: ['2020', '2021', '2022', '2023'],
    correctAnswer: 2,
    explanation: 'RIBAVAN® is a highly trusted Rivaroxaban with over 3 years of experience in the Lebanese market',
    reference:'IMS-2024',
  },
  {
    questionText: 'Which of the below is correct?',
    answers: ['Ribavan® is the 1st Blood Thinner Product launched by Algorithm', 'The Active Pharmaceutical Ingredients of Ribavan is Certified by European Pharmacopoeia', 'Ribavan® is Bioequivalent to the originator', 'All are correct'],
    correctAnswer: 3,
    explanation: 'RIBAVAN® is a High-Quality Bioequivalent Rivaroxaban Generic',
    reference:'Ribavan Patient Information Leaflet. Revision date 05-2020. Sridhar et al. An open label, randomized, balanced, two-treatment, two-period, two sequence, single-dose, crossover, oral bioequivalence study of Rivaroxaban 20 mg Film coated tablets from Labormed Pharma S.A., Romania and Xarelto® 20 mg film-coated tablets (rivaroxaban) of Bayer AG, 51368 Leverkusen, Germany, in healthy, adult, human subjects under fed conditions. 2019.',
  },
  {
    questionText: 'RIBAVAN® is .......... more affordable than the originator?',
    answers: ['40%', '50%', '60%', '70%'],
    correctAnswer: 3,
    explanation: 'RIBAVAN® is a Cost-Effective Rivaroxaban which provides patients with the Power of Efficacy at an affordable price with an average public price of 1.3 MLBP',
    reference:'Lebanon National Drugs Database 2024 Ribavan Patient Information Leaflet. Revision date 05-2020.',
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

    setShowExplanation(false);
  };

  const handleSubmit = () => {
    if (!submittedQuestions[currentQuestionIndex]) {
      const userAnswer = persistedState[currentQuestionIndex]?.userAnswer;
  
      // Play correct or wrong sound based on the submitted answer
      if (userAnswer !== undefined) {
        if (userAnswer === currentQuestion.correctAnswer) {
          correctSound.play(); // Play correct answer sound
          setCorrectAnswersCount((prev) => prev + 1);
        } else {
          wrongSound.play(); // Play wrong answer sound
        }
      }
    }  
    setSubmittedQuestions((prev) =>
      prev.map((submitted, idx) => (idx === currentQuestionIndex ? true : submitted))
    );
    setShowExplanation(false);
  };

  const handleNextQuestion = () => {
    setShowExplanation(true);
  };

  const handleResultsNext = () => {
    setShowExplanation(true);
  };

  const handleInfoNextQuestion = () => {
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
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true); // Mark the quiz as completed when the last question is answered
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isInfoPage = currentQuestion?.type === 'info';

  if (isInfoPage) {
    return <InfoPage onNext={handleInfoNextQuestion} onPrev={handlePrevQuestion} />;
  }

  const isSubmitDisabled = persistedState[currentQuestionIndex]?.userAnswer === undefined;

  if (quizCompleted) {
    console.log('Correct Answers:' + correctAnswersCount);
    return (
      <ResultsPage correctAnswersCount={correctAnswersCount} totalQuestions={questions.length - 1} /> // Show results page
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full p-4">
      {/* Render the logo only after passing the info page */}
      {currentQuestionIndex > 2 && (
        <img src="/assets/images/RibaLogo.png" alt="Slogan" id='RibaLogo' className="absolute top-[4%] left-[3%] h-[5%]" />
      )}

      {/* Exit Quiz Button */}
      <div className="absolute top-[4%] right-[3%]">
        <button
          id='restartBtn'
          className="text-xl font-bold text-white bg-[#E02334] hover:bg-[#BC202E] px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Restart Quiz
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
          id='SubmitBtn'
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={` ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''} text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
        >
          Submit
        </button>
      ) : (
        currentQuestionIndex === questions.length - 1 ?
          <button
            id='SubmitQzBtn'
            onClick={() => handleResultsNext()}
            className="mt-4 text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
          >
            Submit Quiz
          </button> :
          <button
            id='NextBtn'
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
          currentQuestionIndex={currentQuestionIndex} // Pass the current question index
          reference={questions[currentQuestionIndex].reference}
        />
      )}
    </div>
  );
};

export default QuizPage;
