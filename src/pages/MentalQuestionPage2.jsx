import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../shared/CustomAnsButton";

function MentalQuestionPage1() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    // Retrieve current answers from localStorage
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || {};

    const updatedAnswers = { ...currentAnswers, ans2: selectedAnswer };

    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  return (
    <div className="h-screen text-center">
      <h1 className="text-4xl pt-20">Which one comes first ?</h1>
      <div className="flex justify-center mt-10">
        <div className="grid gap-3 w-[400px]">
          <CustomAnsButton
            text="Love"
            onClick={() => handleAnswerSelect("Love")}
          />
          <CustomAnsButton
            text="Money (career or sequrity)"
            onClick={() => handleAnswerSelect("Money (career or sequrity)")}
          />
        </div>
      </div>
    </div>
  );
}

export default MentalQuestionPage1;
