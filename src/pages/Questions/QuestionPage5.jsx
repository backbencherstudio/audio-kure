import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage5 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer =
      selectedAnswer === "Outward"
        ? { ans3: "physical" }
        : { ans3: "emotional" };
    currentAnswers.push(newAnswer);

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/body");
  };

  const question =
    "When you walk, do you tend to point your toes outward or inward ? ";

  const answers = ["Outward", "Inward"];

  return (
    <Question
      question={question}
      answers={answers}
      handleAnswerSelect={handleAnswerSelect}
      page={4}
    />
  );
};

export default QuestionPage5;
