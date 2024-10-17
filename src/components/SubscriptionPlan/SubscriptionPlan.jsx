import React, { useState, useEffect } from "react";
import { MdOutlineCheck } from "react-icons/md";
import gift from "./../../assets/images/gift.png";
import gift_big from "./../../assets/images/free_gift_big.png";
import safe_payment from "./../../assets/images/safe_checkout_brands.png";
import refund from "./../../assets/images/refund_badge.png";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import GoogleReviews from "../GoogleReviews/GoogleReviews";
import Footer from "../../shared/Footer";
import Logo from "../../shared/Logo";
import { useNavigate } from "react-router-dom";

const PaymentPlan = ({
  id,
  duration,
  originalPrice,
  discountedPrice,
  perDay,
  originalPerDay,
  isPopular,
  hasGift,
  isSelected,
  onSelect,
}) => (
  <div
    className={`relative  rounded-2xl p-4 cursor-pointer ${
      isPopular ? "bg-white text-gray-900" : "bg-white text-gray-900"
    }`}
    onClick={() => onSelect(id, discountedPrice)}
  >
    <div className="flex items-center">
      <div
        className={`w-5 h-5 rounded-full border-2 ${
          isSelected ? "border-teal-500 bg-teal-500" : "border-gray-300"
        } mr-3 flex items-center justify-center ${
          isPopular ? "mt-8 mb-2" : ""
        }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
      <div
        className={`flex-grow flex justify-between items-center ${
          isPopular ? "pt-8 pb-2" : "py-2"
        }`}
      >
        <div className="space-y-1">
          <p className="font-semibold">{duration} plan</p>
          <div className="flex gap-2">
            <p
              className={`text-sm line-through ${
                isPopular ? "text-gray-500" : "text-gray-500"
              }`}
            >
              ${originalPrice}
            </p>
            <p
              className={`text-sm ${
                isPopular ? "text-gray-500" : "text-gray-500"
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
              className={`text-sm ${
                isPopular ? "text-gray-500" : "text-gray-500"
              }`}
            >
              per day
            </p>
          </div>
        </div>
      </div>
    </div>
    {isPopular && (
      <div className="absolute top-0 left-0 right-0 bg-[#5817E9] text-white text-center text-xs py-2.5 rounded-t-xl">
        MOST POPULAR
      </div>
    )}
  </div>
);

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("7day");
  const [selectedPrice, setSelectedPrice] = useState("6.93");
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const type = localStorage.getItem("type");
    const adjustedPlans = getAdjustedPlans(type);
    setPlans(adjustedPlans);
  }, []);

  const getAdjustedPlans = (type) => {
    // Define your base plans
    const basePlans = [
      {
        id: "7day",
        duration: "7 day",
        originalPrice: "14.14",
        discountedPrice: "6.93",
        perDay: "0.99",
        originalPerDay: "$2.02",
      },
      {
        id: "1month",
        duration: "1-month",
        originalPrice: "30.00",
        discountedPrice: "16.19",
        perDay: "0.54",
        originalPerDay: "$1.11",
        isPopular: true,
      },
      {
        id: "3month",
        duration: "3-month",
        originalPrice: "84.94",
        discountedPrice: "25.99",
        perDay: "0.31",
        originalPerDay: "$0.63",
        hasGift: true,
      },
    ];

    // Adjust prices based on type
    return basePlans.map((plan) => {
      if (type === "physical") {
        return {
          ...plan,
          discountedPrice: (parseFloat(plan.discountedPrice) * 1.1).toFixed(2),
        };
      } else if (type === "emotional") {
        return {
          ...plan,
          discountedPrice: (parseFloat(plan.discountedPrice) * 0.9).toFixed(2),
        };
      }
      return plan;
    });
  };

  const handlePlanSelect = (planId, price) => {
    setSelectedPlan(planId);
    setSelectedPrice(price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const plan = {
      plan: selectedPlan,
      price: selectedPrice,
    };
    localStorage.setItem("plan", JSON.stringify(plan));
    navigate("/signup");
  };

  return (
    <div className="bg-[#191435] text-white">
      <div className="bg-[#07001C]">
        <nav className="max-w-[1400px] mx-auto py-2 px-4">
          <Logo />
        </nav>
      </div>
      <CountDownTimer />
      <div className="max-w-[1400px] mx-auto mt-24">
        <div>
          <h1
            style={{ fontFamily: "Merriweather" }}
            className="text-[1.75rem] md:text-[2.5rem] md:w-3/5 text-center mx-auto font-semibold mb-14 px-4 xl:px-0"
          >
            Congratulations! you are{" "}
            <span className="text-[#8A5EFF] capitalize">physical</span>{" "}
            suggestible
          </h1>
        </div>
        <div className="md:flex gap-6 px-4">
          <div className="md:w-1/2 ">
            <h2 className="text-[1.125rem] text-white font-semibold mb-4">
              Select your plan:
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                {plans.map((plan) => (
                  <PaymentPlan
                    key={plan.id}
                    id={plan.id}
                    duration={plan.duration}
                    originalPrice={plan.originalPrice}
                    discountedPrice={plan.discountedPrice}
                    perDay={plan.perDay}
                    originalPerDay={plan.originalPerDay}
                    isSelected={selectedPlan === plan.id}
                    isPopular={plan.isPopular}
                    hasGift={plan.hasGift}
                    onSelect={handlePlanSelect}
                  />
                ))}
              </div>

              <p className="text-base text-[#bec4d2] font-medium mb-10">
                By clicking Get my plan, I agree to pay ${selectedPrice} for my
                plan and that if I do not cancel before the end of the 1-week
                introductory plan, Kure will automatically charge my payment
                method the regular price $30.99 every 1-month thereafter until I
                cancel. I can cancel online by visiting the subscription page in
                my account on the website.
              </p>

              <button
                type="submit"
                className="w-full bg-gradient-to-l from-[#34cbbf] via-[#4675ff] to-[#8a5eff] text-white font-bold p-4 rounded-3xl focus:outline-none focus:shadow-outline hover:scale-105 duration-100 ease-linear"
              >
                Get my plan
              </button>

              <p className="text-center text-xs my-4">
                Guaranteed safe checkout
              </p>
              <img src={safe_payment} alt="safe-payment" />
            </form>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-[1.125rem] text-white font-semibold mb-4 my-10">
              All plans include:
            </h2>
            <ul className="space-y-5">
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" /> Digital
                app created by experts in hypnosis, neuroscience and food
                addiction
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" />{" "}
                Introduction to hypnosis sessions
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" />{" "}
                Personalized daily bedtime hypnotherapy sessions
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" /> Special
                21-day program for accelerated weight loss
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" /> Full
                24/7 Client support
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" /> Privacy
                and security guarantee
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="text-teal-400 text-xl w-8" />{" "}
                Progress tracking
              </li>
            </ul>
            <div>
              <h1 className="text-[1.125rem] text-white font-semibold mb-4 mt-10">
                If you select the 3-month plan:
              </h1>
              <div className="bg-[#07001C] border border-zinc-600 p-4 rounded-3xl">
                <div className="md:flex gap-4 ">
                  <div className="flex md:block justify-center mb-5 md:mb-0">
                    <img
                      src={gift_big}
                      alt="gift-image"
                      className="w-32 md:w-full"
                    />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-2xl font-bold merriweather mt-1 ">
                      Secret gift
                    </h1>
                    <p className="text-[14px]">
                      The Kure team wants to support your relationship with food
                      and your transformation, so we've prepared a surprise for
                      you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-0 md:px-4">
          <div className="bg-[#07001C] border border-zinc-600 p-4 rounded-3xl mx-4 md:mx-0 mt-5 md:mt-10">
            <div className="md:flex items-center gap-4">
              <div className="flex md:block justify-center mb-5 md:mb-0">
                <img src={refund} alt="refund-image" className="w-32" />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h1 className="text-2xl font-bold merriweather mt-1 ">
                  Risk-free guarantee
                </h1>
                <p className="text-[14px]">
                  No results? Reach out to our customer support and we can
                  cancel your subscription at any time without additional
                  charges.
                </p>
              </div>
            </div>
          </div>
        </div>
        <GoogleReviews />
      </div>
      <div className="max-w-[1400px] mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
