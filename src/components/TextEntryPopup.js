import React from 'react';

const TextEntryPopup = ({ 
  textFieldsCount, 
  userTextAnswers, 
  handleTextInputChange, 
  handlePopupSubmit, 
  handlePopupClose, 
  questionText 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
      {/* Popup wrapper with increased size */}
      <div className="bg-gray-800 text-white p-8 rounded-lg max-w-md w-full relative">
        
        {/* Question text with background image */}
        <div className="text-center mb-6 bg-cover bg-center p-4" style={{ backgroundImage: 'url(your-image-url.jpg)' }}>
          <h2 className="text-xl font-bold">{questionText}</h2>
        </div>

        <p>Enter your answers:</p>

        {/* Input fields with numbering and increased height */}
        {Array.from({ length: textFieldsCount }).map((_, index) => (
          <div key={index} className="mt-4">
            <label className="block mb-1">Field {index + 1}</label>
            <input
              type="text"
              className="text-black w-full p-3 rounded-lg"
              style={{ height: '60px' }} // Increased input height
              value={userTextAnswers[index] || ''}
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
  );
};

export default TextEntryPopup;
