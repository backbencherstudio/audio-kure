import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/Error/ErrorPage";

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
    ],
  },
]);

export default router;
