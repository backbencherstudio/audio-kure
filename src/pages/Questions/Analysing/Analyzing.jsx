import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analyzing.css";
import Brain from "./Brain/BrainSVG";
import BrainSVG from "./Brain/BrainSVG";
import iceburg from './../../../assets/ice.jpg'
import arrow from './../../../assets/images/arrow.png'

const Analyzing = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const steps = [
    "Analyzing your answers",
    // "Calculating your weight loss forecast",
    "Calculating your forecast",
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
    }, 500);

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
        <div className="flex justify-center my-10">
          <BrainSVG />
        </div>
        <div className="my-5 relative flex justify-center">
          <img src={iceburg} alt="ice" className="w-80 h-full" />
          <div className="absolute hidden lg:block top-2 -left-56 xl:-left-40 xl:top-10 2xl:-left-32 2xl:top-10 bg-black p-2 rounded-md right-to-left">
            <h1 className="text-xl uppercase">Conscious mind (5%)</h1>
            <ul className="list-disc ml-5 text-sm">
              <li>Logical Thinking</li>
              <li>Will Power</li>
              <li>Short Term Memory</li>
              <li>Critical Thinking</li>
            </ul>
          </div>
          <img src={arrow} alt="arrow" className="absolute hidden lg:block w-32 left-0 xl:w-32  xl:left-16 xl:-top-0 2xl:w-56 2xl:left-24 2xl:-top-16 rotate-[65deg] arrow-animation " />
          <img src={arrow} alt="arrow" className="absolute hidden lg:block w-32 right-0 xl:w-32 xl:right-14  2xl:w-56 2xl:right-[132px] bottom-0 scale-x-[-1] scale-y-[-1] rotate-45 arrow-animation " />
          <div className="absolute hidden lg:block bottom-0 -right-60 xl:-right-52 xl:bottom-0 2xl:-right-32 2xl:bottom-0 bg-black p-2 rounded-md left-to-right">
            <h1 className="text-xl uppercase">UNCONSCIOUS MIND (95%)</h1>
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
          <h2 className="block lg:hidden absolute bg-black text-sm p-2 rounded-md text-center uppercase top-2 left-0">Conscious mind (5%)</h2>
          <h2 className="block lg:hidden absolute bg-black text-sm p-2 rounded-md text-center uppercase bottom-2 right-0">SubConscious & <br /> UNCONSCIOUS MIND (95%)</h2>
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
        <div className="mb-4 bg-zinc-800 p-4 rounded-xl">
          <p>Our minds operate on two levels, the conscious and the subconscious,
            both working to keep us safe. Understanding how these two interact is
            important for recognizing when hidden stress may be affecting your
            well-being. Knowing this can help you shift out of constant defense
            mode.</p>
        </div>
        <div className="bg-zinc-800 p-4 text-center mb-4 rounded-lg">
          <h1 className="text-2xl xl:text-3xl font-bold text-white">DID YOU KNOW?</h1>
          <p>The subconscious mind is a powerhouse,
            processing <span className="text-yellow-400"> 11 million bits of information per
              second</span>! Meanwhile, our conscious mind—
            what we're actually aware of—handles only
            40-50 bits per second.</p>
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