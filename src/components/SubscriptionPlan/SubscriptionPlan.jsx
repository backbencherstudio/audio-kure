/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { toast } from "react-toastify";
import PlanDescription from "../PlanDescription/PlanDescription";
import Ads from "../Ads/Ads";

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
    className={`relative  rounded-2xl p-4 cursor-pointer ${isPopular ? "backdrop-blur-sm bg-white/30 border border-white/20 p-6 text-gray-900" : "backdrop-blur-sm bg-white/30 border border-white/20 p-6 text-gray-900"
      }`}
    onClick={() => onSelect(id)}
  >
    <div className="flex items-center">
      <div
        className={`w-5 h-5 rounded-full border-2 ${isSelected ? "border-teal-500 bg-teal-500" : "border-gray-300"
          } mr-3 flex items-center justify-center ${isPopular ? "mt-8 mb-2" : ""
          }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div>
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
              per day
            </p>
          </div>
        </div>
      </div>
    </div>
    {isPopular && (
      <div className="absolute top-0 left-0 right-0 p-bg text-gray-800 text-center text-xs py-2.5 rounded-t-xl">
        MOST POPULAR
      </div>
    )}
  </div>
);

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("365");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [plans, setPlans] = useState([]);
  const [isDiscountPeriod, setIsDiscountPeriod] = useState(true);
  const paymentPlanRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const type = localStorage.getItem("type");
    const adjustedPlans = getAdjustedPlans(type);
    setPlans(adjustedPlans);
  }, [isDiscountPeriod]);

  const currentUser = useSelector(selectCurrentUser);

  const getAdjustedPlans = (type) => {
    const basePlans = [
      {
        id: "7",
        duration: "7 Days",
        originalPrice: "99.98",
        discountedPrice: "49.99",
        perDay: "7.14",
        originalPerDay: "$14.28",
      },
      {
        id: "365",
        duration: "Annual",
        originalPrice: "994",
        discountedPrice: "494",
        perDay: "1.47",
        originalPerDay: "$2.73",
        isPopular: true,
        hasGift: true
      },
      {
        id: "30",
        duration: "30 Days",
        originalPrice: "299.98",
        discountedPrice: "149.99",
        perDay: "4.99",
        originalPerDay: "$9.9",
      },
    ];

    return basePlans.map((plan) => ({
      ...plan,
      currentPrice: isDiscountPeriod ? plan.discountedPrice : plan.originalPrice,
    }));
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  const handleCountdownEnd = () => {
    setIsDiscountPeriod(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      const selectedPlanDetails = plans.find(
        (plan) => plan.id === selectedPlan
      );

      if (selectedPlanDetails) {
        const plan = {
          plan: selectedPlan,
          price: selectedPlanDetails.currentPrice,
          originalPrice: selectedPlanDetails.originalPrice,
          duration: selectedPlanDetails.duration
        };
        console.log(plan);
        localStorage.setItem("plan", JSON.stringify(plan));

        if (!currentUser) {
          navigate("/login");
          return;
        }

        navigate("/payment");
      } else {
        toast.warning("Selected plan not found");
      }
    } else {
      toast.warning("Please select a plan");
    }
  };

  const counts = {
    physical: 0,
    emotional: 0,
  };
  const usertype = localStorage.getItem('userType')

  return (
    <div className="text-white">
      <CountDownTimer onCountdownEnd={handleCountdownEnd} />
      <div className="">
        <nav className="container mx-auto   ">
          <Logo />
        </nav>
      </div>
      <div className="container mx-auto mt-5">
        <div>
          <h1
            style={{ fontFamily: "Merriweather" }}
            className="text-[1.75rem]  md:text-[2.5rem] md:w-3/5 text-center mx-auto font-semibold mb-4 px-4 xl:px-0"
          >
            Congratulations! you are{" "}
            <span className="s-text merriweather capitalize">
              {usertype}
            </span>{" "}
            suggestible
          </h1>
        </div>
        <PlanDescription />
        <div ref={paymentPlanRef} className="md:flex gap-6 px-4 mt-4 backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 mx-4 xl:mx-12">
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
              <button
                type="submit"
                className="w-full btnGrad font-bold p-4 rounded-3xl focus:outline-none focus:shadow-outline hover:scale-105 duration-100 ease-linear"
              >
                Get my plan
              </button>

              <p className="text-center text-xs my-4">
                Guaranteed safe checkout
              </p>
              <img src={safe_payment} alt="safe-payment" />
            </form>
          </div>
          <div className="md:w-1/2 flex flex-col justify-between">

            <ul className="space-y-5">
              <h2 className="text-[1.125rem] text-white font-semibold mb-4 my-10">
                All plans include:
              </h2>
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
              <h1 className="text-[1.125rem] text-white font-semibold mb-4">
                If you select the Annual plan:
              </h1>
              <div className="bg-[#07001C]/20 border border-zinc-600 p-4 rounded-3xl">
                <div className="md:flex items-center gap-4 ">
                  <div className="flex md:block justify-center mb-5 md:mb-0">
                    <img
                      src={gift_big}
                      alt="gift-image"
                      className="w-32 md:w-56"
                    />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-2xl font-bold merriweather mt-1 ">
                      Secret gift
                    </h1>
                    <p className="text-[14px]">
                    The HYPNO 4 U team is excited to support your transformation journey, and we have a special surprise just for you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Ads scrollToPaymentPlan={() => paymentPlanRef.current.scrollIntoView({ behavior: 'smooth' })} />
        <GoogleReviews />
      </div>
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
