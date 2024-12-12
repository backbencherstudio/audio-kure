/* eslint-disable react/prop-types */
import React from 'react';
import gift from "../../../assets/images/gift.png";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const PaymentPlan = ({
    id,
    plan,
    duration,
    originalPrice,
    discountedPrice,
    perDay,
    originalPerDay,
    isPopular,
    hasGift,
}) => {

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate()

    const handleSubscription = (plan) => {
        if(!currentUser){
           return navigate("/login")
        }        
        window.location.href = plan;
    }


    return (
        <div
            className={`relative  rounded-2xl p-4 cursor-pointer ${isPopular ? "backdrop-blur-sm bg-white/30 border border-white/20 p-6 text-gray-900" : "backdrop-blur-sm bg-white/10 border border-white/20 p-6 text-gray-900"
                }`}
            onClick={() => handleSubscription(plan)}
        >
            <div className="flex items-center">
                <div
                    className={`flex-grow flex justify-between items-center ${isPopular ? "pt-8 pb-2" : "py-2"
                        }`}
                >
                    <div className="space-y-1">
                        <p className="font-semibold">{duration} plan</p>
                        <div className="flex gap-2">
                            <p
                                className={`text-sm line-through ${isPopular ? "text-gray-500" : "text-gray-500"
                                    }`}
                            >
                                ${originalPrice}
                            </p>
                            <p
                                className={`text-sm ${isPopular ? "text-gray-500" : "text-gray-500"
                                    }`}
                            >
                                ${discountedPrice}
                            </p>
                        </div>
                        {hasGift && (
                            <div className="flex items-center text-xs text-white bg-teal-500  w-[140px] font-semibold  py-1.5 px-2 rounded-full">
                                <img src={gift} alt="gift image" className="w-4 mr-2" />
                                <span>Get secret gift!</span>
                            </div>
                        )}
                    </div>
                    <div className="my-1">
                        <div className={`text-center border-l border-zinc-50 pl-2 py-2 `}>
                            <p className="text-xs text-[#5817E9] line-through ">
                                {originalPerDay}
                            </p>
                            <p className="text-xl " style={{ fontFamily: "Merriweather" }}>
                                ${perDay}
                            </p>
                            <p
                                className={`text-sm ${isPopular ? "text-gray-500" : "text-gray-500"
                                    }`}
                            >
                                Per day
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                isPopular && (
                    <div className="absolute top-0 left-0 right-0 p-bg text-gray-800 text-center text-xs py-2.5 rounded-t-xl">
                        MOST POPULAR
                    </div>
                )
            }
        </div >
    );
};

export default PaymentPlan;