import React, { useState } from 'react';

const Question = ({ question, userAnswer, handleAnswerClick, handleTextEntrySubmit, isSubmitted }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [userTextAnswers, setUserTextAnswers] = useState([]);
  const [textFieldsCount, setTextFieldsCount] = useState(0);

  const handleOptionClick = (index) => {
    if (question.type === 'text-entry') {
      setTextFieldsCount(index + 1);
      setUserTextAnswers(Array(index + 1).fill(''));
      setShowPopup(true);
    } else {
      handleAnswerClick(index);
    }
  };

  const handleTextInputChange = (index, value) => {
    const updatedTextAnswers = [...userTextAnswers];
    updatedTextAnswers[index] = value;
    setUserTextAnswers(updatedTextAnswers);
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);
    handleTextEntrySubmit(userTextAnswers);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const renderAnswerFeedback = (index) => {
    if (question.type === 'text-entry' && userAnswer) {
      const isCorrect = userAnswer.result === 'full-tick';
      const isPartial = userAnswer.result === 'half-tick';

      if (isSubmitted && index + 1 === userAnswer.numberSelected) {
        if (isCorrect) {
          return <span className="text-green-500 ml-2">✔️</span>;
        }
        if (isPartial) {
          return <span className="text-yellow-500 ml-2">⚠️</span>;
        }
        return <span className="text-red-500 ml-2">❌</span>;
      }
    } else if (isSubmitted) {
      if (index === question.correctAnswer) {
        return <span className="text-green-500 ml-2">✔️</span>;
      }
      if (userAnswer === index) {
        return <span className="text-red-500 ml-2">❌</span>;
      }
    }
    return null;
  };

  return (
    <div className="text-center w-full max-w-xl sm:max-w-lg lg:max-w-md p-4">
      <div className="text-2xl font-bold mb-4">{question.questionText}</div>
      <div className={`grid gap-4 ${question.answers.length === 3 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2'}`}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={`p-4 rounded-lg transition-all flex items-center justify-center box-border
              ${isSubmitted ? 'border-2 border-red-500' : userAnswer === index ? 'border-4 border-red-600' : 'border-2 border-red-500'}`}
            disabled={isSubmitted}
            style={{
              minWidth: '120px',  // Set the minimum width to prevent size changes
              minHeight: '50px',   // Set the minimum height to prevent size changes
              boxSizing: 'border-box',
            }}
          >
            {answer}
            {renderAnswerFeedback(index)}
          </button>
        ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full relative">
            <p>Enter your answers:</p>
            {Array.from({ length: textFieldsCount }).map((_, index) => (
              <input
                key={index}
                type="text"
                className="text-black w-full p-2 mt-2"
                value={userTextAnswers[index] || ''}
                onChange={(e) => handleTextInputChange(index, e.target.value)}
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
    </div>
  );
};

export default Question;
