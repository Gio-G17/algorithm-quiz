import React from 'react';
import AnswerOption from './AnswerOption';

const AnswerOptions = ({
  question,
  userAnswer,
  handleAnswerClick,
  isSubmitted,
  handleNextQuestion,
  handlePrevQuestion,
  currentQuestionIndex,
  totalQuestions,
  handleTextEntrySubmit, // Make sure this prop is passed
}) => {
  if (!question) {
    return null;
  }

  const answerCount = question.answers.length;

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mt-4">
      <div className="flex items-center justify-between w-full">
        {/* Previous Button */}
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="disabled:opacity-70"
        >
          <img
            src="/assets/icons/leftArrow.png"
            alt="Previous"
            className="w-12 h-12"
          />
        </button>

        {/* Answer Options Grid */}
        <div className="flex flex-col w-full">
          {/* 2x2 Grid for 4 Answers */}
          {answerCount === 4 && (
            <div className="grid grid-cols-2 gap-x-12 gap-y-8 mx-4">
              {question.answers.map((answer, index) => (
                <AnswerOption
                  key={index}
                  index={index}
                  answer={answer}
                  handleOptionClick={handleAnswerClick}
                  userAnswer={userAnswer}
                  isSubmitted={isSubmitted}
                  correctAnswer={question.correctAnswer}
                  type={question.type} // Pass the question type
                  correctNumber={question.correctNumber} // Pass the correct number of text fields
                  correctAnswers={question.correctAnswers} // Pass the correct answers array
                  handleTextEntrySubmit={handleTextEntrySubmit} // Ensure this is passed
                  currentQuestionIndex={currentQuestionIndex}  // Ensure this is being passed
                />
              ))}
            </div>
          )}

          {/* 2x1 Grid for First Row and Centered Second Row for 3 Answers */}
          {answerCount === 3 && (
            <>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 mx-4">
                {question.answers.slice(0, 2).map((answer, index) => (
                  <AnswerOption
                    key={index}
                    index={index}
                    answer={answer}
                    handleOptionClick={handleAnswerClick}
                    userAnswer={userAnswer}
                    isSubmitted={isSubmitted}
                    correctAnswer={question.correctAnswer}
                    type={question.type} // Pass the question type
                    correctNumber={question.correctNumber} // Pass the correct number of text fields
                    correctAnswers={question.correctAnswers} // Pass the correct answers array
                    handleTextEntrySubmit={handleTextEntrySubmit} // Ensure this is passed
                    currentQuestionIndex={currentQuestionIndex}  // Pass this down
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 place-items-center mt-8 mx-4">
                <AnswerOption
                  key={2}
                  index={2}
                  answer={question.answers[2]}
                  handleOptionClick={handleAnswerClick}
                  userAnswer={userAnswer}
                  isSubmitted={isSubmitted}
                  correctAnswer={question.correctAnswer}
                  type={question.type} // Pass the question type
                  correctNumber={question.correctNumber} // Pass the correct number of text fields
                  correctAnswers={question.correctAnswers} // Pass the correct answers array
                  handleTextEntrySubmit={handleTextEntrySubmit} // Ensure this is passed
                  currentQuestionIndex={currentQuestionIndex}  // Pass this down
                />
              </div>
            </>
          )}

          {/* Default Handling for Other Cases (1 or 2 answers) */}
          {answerCount < 3 && (
            <div className={`grid ${answerCount === 1 ? 'grid-cols-1 place-items-center' : 'grid-cols-2'} gap-x-12 gap-y-8 mx-4`}>
              {question.answers.map((answer, index) => (
                <AnswerOption
                  key={index}
                  index={index}
                  answer={answer}
                  handleOptionClick={handleAnswerClick}
                  userAnswer={userAnswer}
                  isSubmitted={isSubmitted}
                  correctAnswer={question.correctAnswer}
                  type={question.type} // Pass the question type
                  correctNumber={question.correctNumber} // Pass the correct number of text fields
                  correctAnswers={question.correctAnswers} // Pass the correct answers array
                  handleTextEntrySubmit={handleTextEntrySubmit} // Ensure this is passed
                  currentQuestionIndex={currentQuestionIndex}  // Pass this down
                />
              ))}
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextQuestion}
          disabled={!isSubmitted || currentQuestionIndex === totalQuestions - 1}
          className="disabled:opacity-50"
        >
          <img
            src="/assets/icons/rightArrow.png"
            alt="Next"
            className="w-12 h-12"
          />
        </button>
      </div>
    </div>
  );
};

export default AnswerOptions;
