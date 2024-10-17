import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage3 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    const newAnswer = selectedAnswer === "Warm" ? "physical" : "emotional";
    const existingAnswerIndex = currentAnswers.findIndex(
      (answer) => answer.ans3 !== undefined
    );

    if (existingAnswerIndex > -1) {
      currentAnswers[existingAnswerIndex].ans3 = newAnswer;
    } else {
      currentAnswers.push({ ans3: newAnswer });
    }
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
      route="/question-2"
    />
  );
};

export default QuestionPage3;
