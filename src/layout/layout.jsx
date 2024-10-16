import { Outlet } from "react-router-dom";
import Footer2 from "../shared/Footer2";
import "./Layout.css"
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Set flex container with min height */}
      <div className="area"> {/* Fixed area covering full viewport */}
        <ul className="circles"> 
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex-grow"> {/* This will fill the remaining space */}
        <Outlet />
      </div>
      <Footer2 />
    </div>
  );
};

export default Layout;
