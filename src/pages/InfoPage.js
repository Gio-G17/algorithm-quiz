import React from 'react';

const InfoPage = ({ onNext, onPrev }) => {
  return (


    
    <div className="relative flex flex-col  items-center justify-start h-full w-full p-4">

      {/* Exit Quiz Button */}
      <div className="absolute top-[4%] right-[3%]">
        <button
          className="text-xl font-bold text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()} // Refreshes the page
        >
          Exit Quiz
        </button>
      </div>

<div className="text-5xl w-96 text-black font-light text-center mx-4 mt-44 mb-20">
Challenge Your Understanding of</div>



      {/* Text section with Previous and Next buttons on either side */}
      <div className="flex justify-between items-center w-full max-w-4xl mt-3 ">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="disabled:opacity-70"
        >
          <img
            src="/assets/icons/leftArrow.png"
            alt="Previous"
            className="w-10 h-24"
          />
        </button>

        {/* Informational Text */}
        <div className='flex flex-col'>
        <img src="/assets/images/AlgoLogo.png" alt="AlgoLogo" className="w-max" />
        </div>


        {/* Next Button (beside the text) */}
        <button
          onClick={onNext}
          className="disabled:opacity-50"
        >
          <img
            src="/assets/icons/rightArrow.png"
            alt="Next"
            className="w-10 h-24"
          />
        </button>
      </div>

      {/* Submit/Next Button at the bottom */}
      <div className="flex justify-center w-full mt-4">
        <button
          onClick={onNext}
          className="text-2xl font-bold text-white bg-cover bg-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]"
          style={{
            height: '80px',
            width: '150px',
            borderRadius: '10px',
            backgroundSize: 'contain',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InfoPage;
