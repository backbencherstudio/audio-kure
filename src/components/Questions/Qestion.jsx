import CustomAnsButton from "../../shared/CustomAnsButton";
import ProgressBars from "../../shared/ProgressBar/ProgressBar";

const Question = ({ question, answers, handleAnswerSelect, page }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="min-h-[84vh] text-center">
        <ProgressBars page={page} value={page * 17} navigate={"/"} />
        <h1 className="text-4xl pt-20">{question}</h1>
        <div className="flex justify-center mt-10">
          <div className="grid gap-3 lg:w-[480px] md:w-[480px] w-full px-3">
            {answers?.map((answer, index) => (
              <CustomAnsButton
                key={index}
                text={answer}
                onClick={() => handleAnswerSelect(answer)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;