import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";

function PhysicalQuestionPage2() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = { ans2: selectedAnswer };
    currentAnswers.push(newAnswer);

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/let's go");
  };

  return (
    <div>
      <div className="min-h-[83vh] text-center">
        <ProgressBars
          page={2}
          value={60}
          navigate={"/question-physical-1"}
        ></ProgressBars>
        <h1 className="text-4xl pt-20">Which one come first?</h1>
        <div className="flex justify-center mt-10">
          <div className="grid gap-3 lg:w-[480px] md:w-[480px] w-full px-3">
            <CustomAnsButton
              text="Love"
              onClick={() => handleAnswerSelect("Love")}
            />
            <CustomAnsButton
              text="Money (career or security)"
              onClick={() => handleAnswerSelect("Money (career or security)")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhysicalQuestionPage2;
