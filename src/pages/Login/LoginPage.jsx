import { TextField, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserManagement from "../../service/User";
import Logo from "../../shared/Logo";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    setErrorMsg(null); // Clear previous error messages
    setLoading(true);
    // Validate input fields
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
      const response = await UserManagement.loginUser(email, password);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
        setLoading(false);
        window.location.reload();
      } else {
        setErrorMsg("Invalid email or password.");
        setLoading(false);
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
    <div>
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
            <div className="bg-slate-100 shadow-md px-8 pb-5 pt-5 rounded-lg">
              <label className="block mt-5 text-gray-500 text-sm">
                Email<span className="text-red-500 text-xs">*</span>
              </label>
              <TextField
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm"
              />
              <label className="block mt-5 text-gray-500 text-sm">
                Password<span className="text-red-500 text-xs">*</span>
              </label>
              <TextField
                size="small"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full text-sm"
              />

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
