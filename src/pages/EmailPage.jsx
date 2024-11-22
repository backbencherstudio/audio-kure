import { useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import { useState } from "react";
import { MdLockOpen } from "react-icons/md";
import { toast } from "react-toastify";

function EmailPage() {
  const [email, setEmail] = useState("e@g.com");
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();

  // Function to generate a unique hexadecimal ID
  function generateHexId(length) {
    let id = "";
    for (let i = 0; i < length; i++) {
      const randomByte = Math.floor(Math.random() * 16); // Generates a number from 0 to 15
      id += randomByte.toString(16); // Converts to hexadecimal
    }
    return id;
  }

  // Email validation function
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleUnlock = () => {
    if (email && isChecked) {
      if (!isValidEmail(email)) {
        toast.warning("Please enter a valid email address.");
        return;
      }
      const code = generateHexId(32);
      const user = { code: code, email: email };
      // Store the user object as a JSON string
      localStorage.setItem("user", JSON.stringify(user));
      navigate(`/analysis`); // Redirect to the next page after unlocking
    } else {
      toast.warning("Please enter valid email & agree to the privacy policy.");
    }
  };

  return (
    <div className="mx-4">
    <div className="container mx-auto">
        <Logo />
      </div>
      <div className="mx-auto max-w-[1400px] ">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="lg:max-w-[550px] md:max-w-[500px] text-center">
              <h1 className="text-4xl pt-5 md:pt-20 font-serif">
                Your program is ready
              </h1>
              <p className="mt-3 text-[#bebebe]">
                Unlock access to a personalized program by entering your email
              </p>
              <p className="text-[#bebebe]">
              Join the HYPNO 4 U community of achievers who have reached their goals in life, boasting a success rate of over 90%.
              </p>
              <input
                className="w-full focus:bg-[#6e363652] md:max-w-[450px] bg-transparent border border-white rounded-2xl h-14 mt-8 p-3  focus:outline-none focus:border-[#EEB5B4] placeholder:text-white"
                type="text"
                placeholder="Email"

                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnlock();
                  }
                }}
              />

              <div className="mt-3 text-start w-[90%] mx-auto flex">
                <div className="flex items-center space-x-2 p-4 rounded-lg">
                  <div
                    className={`w-7 h-5 rounded ${
                      isChecked ? "s-bg" : "bg-transparent border"
                    }`}
                    onClick={() => setIsChecked(!isChecked)}
                  >
                    {isChecked && (
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    <span className="p-text">Privacy Policy</span>.
                  </label>
                </div>
              </div>
              <div className="md:w-[90%] mx-auto">
                <button
                  onClick={handleUnlock}
                  className="btnGrad w-full md:w-[450px] mx-auto font-bold rounded-2xl py-4 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center"
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
      </div>
    </div>
  );
}

export default EmailPage;
