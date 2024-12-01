import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import logo from "./../../assets/images/H4U LOGO.svg";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

const ProgressBars = ({ value, navigate, page }) => {
  const navigateHook = useNavigate();

  const handleBackClick = () => {
    if (navigate) {
      navigateHook(navigate);
    } else {
      navigateHook(-1);
    }
  };

  return (
    <div>
      <div className="flex container mx-auto items-center justify-between px-4">
        <div>
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 font-semibold bg-transparent border-none cursor-pointer"
          >
            <GrLinkPrevious />
            Back
          </button>
        </div>
        <div>
          <Link className="flex justify-center" to={"/"}>
            <img className="h-12 m-3 rounded-md" src={logo} alt="" />
            <span className="flex flex-col font-bold text-2xl justify-center font-serif uppercase">
              Hypno4u
            </span>
          </Link>
        </div>
        <div className="font-bold">{page} of 4</div>
      </div>
      <ProgressBar
        className=""
        completed={value ? value : 10}
        labelColor="transparent"
        labelAlignment="center"
        borderRadius="0px 10px 10px 0px"
        height="8px"
        // bgColor="#C4AFFF"
        bgColor="#c1a75a"
        baseBgColor="#2D2C2C"
      />
    </div>
  );
};

export default ProgressBars;
