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
// import SignUpPage from "./pages/Login/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import QuestionPage2 from "./pages/Questions/QuestionPage2";
import QuestionPage3 from "./pages/Questions/QuestionPage3";
import QuestionPage4 from "./pages/Questions/QuestionPage4";
import QuestionPage5 from "./pages/Questions/QuestionPage5";
import Payment from "./pages/paymentPage/Payment";
import AudioDescriptions from "./pages/Audios/AudioDescriptions/AudioDescriptions";
import Physical from "./pages/Physical/Physical";
import DailyAudios from "./pages/UserAudios/DailyAudios";
import SignUpPage from "./pages/Login/SignUpPage";
import PPurchesProtectorRoute from "./layout/PPurchesProtectorRoute";
import ProtectedRoute from "./layout/ProtectedRoute";
import AllUsers from "./pages/allUsers/AllUsers";
import Summary from "./pages/Summary/Summary";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PPurchesProtectorRoute>
        <Layout />
      </PPurchesProtectorRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: (
          // <PPurchesProtectorRoute>
          <HomePage />
          // </PPurchesProtectorRoute>
        ),
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
      {
        path: "summary",
        element: <Summary />,
      },
      {
        path: "/physicalPage",
        element: <Physical />,
      },
      {
        path: "/payment",
        element: (
          <ProtectedRoute>
            <PPurchesProtectorRoute>
              <Payment />
            </PPurchesProtectorRoute>
          </ProtectedRoute>
        ),
      },




      // {
      //   path: "/orderConfirmation",
      //   element: <OrderConfirmation />,
      // },
    ],
  },
  {
    path: "/all-user",
    element: <AllUsers />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  // ============================================>>>> just for testing
  {
    path: "/audios",
    element: <AudioLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Doctors />,
      },
      {
        path: "/audios/dr/:id",
        element: <AudioDescriptions></AudioDescriptions>,
      },
    ],
  },
  // ============================================>>>> just for testing
  {
    path: "/daily-audios",
    element:
      <ProtectedRoute>
        <DailyAudios />,
      </ProtectedRoute>
  },
]);

export default router;
