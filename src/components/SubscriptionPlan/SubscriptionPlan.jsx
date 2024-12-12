/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import { MdOutlineCheck } from "react-icons/md";
import gift_big from "./../../assets/images/free_gift_big.png";
import safe_payment from "./../../assets/images/safe_checkout_brands.png";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import GoogleReviews from "../GoogleReviews/GoogleReviews";
import Logo from "../../shared/Logo";
import { useSearchParams } from "react-router-dom";
import PlanDescription from "../PlanDescription/PlanDescription";
import Ads from "../Ads/Ads";
import authApi from './../../redux/fetures/auth/authApi';
import AudioPlayer from "react-h5-audio-player";
import PaymentPlan from "./PaymentPlan/PaymentPlan";


const SubscriptionPlan = () => {
  const [plans, setPlans] = useState([]);
  const [isDiscountPeriod, setIsDiscountPeriod] = useState(true);
  const paymentPlanRef = useRef(null);
  const { data: audioUrls } = authApi.useAllAudioPathsQuery();

  useEffect(() => {
    const type = localStorage.getItem("type");
    const adjustedPlans = getAdjustedPlans(type);
    setPlans(adjustedPlans);
  }, [isDiscountPeriod]);


  const getAdjustedPlans = () => {
    const basePlans = [
      {
        id: "7",
        duration: "7 Days",
        originalPerDay: "$7.14",
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

  const handleCountdownEnd = () => {
    setIsDiscountPeriod(false);
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
            className="text-[1.75rem]  md:text-[2rem] md:w-3/5 text-center mx-auto font-semibold mb-4 px-4 xl:px-0"
          >
            Congratulations! you are{" "}
            <span className="s-text merriweather capitalize">
              {usertype}
            </span>{" "}
            suggestible
          </h1>
        </div>
        <div className="text-center space-y-6 mt-10 xl:mt-20 p-4 xl:p-0">
          <h1 className="text-3xl font-bold text-white">
            READY TO GET STARTED?
          </h1>
          <p className="text-lg md:text-2xl font-bold ">It’s easy to take the first step towards transformation! Simply follow these 4 simple steps:</p>
          <ul className="list-decimal md:w-[350px] lg:w-[500px] mx-auto text-left text-sm  lg:text-xl font-bold space-y-3 pl-8 md:px-0">
            <li><span>Choose a Payment Plan</span> that works best for you</li>
            <li><span>Select Your Topic or Issue</span>hat you’d like to focus on</li>
            <li><span>Set Your Goals</span> and start your journey</li>
            <li><span>Track Your Success</span> and earn rewards along the way!</li>
          </ul>
          <p className="text-lg md:text-xl font-bold">We’re here to support you every step of the way. Let’s make progress together!</p>
        </div>
        <Ads scrollToPaymentPlan={() => paymentPlanRef.current.scrollIntoView({ behavior: 'smooth' })} />

        <PlanDescription />

        <div className="px-4 2xl:px-0 relative">

          <div className="max-w-[1440px] mx-auto backdrop-blur-sm  p-4 rounded-lg border border-white/20 mb-14">
            <h1 className="text-4xl xl:text-5xl text-center my-10 uppercase font-bold bg-black/30 p-5 rounded-lg px-4">
              <span className="animated-gradient-text bg-clip-text text-transparent relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/50 to-orange-500/50 blur-xl animate-pulse" />
                Try Before You Buy
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {audioUrls?.intro?.map((item) => (
                <div key={item?._id} className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">{item?.name}</h2>
                  <AudioPlayer
                    src={item.audio}
                    showJumpControls={false}
                    showSkipControls={false}
                    customAdditionalControls={[]}
                    customVolumeControls={[]}
                    showDownloadProgress={false}
                    className="rounded-lg backdrop-blur-sm bg-black/5"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
        <div ref={paymentPlanRef} className="md:flex gap-6 px-4 mt-4 backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 mx-4 xl:mx-12">
          <div id="subscription" className="md:w-1/2 ">
            <h2 className="text-[1.125rem] text-white font-semibold mb-4">
              Select your plan:
            </h2>

            {/* <a className="text-blue-600 bg-black p-2 " href="https://admin.hypno4u.com/subscribe?plan=test">1 day</a> */}

            <div >
              <div className="space-y-4 mb-4">
                {plans.map((plan) => (
                  // <a key={plan.id} href={plan.href} className="block" >
                  // onClick={handleSubmit(plan.href) }
                  <div key={plan.id}>

                    <PaymentPlan
                      plan={plan.href}
                      id={plan.id}
                      duration={plan.duration}
                      originalPrice={plan.originalPrice}
                      discountedPrice={plan.discountedPrice}
                      perDay={plan.perDay}
                      originalPerDay={plan.originalPerDay}
                      isPopular={plan.isPopular}
                      hasGift={plan.hasGift}
                    />

                  </div>
                  // </a>
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
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between ">
            <h2 className="text-[1.125rem] text-white font-semibold mb-4 my-10">
              All plans include:
            </h2>
            <ul className="space-y-2 list-disc md:list-none">
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Digital
                Extensive Audio Library: 4,000+ hours of expert hypnosis sessions across various topics
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Goal-Oriented Programs: Customized paths for goals like weight loss, stress relief, and better sleep
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Free Trial: Try HYPNO 4 U risk-free
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Personalized Onboarding: Guided platform tour to maximize every feature
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Exclusive New Content: Early access to innovative Quantum Medical HypnosisTM sessions
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" /> Flexible Subscription Options: Affordable plans with easy cancellation
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Expertly Crafted Sessions: Developed by a Doctor in hypnosis, neuroscience, and Quantum Medicine
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Introductory Hypnosis: Smooth, guided start
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Daily Bedtime Hypnotherapy: Personalized sessions for nightly relaxation
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Constant Content Updates: Regularly refreshed audio hypnosis and meditations
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                24/7 Support: Always-on client assistance
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
                <MdOutlineCheck className="p-text text-xl w-8" />{" "}
                Privacy & Security: Guaranteed confidentiality
              </li>
              <li className="flex items-center text-[12px] lg:text-base gap-2">
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
                      className=" w-48 lg:w-28 "
                    />
                  </div>
                  <div className="text-center md:text-left space-y-2">
                    <h1 className="text-lg lg:text-2xl font-bold merriweather mt-1 ">
                      Secret gift
                    </h1>
                    <p className="text-xs lg:text-[14px]">
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
    </div>
  );
};

export default SubscriptionPlan;