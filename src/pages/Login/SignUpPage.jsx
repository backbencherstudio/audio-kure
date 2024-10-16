import { TextField, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Logo from "../../shared/Logo";
import UserManagement from "../../service/User";

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6 input fields for OTP
  const [step, setStep] = useState(1); // 1 for sign-up, 2 for OTP
  const [errorMsg, setErrorMsg] = useState(null);
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const [isCounting, setIsCounting] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false); // New state for resend button
  const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");
  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      setIsResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordStrength = (password) => {
    return password.length >= 6;
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { email } = formData;

    if (!email) {
      setErrorMsg("Email is required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      await UserManagement.sendOtp(email);
      setStep(2); // Move to OTP step
      setIsCounting(true); // Start the countdown
      setIsResendDisabled(true); // Disable resend button
      setCountdown(120); // Reset countdown to 2 minutes
      toast.success("OTP sent to your email.");
      setLoading(false);
    } catch (error) {
      setErrorMsg(`Error: ${error.response.data.message || error.message}`);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg(null);
    const otpString = otp.join(""); // Join the OTP array into a string

    if (otpString.length !== 6) {
      setErrorMsg("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      const isValid = await UserManagement.verifyOtp(formData.email, otpString);
      if (isValid) {
        await handleSignUp(); // Proceed to complete sign-up
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg(`${error.response?.data?.message}`);
      toast.error(`Error: ${error.response?.data?.message}`);
    }
  };

  const handleSignUp = async () => {
    setErrorMsg(null);

    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!validatePasswordStrength(password)) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    try {
      await UserManagement.upsertUser({ name, email, password, user });
      toast.success("User created successfully");

      // Clear form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setOtp(["", "", "", "", "", ""]);
      setStep(1); // Reset to step 1
      navigate("/login");
    } catch (error) {
      setErrorMsg(`Error: ${error?.response?.data?.message || error.message}`);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg(null);
    const { email } = formData;

    if (!email) {
      setErrorMsg("Email is required to resend OTP.");
      return;
    }

    try {
      await UserManagement.sendOtp(email);
      toast.success("OTP resent successfully.");
      setCountdown(120); // Reset countdown to 2 minutes
      setIsCounting(true); // Start the countdown
      setIsResendDisabled(true); // Disable resend button
      setOtp(["", "", "", "", "", ""]); // Clear the OTP inputs
    } catch (error) {
      setErrorMsg(`Error: ${error.response?.data?.message || error.message}`);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Allow only one character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input when a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex justify-center min-h-[80vh]">
        <div className="flex justify-center flex-col">
          <div className="w-[400px] md:w-[450px] lg:w-[450px] mx-5">
            <div className="text-center">
              <h2 className="text-4xl text-center">
                Last step. Set up your account
              </h2>
              <p className="mt-4 font-[230] text-[15px]">
                Set name or nickname for your account and create a password to
                access your Healer app
              </p>
            </div>
            <div className="bg-slate-100 shadow-md px-8 pb-5 rounded-2xl">
              {step === 1 && (
                <>
                  <label className="block mt-5 pt-10 text-gray-500 text-sm">
                    Name<span className="text-red-500 text-xs">*</span>
                  </label>
                  <TextField
                    size="small"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full text-sm"
                  />
                  <label className="block mt-5 text-gray-500 text-sm">
                    Email<span className="text-red-500 text-xs">*</span>
                  </label>
                  <TextField
                    size="small"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full text-sm"
                  />
                  <label className="block mt-5 text-gray-500 text-sm">
                    Password<span className="text-red-500 text-xs">*</span>
                  </label>
                  <TextField
                    size="small"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full text-sm"
                  />
                  <label className="block mt-5 text-gray-500 text-sm">
                    Confirm password
                    <span className="text-red-500 text-xs">*</span>
                  </label>
                  <TextField
                    size="small"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full text-sm"
                  />
                  {errorMsg && (
                    <Alert severity="error" className="mt-3">
                      {errorMsg}
                    </Alert>
                  )}
                  <div
                    className="btnGrad w-full font-bold rounded-xl mt-5 px-10 py-2 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center cursor-pointer"
                    onClick={handleSendOtp}
                  >
                    {loading ? (
                      <CircularProgress
                        style={{
                          color: "white",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    ) : (
                      "Create account"
                    )}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <label className="block mt-5 pt-8 text-gray-500 text-sm">
                    Enter OTP<span className="text-red-500 text-xs">*</span>
                  </label>
                  <div className="flex justify-between mt-2">
                    {otp.map((digit, index) => (
                      <TextField
                        key={index}
                        id={`otp-input-${index}`}
                        size="small"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-[15%] text-sm"
                        // inputProps={{ maxLength: 1 }}
                      />
                    ))}
                  </div>
                  {errorMsg && (
                    <Alert severity="error" className="mt-3">
                      {errorMsg}
                    </Alert>
                  )}
                  <div
                    className="btnGrad w-full font-bold rounded-xl mt-5 px-10 py-2 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center cursor-pointer"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </div>

                  {/* Resend OTP Button */}
                  <div className="flex justify-between mt-3">
                    <div
                      className={`w-full text-right ${
                        isResendDisabled
                          ? "text-gray-400"
                          : "hover:opacity-85 text-orange-700"
                      } p-3  cursor-pointer underline`}
                      onClick={() => {
                        if (!isResendDisabled) {
                          handleResendOtp();
                        }
                      }}
                    >
                      Resend OTP
                    </div>

                    {/* Countdown Timer */}
                    {isCounting && (
                      <div className="text-center pt-3 text-md text-black">
                        {Math.floor(countdown / 60)}:
                        {(countdown % 60).toString().padStart(2, "0")}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
