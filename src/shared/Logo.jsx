import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <div className=" px-4 xl:px-0 container mx-auto ">
      <Link className="flex flex-col items-center lg:gap-2 xl:gap-0  lg:items-start relative " to={"/"}>
        {/* <img className=" my-3 h-16 rounded-md " src={logo} alt="" /> */}
        <h1 className="text-4xl  py-3 uppercase font-serif font-bold ">Hypno4u <sup className="text-xs absolute top-3 ml-1">TM</sup></h1>
        <span className="flex ml-1 font-extrabold text-xs md:text-xl justify-center font-serif ">
          Experience a moment of calm
        </span>
      </Link>
    </div>
  );
};

export default Logo;
