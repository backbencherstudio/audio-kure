import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Analyzing = () => {
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const answers = localStorage.getItem("answers");
    if (answers) {
      const parsedAnswers = JSON.parse(answers);
      setSubmittedAnswers(parsedAnswers);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(interval);
      // navigate('/');
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-['Roboto', sans-serif]">
      <div className="text-center bg-black bg-opacity-70 p-10 rounded-lg shadow-lg animate-fadeIn">
        <h2 className="text-3xl text-green-400 mb-2"> Analyzing Your Data</h2>
        <p className="text-lg mb-5 opacity-80">This may take a few seconds...</p>
        <div className="bg-gray-700 rounded-lg overflow-hidden h-5 mb-5">
          <div
            className="bg-gradient-to-r from-[#00ffcc] to-[#00aaff] h-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mb-5">
          <p className="my-2 text-xl font-medium">Your Selections</p>
          {submittedAnswers.length > 0 ? (
            submittedAnswers.map((answer, index) => (
              <div className="bg-white bg-opacity-10 p-2 rounded mb-2 animate-slideIn" key={index}>
                {Object.values(answer).join(", ")}
              </div>
            ))
          ) : (
            <p>No answers submitted.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzing;
