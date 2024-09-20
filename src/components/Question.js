import React from 'react';
import '../styling/QuizPageDesktop.css'; // Import your QuizPage CSS file
import '../styling/QuizPageTablet.css'; // Import your QuizPage CSS file

// Helper function to check if a word is in the keywords array and add superscript to ®
const highlightText = (text, keywords) => {
  const words = text.split(' ');

  return words.map((word, index) => {
    const cleanWord = word.replace(/[.,!?]/g, ''); // Remove punctuation for cleaner matching

    // Check if the word contains ® and handle it with superscript
    const hasRegisteredSymbol = word.includes('®');

    // Wrap the word in <strong> if it's a keyword
    if (keywords.includes(cleanWord)) {
      return (
        <React.Fragment key={index}>
          <span> </span>
          <strong className="font-bold">
            {word.replace('®', '')}
            {hasRegisteredSymbol && (
              <sup style={{ fontSize: '0.6em' }}>®</sup> // Inline style for smaller size
            )}
          </strong>
          <span> </span>
        </React.Fragment>
      );
    }

    // If not a keyword, just add superscript for ® if present
    if (hasRegisteredSymbol) {
      return (
        <React.Fragment key={index}>
          <span> </span>
          {word.replace('®', '')}
          <sup style={{ fontSize: '0.6em' }}>®</sup> {/* Inline style for smaller size */}
          <span> </span>
        </React.Fragment>
      );
    }

    return word + ' ';
  });
};

const Question = ({ questionText }) => {
  const keywords = ['Blood', 'Thinners', 'Portfolio', 'Algorithm', 'RIBAVAN®', 'AVIXAN®', 'KLOTEGO®', 'RIBAVAN®:']; // Your array of strings to be bolded

  return (
    <div
      id="QuestContainer"
      className="text-white mb-4 text-center bg-center bg-no-repeat"
    >
      <div>
        {highlightText(questionText, keywords)}
      </div>
    </div>
  );
};

export default Question;
