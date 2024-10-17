import React from 'react';
import money from "./../../../assets/buttons/love/money.png";
import money2 from "./../../../assets/buttons/love/money2.png";
import money3 from "./../../../assets/buttons/love/money3.png";
import money4 from "./../../../assets/buttons/love/money4.png";
import './Money.css';

const MoneyButton = () => {
    return (
        <div>
            <button className="button w-2/3 my-10 rounded-xl">
                <span className="button__text ">
                    Money
                </span>
                <img src={money4} alt="" className="button__cone" />
                <img src={money2} alt="" className="button__torus" />
                <img src={money3} alt="" className="button__icosahedron" />
                <img src={money} alt="" className="button__sphere" />
            </button>

        </div>
    );
}

export default MoneyButton;
