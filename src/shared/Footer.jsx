import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="container mx-auto  justify-between items-center pt-24 pb-2">
      <div className="lg:flex-row flex justify-between flex-col items-center ">
        <div className="    justify-between items-center">
          <Logo />
        </div>
        <div className="flex flex-col font-semibold text-[1rem]">
          <div>
            <Link to="/privacy-policy" className="mx-2">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="mx-2">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
