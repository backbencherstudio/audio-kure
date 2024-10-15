import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";
import EmotionalQuestionPage1 from "./pages/Questions/EmotionalQuestionPage1";
import PhysicalQuestionPage2 from "./pages/Questions/PhysicalQuestionPage2";
import PhysicalQuestionPage1 from "./pages/Questions/PhysicalQuestionPage1";
import EmotionalQuestionPage2 from "./pages/Questions/EmotionalQuestionPage2";
import Analyzing from "./pages/Questions/Analysing/Analyzing";
import ThirdPage from "./pages/Questions/ThirdPage";
import SubscriptionPlan from "./components/SubscriptionPlan/SubscriptionPlan";
import EmailPage from "./pages/EmailPage";
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
        path: "/let's go",
        element: <ThirdPage></ThirdPage>,
      },
      {
        path: "subscriptionplan",
        element: <SubscriptionPlan />,
      },
      {
        path: "email",
        element: <EmailPage />,
      },
    ],
  },
]);

export default router;
