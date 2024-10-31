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
            1929, Albert Einstein said: "Imagination is more important than knowledge.
          </p>
          <p className=" text-base">
            24 studies showed self-hypnosis audio recordings are as beneficial for sleep as in-person sessions. - National Library of Medicine
          </p>
          <p className=" text-base">
            Mayo Clinic supports hypnosis as effective for managing stress and anxiety.
          </p>
          <p className=" text-base t-text">
            Stanford University, Dr. David Spiegel "confirms self-hypnosis can be as effective as in-person hypnotherapy.
          </p>
          <p className=" text-base">
            American Psychological Association (APA) supports hypnosis for sleep improvement and smoking cessation.
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
