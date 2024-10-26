import { FaCheck } from "react-icons/fa";
import img from "./../../assets/images/hypno4u.jpg";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import { Link } from "react-router-dom";
const ThirdPage = () => {
  return (
    <div>
      <ProgressBars page={6} value={100}></ProgressBars>
      <div className=" flex flex-col-reverse md:flex-row lg:flex-row lg:mt-20 mt-10     gap-10  w-full h-fit   items-center justify-center text-gray-800 p-5   rounded-md">
        <div className="text-white max-w-lg flex flex-col gap-3">
          <h2 className="lg:text-4xl md:text-3xl text-2xl   merriweather">
            Life is dynamic, and so is HYPNO 4 U.
          </h2>
          <p className="  max-w-lg">
            Think of HYPNO 4 U as a streaming service for your mind—you're in control of over 200 audios to choose from every day. Just pick what you’re in the mood for today and heal while you sleep! It couldn't be easier than that!
          </p>

          <div className="space-y-4">
            <h1 className="text-lg font-bold">How can you benefit from choosing HYPNO 4 U?</h1>
            <ul className="space-y-4 list-disc ml-10">
              <li className="text-gray-300"><span className="font-semibold t-text">Personalized Sessions:</span> Each hypnotherapy session is tailored to fit your unique needs.</li>
              <li className="text-gray-300"><span className="font-semibold t-text">You're in Control:</span> Take charge of your life with customized plans.</li>
              <li className="text-gray-300"><span className="font-semibold t-text">Goal Setting:</span> Define clear goals before you begin your journey.</li>
              <li className="text-gray-300"><span className="font-semibold t-text">Progress Tracking:</span> Use proven, science-backed tools to monitor your progress.</li>
            </ul>
          </div>

          <p className=" ">
            Plus, get rewarded and unlock the VAULT, “where all the secrets reside”!
          </p>
          <Link
            className="  btnGrad text-center font-medium text-xl lg:py-4 py-3 rounded-xl text-white px-4  "
            to={"/email"}
          >
            Got it
          </Link>
        </div>
        <div>
          <img className="lg:max-h-[570px] rounded-2xl" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
