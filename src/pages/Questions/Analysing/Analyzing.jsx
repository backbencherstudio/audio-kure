import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analyzing.css";
import Brain from "./Brain/BrainSVG";
import BrainSVG from "./Brain/BrainSVG";

const Analyzing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const steps = [
    "Analyzing your answers",
    "Calculating your weight loss forecast",
    "Creating your personalized hypnosis program",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {

        if (oldProgress < 99) {
          return oldProgress + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      navigate("/welcome");
    }
  }, [progress, navigate]);

  const activeStep = Math.min(
    Math.floor((progress / 100) * steps.length),
    steps.length - 1
  );

  return (
    <div className="flex  items-center justify-center  lg:mt-10 mx-5 py-2">
      <div className=" backdrop-blur-md border rounded-md lg:w-1/3 p-2 lg:p-10">

        <h1 className="text-3xl my-3 mb-4">

          All set! Just a moment while we process your data...
        </h1>
        <div className="h-52 my-5    ">

          <BrainSVG />
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step ${index <= activeStep ? "completed" : ""}`}
            >
              {index <= activeStep ? <span>&#10003;</span> : <span>•••</span>}{" "}
              {step}
            </div>
          ))}
        </div>
        <div className="testimonial">
          <div className="stars">Why Choose H4U?</div>
          <p className="space-y-2">
            1. Set and Track Goals: Define your goals and monitor your progress. <br />
            2. Rewards for Success: Earn free sessions as you achieve milestones. <br />
            3. Targeted Sessions: Select sessions tailored to specific goals, like relaxation, sleep, or motivation. <br />
            4. Easy to Use: Just pop on your headphones and start—no setup needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analyzing;