import { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/App.css';

function App() {
  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [shuffleOption, setShuffleOption] = useState([])

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios('https://the-trivia-api.com/v2/questions');
        setQuestions(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions) {
      setShuffleOption(getOptions());
    }
  }, [currentIndex, questions])
  const updateScore = () => {
    if (selectedAnswer === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const getOptions = () => {
    
    if (!questions || currentIndex >= questions.length) {
      return [];
    }
    
    const currentQuestion = questions[currentIndex];
    
   
    if (!currentQuestion || !currentQuestion.incorrectAnswers) {
      return []; 
    }
    
    const options = [
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ];
    
    return options; 
  };
  
  const NextQuestion = () => {
    updateScore();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer('');
    } else {
      setCurrentIndex(questions.length); 
    }
  };
  

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
    }
    return arr;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const renderOptions = () => {
    const options = getOptions();

    return options.map((item, index) => (
      <div key={`option${index}`} className="flex items-center mb-3">
        <input
          type="radio"
          name={`question${currentIndex}`}
          id={`option${index}`}
          value={item}
          checked={selectedAnswer === item}
          onChange={() => handleAnswerSelect(item)}
          className="form-radio h-5 w-5 text-dark-blue focus:ring-dark-blue"
        />
        <label className="ml-3 text-dark-gray" htmlFor={`option${index}`}>
          {item}
        </label>
      </div>
    ));
  };

  const renderResult = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Your Score: {score} out of {questions.length}</h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-dark-blue text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Restart Quiz
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray p-4">
      <h1 className="text-center text-3xl font-bold mb-6 text-dark-blue">Quiz App</h1>
      {questions ? (
        currentIndex < questions.length ? (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              {currentIndex + 1}) {questions[currentIndex].question.text}
            </h2>
            {renderOptions()}
            <div className="flex justify-center">
              <button
                disabled={!selectedAnswer}
                className={`mt-4 ${!selectedAnswer ? 'bg-gray-400' : 'bg-dark-blue'} text-white py-2 px-4 rounded hover:bg-blue-700 transition`}
                onClick={NextQuestion}
              >
                {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        ) : renderResult()
      ) : (
        <div className="border border-dark-blue shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
