import React from 'react';

const Question = ({ questionText }) => {
  return (
    <div
      className="text-2xl font-bold mb-4 text-white text-center bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/QuestionBg.png')]"
      style={{ 
        height: '200px', 
        width: '49rem', 
        borderRadius: '10px', 
        backgroundSize: 'contain' // Ensures the image fits within the container without being cut off
      }}>
      {questionText}
    </div>
  );
};

export default Question;
