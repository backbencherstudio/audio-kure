function Footer2() {
  return (
    <footer className=" flex container flex-col lg:flex-row mx-auto mb-5 items-center w-full justify-between px-2 md:px-4 xl:px-0">
      <div className="justify-between items-center mt-3 flex lg:flex-row flex-col">
        <p className="text-xs text-white font-medium">
        Copyright &copy; {new Date().getFullYear()} HYPNO 4 U. All rights reserved.
        </p>
      </div>
      <p className="text-xs mt-1 text-white font-medium">
        Disclaimer: Results may vary from person to person
      </p>
    </footer>
  );
}
export default Footer2;
