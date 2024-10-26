import React from "react";
import img from "./../../assets/images/hypno.jpg";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <ProgressBars page={5} value={85} />
      <div className="flex flex-col-reverse container items-center  justify-between lg:px-40 p-5 lg:py-20   lg:flex-row w-full mx-auto  rounded-lg  ">
        <div className="relative  flex-1 flex items-center justify-center h-full">
          <img
            src={img}
            alt="Kure App"
            className=" max-h-[550.812px] my-4 rounded-2xl"
          />
        </div>
        <div className="mb-4 max-w-[540px] flex-1 flex flex-col h-full gap-3  justify-between">
          <p className="text-2xl font-semibold merriweather">
            Imagination is more important than knowledge” - Albert Einstein 1929
          </p>
          <p className=" text-base">
            Ever heard the saying{" "}
            <span className="font-bold p-text">
              “It’s all in your head?”
            </span>{" "}
            or{" "}
            <span className="font-bold p-text">
              “Your Gut is your second brain”?
            </span>
          </p>
          <p className=" text-base">
            Dr. David Spiegel of Stanford University Research shows that self-hypnosis can be as effective as in-person hypnotherapy.
          </p>
          <p className=" text-base t-text">
            The American Psychological Association recognizes hypnosis as a valuable treatment for issues like sleep improvement and smoking cessation.
          </p>
          <p className=" text-base">
            Mayo Clinic report supports hypnosis use for stress and anxiety relief.
          </p>
          <p className=" text-base">
            A 2018 review of 24 studies highlighted self-hypnosis via audio recordings as beneficial for sleep concerns, similar to in-person sessions.
          </p>
          <p className=" text-base">
            Each month, over 44,000 users start their journey with HYPNO 4 U, successfully rebalancing their mind-body connection by eliminating negative thought patterns and overcoming subconscious barriers
          </p>
          <p className=" text-base">
            "I was amazed at how effective HYPNO 4 U self-hypnosis is!" - Elena, HYPNO 4 U user since 2024.
          </p>
          <Link
            to={"/let's go"}
            className=" text-center px-4 py-4 text-xl  btnGrad w-full text-white rounded-xl"
          >
            Got it
          </Link>
        </div>

      </div>
    </div>
  );
};

Body.propTypes = {};

export default Body;
