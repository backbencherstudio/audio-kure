import ProgressBar from "@ramonak/react-progress-bar";
import logo from "./../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Logo from "../Logo";
const ProgressBars = ({ value, navigate, page }) => {
  console.log(navigate);

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        <Logo />
        <div>
          <Link className="flex justify-center" to={"/"}>
            {" "}
            <img className="h-12 my-3" src={logo} alt="" />
            <span className="flex flex-col font-bold text-2xl justify-center font-serif">
              healer
            </span>
          </Link>
        </div>
        <div className="font-bold">{page} of 2</div>
      </div>
      <ProgressBar
        className=" "
        completed={value ? value : 10}
        labelColor="transparent"
        labelAlignment="center"
        height="8px"
        bgColor="#C4AFFF"
        baseBgColor="#2D2C2C"
      />
    </div>
  );
};

export default ProgressBars;
