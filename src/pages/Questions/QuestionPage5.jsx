import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage5 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = selectedAnswer === "Outward" ? "physical" : "emotional";
    const existingAnswerIndex = currentAnswers.findIndex(
      (answer) => answer.ans5 !== undefined
    );

    if (existingAnswerIndex > -1) {
      currentAnswers[existingAnswerIndex].ans5 = newAnswer;
    } else {
      currentAnswers.push({ ans5: newAnswer });
    }

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/email");
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
      value={100}
      route="/question-4"
    />
  );
};

export default QuestionPage5;
