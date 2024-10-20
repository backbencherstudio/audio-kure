import React, { useRef, useState } from "react";

const PeopleAsk = ({ questionsAnswers }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRef = useRef([]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {questionsAnswers.map((item, index) => (
        <div key={index} className="mb-4 bg-[#07001c] rounded-2xl mx-4 md:mx-32 p-4">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
          >
            <span className="text-lg font-semibold">{item.question}</span>
            <span className="text-xl">{activeIndex === index ? "-" : "+"}</span>
          </button>
          <div
            ref={(el) => (contentRef.current[index] = el)}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              maxHeight: activeIndex === index
                ? contentRef.current[index]?.scrollHeight + "px"
                : "0px",
            }}
          >
            <div className="p-4 text-gray-500" dangerouslySetInnerHTML={{ __html: item.answer }}>
              {/* {item.answer} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleAsk;
