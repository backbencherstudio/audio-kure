import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analyzing.css";
import Brain from "./Brain/BrainSVG";
import BrainSVG from "./Brain/BrainSVG";
import iceburg from './../../../assets/ice.jpg'

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
    }, 20000);

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
      <div className=" backdrop-blur-md rounded-md lg:w-1/2 p-2 lg:p-10">

        <h1 className="text-2xl my-3 mb-4 text-center">

          All set! Just a moment while we process your data...
        </h1>
        <div className="my-5 relative flex justify-center  ">
          <img src={iceburg} alt="ice" className="w-80 h-full"/>
          <div className="absolute left-0 p-bg p-2 rounded-md">
            <h1 className="text-xl uppercase">Conscious mind (5%)</h1>
            <ul className="list-disc ml-5 text-sm">
              <li>Logical Thinking</li>
              <li>Will Power</li>
              <li>Short Term Memory</li>
              <li>Critical Thinking</li>
            </ul>
          </div>
          <div className="absolute -right-11 bottom-0 s-bg p-2 rounded-md">
            <h1 className="text-xl uppercase">SubConscious & <br /> UNCONSCIOUS MIND (95%)</h1>
            <ul className="list-disc ml-5 text-sm">
              <li>Beliefs</li>
              <li>Long Term Memory</li>
              <li>Protective Reactions</li>
              <li>Controls All Systems in the Bod</li>
              <li>Programming</li>
              <li>Emotions</li>
              <li>Values</li>
              <li>Intuition</li>
              <li>Fears</li>
              <li>Self-Image</li>
            </ul>
          </div>
          {/* <BrainSVG /> */}
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