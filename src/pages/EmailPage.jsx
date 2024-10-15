import { useNavigate } from "react-router-dom";
import Footer2 from "../shared/Footer2";
import Logo from "../shared/Logo";
import { useState } from "react";
import { MdLockOpen } from "react-icons/md";

function EmailPage() {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = () => {
    localStorage.setItem("user", email);
  };
  return (
    <div className="container mx-auto max-w-[1400px] px-4">
      <div className=" min-h-[90vh] text-center">
        <div className="flex ">
          <Logo />
        </div>
        <div className="flex justify-center">
          <div className="lg:max-w-[550px] md:max-w-[500px] text-center">
            <h1 className="text-4xl pt-20 font-serif">Your program is ready</h1>
            <p className="mt-3 text-[#bec4d2]">
              Unlock access to a personalized program by entering your email
            </p>
            <p className="text-[#bec4d2]">
              Join the Healer community who have hit their target weight, with a
              success rate of over 90%.
            </p>
            <input
              className="w-full focus:bg-[#3f3f3f2d] max-w-[450px] bg-transparent border border-gray-700 rounded-2xl h-14 mt-8 p-3 placeholder:text-gray-600 focus:outline-none focus:border-gray-600"
              type="text"
              placeholder="Email"
              name=""
              id=""
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-3 text-start w-[90%] mx-auto flex">
              <div className="flex items-center space-x-2 p-4 rounded-lg">
                <div
                  className={`w-7 h-5 rounded ${
                    isChecked ? "bg-teal-500" : "bg-transparent border "
                  } 
        flex items-center justify-center cursor-pointer`}
                  onClick={() => setIsChecked(!isChecked)}
                >
                  {isChecked && (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <label
                  className="text-white text-sm cursor-pointer"
                  onClick={() => setIsChecked(!isChecked)}
                >
                  I would like to get an email about my body data report and
                  agree to your{" "}
                  <span className="text-teal-500">Privacy Policy</span>.
                </label>
              </div>
            </div>
            <div className="w-[90%] mx-auto">
              <button
                onClick={() => handleUnlock()}
                className="btnGrad w-full font-bold rounded-2xl px-10 py-4 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center"
              >
                <MdLockOpen
                  style={{
                    margin: "1px",
                    marginInline: "3px",
                    fontSize: "20px",
                  }}
                />{" "}
                Unlock my program
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default EmailPage;
