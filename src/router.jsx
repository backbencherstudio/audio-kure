import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage"; 
import ErrorPage from "./pages/Error/ErrorPage";

import PhysicalQuistionPage1 from "./pages/PhysicalQuestionPage1";
import PhysicalQuistionPage2 from "./pages/PhysicalQuestionPage2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement:<ErrorPage/>,
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
