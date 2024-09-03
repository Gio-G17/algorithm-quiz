import React from 'react';

const Question = ({ questionText }) => {
  return (
    <div className="text-2xl font-bold mb-4 text-center">
      {questionText}
    </div>
  );
};

export default Question;
