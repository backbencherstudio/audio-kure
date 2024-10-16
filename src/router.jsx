import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";
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
import QuestionPage2 from "./pages/Questions/QuestionPage2";
import QuestionPage3 from "./pages/Questions/QuestionPage3";
import QuestionPage4 from "./pages/Questions/QuestionPage4";
import QuestionPage5 from "./pages/Questions/QuestionPage5";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "question-2",
        element: <QuestionPage2 />,
      },
      {
        path: "question-3",
        element: <QuestionPage3 />,
      },
      {
        path: "question-4",
        element: <QuestionPage4 />,
      },
      {
        path: "question-5",
        element: <QuestionPage5 />,
      },
      {
        path: "analysis",
        element: <Analyzing />,
      },
      {
        path: "body",
        element: <Body />,
      },
      {
        path: "let's go",
        element: <ThirdPage />,
      },
      {
        path: "subscriptionplan",
        element: <SubscriptionPlan />,
      },
      {
        path: "email",
        element: <EmailPage />,
      },
      {
        path: "welcome",
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
        path: "",
        element: <Doctors />,
      },
    ],
  },
]);

export default router;
