import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";
import PhysicalQuistionPage1 from "./pages/Questions/PhysicalQuestionPage1";
import EmotionalQuestionPage1 from "./pages/Questions/EmotionalQuestionPage1";
import PhysicalQuestionPage2 from "./pages/Questions/PhysicalQuestionPage2";
import EmotionalQuestionPage2 from "./pages/Questions/EmotionalQuestionPage2";
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
        element: <PhysicalQuistionPage1 />,
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
    ],
  },
]);

export default router;
