import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";
import PhysicalQuistionPage1 from "./pages/PhysicalQuestionPage1";
import PhysicalQuistionPage2 from "./pages/PhysicalQuestionPage2";
import EmotionalQuestionPage1 from "./pages/EmotionalQuestionPage1";
import EmotionalQuestionPage2 from "./pages/EmotionalQuestionPage2";

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
        element: <PhysicalQuistionPage2 />,
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
