import React from 'react';
import '../styling/ResultsPageTablet.css'; // Import your CSS file
import '../styling/ResultsPageDesktop.css'; // Import your CSS file



const ResultsPage = ({ correctAnswersCount, totalQuestions }) => {
    const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

    return (
        <div id="results-container" className="flex items-start mt-32 justify-center h-screen w-full p-4">
            {/* Left side - Blood Drop */}
            <div id="blood-drop-container" className="relative w-1/4 h-[400px]">

                {/* Gray Drop Image (Fully visible background) */}
                <img
                    src="/assets/images/gray-drop.png"
                    alt="Gray Blood Drop"
                    className="absolute top-0 left-0 w-full h-full"
                />

                {/* Red Drop Image (Cropped from the bottom based on the score) */}
                <div
                    id="red-drop"
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                        clipPath: `inset(${100 - scorePercentage}% 0 0 0)`, // Crop from the bottom based on score
                    }}
                >
                    <img
                        src="/assets/images/red-drop.png"
                        alt="Red Blood Drop"
                        className="w-full h-full"
                    />
                </div>

                {/* Percentage Text Overlay */}
                <div id="percentage-overlay" className="absolute -inset-24 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{scorePercentage.toFixed(0)}%</span>
                </div>

            </div>

            {/* Right side - Text */}
            <div id="text-container" className="w-2/3 flex flex-col items-center justify-center pl-8">
                <h1 id='congtextpt1' className="text-5xl font-light mt-5 text-center">
                    <strong style={{ fontWeight: 'bold' }}>Congratulations</strong> on <br />completing the quiz!
                </h1>
                <p id='congtextpt2' className="text-5xl font-light mt-12 mb-12 text-center">
                    Thank you for testing your knowledge with us.
                </p>


                <div id="blood-drop-container-tablet" className="relative w-1/4 h-[400px]">

                    {/* Gray Drop Image (Fully visible background) */}
                    <img
                        src="/assets/images/gray-drop.png"
                        alt="Gray Blood Drop"
                        className="absolute top-0 left-0 w-full h-full"
                    />

                    {/* Red Drop Image (Cropped from the bottom based on the score) */}
                    <div
                        id="red-drop-tablet"
                        className="absolute top-0 left-0 w-full h-full"
                        style={{
                            clipPath: `inset(${100 - scorePercentage}% 0 0 0)`, // Crop from the bottom based on score
                        }}
                    >
                        <img
                            src="/assets/images/red-drop.png"
                            alt="Red Blood Drop"
                            className="w-full h-full"
                        />
                    </div>

                    {/* Percentage Text Overlay */}
                    <div id="percentage-overlay-tablet" className="absolute -inset-24 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">{scorePercentage.toFixed(0)}%</span>
                    </div>

                </div>


                {/* Restart Quiz Button */}
                <button
                    id='rstrtQuizBtn'
                    onClick={() => window.location.reload()} // Reloads the page to restart the quiz
                    className={`text-2xl font-bold mb-4 text-white text-center bg-cover bg-center flex justify-center items-center bg-no-repeat bg-[url('/public/assets/images/SubNextBg.png')]`}
                    style={{
                        height: '100px', width: '350px', borderRadius: '10px', backgroundSize: 'contain', marginTop: '2.4rem', paddingTop: '0',
                    }}
                >
                    Restart Quiz
                </button>

            </div>
        </div>
    );
};

export default ResultsPage;
