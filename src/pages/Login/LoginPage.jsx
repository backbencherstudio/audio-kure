import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../shared/Logo";
import authApi from "../../redux/fetures/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const [login] = authApi.useLoginMutation();
  const dispatch = useAppDispatch();

  const currentDate = new Date();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async (data) => {
    setErrorMsg(null);

    if (!data.email || !data.password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!validateEmail(data.email)) {
      setErrorMsg("Invalid email format.");
      return;
    }

    if (data.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await login(data).unwrap();
      const token = response.data.accessToken;
      const user = verifyToken(token);
      dispatch(setUser({ user, token }));

      const expiresDate = new Date(user?.expiresDate);

      if (response?.success) {
        if (currentDate < expiresDate) {
          navigate("/daily-audios");
          return;
        }
        navigate("/payment");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div className="">
      <div className="area">
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
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex flex-col justify-center min-h-[70vh]">
        <div className="flex justify-center">
          <div className="md:w-[450px] lg:w-[450px] w-full mx-5">
            <div className="text-center">
              <h2 className="text-4xl text-center ">Log In</h2>
              <p className="mt-4 mb-16 font-[230] text-[15px]">
                Let's get started on your journey to wellness!
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="backdrop-blur-sm bg-white/10 p-6 border border-white/20 shadow-md px-8 pb-5 pt-5 rounded-lg">
              <label className="block mt-5 text-white text-sm mb-2">
                Email<span className="text-red-500 text-xs">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full text-sm bg-white/20 text-white rounded-md p-2 border border-white/20 focus:outline-none"
              />

              <label className="block mt-5 text-white text-sm mb-2">
                Password<span className="text-red-500 text-xs">*</span>
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full text-sm bg-white/20 text-white rounded-md p-2 border border-white/20 focus:outline-none"
              />

              <p className="mt-3 font-semibold">
                {" "}
                If you are not registrad go to{" "}
                <Link to="/signup" className="text-blue-600">
                  {" "}
                  Registred{" "}
                </Link>{" "}
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btnGrad w-full font-bold rounded-xl mt-5 px-10 py-2 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Log in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;