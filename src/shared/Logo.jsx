import logo from "../assets/images/H4U LOGO.svg";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className=" px-4 xl:px-0 ">
      <Link className="flex items-center " to={"/"}>
        <img className=" my-3 h-16 rounded-md " src={logo} alt="" />
        {/* <span className="flex ml-1 font-extrabold text-2xl justify-center font-serif togoTest_style ">
          HYPNO<span className="text-4xl " >4</span>U
        </span> */}
      </Link>
    </div>
  );
};

export default Logo;
