import { Link } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
import home_hero_image from "./../assets/images/home_hero_image.png";
import home_card_1 from "./../assets/images/home_card_1.png";
import home_card_2 from "./../assets/images/home_card_2.png";
import home_card_3 from "./../assets/images/home_card_3.png";
import logo2 from "./../assets/images/logo.png";
import Footer from "../shared/Footer";

function HomePage() {
  return (
    <div className=" ">
      <div className="container min-h-screen mx-auto">
        <header className="py-4">
          <div className="flex  w-fit mx-auto lg:mx-0 ">
            <Link className="flex" to={"/"}>
              {" "}
              <img className="h-12 my-3" src={logo2} alt="" />
              <span className="flex flex-col font-bold text-2xl justify-center font-serif">
                healer
              </span>
            </Link>
          </div>
        </header>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-evenly gap-20 mb-20 lg:px-20 px-5">
          <div className="flex-1 ">
            <h2 className="lg:text-5xl text-2xl text-white   merriweather font-medium">
              Discover how to lose weight while you sleep
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
              <Link className="w-full " to={"/question-physical-1"}>
                <button className="btnGrad w-full font-bold rounded-lg px-10 py-5 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor">
                  Physical Suggestible
                </button>
              </Link>
              <Link className="w-full " to={"/question-emotional-1"}>
                <button className="btnGrad w-full font-bold rounded-lg px-10 py-5 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor">
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

          <div className="flex-1">
            <img className="max-h-[455.234px]" alt="" src={home_hero_image} />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 px-5 lg:px-0  mt-8 gap-5">
          <div className="border  flex flex-col items-center gap-5 p-10 rounded-3xl">
            <p className=" italic">Enhance weight loss by 71% with hypnosis.</p>
            <img className="w-[120px]" alt="" src={home_card_1} />
          </div>

          <div className="border  flex flex-col items-center gap-5 p-10 rounded-3xl">
            <p className=" italic">
              Hypnotherapy provides an edge over other weight-loss methods.
            </p>
            <img className="w-[120px]" alt="" src={home_card_2} />
          </div>

          <div className="border  flex flex-col items-center gap-5 p-10 rounded-3xl">
            <p className=" italic">
              Hypnotherapy has remained a well-kept weight loss secret.
            </p>
            <img className="w-[120px]" alt="" src={home_card_3} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
export default HomePage;
