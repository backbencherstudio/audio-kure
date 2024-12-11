import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../redux/fetures/auth/authSlice";
const Logo = () => {

  const currentUser = useSelector(selectCurrentUser);
  
  return (
    <div className=" px-4 xl:px-0 container mx-auto ">

      <div className="flex w-full  items-center gap-20" >

        <div className="w-full">
          <Link className="flex flex-col  items-center lg:gap-2 xl:gap-0  lg:items-start relative" to={"/"}>
            <h1 className="text-4xl  py-3 uppercase font-serif font-bold ">Hypno4u <sup className="text-xs absolute top-3 ml-1">TM</sup></h1>
            <span className="flex ml-1 font-extrabold text-xs md:text-xl justify-center font-serif ">
              Experience a moment of calm
            </span>
          </Link>
        </div>
        {
          currentUser?.email === "mybesthealer@gmail.com" &&
          <Link className="block  " to="/admin/users" >Dashboard</Link>
        }
      </div>

    </div>
  );
};

export default Logo;
