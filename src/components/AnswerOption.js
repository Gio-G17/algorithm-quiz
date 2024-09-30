import React, { useState, useEffect } from 'react';
import '../styling/QuizPageDesktop.css'; // Import your QuizPage CSS file
import '../styling/QuizPageTablet.css'; // Import your QuizPage CSS file

const correctSound = new Audio('/assets/audio/correct-bell.mp3'); // Correct answer sound
const wrongSound = new Audio('/assets/audio/wrong-buzzer.mp3');

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
    // Trim the answer to ensure no leading spaces
    const trimmedAnswer = answer?.trim();

    // Check if the answer starts with a number
    const firstChar = trimmedAnswer.charAt(0);
    const isNumber = !isNaN(firstChar) && firstChar !== ' ';

    // If the answer starts with a number and contains "RRR"
    if (isNumber && trimmedAnswer.includes('RRR')) {
      return 'startsWithNumberAndRRR';
    }

    // If it's just a number
    if (isNumber) {
      return 'startsWithNumber';
    }

    // If it's not a number at all
    return 'notANumber';
  };


  const renderAnswerFeedback = () => {
    const checkmarkPath = '/assets/icons/checkmark.png'; // Replace with actual path
    const crossPath = '/assets/icons/cross.png'; // Replace with actual path
    const halfCheck = '/assets/icons/half-checkmark.png'; // Replace with actual path

    if (type !== 'text-entry' && isSubmitted) {
      if (index === correctAnswer) {
        return (
          <img
            id='checkMark' src={checkmarkPath}
            alt="Correct"
            className="ml-2"
          />
        );
      }
      if (index !== correctAnswer) {
        return (
          <img
            id='xMark'
            src={crossPath}
            alt="Incorrect"
            className="ml-2"
          />
        );
      }
    }
    if (type === 'text-entry' && isSubmitted) {
      if (index == correctNumber - 1) {
        return (
          <div className="flex flex-col text-left">
            {comparisonResult === 'correct' && (
              <img
                id='checkMark' src={checkmarkPath}
                alt="Correct"
                className="ml-2 mr-2"
              />
            )}
            {comparisonResult === 'half-correct' && (
              <img
                id='checkMark'
                src={halfCheck}
                alt="Half-Correct"
                className="ml-2 mr-2"
              />
            )}
            {comparisonResult === 'incorrect' && correctList.length > 0 && (
              <img
                id='checkMark'
                src={halfCheck}
                alt="Half-Correct"
                className="ml-2 mr-2"
              />
            )}
            {comparisonResult === 'incorrect' && correctList.length === 0 && (
              <img
                id='checkMark'
                src={checkmarkPath}
                alt="Correct"
                className="ml-2 mr-2"
              />
            )}
          </div>
        );
      } else {
        return (
          <div className="flex flex-col text-left">
            <img
              id='xMark'
              src={crossPath}
              alt="Incorrect"
              className="ml-2 mr-2"
            />
          </div>
        );
      }
    }

    return null;
  };


  const renderAnswerText = () => {
    if (index == correctNumber - 1) {
      return (
        <div
        id='OfCorrMiss'
          className={`flex items-center flex-row text-center w-full`}
        >
          {(correctList.length > 0 || missingList.length > 0) && (
            <span id='resultOf' className="text-gray-400 text-sm font-normal mr-3 ml-4">
              {/* Smaller text for correct answers */}
              {correctList.length} of {correctList.length + missingList.length}
            </span>
          )}

          <div className="flex flex-col text-center">
            {/* Correct List */}
            {correctList.length > 0 && (
              <span id='CorMissText' className="text-gray-400 text-sm font-normal">
                {/* Smaller text for correct answers */}
                Correct: {correctList.join(', ')}
              </span>
            )}

            {/* Missing List */}
            {missingList.length > 0 && (
              <span id='CorMissText' className="text-gray-400 text-sm font-normal">
                {/* Smaller text for missing answers */}
                Missing: {missingList.join(', ')}
              </span>
            )}
          </div>
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

  const getConditionalId = (answer) => {
    const specificAnswers = [
      '9000',
      '23% RRR stroke and systemic embolism in Afib patients vs warfarin',
      'Higher rates of Intracranial and fatal bleeding in the Rivaroxaban group vs warfarin',
    ];
  
    return specificAnswers.includes(answer) ? 'thirdAnswer' : 'answersCont';
  };

  const handleTextInputChange = (i, value) => {
    const updatedTextAnswers = [...userTextAnswers];
    updatedTextAnswers[i] = value;
    setUserTextAnswers(updatedTextAnswers);
  };
  const handlePopupSubmit = () => {
    setShowPopup(false);
  
    // Convert all user text answers to capitalize first letter and make the rest lowercase
    const capitalizedTextAnswers = userTextAnswers.map(answer =>
      answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase()
    );
  
    // Initialize lists to hold correct answers
    let correctList = [];
  
    // Loop through user answers and compare them to correct answers
    for (let i = 0; i < capitalizedTextAnswers.length; i++) {
      for (let j = 0; j < correctAnswers.length; j++) {
        if (capitalizedTextAnswers[i] === correctAnswers[j]) {
          correctList.push(capitalizedTextAnswers[i]);
          break; // Stop inner loop if we find a match
        }
      }
    }
  
    if (correctList.length === correctAnswers.length) {
      setComparisonResult('correct');
      correctSound.play(); // Play correct answer sound
    } else if (correctList.length > 0) {
      setComparisonResult('half-correct');
      wrongSound.play(); // Play wrong answer sound
    } else {
      setComparisonResult('incorrect');
      wrongSound.play(); // Play wrong answer sound
    }
  
    setCorrectList(correctList);
    handleTextEntrySubmit(capitalizedTextAnswers, correctList);
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

  return (
    <>
      <button
  id={getConditionalId(answer)}  // Conditionally set the id
          onClick={handleOptionSelect}
        className={`flex justify-between items-center p-4 rounded-lg transition-all ${isSubmitted ? 'cursor-not-allowed' : ''} 
    ${userAnswer === index || answer == textFieldsCount ? 'border-4' : 'border-2'} border-[#BC202E]`}
        disabled={isSubmitted}
      >
        <span className="flex flex-row items-center text-left break-words" >
          {(() => {
            const answerType = isAnswerStartingWithNumber();

            if (answerType === 'startsWithNumberAndRRR') {
              // Split the answer into two parts: before/including "RRR" and the rest
              const [firstPart, rrrPart, ...restParts] = answer.split(' ');
              const restOfText = restParts.join(' ');

              return (
                <span style={{ display: 'inline', lineHeight: '1' }}>
                  {/* Part before and including "RRR" */}
                  <span id='preRRR' >
                    {`${firstPart} ${rrrPart}`}
                  </span>
                  &nbsp;
                  {/* Rest of the text after "RRR", which wraps normally */}
                  <span id='postRRR' >
                    {restOfText}
                  </span>
                </span>

              );
            } else if (answerType === 'startsWithNumber') {
              // If the answer just starts with a number
              return (
                <span id='nbAns'>
                  {answer}
                </span>
              );
            } else {
              // If the answer does not start with a number
              return (
                <span id='wordAns'>
                  {answer}
                </span>
              );
            }
          })()}
        </span>
        {renderAnswerText()}
        {renderAnswerFeedback()}
      </button>



      {showPopup && (
        <div id='ansPopup'
          className="fixed inset-0 flex flex-col items-center justify-start bg-white bg-opacity-80 z-50"
        >
          <h1 className="text-4xl font-normal pl-14 text-white mt-16 text-center bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/TextFieldBg.png')]"
            id='ansPopupQues'
          >
            What are their Brand Names
          </h1>

          <div className="bg-white  border-[#BC202E] rounded-lg p-6" id='ansPopupFields'>
            {Array.from({ length: textFieldsCount }).map((_, i) => (
              <div key={i} className="mt-2 mb-2 flex flex-row items-center justify-center">
                <label id='ansNumbering' className="block text-xl mb-1 flex flex-row items-center pr-5">{i + 1 + '.'}</label>
                <input
                  id='ansPopupSingField'
                  key={i}
                  type="text"
                  className="w-full p-3 rounded-lg border border-black"
                  value={userTextAnswers[i] || ''}
                  onChange={(e) => handleTextInputChange(i, e.target.value)}
                  placeholder="Tap to Type ..."
                />
              </div>
            ))}
          </div>

          <div id='subCancelRow' className="flex flex-row space-x-52">
            <button
              id='subCancelBtn'
              onClick={handlePopupClose}
              className="] px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/CancelBtnBg.png')] text-red-700 font-bold text-2xl"
            >
              Cancel
            </button>

            <button
              id='subCancelBtn'
              onClick={handlePopupSubmit}
              className=" px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/SubmitBtnBg.png')] text-white font-bold text-2xl"
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
