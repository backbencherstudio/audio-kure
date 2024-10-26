/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
// import home_hero_image from "./../assets/images/home_hero_image.png";
// import home_hero_image from "https://www.wellmeright.com/blog/content/images/size/w2000/2024/03/Quantum-Healing-Hypnosis-Benefits.jpg";
import Footer from "../shared/Footer";
import Logo from "../shared/Logo";
// import { useSelector } from "react-redux";
import {
  logOut,
  // selectCurrentUser,
  useCurrentToken,
} from "../redux/fetures/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoveButton from "../components/Buttons/LoveButtons/LoveButton";
import MoneyButton from "../components/Buttons/MoneyButtons/MoneyButtons";
import { verifyToken } from "../utils/verifyToken";
import { useEffect } from "react";
import heroImage from './../assets/hero.jpg'
function HomePage() {
  // const currentUser = useSelector(selectCurrentUser);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }
  const expiresDate = new Date(user?.expiresDate);
  const currentData = new Date();

  useEffect(() => {
    if (token && currentData > expiresDate) {
      dispatch(logOut());
    }
  }, [])



  // const handleLOgout = () => {
  //   dispatch(logOut());
  //   localStorage.removeItem("layout");
  //   navigate("/login");
  // };

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = [{ ans1: selectedAnswer }];
    localStorage.setItem("answers", JSON.stringify(answer));
  };

  return (
    <div>
      <div className="container z-50 mx-auto bg-transparent ">
        <div className="  flex  justify-between items-center">
          <Logo />
          {/* <div>
            {currentUser ? (
              <button
                onClick={() => {
                  handleLOgout();
                }}
              >
                Log Out
              </button>
            ) : (
              <Link to={"/login"}>Log In</Link>
            )}
          </div> */}
        </div>

        <div className="container  mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center mt-10 gap-20 lg:px-20 px-5">
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-xl xl:text-4xl text-white merriweather font-bold leading-tight">
                Forget everything about hypnosis and start a life-changing journey with just 5 powerful questions!
              </h2>
              <div className="space-y-4">
                <p className="text-sm md:text-base">
                  These unique questions reveal your brain's thinking patterns, helping us select the best hypnosis techniques for you.
                </p>
                <p className="text-sm md:text-base">
                  Unlock 100+ personalized hypnosis sessions tailored to your personality. Break mental barriers, empower yourself, and restore mind-body harmony with a custom hypnotherapy program.
                </p>
              </div>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-3xl font-medium xl:mb-6">
                What is your top priority in life?
              </p>
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

            <div className="flex-1 flex items-center justify-center">
              <img className="rounded-xl " alt="" src={heroImage} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;