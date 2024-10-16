import { Outlet } from "react-router-dom";
import Footer2 from "../shared/Footer2";

const Layout = () => {
  return (
    <div>
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer2 />
    </div>
  );
};

export default Layout;
