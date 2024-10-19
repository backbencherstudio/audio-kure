import { useState } from "react";
import "../../layout/layout.css";
import { FaRegUser } from "react-icons/fa";
import CureSessions from "../../components/UserAudios/CureSessions";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

const DailyAudios = () => {
  const [isOpen, setIsOpen] = useState();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLOgout = () => {
    dispatch(logOut());
    localStorage.removeItem("layout");
    navigate("/login");
  };

  return (
    <div className="area overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="grid justify-end my-4 mx-4">
            <button onClick={handleDropdown}>
              <FaRegUser className="text-2xl" />
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-4 w-24 bg-[#4937af] rounded-md shadow-lg py-2 
                          ring-1 ring-black ring-opacity-5 transition transform 
                          ease-out duration-300 origin-top-right z-10"
            >
              <div className="flex justify-center items-center">
                {currentUser ? (
                  <button
                    className="text-center"
                    onClick={() => {
                      handleLOgout();
                    }}
                  >
                    Log Out
                  </button>
                ) : (
                  <Link to={"/login"} className="text-center mx-auto">
                    Log In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      
      <CureSessions currentUser={currentUser} />
    </div>
  );
};

export default DailyAudios;
