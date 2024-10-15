import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import Footer2 from "../../shared/Footer2";

function EmotionalQuestionPage1() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = [{ ans1: selectedAnswer }];
    localStorage.setItem("answers", JSON.stringify(answer));
    navigate("/question-emotional-2");
  };

  return (
    <div>
      <div className=" min-h-[83vh] text-center">
        <ProgressBars page={1} value={30} navigate={"/"}></ProgressBars>
        <h1 className="text-4xl lg:pt-20 pt-10">Which one come first?</h1>
        <div className="flex justify-center lg:mt-10 mt-5 px-3">
          <div className="grid gap-3 w-[400px]">
            <CustomAnsButton
              text="Fare of rejection"
              onClick={() => handleAnswerSelect("Fare of rejection")}
            />
            <CustomAnsButton
              text="Fare of loosing control"
              onClick={() => handleAnswerSelect("Fare of loosing control")}
            />
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}

export default EmotionalQuestionPage1;
