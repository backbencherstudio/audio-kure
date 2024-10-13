import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../shared/CustomAnsButton";

function EmotionalQuestionPage1() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = { ans1: selectedAnswer };
    localStorage.setItem("answers", JSON.stringify(answer));
    navigate("/question-emotional-2");
  };
  return (
    <div className="h-screen text-center">
      <h1 className="text-4xl pt-20">Which one comes first ?</h1>
      <div className="flex justify-center mt-10">
        <div className="grid gap-3 w-[400px]">
          <CustomAnsButton
            text="Fare of rejection"
            onClick={() => handleAnswerSelect("Fare of rejection")}
          />
          <CustomAnsButton
            text="Fare of lossing control"
            onClick={() => handleAnswerSelect("Fare of lossing control")}
          />
        </div>
      </div>
    </div>
  );
}
export default EmotionalQuestionPage1;
