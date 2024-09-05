import React from 'react';

const ExplanationModal = ({ explanation, closeExplanation}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full">
        <p>{explanation}</p>
        <button
          onClick={closeExplanation}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ExplanationModal;
