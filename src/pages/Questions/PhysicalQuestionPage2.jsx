import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import Footer2 from "../../shared/Footer2";

function PhysicalQuestionPage2() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = { ans2: selectedAnswer };
    currentAnswers.push(newAnswer);

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/analysis");
  };

  return (
    <div>
      <div className="min-h-[90vh] text-center">
        <ProgressBars
          page={2}
          value={100}
          navigate={"question-physical-1"}
        ></ProgressBars>
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
      <Footer2 />
    </div>
  );
}

export default PhysicalQuestionPage2;
