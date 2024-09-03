import React from 'react';

const TextEntryPopup = ({ textFieldsCount, userTextAnswers, handleTextInputChange, handlePopupSubmit, handlePopupClose }) => {
  return (
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
  );
};

export default TextEntryPopup;
