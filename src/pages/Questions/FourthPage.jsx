import { FaCheck } from "react-icons/fa";
import img from "./../../assets/images/info_3_main.png";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
const ThirdPage = () => {
  return (
    <div>
      <ProgressBars page={4} value={97}></ProgressBars>
      <div className=" flex flex-col-reverse lg:flex-row lg:mt-20 mt-10     gap-10  w-full h-fit   items-center justify-center text-gray-800 p-5   rounded-md">
        <div className="text-white max-w-lg flex flex-col gap-3">
          <h2 className="lg:text-4xl md:text-4xl text-2xl   merriweather">
            How Will Kure Help You?
          </h2>
          <p className="  max-w-lg">
            Our personalized hypnosis sessions will remove key reasons behind
            your weight gain.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaCheck className="text-teal-500 w-4 h-4 mr-2" />
              <span>No more food cravings</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-teal-500 w-4 h-4 mr-2" />
              <span>Blocked bad eating habits</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-teal-500 w-4 h-4 mr-2" />
              <span>Remove limiting beliefs</span>
            </div>
            <div className="flex items-center">
              <FaCheck className="text-teal-500 w-4 h-4 mr-2" />
              <span>Repair your gut & brain connection</span>
            </div>
          </div>

          <p className=" ">
            Simply open the Kure app and listen to a soothing hypnosis session
            before bedtime.
          </p>
          <p className="font-bold text-purple-300/95">
            It’s almost like losing weight while sleeping.
          </p>
          <p>
            Medical research studies and Kure user data suggests that hypnosis
            is perfectly safe and allows you to achieve better and lasting
            weight loss results*.
          </p>
          <Link
            className="  btnGrad text-center font-medium text-xl lg:py-4 py-3 rounded-3xl text-white px-4  "
            to={"/email"}
          >
            Got it
          </Link>
          <p className="mt-2 text-sm">
            <span className="text-purple-300/95 font-medium underline">
              *Source: Journal of Integrative Medicine Volume 19, Issue 1,
              January 2021, Pages 1-5.
            </span>
          </p>
        </div>
        <div>
          <img className="lg:max-h-[570px] rounded-2xl" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
