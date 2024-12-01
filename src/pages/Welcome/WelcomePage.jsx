 
import Logo from "../../shared/Logo";
import ChatUi from "./ChatUi";

const WelcomePage = () => {
  const answers = JSON.parse(localStorage.getItem("answers")) || [];
  const counts = {
    physical: 0,
    emotional: 0,
  };
  answers.forEach((answer) => {
    Object.values(answer).forEach((value) => {
      if (value === "physical") {
        counts.physical += 1;
      } else if (value === "emotional") {
        counts.emotional += 1;
      }
    });
  });
  const userType =
    counts.physical > counts.emotional ? "physical" : "emotional";
  const code = JSON.parse(localStorage.getItem("user"))?.code;
  localStorage.setItem("userType", userType);
  const userCondition = userType;

  return (
    <div>
      <div className="container mx-auto"> <Logo /></div>
      <div className="container mx-auto">
        <h4 className="text-center lg:text-4xl lg:my-10 mb-5   backdrop-blur-md bg-gray-600/20 w-fit mx-auto lg:p-5 p-1 rounded-xl">Congratulations! <br /> You are {userCondition} suggestible!</h4>
        {
          userCondition === "physical" && <div>
            <ChatUi userCondition={userCondition} code={code}></ChatUi>

          </div>
        }
        {
          userCondition === "emotional" && <div>
            <ChatUi userCondition={userCondition} code={code}></ChatUi>
          </div>
        }
      </div>
    </div>
  );
};

export default WelcomePage;
