import React from 'react';
import money from "./../../../assets/buttons/love/money.png"; 
import './Money.css';

const MoneyButton = () => {
    return (
        <div>
            <button className="button w-2/3 lg:my-10 mx-auto rounded-xl">
                <span className="button__text ">
                    Money
                </span>
                <img src={money} alt="" className="button__cone" />
                <img src={money} alt="" className="button__torus" />
                <img src={money} alt="" className="button__icosahedron" />
                <img src={money} alt="" className="button__sphere" />
            </button>

        </div>
    );
}

export default MoneyButton;
