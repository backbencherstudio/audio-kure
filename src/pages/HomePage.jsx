import { Link } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
import home_hero_image from "./../assets/images/home_hero_image.png";
import Footer from "../shared/Footer";
import Logo from "../shared/Logo";

function HomePage() {
  const handleType = (type) => {
    localStorage.setItem("type", type);
  };
  return (
    <div className="">
      <Logo />
      <div className="container min-h-[80vh] max-w-[1400px] mx-auto px-4 ">
        <div className="flex flex-col-reverse lg:flex-row md:flex-row items-center justify-evenly gap-20 mb-20 lg:px-20 px-5 lg:pt-16">
          <div className="flex-1 ">
            <h2 className="text-4xl  text-white lg:pt-10 md:pt-10 merriweather font-medium">
              Welcome to the Worlds Largest Audio Hypnosis Library
            </h2>
            <p className="mt-4 lg:max-w-[520.611px]">
              Break through mental barriers, stop food cravings, and fix your
              gut-brain connection with a personalized 21-day hypnotherapy
              program.
            </p>
            <p className="mt-10 text-base font-medium mb-5">
              Start by selecting your gender:
            </p>
            <div className="flex flex-col lg:flex-row   justify-between gap-5 mb-10 w-full">
              <Link
                onClick={() => handleType("physical")}
                className="w-full"
                to={"/question-physical-1"}
              >
                <button className="btnGrad w-full font-bold rounded-lg px-10 py-4 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor">
                  Physical Suggestible
                </button>
              </Link>
              <Link
                onClick={() => handleType("emotional")}
                className="w-full "
                to={"/question-emotional-1"}
              >
                <button className="btnGrad w-full font-bold rounded-lg px-10 py-4 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor">
                  Emotional Suggestible
                </button>
              </Link>
            </div>

            <div className="flex mt-4">
              <img className=" h-[40px] w-[136px]" src={home_members} alt="" />
              <div className="ml-5">
                <img className="h-4" alt="" src={star} />
                <p className="text-xs mt-2 font-medium">
                  98% satisfaction rate *based on user interviews
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img className="max-h-[455.234px]" alt="" src={home_hero_image} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
