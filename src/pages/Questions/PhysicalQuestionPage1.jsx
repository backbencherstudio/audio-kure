import { useNavigate } from "react-router-dom";
import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";
import Footer2 from "../../shared/Footer2";

function PhysicalQuestionPage1() {
  const navigate = useNavigate();

  const handleAnswerSelect = (selectedAnswer) => {
    const answer = [{ ans1: selectedAnswer }];

    localStorage.setItem("answers", JSON.stringify(answer));
    navigate("/question-physical-2");
  };
  return (
    <div className="flex flex-col  justify-between">
      <div className=" min-h-[84vh] text-center">
        <ProgressBars page={1} value={30} navigate={"/"} />
        <h1 className="text-4xl pt-20">Which one come first?</h1>
        <div className="flex justify-center mt-10">
          <div className="grid gap-3 lg:w-[480px] md:w-[480px] w-full px-3">
            <CustomAnsButton
              text="Fare of rejection"
              onClick={() => handleAnswerSelect("Fare of rejection")}
            />
            <CustomAnsButton
              text="Fare of loosing control"
              onClick={() => handleAnswerSelect("Fare of loosing control")}
            />
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  );
}
export default PhysicalQuestionPage1;
