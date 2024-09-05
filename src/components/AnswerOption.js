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

  const renderAnswerFeedback = () => {
    // Multiple-choice questions: show "✔️" or "❌"
    if (type !== 'text-entry' && isSubmitted) {
      console.log(correctAnswer);
      if (index === correctAnswer) {
        return <span className="text-green-500 ml-2">✔️</span>; // Correct answer gets a checkmark
      }
      if (userAnswer === index && index !== correctAnswer) {
        return <span className="text-red-500 ml-2">❌</span>; // Only the wrong selected answer gets an X
      }
    }
    // Text-entry questions: show feedback only on the correct answer box
    if (type === 'text-entry' && isSubmitted) {
      // console.log('CorrectAnswer:' + correctNumber);
      // console.log('Index:' + (index - 1));
      // Display correct and missing data on the feedback result

      if (index == correctNumber - 1) {
        console.log(comparisonResult);
        return (
          <div className="flex flex-col text-left">
            {comparisonResult === 'correct' && <span className="text-green-500">✔️</span>}
            {comparisonResult === 'half-correct' && <span className="text-green-500">⚠️</span>}
            {correctList.length > 0 && comparisonResult === 'half-correct' && <span className="text-yellow-500">⚠️</span>}
            {correctList.length > 0 && comparisonResult === 'incorrect' && <span className="text-yellow-500">⚠️</span>}
            {comparisonResult === 'incorrect' && correctList.length === 0 && <span className="text-red-500">✔️</span>}
          </div>
        );
      }
      if (answer == textFieldsCount) {
        if (comparisonResult === 'correct' || comparisonResult === 'half-correct' || comparisonResult === 'incorrect') {
          return (
            <div className="flex flex-col text-left">
              {comparisonResult === 'correct' && <span className="text-green-500">✔️</span>}
              {comparisonResult === 'half-correct' && <span className="text-yellow-500">⚠️</span>}
              {comparisonResult === 'incorrect' && <span className="text-red-500">❌</span>}
              {/* Show correct and missing answers */}

            </div>
          );
        }
      }
    }

    return null;
  };


  const renderAnswerText = () => {
    if (index == correctNumber - 1) {
      return (
        <div className="flex flex-col text-left">
          {correctList.length > 0 && <span className="text-green-500">Correct: {correctList.join(', ')}</span>}
          {missingList.length > 0 && <span className="text-red-500">Missing: {missingList.join(', ')}</span>}
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
    // Determine the result: if all correct answers were provided, it's correct
    if (correctList.length === correctAnswers.length) {
      setComparisonResult('correct');
    } else if (correctList.length > 0) {
      setComparisonResult('half-correct');
    } else {
      setComparisonResult('incorrect');
    }

    console.log(correctList);
    // Set the lists for UI display
    setCorrectList(correctList);

    // Send the user's answers back to the parent
    handleTextEntrySubmit(userTextAnswers, correctList);
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
        className={`flex justify-between items-center p-4 rounded-lg transition-all ${isSubmitted ? 'cursor-not-allowed' : ''
          } ${userAnswer === index || answer == textFieldsCount
            ? 'border-4' : 'border-2'} border-red-500`}
        disabled={isSubmitted}
        style={{
          minWidth: '350px',
          minHeight: '80px',
        }}
      >
        <span className="text-left">{answer}</span>
        {renderAnswerText()}
        {renderAnswerFeedback()}
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Enter your answers:</h2>
            {/* Input fields with numbering and increased height */}
            {Array.from({ length: textFieldsCount }).map((_, i) => (
              <div key={i} className="mt-4 flex flex-row items-center">
                <label className="block mb-1 flex flex-row items-center pr-5">{i+1 + '.'}</label>
                <input
                  type="text"
                  className="text-black w-full p-3 rounded-lg"
                  style={{ height: '60px' }} // Increased input height
                  value={userTextAnswers[i] || ''}
                  onChange={(e) => handleTextInputChange(index, e.target.value)}
                />
              </div>
            ))}

            {/* Submit and Cancel buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePopupSubmit}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-1/2 mr-2"
              >
                Submit
              </button>
              <button
                onClick={handlePopupClose}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg w-1/2 ml-2"
              >
                Cancel
              </button>
            </div>
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
