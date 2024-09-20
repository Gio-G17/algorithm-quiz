import React from 'react';

const ExplanationModal = ({ explanation, closeExplanation, type, currentQuestionIndex, reference }) => {
  const keywords = [
    'Unique', 'Complete', '2021', 'leading', 'Blood', 'Thinners', 'Portfolio',
    'over', '9000', 'Power', 'of', 'Efficacy', 'Bioequivalent', 'safe', '3', 'years', 'highly',
    'trusted', 'High-Quality', 'Cost-Effective', 'affordable'
  ];

  const keywordsBlack = ['RIBAVAN®', '1.3', 'MLBP'];

  const keywordQuestionMap = [
    [0],    // Highlight 'Unique' for question 0
    [0],    // Highlight 'Complete' for question 0
    [0],    // Highlight '2021' for question 0
    [1],    // Highlight 'leading' for question 1
    [1],    // Highlight 'Blood' for question 1
    [1],    // Highlight 'Thinners' for question 1
    [1],    // Highlight 'Portfolio' for question 1
    [1, 3], // Highlight 'over' for questions 1 and 3
    [1],    // Highlight '9000' for question 1
    [5],    // Highlight 'Power' for question 5
    [5],    // Highlight 'of' for question 5
    [5],    // Highlight 'Efficacy' for question 5
    [4],    // Highlight 'Bioequivalent' for question 4
    [],     // Highlight 'safe' for question 4
    [3],    // Highlight '3' for question 3
    [3],    // Highlight 'years' for question 3
    [3],    // Highlight 'highly' for question 3
    [3],    // Highlight 'trusted' for question 3
    [4],    // Highlight 'High-Quality' for question 4
    [5],    // Highlight 'Cost-Effective' for question 5
    [5],    // Highlight 'affordable' for question 5
  ];

  const keywordBlackQuestionMap = [
    [3, 4, 5], [5], [5]
  ];

  const highlightText = (text, keywords, keywordMap) => {
    const words = text.split(' ');
    let highlightedWords = {};

    return words.map((word, index) => {
      const cleanWord = word.replace(/[,!?]/g, '');
      const keywordIndex = keywords.indexOf(cleanWord);
      const hasRegisteredSymbol = word.includes('®');  // Check for ® symbol

      // If the keyword is "of", only highlight it once for question 7
      if (cleanWord === 'of' && currentQuestionIndex === 7) {
        if (highlightedWords['of']) {
          return word + ' ';
        } else {
          highlightedWords['of'] = true;
        }
      }

      // Highlight the keywords and apply superscript to ®
      if (keywordIndex !== -1 && keywordMap[keywordIndex].includes(currentQuestionIndex)) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-[#BC202E]">
              {word.replace('®', '')}
              {hasRegisteredSymbol && (
                <sup style={{ fontSize: '0.6em' }}>®</sup>  // Superscript for ®
              )}
            </strong>
            <span> </span>
          </React.Fragment>
        );
      } else if (keywordsBlack.includes(cleanWord) && keywordBlackQuestionMap[keywordsBlack.indexOf(cleanWord)].includes(currentQuestionIndex)) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-black">
              {word.replace('®', '')}
              {hasRegisteredSymbol && (
                <sup style={{ fontSize: '0.6em' }}>®</sup>  // Superscript for ®
              )}
            </strong>
            <span> </span>
          </React.Fragment>
        );
      }

      // Apply superscript for non-keyword words with ®
      if (hasRegisteredSymbol) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            {word.replace('®', '')}
            <sup style={{ fontSize: '0.6em' }}>®</sup>
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

        {/* Display reference below the explanation text */}
        {reference && (
          <p className="text-center mt-4 italic text-sm text-gray-600">
            <span className="font-semibold">Reference:</span> {reference}
          </p>
        )}

        {/* Add logos if the type is 'text-entry' */}
        {type === 'text-entry' && (
          <div className="flex flex-col items-center mt-6">
            <img id='expLogo1' src="/assets/images/RibaLogo.png" alt="Logo 1" className="mb-2" />
            <img id='expLogo2' src="/assets/images/AviLogo.png" alt="Logo 2" className="mb-2" />
            <img id='expLogo3' src="/assets/images/KloLogo.png" alt="Logo 3" className="mb-2" />
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
