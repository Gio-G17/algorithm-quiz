import React from 'react';

const ExplanationModal = ({ explanation, closeExplanation, type }) => {
  const keywords = ['Unique', 'Complete', '2021', 'Algorithm','leading','Blood','Thinners','Portfolio', 'over', '9000','Power','of','Efficacy','Bioequivalent','safe','3','years','highly','trusted','High-Quality','Cost-Effective','affordable']; // Array of strings to be bolded and colored red
  const keywordsBlack =['RIBAVAN®','1.3','MLBP'];
  const highlightText = (text, keywords) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      const cleanWord = word.replace(/[,!?]/g, ''); // Remove punctuation for cleaner matching
      if (keywords.includes(cleanWord)) {
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-[#BC202E]">{word}</strong>
            <span> </span>
          </React.Fragment>
        );
      } else if (keywordsBlack.includes(cleanWord)) {
      
        return (
          <React.Fragment key={index}>
            <span> </span>
            <strong className="font-bold text-black font-bold">{word}</strong>
            <span> </span>
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50">
      {/* Popup container with red border, white background, and rounded corners */}
      <div id='expContainer' className="bg-white text-black text-3xl p-6 rounded-lg border-4 border-[#BC202E] h-1/2 w-1/2 flex flex-col justify-center items-center">
        <p className="text-center">{highlightText(explanation, keywords)}</p>

        {/* Add logos if the type is 'text-entry' */}
        {type === 'text-entry' && (
          <div className="flex flex-col items-center mt-6">
            <img id='expLogos' src="/assets/images/RibaLogo.png" alt="Logo 1" className="mb-2" style={{ height: '60px' }} />
            <img id='expLogos' src="/assets/images/AviLogo.png" alt="Logo 2" className="mb-2" style={{ height: '80px' }} />
            <img id='expLogos' src="/assets/images/KloLogo.png" alt="Logo 3" className="mb-2" style={{ height: '70px' }} />
          </div>
        )}
      </div>

      {/* Close button below the container */}

      <button
              onClick={closeExplanation}
              className="py-2 px-4 rounded-lg w-full h-full bg-center bg-[url('/public/assets/images/SubmitBtnBg.png')] text-white font-bold text-2xl mt-3"
              style={{
                zIndex: 9999,
                backgroundSize: 'contain',
                width: '10rem',
                height: '4rem',
              }}
            >
              Close
            </button>
    </div>
  );
};

export default ExplanationModal;
