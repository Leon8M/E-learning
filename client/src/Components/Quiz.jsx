import { useState, useEffect } from 'react';
import httpClient from '../httpClient';

const Quiz = ({ user, fileId }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!fileId) {
        setError("No file selected for quiz.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError('');
        const response = await httpClient.get(`/quiz/get-questions/${fileId}`);
        // Assuming the backend returns questions in a suitable format
        setQuizQuestions(response.data.questions);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch quiz questions.');
        console.error("Error fetching quiz questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [fileId]);

  if (!user) {
    return <p className="p-4 text-center text-red-500">You must be logged in to access the quiz.</p>;
  }

  if (loading) {
    return <p className="p-4 text-center">Loading quiz questions...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  }

  if (quizQuestions.length === 0) {
    return <p className="p-4 text-center">No quiz questions available for this file.</p>;
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

    quizQuestions.forEach((question, index) => {
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
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      
      <form onSubmit={handleSubmit}>
        {quizQuestions.map((question, index) => (
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
          <h3 className="text-xl font-bold">Your Score: {score}/{quizQuestions.length}</h3>
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