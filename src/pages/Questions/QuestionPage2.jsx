import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage2 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
     
    const newAnswer =
      selectedAnswer === "Fear of rejection" ? "physical" : "emotional";
    const existingAnswerIndex = currentAnswers.findIndex(
      (answer) => answer.ans2 !== undefined
    );

    if (existingAnswerIndex > -1) {
      currentAnswers[existingAnswerIndex].ans2 = newAnswer;
    } else {
      currentAnswers.push({ ans2: newAnswer });
    }

    localStorage.setItem("answers", JSON.stringify(currentAnswers));
    navigate("/question-3");
  };

  const question = "Out of these 2, which one is your biggest fear?";
  const answers = ["Fear of rejection", "Fear of losing control"];

  return (
    <Question
      question={question}
      answers={answers}
      handleAnswerSelect={handleAnswerSelect}
      page={1}
      route="/"
    />
  );
};

export default QuestionPage2;
