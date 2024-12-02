/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
import Footer from "../shared/Footer";
import Logo from "../shared/Logo";
import {
  logOut,
  useCurrentToken,
} from "../redux/fetures/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoveButton from "../components/Buttons/LoveButtons/LoveButton";
import MoneyButton from "../components/Buttons/MoneyButtons/MoneyButtons";
import { verifyToken } from "../utils/verifyToken";
import { useEffect } from "react";
import heroImage from '../assets/images/QMH MAIN PIC.jpg'
import BackgroundMusic from "../components/BackgroundMusic/BackgroundMusic";
function HomePage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const expiresDate = new Date(user?.expiresDate);
  const currentData = new Date();

  // useEffect(() => {
  //   if (token && currentData > expiresDate) {
  //     dispatch(logOut());
  //   }
  // }, [])



  const handleAnswerSelect = (selectedAnswer) => {
    const answer = [{ ans1: selectedAnswer }];
    localStorage.setItem("answers", JSON.stringify(answer));
  };

  return (
    <div>
      <div className="container z-50 mx-auto bg-transparent ">
        <div className="  flex  justify-between items-center">
          <Logo />
        </div>

        <div className="container mx-auto">

          <div className="flex flex-col-reverse lg:flex-row-reverse items-center justify-center mt-10 gap-20 lg:px-20 px-5">
            <div className="w-full lg:w-1/2 space-y-6">

              <h2 className="text-2xl md:text-3xl lg:text-xl xl:text-4xl text-white merriweather font-bold leading-tight">
              Many Solutions to Many Problems
              </h2>
              <h3 className="text-xl font-bold merriweather">Your Personalized Hypnosis Program is at your fingertips</h3>
              <p className="text-xl merriweather">Start by selecting one of the following </p>
              <div className="space-y-4">
                <p className="text-sm md:text-base lg:text-xl">
                  4,000+ Hours of Custom Audio Hypnosis & Meditation
                </p>
                <p className="text-sm md:text-base lg:text-xl">
                  New Audios Added Continuously
                </p>
                <p className="text-sm md:text-base lg:text-xl">
                  5 Simple Questions for Personalization
                </p>
                <p className="text-sm md:text-base lg:text-xl">
                  Tailored Audios for Anxiety, Pain, Weight Loss, Confidence, Trauma, Sports, & More
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8">
                <Link
                  onClick={() => handleAnswerSelect("physical")}
                  className="w-full"
                  to={"/question-2"}
                >
                  <LoveButton></LoveButton>
                </Link>
                <Link
                  onClick={() => handleAnswerSelect("emotional")}
                  className="w-full"
                  to={"/question-2"}
                >
                  <MoneyButton />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img className="h-[40px] w-[136px]" src={home_members} alt="" />
                <div className="ml-5">
                  <img className="h-4" alt="" src={star} />
                  <p className="text-xs mt-2 font-medium">
                    98% satisfaction rate *based on user interviews
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              <img className="rounded-xl " alt="" src={heroImage} />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <BackgroundMusic />
              </div>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;