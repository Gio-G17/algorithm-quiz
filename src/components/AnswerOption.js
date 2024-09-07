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
  persistedState,
  setPersistedState
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [userTextAnswers, setUserTextAnswers] = useState([]);
  const [textFieldsCount, setTextFieldsCount] = useState(0);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [correctList, setCorrectList] = useState([]);
  const [missingList, setMissingList] = useState([]);
  const [submitError, setSubmitError] = useState(false);

  // Handle loading of persisted state
  useEffect(() => {
    if (persistedState[currentQuestionIndex] && isSubmitted) {
      const { feedback, correctList, missingList, userAnswer } = persistedState[currentQuestionIndex];

      // Restore previous feedback and answers
      setComparisonResult(feedback);
      setCorrectList(correctList || []);
      setMissingList(missingList || []);
      setUserTextAnswers(userAnswer || []);
      setTextFieldsCount(userAnswer.length || 0);
    } else {
      setComparisonResult(null);
      setCorrectList([]);
      setMissingList([]);
      setUserTextAnswers([]);
      setTextFieldsCount(0);
    }

    setSubmitError(false);
  }, [currentQuestionIndex, isSubmitted, persistedState]);

  // Helper to determine if the answer starts with a number
  const isAnswerStartingWithNumber = () => {
    const firstChar = answer?.trim().charAt(0);
    return !isNaN(firstChar) && firstChar !== ' '; // Check if the first character is a number
  };

  const renderAnswerFeedback = () => {
    if (type !== 'text-entry' && isSubmitted) {
      if (index === correctAnswer) {
        return <span className="text-green-500 ml-2">✔️</span>; // Correct answer gets a checkmark
      }
      if (userAnswer === index && index !== correctAnswer) {
        return <span className="text-red-500 ml-2">❌</span>; // Only the wrong selected answer gets an X
      }
    }
    if (type === 'text-entry' && isSubmitted) {
      if (index == correctNumber - 1) {
        return (
          <div className="flex flex-col text-left">
            {comparisonResult === 'correct' && <span className="text-green-500">✔️</span>}
            {comparisonResult === 'half-correct' && <span className="text-yellow-500">⚠️</span>}
            {correctList.length > 0 && comparisonResult === 'incorrect' && <span className="text-yellow-500">⚠️</span>}
            {comparisonResult === 'incorrect' && correctList.length === 0 && <span className="text-red-500">✔️</span>}
          </div>
        );
      }
    }

    return null;
  };

  const renderAnswerText = () => {
    if (index == correctNumber - 1) {
      return (
        <div className="flex flex-col text-left">
          {/* Correct List */}
          {correctList.length > 0 && (
            <span className="text-green-500 text-sm"> {/* Smaller text for correct answers */}
              Correct: {correctList.join(', ')}
            </span>
          )}
          {/* Missing List */}
          {missingList.length > 0 && (
            <span className="text-red-500 text-sm"> {/* Smaller text for missing answers */}
              Missing: {missingList.join(', ')}
            </span>
          )}
        </div>
      );
    }
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

    // Initialize lists to hold correct answers
    let correctList = [];

    // Loop through user answers and compare them to correct answers
    for (let i = 0; i < userTextAnswers.length; i++) {
      for (let j = 0; j < correctAnswers.length; j++) {
        if (userTextAnswers[i] === correctAnswers[j]) {
          correctList.push(userTextAnswers[i]);
          break; // Stop inner loop if we find a match
        }
      }
    }
    if (correctList.length === correctAnswers.length) {
      setComparisonResult('correct');
    } else if (correctList.length > 0) {
      setComparisonResult('half-correct');
    } else {
      setComparisonResult('incorrect');
    }

    setCorrectList(correctList);
    handleTextEntrySubmit(userTextAnswers, correctList);
  };

  const handlePopupClose = () => {
    setTextFieldsCount(0);          // Reset the textFieldsCount to 0
    setShowPopup(false);            // Close the popup
    handleOptionClick(null);        // Reset the selected answer to null
  
    // Update persistedState to clear the userAnswer for this question
    setPersistedState((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: {
        ...prevState[currentQuestionIndex],
        userAnswer: undefined // Reset userAnswer to undefined when canceling
      },
    }));
  };
  

  const handleSubmitClick = () => {
    if (userAnswer === null || userAnswer === undefined) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOptionSelect}
        className={`flex justify-between items-center p-4 rounded-lg transition-all ${isSubmitted ? 'cursor-not-allowed' : ''} 
          ${userAnswer === index || answer == textFieldsCount ? 'border-4' : 'border-2'} border-red-500`}
        disabled={isSubmitted}
        style={{
          minWidth: '350px',
          minHeight: '80px',
          fontWeight: isAnswerStartingWithNumber() ? 'bolder' : 'normal',
          fontSize: isAnswerStartingWithNumber() ? '2rem' : '1rem', // Large font for number-starting answers
        }}
      >
        <span className="text-left">{answer}</span>
        {renderAnswerText()}
        {renderAnswerFeedback()}
      </button>

      {showPopup && (
        <div
          className="fixed inset-0 flex flex-col items-center justify-start bg-white bg-opacity-80 z-50"
          style={{ zIndex: 9999 }}
        >
          <h1 className="text-4xl font-normal pl-14 mb-4 text-white mt-16 text-center bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/TextFieldBg.png')]" 
            style={{ width: '49rem', borderRadius: '10px', backgroundSize: 'contain', height: '150px' }}
          >
            What are their Brand Names
          </h1>

          <div className="bg-white border border-red-500 rounded-lg p-6" style={{ width: '49rem', zIndex: 9999 }}>
            {Array.from({ length: textFieldsCount }).map((_, i) => (
              <div key={i} className="mt-4 flex flex-row items-center justify-center">
                <label className="block text-xl mb-1 flex flex-row items-center pr-5">{i + 1 + '.'}</label>
                <input
                  key={i}
                  type="text"
                  className="w-full p-3 rounded-lg border border-black"
                  style={{ height: '60px', width: '38rem' }}
                  value={userTextAnswers[i] || ''}
                  onChange={(e) => handleTextInputChange(i, e.target.value)}
                  placeholder="Tap to Type ..."
                />
              </div>
            ))}
          </div>

          <div className="flex flex-row space-x-52 mt-4">
            <button
              onClick={handlePopupClose}
              className="py-2 px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/CancelBtnBg.png')] text-red-700 font-bold text-2xl"
              style={{
                zIndex: 9998,
                backgroundSize: 'contain',
                width: '10rem',
                height: '4rem',
              }}
            >
              Cancel
            </button>

            <button
              onClick={handlePopupSubmit}
              className="py-2 px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/SubmitBtnBg.png')] text-white font-bold text-2xl"
              style={{
                zIndex: 9999,
                backgroundSize: 'contain',
                width: '10rem',
                height: '4rem',
              }}
            >
              Submit
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
