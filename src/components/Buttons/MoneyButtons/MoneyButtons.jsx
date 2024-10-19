import React from "react";
import money from "./../../../assets/buttons/love/money.png";
import "./Money.css";

const MoneyButton = () => {
  return (
    <div className="w-full">
      <button className="button w-full  lg:my-5 mx-auto rounded-xl">
        <span className="button__text ">Money</span>
        <img src={money} alt="" className="button__cone" />
        <img src={money} alt="" className="button__torus" />
        <img src={money} alt="" className="button__icosahedron" />
        <img src={money} alt="" className="button__sphere" />
      </button>
    </div>
  );
};

export default MoneyButton;
