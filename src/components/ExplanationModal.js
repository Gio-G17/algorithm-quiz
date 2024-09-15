import React from 'react';

const ExplanationModal = ({ explanation, closeExplanation, type, currentQuestionIndex }) => {
  const keywords = [
    'Unique', 'Complete', '2021', 'leading', 'Blood', 'Thinners', 'Portfolio', 
    'over', '9000', 'Power', 'of', 'Efficacy', 'Bioequivalent', 'safe', '3', 'years', 'highly', 
    'trusted', 'High-Quality', 'Cost-Effective', 'affordable'
  ];
  
  const keywordsBlack = ['RIBAVAN®', '1.3', 'MLBP'];

  // Map of question indices for each keyword (same index as the keywords array)
  const keywordQuestionMap = [
    [0],    // Highlight 'Unique' for question 0
    [0],    // Highlight 'Complete' for question 0
    [0],    // Highlight '2021' for question 0
    [1],    // Highlight 'leading' for question 1
    [1],    // Highlight 'Blood' for question 1
    [1],    // Highlight 'Thinners' for question 1
    [1],    // Highlight 'Portfolio' for question 1
    [1, 5], // Highlight 'over' for questions 1 and 5
    [1],    // Highlight '9000' for question 1
    [3, 7], // Highlight 'Power' for questions 3 and 7
    [3, 7], // Highlight 'of' for questions 3 and 7
    [3, 7], // Highlight 'Efficacy' for questions 3 and 7
    [4, 6], // Highlight 'Bioequivalent' for questions 4 and 6
    [4],    // Highlight 'safe' for question 4
    [5],    // Highlight '3' for question 5
    [5],    // Highlight 'years' for question 5
    [5],    // Highlight 'highly' for question 5
    [5],    // Highlight 'trusted' for question 5
    [6],    // Highlight 'High-Quality' for question 6
    [7],    // Highlight 'Cost-Effective' for question 7
    [7],    // Highlight 'affordable' for question 7
  ];

  const keywordBlackQuestionMap = [
    [5, 6, 7], // Highlight 'RIBAVAN®' for questions 5, 6, and 7
    [7],       // Highlight '1.3' for question 7
    [7],       // Highlight 'MLBP' for question 7
  ];

  const highlightText = (text, keywords, keywordMap) => {
    const words = text.split(' ');
    let highlightedWords = {}; // Track already highlighted words by their index in the sentence

    return words.map((word, index) => {
      const cleanWord = word.replace(/[,!?]/g, ''); // Remove punctuation for cleaner matching
      const keywordIndex = keywords.indexOf(cleanWord);

      // If the keyword is "of", only highlight it once
      if (cleanWord === 'of' && currentQuestionIndex === 7) {
        if (highlightedWords['of']) {
          return word + ' '; // Return unhighlighted 'of' after the first occurrence
        } else {
          highlightedWords['of'] = true; // Mark the word as highlighted
        }
      }

      // Check if the keyword exists and if the current question should highlight it
      if (keywordIndex !== -1 && keywordMap[keywordIndex].includes(currentQuestionIndex)) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-[#BC202E]">{word}</strong>
            <span> </span>
          </React.Fragment>
        );
      } else if (keywordsBlack.includes(cleanWord) && keywordBlackQuestionMap[keywordsBlack.indexOf(cleanWord)].includes(currentQuestionIndex)) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-black">{word}</strong>
            <span> </span>
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50">
      <div id='expContainer' className="bg-white text-black text-3xl p-6 rounded-lg border-4 border-[#BC202E] h-1/2 w-1/2 flex flex-col justify-center items-center">
        <p className="text-center">{highlightText(explanation, keywords, keywordQuestionMap)}</p>

        {/* Add logos if the type is 'text-entry' */}
        {type === 'text-entry' && (
          <div className="flex flex-col items-center mt-6">
            <img id='expLogo1' src="/assets/images/RibaLogo.png" alt="Logo 1" className="mb-2"/>
            <img id='expLogo2' src="/assets/images/AviLogo.png" alt="Logo 2" className="mb-2"/>
            <img id='expLogo3' src="/assets/images/KloLogo.png" alt="Logo 3" className="mb-2"/>
          </div>
        )}
      </div>

      <button
        id='expCloseBtn'
        onClick={closeExplanation}
        className="py-2 px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/SubmitBtnBg.png')] text-white font-bold text-2xl mt-3"
      >
        Close
      </button>
    </div>
  );
};

export default ExplanationModal;
