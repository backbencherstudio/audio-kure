import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage3 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer =
      selectedAnswer === "Warm" ? { ans3: "physical" } : { ans3: "emotional" };
    currentAnswers.push(newAnswer);

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/question-4");
  };

  const question =
    "Do your hands usually feel cold or warm throughout the day?";
  const answers = ["Cold", "Warm"];

  return (
    <Question
      question={question}
      answers={answers}
      handleAnswerSelect={handleAnswerSelect}
      page={2}
    />
  );
};

export default QuestionPage3;
