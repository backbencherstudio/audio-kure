import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../redux/fetures/auth/authApi";
import { Dialog } from "@mui/material";

const SignUpPage = () => {
  const inputStyle =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const [registerUser, { isLoading }] = authApi.useRegisterUserMutation();
  const [verifyOTP, { isLoading: verifyLoading }] =
    authApi.useVerifyOTPMutation();
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
      toast.error("password not matched");
      return;
    }

    setUserEmail(data?.email);
    const res = await registerUser(data);
    if (res?.data?.success) {
      toast("Check Your Email For Verify OTP");
      // document.getElementById('my_modal_3').showModal()
      setOpen(true);
      return;
    }

    if (res?.data?.data.success) {
      toast(res?.data?.data.message);
      // document.getElementById('my_modal_3').showModal()
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
    if (res?.error?.status === 400) {
      toast.error(res?.error.data.message);
      // res?.error.data.errorSources.map(item => toast.error(item?.message))
      return;
    }
  };

  const verifyOtp = async (otp) => {
    const verifyData = { email: userEmail, otp };
    const res = await verifyOTP(verifyData);

    if (res?.error?.status === 400) {
      toast.error(res?.error?.data.message);
    }

    console.log(res);

    if (res?.data?.success) {
      toast.success("Registration Successfull");
      setOpen(false);
      navigate("/login");
    } else {
      toast.error(res?.data?.message);
    }
  };

  // ======================================================== fill up OTP function Start

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (index < 5 && element.value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
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
      <div className="w-[25%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[120px] flex justify-center items-center "
            >
              {isLoading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>

          <div className="mt-3 text-black">
            <p>
              If You Are Already Registred Go To{" "}
              <Link to="/login" className=" text-blue-600 font-semibold">
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
                  <span className="loading loading-dots loading-md"></span>
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
