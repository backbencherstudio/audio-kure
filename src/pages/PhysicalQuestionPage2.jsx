import { useNavigate } from "react-router-dom";

function PhysicalQuestionPage2() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    // Retrieve current answers from localStorage
    const currentAnswers = JSON.parse(localStorage.getItem("answers")) || {};

    const updatedAnswers = { ...currentAnswers, ans2: selectedAnswer };

    localStorage.setItem("answers", JSON.stringify(updatedAnswers));
  };

  return (
    <div>
      <h1>What is your second question?</h1>
      <button onClick={() => handleAnswerSelect("Fare of love")}>
        Fare of love
      </button>
      <button onClick={() => handleAnswerSelect("Fare of friendship")}>
        Fare of friendship
      </button>
    </div>
  );
}

export default PhysicalQuestionPage2;
