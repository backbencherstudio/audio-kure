import { TextField, Alert, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../shared/Logo";
import authApi from "../../redux/fetures/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from '../../redux/hooks';



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [login] = authApi.useLoginMutation()
  const dispatch = useAppDispatch();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const currentDate = new Date();
  const handleLogin = async () => {

    setErrorMsg(null);
    setLoading(true);

    if (!email || !password) {
      setErrorMsg("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Invalid email format.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const userInfo = { email, password }
      const response = await login(userInfo).unwrap();
      const token = response.data.accessToken;
      const user = verifyToken(token);
      dispatch(setUser({ user, token }));

      const expiresDate = new Date(user?.expiresDate)

      if (response?.success) {
        if (currentDate < expiresDate) {
          navigate("/daily-audios");
          setLoading(false)
          return
        }
        setLoading(false)
        navigate("/");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Invalid email or password.");
      setLoading(false);
    }




  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="">
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
      <div className="flex justify-center">
        <Logo />
      </div>
      <div className="flex  flex-col justify-center min-h-[70vh]">
        <div className="flex justify-center">
          <div className="md:w-[450px] lg:w-[450px] w-full mx-5">
            <div className="text-center">
              <h2 className="text-4xl text-center ">Log In</h2>
              <p className="mt-4 mb-16 font-[230] text-[15px]">
                Let’s get started on your journey to wellness!
              </p>
            </div>

            {errorMsg && (
              <Alert severity="error" className="mb-4">
                {errorMsg}
              </Alert>
            )}
            <div className="backdrop-blur-md backdrop-brightness-200 shadow-md px-8 pb-5 pt-5 rounded-lg">
              <label className="block mt-5 text-white text-sm mb-2">
                Email<span className="text-red-500 text-xs">*</span>
              </label>
              <TextField
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm bg-white/20 text-white rounded-md"
                InputProps={{

                  style: { color: 'white' }

                }}
              />
              <label className="block mt-5 text-white text-sm mb-2">
                Password<span className="text-red-500 text-xs">*</span>
              </label>
              <TextField
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm bg-white/20 text-white rounded-md"
                InputProps={{

                  style: { color: 'white', }

                }}

              />

              <p className=" mt-3 font-semibold "> If you are not registrad go to  <Link to="/signup" className="text-blue-600" > Registred </Link>  </p>


              <div
                className="btnGrad w-full font-bold rounded-xl mt-5 px-10 py-2 transition duration-300 transform hover:scale-105 hover:bg-yourHoverColor flex justify-center cursor-pointer"
                onClick={handleLogin}
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
                  "Log in"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
