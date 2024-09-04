import React, { useState, useEffect } from 'react';

const AnswerOption = ({
  answer,
  handleOptionClick,
  index,
  userAnswer,
  isSubmitted,
  correctAnswer,
  type,
  correctNumber,
  correctAnswers,
  handleTextEntrySubmit,
  currentQuestionIndex,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [userTextAnswers, setUserTextAnswers] = useState([]);
  const [textFieldsCount, setTextFieldsCount] = useState(0);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [correctList, setCorrectList] = useState([]);
  const [missingList, setMissingList] = useState([]);
  const [submitError, setSubmitError] = useState(false); // New state for submission error

  useEffect(() => {
    console.log("Current Question Index: ", currentQuestionIndex); // This should not be undefined
    console.log("User Answer: ", userAnswer);
    console.log("Comparison Result: ", comparisonResult);
    console.log("Correct List: ", correctList);
    console.log("Missing List: ", missingList);
  
    if (userAnswer && Array.isArray(userAnswer)) {
      setUserTextAnswers(userAnswer);
      setTextFieldsCount(userAnswer.length);
    } else {
      setUserTextAnswers([]);
      setTextFieldsCount(0);
    }
  
    // Only reset feedback if the question hasn't been submitted yet
    if (!isSubmitted) {
      setComparisonResult(null);
      setCorrectList([]);
      setMissingList([]);
    }
  
    setSubmitError(false); // Reset error when question index changes
  }, [currentQuestionIndex, isSubmitted]);  // Ensure currentQuestionIndex is here
  
  

  const renderAnswerFeedback = () => {
    if (type !== 'text-entry' && isSubmitted) {
      if (index === correctAnswer) {
        return <span className="text-green-500 ml-2">✔️</span>;
      }
      if (userAnswer === index) {
        return <span className="text-red-500 ml-2">❌</span>;
      }
    }

    if (comparisonResult === 'correct') {
      return <span className="text-green-500 ml-2">✔️</span>;
    }
    if (comparisonResult === 'half-correct') {
      return <span className="text-yellow-500 ml-2">⚠️</span>;
    }
    if (comparisonResult === 'incorrect') {
      return <span className="text-red-500 ml-2">❌</span>;
    }

    return null;
  };

  const handleOptionSelect = () => {
    if (type === 'text-entry') {
      const fieldCount = parseInt(answer, 10);
      setTextFieldsCount(fieldCount);
      setUserTextAnswers(Array(fieldCount).fill(''));
      setShowPopup(true);
    } else {
      setSubmitError(false); // Reset the error state when selecting an option
      handleOptionClick(index);
    }
  };

  const handleTextInputChange = (i, value) => {
    const updatedTextAnswers = [...userTextAnswers];
    updatedTextAnswers[i] = value;
    setUserTextAnswers(updatedTextAnswers);
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);

    if (userTextAnswers.length !== correctNumber) {
      setComparisonResult('incorrect');
      setCorrectList([]);
      setMissingList([]);
    } else {
      const correctList = [];
      const missingList = [];

      userTextAnswers.forEach((ans, idx) => {
        if (ans === correctAnswers[idx]) {
          correctList.push(ans);
        } else {
          missingList.push(correctAnswers[idx]);
        }
      });

      if (correctList.length === correctNumber) {
        setComparisonResult('correct');
      } else if (correctList.length > 0) {
        setComparisonResult('half-correct');
      } else {
        setComparisonResult('incorrect');
      }

      setCorrectList(correctList);
      setMissingList(missingList);
    }

    handleTextEntrySubmit(userTextAnswers);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSubmitClick = () => {
    if (userAnswer === null || userAnswer === undefined) {
      setSubmitError(true); // Set the error state when no answer is selected
    } else {
      setSubmitError(false); // Reset the error state if an answer is selected
    }
  };

  return (
    <>
      <button
        onClick={handleOptionSelect}
        className={`flex justify-between items-center p-4 rounded-lg transition-all ${
          isSubmitted ? 'cursor-not-allowed' : ''
        } ${userAnswer === index ? 'border-4' : 'border-2'} border-red-500`}
        disabled={isSubmitted}
        style={{
          minWidth: '300px',
          minHeight: '50px',
        }}
      >
        <span className="text-left">{answer}</span>
        {comparisonResult && type === 'text-entry' && (
          <div className="flex flex-col text-left">
            {correctList.length > 0 && (
              <span className="text-green-500">Correct: {correctList.join(', ')}</span>
            )}
            {missingList.length > 0 && (
              <span className="text-yellow-500">Missing: {missingList.join(', ')}</span>
            )}
          </div>
        )}
        <span>{renderAnswerFeedback()}</span>
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enter your answers:</h2>
            {Array.from({ length: textFieldsCount }).map((_, i) => (
              <input
                key={i}
                type="text"
                className="text-black w-full p-2 mt-2"
                value={userTextAnswers[i] || ''}
                onChange={(e) => handleTextInputChange(i, e.target.value)}
              />
            ))}
            <button
              onClick={handlePopupSubmit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full"
            >
              Submit Answers
            </button>
            <button
              onClick={handlePopupClose}
              className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded-lg"
            >
              X
            </button>
          </div>
        </div>
      )}

      {submitError && (
        <p className="text-red-500 mt-2">Please select an answer before submitting!</p>
      )}
    </>
  );
};

export default AnswerOption;
