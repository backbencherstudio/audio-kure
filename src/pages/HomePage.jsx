import { Link, useNavigate } from "react-router-dom";
import star from "./../assets/images/home_stars.png";
import home_members from "./../assets/images/home_members.png";
import home_hero_image from "./../assets/images/home_hero_image.png";
import Footer from "../shared/Footer";
import Logo from "../shared/Logo";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../redux/fetures/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import LoveButton from "../components/Buttons/LoveButtons/LoveButton";
import MoneyButton from "../components/Buttons/MoneyButtons/MoneyButtons";

function HomePage() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  console.log(currentUser);

  const handleLOgout = () => {
    // logOutUser({ email: currentUser?.email });
    dispatch(logOut());
    localStorage.removeItem("layout");
    navigate("/login");
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = [{ ans1: selectedAnswer }];
    localStorage.setItem("answers", JSON.stringify(answer));
  };

  return (
    <div>
      <div className="container z-50 mx-auto bg-transparent ">
        <div className="  flex  justify-between items-center">
          <Logo />
          <div>
            {currentUser ? (
              <button
                onClick={() => {
                  handleLOgout();
                }}
              >
                Log Out
              </button>
            ) : (
              <Link to={"/login"}>Log In</Link>
            )}
          </div>
        </div>

        <div className="container   mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row md:flex-row items-center justify-center mt-10 gap-20 lg:px-20 px-5">
            <div className="flex-1">
              <h2 className="text-3xl   text-white    merriweather font-bold leading-snug">
                Forget everything you know about hypnosis and embark on a
                healing journey with just 5 simple questions that will transform
                your life forever!
              </h2>
              <p className="mt-2 lg:max-w-[520.611px]">
                The following questions may seem unusual, but they are designed
                to help pinpoint your brain's thinking patterns and behaviors.
                This will allow us to determine the most effective hypnosis
                techniques specifically tailored for you.
              </p>
              <p className="mt-2 lg:max-w-[520.611px]">
                Based on your personality type, unlock access to over 100
                personalized hypnosis sessions. Break through mental barriers,
                empower yourself, and repair the mind-body connection with a
                customized hypnotherapy program designed just for you.
              </p>
              <p className=" mt-5 text-3xl font-medium mb-5">
                What is your top priority in life?
              </p>
              <div className="flex flex-col items-center lg:flex-row justify-between gap-5 mb-10 w-full">
                <Link
                  onClick={() => handleAnswerSelect("physical")}
                  className="w-full"
                  to={"/question-2"}
                >
                  <LoveButton></LoveButton>
                </Link>
                <Link
                  onClick={() => handleAnswerSelect("emotional")}
                  className="w-full"
                  to={"/question-2"}
                >
                  <MoneyButton />
                </Link>
              </div>

              <div className="flex ">
                <img className="h-[40px] w-[136px]" src={home_members} alt="" />
                <div className="ml-5">
                  <img className="h-4" alt="" src={star} />
                  <p className="text-xs mt-2 font-medium">
                    98% satisfaction rate *based on user interviews
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <img className=" " alt="" src={home_hero_image} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
