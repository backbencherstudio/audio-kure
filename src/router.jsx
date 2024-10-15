import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";
import EmotionalQuestionPage1 from "./pages/Questions/EmotionalQuestionPage1";
import PhysicalQuestionPage2 from "./pages/Questions/PhysicalQuestionPage2";
import PhysicalQuestionPage1 from "./pages/Questions/PhysicalQuestionPage1";
import EmotionalQuestionPage2 from "./pages/Questions/EmotionalQuestionPage2";
import Analyzing from "./pages/Questions/Analysing/Analyzing";
import ThirdPage from "./pages/Questions/FourthPage";
import SubscriptionPlan from "./components/SubscriptionPlan/SubscriptionPlan";
import WelcomePage from "./pages/Welcome/WelcomePage";
import EmailPage from "./pages/EmailPage";
import AudioLayout from "./pages/Audios/Audios";
import Doctors from "./pages/Audios/MainComponents/Doctors/Doctors";
import Body from "./pages/Questions/Body";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "question-physical-1",
        element: <PhysicalQuestionPage1></PhysicalQuestionPage1>,
      },
      {
        path: "/analysis",
        element: <Analyzing />,
      },
      {
        path: "question-physical-2",
        element: <PhysicalQuestionPage2 />,
      },
      {
        path: "question-emotional-1",
        element: <EmotionalQuestionPage1 />,
      },
      {
        path: "question-emotional-2",
        element: <EmotionalQuestionPage2 />,
      },
      {
        path: "/body",
        element: <Body></Body>,
      },

      {
        path: "/let's go",
        element: <ThirdPage></ThirdPage>,
      },
      {
        path: "/subscriptionplan",
        element: <SubscriptionPlan />,
      },
      {
        path: "email",
        element: <EmailPage />,
      },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "/audios",
    element: <AudioLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/audios",
        element: <Doctors />,
      },
    ],
  },
]);

export default router;
