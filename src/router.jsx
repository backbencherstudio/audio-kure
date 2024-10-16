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
import SignUpPage from "./pages/Login/SignupPage";
import LoginPage from "./pages/Login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", // Change to an empty string for the home page
        element: <HomePage />,
      },
      {
        path: "question-physical-1",
        element: <PhysicalQuestionPage1 />,
      },
      {
        path: "analysis", // Remove leading slash
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
        path: "body", // Remove leading slash
        element: <Body />,
      },
      {
        path: "let's go", // Remove leading slash
        element: <ThirdPage />,
      },
      {
        path: "subscriptionplan", // Remove leading slash
        element: <SubscriptionPlan />,
      },
      {
        path: "email", // Remove leading slash
        element: <EmailPage />,
      },
      {
        path: "welcome", // Remove leading slash
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "/signup",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/audios",
    element: <AudioLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "", // Change to an empty string for the default audios page
        element: <Doctors />,
      },
    ],
  },
]);

export default router;
