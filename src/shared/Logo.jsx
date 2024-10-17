import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className="  ">
      <Link className="flex" to={"/"}>
        <img className="h-12 my-3" src={logo} alt="" />
        <span className="flex flex-col ml-1 font-bold text-2xl justify-center font-serif">
          healer
        </span>
      </Link>
    </div>
  );
};

export default Logo;
