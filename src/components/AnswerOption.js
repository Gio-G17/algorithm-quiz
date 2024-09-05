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
        <div className="fixed inset-0 flex flex-col items-center justify-start bg-white bg-opacity-75">
          <h1 className="text-xl  text-4xl font-semibold mb-4 text-white mt-36 text-center bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/TextFieldBg.png')]" style={{ width: '49rem', borderRadius: '10px', backgroundSize: 'contain', height: '150px' }}>What are their Brand Names</h1>
          <div className="bg-white border border-red-500 rounded-lg p-6" style={{width: '49rem',}}>


            {Array.from({ length: textFieldsCount }).map((_, i) => (
              <div key={i} className="mt-4 flex flex-row items-center justify-center">
                <label className="block mb-1 flex flex-row items-center pr-5">{i + 1 + '.'}</label>
                <input
                  key={i}
                  type="text"
                  className="w-full p-3 rounded-lg border border-black"
                  style={{ height: '60px', width: '38rem',}}
                  value={userTextAnswers[i] || ''}
                  onChange={(e) => handleTextInputChange(i, e.target.value)}
                  placeholder = 'Tap to Type ...'
                />
              </div>
            ))}


          </div>
          <div className='flex flex-row'>
            <button
              onClick={handlePopupClose}
              className="py-2 px-4 rounded-lg w-1/2 mr-2 bg-center bg-[url('/public/assets/images/CancelBtnBg.png')]"
            >
              Cancel
            </button>
            <button
              onClick={handlePopupSubmit}
              className="py-2 px-4 rounded-lg w-52  h-20 ml-2 bg-center bg-[url('/public/assets/images/SubmitBtnBg.png')]"
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
