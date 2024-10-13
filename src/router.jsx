import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import PhysicalQuistionPage1 from "./pages/PhysicalQuestionPage1";
import PhysicalQuistionPage2 from "./pages/PhysicalQuestionPage2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
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
        path: "question-mental-1",
        element: <PhysicalQuistionPage2 />,
      },
    ],
  },
]);

export default router;
