import React from 'react';

// Helper function to check if a word is in the keywords array
const highlightText = (text, keywords) => {
  const words = text.split(' ');

  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,!?]/g, ''); // Remove punctuation for cleaner matching
    if (keywords.includes(cleanWord)) {
      return (
        <React.Fragment key={index}>
          <span> </span>
          <strong className="font-bold">{word}</strong>
          <span> </span>
        </React.Fragment>
      );
    }
    return word + ' ';
  });
};

const Question = ({ questionText }) => {
  const keywords = ['Blood', 'Thinners', 'Portfolio', 'Algorithm']; // Your array of strings to be bolded

  return (
    <div
      className="text-white mb-4text-center bg-center bg-no-repeat bg-[url('/public/assets/images/QuestionBg.png')]"
      style={{
        height: '10rem',
        width: '51rem',
        borderRadius: '10px',
        backgroundSize: 'contain',
        display: 'flex', // Use flexbox
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        paddingLeft: '2.75rem',
        paddingRight: '2.75rem',
        fontSize: '2rem',
        lineHeight: '2.5rem',
        whiteSpace: 'normal', // Allow text to wrap
      }}
    >
      <div>
        {highlightText(questionText, keywords)}
      </div>
    </div>
  );
};

export default Question;
