import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";

function EmotionalQuestionPage2() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = { ans2: selectedAnswer };
    currentAnswers.push(newAnswer);
    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/body");
  };

  return (
    <div>
      <div className="text-center">
        <ProgressBars
          page={2}
          value={50}
          navigate={"/question-emotional-1"}
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

export default EmotionalQuestionPage2;
