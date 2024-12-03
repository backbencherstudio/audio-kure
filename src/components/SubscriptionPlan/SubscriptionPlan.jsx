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
import { useNavigate, useSearchParams } from "react-router-dom";
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
    className={`relative  rounded-2xl p-4 cursor-pointer ${isPopular ? "backdrop-blur-sm bg-white/30 border border-white/20 p-6 text-gray-900" : "backdrop-blur-sm bg-white/10 border border-white/20 p-6 text-gray-900"
      }`}
    onClick={() => onSelect(id)}
  >
    <div className="flex items-center">
      {/* <div
        className={`w-5 h-5 rounded-full border-2 ${isSelected ? "border-teal-500 bg-teal-500" : "border-gray-300"
          } mr-3 flex items-center justify-center ${isPopular ? "mt-8 mb-2" : ""
          }`}
      >
        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
      </div> */}
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
    {isPopular && (
      <div className="absolute top-0 left-0 right-0 p-bg text-gray-800 text-center text-xs py-2.5 rounded-t-xl">
        MOST POPULAR
      </div>
    )}
  </div>

);

const SubscriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
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
        originalPerDay: "$14.28",
        originalPrice: "50",
        discountedPrice: "25",
        perDay: "3.58",
        href: "https://admin.hypno4u.com/subscribe?plan=Silver"
      },
      {
        id: "30",
        duration: "30 Days",
        originalPrice: "90",
        discountedPrice: "45",
        perDay: "1.5",
        originalPerDay: "$3.00",
        href: "https://admin.hypno4u.com/subscribe?plan=Gold"
      },
      {
        id: "365",
        duration: "Annual",
        originalPrice: "700",
        discountedPrice: "350",
        perDay: "0.9",
        originalPerDay: "$1.92",
        isPopular: true,
        hasGift: true,
        href: "https://admin.hypno4u.com/subscribe?plan=Dimond"
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

  const usertype = localStorage.getItem('userType')

  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [section]);

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
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-white">
            It's Easy as 1, 2, 3
          </h1>
        </div>
        <Ads scrollToPaymentPlan={() => paymentPlanRef.current.scrollIntoView({ behavior: 'smooth' })} />

        <PlanDescription />
        <div ref={paymentPlanRef} className="md:flex gap-6 px-4 mt-4 backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 mx-4 xl:mx-12">
          <div id="subscription" className="md:w-1/2 ">
            <h2 className="text-[1.125rem] text-white font-semibold mb-4">
              Select your plan:
            </h2>

            {/* <a className="text-blue-600 bg-black p-2 " href="https://admin.hypno4u.com/subscribe?plan=test">1 day</a> */}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-4">
                {plans.map((plan) => (
                  <a key={plan.id} href={plan.href} className="block" >
                    <PaymentPlan
                      id={plan.id}
                      duration={plan.duration}
                      originalPrice={plan.originalPrice}
                      discountedPrice={plan.discountedPrice}
                      perDay={plan.perDay}
                      originalPerDay={plan.originalPerDay}
                      isSelected={selectedPlan === plan.id}
                      isPopular={plan.isPopular}
                      hasGift={plan.hasGift}
                    />
                  </a>
                ))}
              </div>
              {/* <button
                type="submit"
                className="w-full btnGrad font-bold p-4 rounded-3xl focus:outline-none focus:shadow-outline hover:scale-105 duration-100 ease-linear"
              >
                Get my plan
              </button> */}

              <p className="text-center text-xs my-4">
                Guaranteed safe checkout
              </p>
              <img className="mx-auto w-[45%]" src={safe_payment} alt="safe-payment" />
            </form>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between ">

            <ul className="space-y-2">
              <h2 className="text-[1.125rem] text-white font-semibold mb-4 my-10">
                All plans include:
              </h2>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Digital
                Extensive Audio Library: 4,000+ hours of expert hypnosis sessions across various topics
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Goal-Oriented Programs: Customized paths for goals like weight loss, stress relief, and better sleep
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Free Trial: Try HYPNO 4 U risk-free
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Personalized Onboarding: Guided platform tour to maximize every feature
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Exclusive New Content: Early access to innovative Quantum Medical HypnosisTM sessions
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Flexible Subscription Options: Affordable plans with easy cancellation
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Expertly Crafted Sessions: Developed by a Doctor in hypnosis, neuroscience, and Quantum Medicine
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Introductory Hypnosis: Smooth, guided start
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Daily Bedtime Hypnotherapy: Personalized sessions for nightly relaxation
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Constant Content Updates: Regularly refreshed audio hypnosis and meditations
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                24/7 Support: Always-on client assistance
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Privacy & Security: Guaranteed confidentiality
              </li>
              <li className="flex items-center text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Milestone Badges ACCESS THE VAULT: Earn rewards as you reach achievements
              </li>
            </ul>
            <div>
              <h1 className="text-[1.125rem] text-white font-semibold my-4 ">
                If you select the Annual plan:
              </h1>
              <div className="bg-[#07001C]/20 border border-zinc-600 p-4 rounded-3xl">
                <div className="md:flex items-center gap-4 ">
                  <div className="flex md:block justify-center mb-5 md:mb-0">
                    <img
                      src={gift_big}
                      alt="gift-image"
                      className="w-28 "
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

        <GoogleReviews />
      </div>
      <div className="container mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
};

export default SubscriptionPlan;
