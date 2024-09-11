import React from 'react';
import '../styling/InfoPageTablet.css'; // Import your CSS file
import '../styling/HomePageTablet.css'; // Import your CSS file



const InfoPage = ({ onNext, onPrev }) => {
  return (

    <div className="relative flex flex-col  items-center justify-start h-full w-full p-4">

      {/* Exit Quiz Button */}
      <div className="absolute top-[4%] right-[3%]">
      <button
          id='restartBtn'
          className="text-xl font-bold text-white bg-[#E02334] hover:bg-[#BC202E] px-4 py-2 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Restart Quiz
        </button>
      </div>

      <h1 id='infoTitle' className="text-6xl w-auto text-black font-light text-center mx-4 mt-36 mb-14">
        Challenge Your <br/> Understanding of</h1>

      {/* Text section with Previous and Next buttons on either side */}
      <div className="flex justify-between items-center w-full max-w-4xl mt-3 mb-10 ">
       
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="disabled:opacity-70"
        >
          <img
            src="/assets/icons/leftArrow.png"
            alt="Previous"
            className="w-11 h-24"
          />
        </button>

        {/* Informational Text */}
        <div className='flex items-center justify-center'>
          <img src="/assets/images/RibaLogo.png" alt="AlgoLogo" className="w-3/4" />
        </div>


        {/* Next Button (beside the text) */}
        <button
          onClick={onNext}
          className="disabled:opacity-50"
        >
          <img
            src="/assets/icons/rightArrow.png"
            alt="Next"
            className="w-11 h-24"
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
