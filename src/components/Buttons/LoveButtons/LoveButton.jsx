import React from 'react'; 
import love from "./../../../assets/buttons/love/love3.png";
import './LoveButton.css';

const LoveButton = () => {
    return (
        <div>
            <button className="button w-2/3 my-10 rounded-xl">
                <span className="button__text ">
                    Love
                </span>
                <img src={love} alt="" className="button__cone" />
                <img src={love} alt="" className="button__torus" />
                <img src={love} alt="" className="button__icosahedron" />
                <img src={love} alt="" className="button__sphere" />
            </button> 

        </div>
    );
}

export default LoveButton;
