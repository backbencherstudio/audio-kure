import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer2() {
  return (
    <footer className="lg:container mx-auto px-3  justify-between items-center py-5">
      <div className="flex justify-between mt-3 ">
        <p className="text-xs text-gray-400 font-medium">
          © 2024 Healer. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 font-medium">
          Disclaimer: Results may vary from person to person
        </p>
      </div>
    </footer>
  );
}
export default Footer2;
