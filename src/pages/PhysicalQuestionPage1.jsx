import { useNavigate } from "react-router-dom";

function PhysicalQuistionPage1() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = { ans1: selectedAnswer };

    localStorage.setItem("answers", JSON.stringify(answer));
    navigate("/question-physical-2");
  };
  return (
    <div>
      <h1>Which one comes first ?</h1>
      <button onClick={() => handleAnswerSelect("Fare of rejection")}>
        Fare of rejection
      </button>
      <button onClick={() => handleAnswerSelect("Fare of lossing control")}>
        Fare of lossing control
      </button>
    </div>
  );
}
export default PhysicalQuistionPage1;
