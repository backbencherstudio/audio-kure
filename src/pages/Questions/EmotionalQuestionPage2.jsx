import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";

function EmotionalQuestionPage2() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    // Retrieve current answers from localStorage
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = { ans2: selectedAnswer };
    currentAnswers.push(newAnswer);
    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/analysis")
  };

  return (
    <div className="h-screen text-center">
      
      <ProgressBars value={50} navigate={"question-emotional-1"}></ProgressBars>
      <h1 className="text-4xl pt-20">Which one come first?</h1>
      <div className="flex justify-center mt-10">
        <div className="grid gap-3 w-[400px]">
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
  );
}

export default EmotionalQuestionPage2;
