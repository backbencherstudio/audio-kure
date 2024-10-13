// src/main.jsx

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
   <div className="bg-[#07001C] min-h-screen text-white">
   <App />
   </div>
  </StrictMode>
);
