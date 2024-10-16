import { useNavigate } from "react-router-dom";
import Question from "../../components/Questions/Qestion";

const QuestionPage2 = () => {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || [];
    // const newAnswer = { ans2: selectedAnswer };
    const newAnswer =
      selectedAnswer === "Fear of rejection"
        ? { ans2: "physical" }
        : { ans2: "emotional" };
    currentAnswers.push(newAnswer);

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
    />
  );
};

export default QuestionPage2;
