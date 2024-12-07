import React from "react";
import love from "./../../../assets/buttons/love/love3.png";
import "./LoveButton.css";

const LoveButton = () => {
  return (
    <div className="w-full">
      <button className="button  w-full lg:my-5 mx-auto rounded-xl">
        <span className="button__text text-2xl font-bold ">Love</span>
        <img src={love} alt="" className="button__cone" />
        <img src={love} alt="" className="button__torus" />
        <img src={love} alt="" className="button__icosahedron" />
        <img src={love} alt="" className="button__sphere" />
      </button>
    </div>
  );
};

export default LoveButton;
