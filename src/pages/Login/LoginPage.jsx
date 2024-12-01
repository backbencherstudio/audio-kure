/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../shared/Logo";
import authApi from "../../redux/fetures/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { toast } from "react-toastify";

function LoginPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const [login, { isLoading }] = authApi.useLoginMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] = authApi.useResetPasswordMutation()

  const dispatch = useAppDispatch();


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

      console.log(user);


      // setCurrentEmail(user?.email);     

      if (!user?.sessionId) {
        navigate("/subscriptionplan");
        return;
      }
      else {
        navigate("/daily-audios");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Invalid email or password.");
    }

  };


  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [passEmail, setEmail] = useState("")
  const [passPassword, setPassPassword] = useState("")
  const [confirmPass, setPassConfirm] = useState("")

  const changePasswordFun = async (e) => {
    e.preventDefault();

    if (passPassword !== confirmPass) {
      toast.warning("Passwords do not match!");
      return;
    }
    const changePassData = {
      email: passEmail,
      password: passPassword,
    };

    const res = await resetPassword(changePassData);
    if (res?.error?.originalStatus === 404) {
      toast.error("User not found")
    }
    if (res?.data?.success) {
      toast.success("Password Reset SuccessFully")
      handleClose()
    }
    console.log(res);
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="btnGrad w-full font-bold rounded-xl mt-5 px-10 py-2 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center cursor-pointer"
              >
                {isSubmitting || isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Log in"
                )}
              </button>

              <div className="flex justify-end" >
                <h2 onClick={handleClickOpen} className="mt-3 text-[14px] text-green-300 font-semibold cursor-pointer ">Forget Password</h2>
              </div>

              <p className="mt-2 font-semibold">
                {" "}
                If you are not registrad go to{" "}
                <Link to="/signup" className="text-blue-600">
                  {" "}
                  Registred{" "}
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>

        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Change Your Password"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">

              <form onSubmit={changePasswordFun}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 border mt-2 rounded-full py-2"
                  type="email"
                  placeholder="Email"
                />
                <input
                  onChange={(e) => setPassPassword(e.target.value)}
                  className="w-full px-4 border mt-2 rounded-full py-2"
                  type="password"
                  placeholder="Password"
                />
                <input
                  onChange={(e) => setPassConfirm(e.target.value)}
                  className="w-full px-4 border mt-2 rounded-full py-2"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button className="mt-4 border px-5 py-1 rounded-full" type="submit">
                  {
                    resetPasswordLoading ? "Loading..." : "Submit"
                  }

                </button>
              </form>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="text-2xl" onClick={handleClose}>X</Button>
          </DialogActions>
        </Dialog>


      </div>
    </div>
  );
}

export default LoginPage;