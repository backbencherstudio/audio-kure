
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <div className="   text-white"> 
      <div className="">
        <App />
      </div>
    </div>
    <ToastContainer />
  </StrictMode>
);
