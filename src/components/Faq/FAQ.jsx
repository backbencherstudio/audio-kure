import React from "react";
import PeopleAsk from "./PeopleAsk";

const FAQ = () => {
  const questionsAnswers = [
    {
      question: "What happens after I order?",
      answer: "After you place your order we get to work! Based on the questions you answered in the quiz, we’ll craft your program to your exact personal requirements.",
    },
    {
      question: "How can I cancel my subscription?",
      answer: "Cancelations are handled through Apple directly and can be requested using the instructions here. If you still have any questions on how to cancel your subscription, please get in touch with us at info@hypno4u.health",
    },
    {
      question: "Is it safe to use self-hypnosis?",
      answer: "Self-Hypnotherapy is a completely safe procedure.",
    },
    {
      question: "What happens if I fall asleep during session?",
      answer: "SelIt's perfectly normal and safe to fall asleep during a hypnosis session. In fact, it proves that you've entered a deep relaxation phase where hypnosis is most effective. <br/> If this happens to you and you want to revisit your bedtime session, you can do so by selecting the previous day in the Kure app.",
    },
  ];

  return (
    <div className="bg-[#191435]">
    <div className="py-10">
      <h2 className="text-5xl text-center font-medium mt-2 mb-10">People Ask Us:</h2>
      <PeopleAsk questionsAnswers={questionsAnswers} />
    </div>
    </div>
  );
};

export default FAQ;
