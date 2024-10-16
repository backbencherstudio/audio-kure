import { Link } from "react-router-dom";
import Logo from "../../shared/Logo";

const WelcomePage = () => {
  const userType = localStorage.getItem("type");

  return (
    <div>
      <Logo />
      <div className="relative max-w-[1400px] mx-auto overflow-hidden">
        <div className=" mx-auto relative">
          <div className="  flex items-center justify-center lg:pt-20 pt-5 mx-5 ">
            <div className=" shadow-md bg-indigo-900/75  rounded-lg p-8 max-w-lg flex flex-col mx-auto mt-8 transition-transform transform  ">
              <h4 className="text-xl text-center text-white  ">
                After analyzing your data, we have detected you as a{" "}
                <span className="font-semibold text-white bg-green-600 px-4 uppercase">
                  {userType} suggestible.
                </span>
              </h4>
              <p className="text-center text-xl text-white mt-4 ">
                Welcome to your personalized experience. We're here to guide you
                on your journey!
              </p>
              <Link
                to="/email"
                className="mt-6 inline-block btnGrad w-full text-center text-white font-semibold py-2 px-4 rounded hover:bg-indigo-500  "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
