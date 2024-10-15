import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Footer2 from "../shared/Footer2";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Footer2 />
    </div>
  );
};

export default Layout;
