import { useEffect, useState } from "react";
import "../../layout/layout.css";
import { FaRegUser } from "react-icons/fa";
import CureSessions from "../../components/UserAudios/CureSessions";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import authApi from './../../redux/fetures/auth/authApi';

const DailyAudios = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = authApi.useGetSingleUserQuery(currentEmail, {
    skip: !currentEmail,
  });

  useEffect(() => {
    if (currentEmail) {
      refetch();
    }
  }, [currentEmail, refetch]);

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (currentUser?.email) {
      setCurrentEmail(currentUser.email);
    }
  }, [currentUser?.email]);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("layout");
    navigate("/login");
  };

  const showButton = currentUser?.email === "mybesthealer@gmail.com"

  return (
    <div className="area pt-4 overflow-y-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="grid justify-end mx-4">
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
                  <div className="flex flex-col" >
                    <button
                      className="text-center"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>

                    {
                      showButton &&
                      <div>
                        <div className="w-full bg-slate-50 h-[1px] my-2 " ></div>
                        <Link
                          className="text-center"
                          to="/admin/users"
                        >
                          Dashboard
                        </Link>
                      </div>
                    }


                  </div>
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

      {isLoading && <div className="w-full h-[100vh] flex justify-center items-center " >
        <p className="text-center text-2xl " >Loading Data...</p>
      </div>}

      {data?.data ? (
        <CureSessions currentUser={data?.data} />
      ) : (
        !isLoading && <p></p>
      )}

      {error && <p>Error loading user data: {error.message}</p>}
    </div>
  );
};

export default DailyAudios;
