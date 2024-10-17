import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage4 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = selectedAnswer === "Relaxed" ? "physical" : "emotional";
    const existingAnswerIndex = currentAnswers.findIndex(
      (answer) => answer.ans4 !== undefined
    );

    if (existingAnswerIndex > -1) {
      currentAnswers[existingAnswerIndex].ans4 = newAnswer;
    } else {
      currentAnswers.push({ ans4: newAnswer });
    }

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
      route="/question-3"
    />
  );
};

export default QuestionPage4;
