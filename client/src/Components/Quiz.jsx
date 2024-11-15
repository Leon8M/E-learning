import { useState, useEffect } from 'react';
import questions from './questions';

const Quiz = ({ user }) => {
  const [selectedTopic, setSelectedTopic] = useState('Programming');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);

  if (!user) {
    return <p className="p-4 text-center text-red-500">You must be logged in to access the quiz.</p>;
  }

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let calculatedScore = 0;
    let feedbackList = [];

    questions[selectedTopic].forEach((question, index) => {
      const correctAnswer = question.correctAnswer;
      const userAnswer = userAnswers[index];

      if (userAnswer === correctAnswer) {
        calculatedScore += 1;
      } else {
        feedbackList.push({
          question: question.question,
          correctAnswer,
          userAnswer: userAnswer || "No answer",
        });
      }
    });

    setScore(calculatedScore);
    setFeedback(feedbackList);
  };

  return (
    <div className="quiz-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Quiz on {selectedTopic}</h2>
      <select
        className="mb-4 p-2 rounded border border-gray-300"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {Object.keys(questions).map((topic) => (
          <option key={topic} value={topic}>{topic}</option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        {questions[selectedTopic].map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{index + 1}. {question.question}</p>
            <div className="flex flex-col">
              {question.options.map((option) => (
                <label key={option} className="mt-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Quiz
        </button>
      </form>

      {score !== null && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Your Score: {score}/{questions[selectedTopic].length}</h3>
          {feedback.length > 0 ? (
            <div className="mt-4">
              <h4 className="font-semibold">Incorrect Answers:</h4>
              <ul className="mt-2 list-disc list-inside">
                {feedback.map((item, index) => (
                  <li key={index}>
                    <p><strong>Question:</strong> {item.question}</p>
                    <p><strong>Your Answer:</strong> {item.userAnswer}</p>
                    <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-green-500 mt-4">All answers correct! Great job!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
