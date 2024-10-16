import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage4 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer =
      selectedAnswer === "Relaxed"
        ? { ans3: "physical" }
        : { ans3: "emotional" };
    currentAnswers.push(newAnswer);

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/question-5");
  };

  const question =
    "When you sit, do you tend to keep your posture tense or relaxed?";

  const answers = ["Tense", "Relaxed"];

  return (
    <Question
      question={question}
      answers={answers}
      handleAnswerSelect={handleAnswerSelect}
      page={3}
    />
  );
};

export default QuestionPage4;
