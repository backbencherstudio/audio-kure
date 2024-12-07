import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../redux/fetures/auth/authApi";
import { CircularProgress, Dialog } from "@mui/material";

const SignUpPage = () => {
  const inputStyle =
    "bg-white/10 text-white shadow appearance-none rounded w-full py-2.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-white placeholder:text-sm";
  const [registerUser, { isLoading }] = authApi.useRegisterUserMutation();
  const [verifyOTP, { isLoading: verifyLoading }] =
    authApi.useVerifyOTPMutation();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [email, setEmail] = useState('');

  const [planData, setPlanData] = useState({})

  useEffect(() => {
    const plan = localStorage.getItem("plan")
    const parsedPlan = plan ? JSON.parse(plan) : null;
    const userType = localStorage.getItem("userType")
    setPlanData({ parsedPlan, userType })
  }, [])


  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user && user.email) {
  //     setEmail(user.email);
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();


  const password = watch("password", "");
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("password not matched");
      return;
    }

    setUserEmail(data?.email);

    const res = await registerUser(data);

    if (res?.data?.success) {
      toast("Check Your Email For Verify OTP");
      setOpen(true);
      return;
    }

    if (res?.data?.data.success) {
      toast(res?.data?.data.message);
      setOpen(true);
      return;
    }

    if (res?.error?.data.success == false) {
      toast.error(res?.error?.data?.message);
      return;
    }

    if (res?.data?.success) {
      toast.success(res?.data.message);
      return;
    }
    if (res?.error?.originalStatus === 400) {
      // toast.error(res?.error.data.message);
      toast.error("User Already Exists");
      return;
    }
  };

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const verifyOtp = async (otp) => {
    const verifyData = { email: userEmail, otp, userType: planData?.userType };
    const res = await verifyOTP(verifyData);
    if (res?.error?.status === 400 || res?.error?.originalStatus === 400) {
      toast.error("OTP Not Match , Please Try Again");
      setOpen(false);
    }
    if (res?.data?.success) {
      toast.success("Registration Successful");
      setOpen(false);
      setOtp(new Array(6).fill(""));
      navigate("/login");
    } else {
      toast.error(res?.data?.message);
      setOtp(new Array(6).fill(""));
    }
  };
  // ======================================================== fill up OTP function Start


  const inputRefs = useRef([]);

  const handleChange = (target, index) => {
    const value = target.value;
  
    if (/^[0-9]*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value.slice(-1);
      setOtp(updatedOtp);
  
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = ""; 
      setOtp(updatedOtp);
  
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    verifyOtp(otp.join(""));
  };
  // ======================================================== fill up OTP function End

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="area"> {/* Fixed area covering full viewport */}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="md:w-[25%] ">
        <h2 className="text-3xl text-center mb-6 ">Create an account </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Username
            </label>
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              className={inputStyle}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email", {
                // required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className={inputStyle}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              type="password"
              className={inputStyle}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className={inputStyle}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btnGrad w-full text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline flex justify-center items-center hover:scale-105 duration-300"
            >
              {isLoading ? (
                <CircularProgress
                  style={{
                    color: "white",
                    width: "20px",
                    height: "20px",
                  }}
                />
              ) : (
                "Register"
              )}
            </button>
          </div>

          <div className="mt-3">
            <p>
              If You Are Already Registred Go To{" "}
              <Link to="/login" className=" text-blue-500 font-semibold">
                Login{" "}
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="modal-box">
          <div className="modal-content flex flex-col items-center">
            <h2>Enter OTP</h2>
            <form
              className="flex flex-col justify-center items-center p-8"
              onSubmit={handleOTPSubmit}
            >
              <div className="flex space-x-2">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="bg-gray-800 text-white border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2 text-center w-12"
                    required
                  />
                ))}
              </div>
              <button type="submit" className="mt-5">
                {verifyLoading ? (
                  <CircularProgress
                    style={{
                      color: "black",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                ) : (
                  "Verify OTP"
                )}
              </button>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SignUpPage;