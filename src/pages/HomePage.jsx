import { Link } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
import home_hero_image from "./../assets/images/home_hero_image.png";
import home_card_1 from "./../assets/images/home_card_1.png";
import home_card_2 from "./../assets/images/home_card_2.png";
import home_card_3 from "./../assets/images/home_card_3.png";
import logo2 from "./../assets/images/logo.png";

function HomePage() {
  return (
    <div className=" ">
      <div className="container min-h-screen mx-auto">
        <header className="py-4">
          <div className="flex  w-fit mx-auto lg:mx-0 ">
            <Link className="h-32" to={"/"}>
              <img
                className=" h-full "
                alt="logo"
                src={logo2}
                decoding="async"
              />
            </Link>
          </div>
        </header>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-evenly gap-20 mb-20 lg:px-20 px-5">
          <div className="flex-1 ">
            <h2 className="lg:text-5xl text-2xl   merriweather font-medium">
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
        <div className="grid lg:grid-cols-3 grid-cols-1 px-5 lg:px-0  mt-8 gap-10">
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

        <footer className="  justify-between items-center py-20">
          <div className="flex justify-between items-center ">
            <div className="    justify-between items-center">
              <img className=" " alt="" src={logo2} />
            </div>
            <div className="flex flex-col ">
              <div>
                <Link to="/privacy-policy" className="mx-2">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="mx-2">
                  Terms & Conditions
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-10">
            <p>© 2024 Kure. All rights reserved.</p>
            <p className="text-sm">
              Disclaimer: Results may vary from person to person
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default HomePage;
