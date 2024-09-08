import React from 'react';

const ResultsPage = ({ correctAnswersCount, totalQuestions }) => {
    const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

    return (
        <div className="flex items-start mt-32 justify-center h-screen w-full p-4">
            {/* Left side - Blood Drop */}
            <div className="relative w-1/4 h-[400px]">

                {/* Gray Drop Image (Fully visible background) */}
                <img
                    src="/assets/images/gray-drop.png"
                    alt="Gray Blood Drop"
                    className="absolute top-0 left-0 w-full h-full"
                />

                {/* Red Drop Image (Cropped from the bottom based on the score) */}
                <div
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
                <div className="absolute -inset-24 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{scorePercentage.toFixed(0)}%</span>
                </div>

            </div>

            {/* Right side - Text */}
            <div className="w-2/3 flex flex-col items-center justify-center pl-8">
                <h1 className="text-5xl font-light mt-5 text-center"><strong>Congratulations</strong> on <br />completing the quiz!</h1>
                <p className="text-5xl font-light mt-12 mb-12 text-center">Thank you for testing your knowledge with us.</p>

                {/* Restart Quiz Button */}
                <button
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
