import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Analyzing.css';

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
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(interval);
      navigate('/');
    }, 5000);

    return () => {
      document.body.removeChild(script);
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className='analyzing-background'>
      <div className='analyzing-container'>
        <h2>AI is Analyzing Your Data</h2>
        <p className='subheader'>This may take a few seconds...</p>
        <div className='progress-bar'>
          <div className='progress' style={{ width: `${progress}%` }}></div>
        </div>
        <div className='answers-list'>
          {submittedAnswers.length > 0 ? (
            submittedAnswers.map((answer, index) => (
              <div className='answer-item' key={index}>
                {Object.values(answer).join(", ")}
              </div>
            ))
          ) : (
            <p>No answers submitted.</p>
          )}
        </div>
        <dotlottie-player
          src="https://lottie.host/0123d81d-006d-4b3f-a5d2-fb1e53087da7/234nC2lRkd.json"
          background="transparent"
          speed="1"
          loop
          autoplay>
        </dotlottie-player>
      </div>
    </div>
  );
};

export default Analyzing;
