import React from 'react';
import '../styling/QuizPageDesktop.css'; // Import your QuizPage CSS file
import '../styling/QuizPageTablet.css'; // Import your QuizPage CSS file



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
  const keywords = ['Blood', 'Thinners', 'Portfolio', 'Algorithm','RIBAVAN®','AVIXAN®','KLOTEGO®','RIBAVAN®:']; // Your array of strings to be bolded

  return (
    <div
      id='QuestContainer'
      className="text-white mb-4text-center bg-center bg-no-repeat bg-[url('/public/assets/images/QuestionBg.png')]"
    >
      <div>
        {highlightText(questionText, keywords)}
      </div>
    </div>
  );
};

export default Question;
