import Logo from "../assets/react.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav shadow flex w-full justify-between items-center bg-white px-3 py-3 border-b-3 border-black  text-green-700 text-xl">
      <div className="logo flex items-center flex-row">
        <Link to={"/"}>
          <img
            src={Logo}
            width={60}
            height={60}
            // alt="makerere_logo"
            className="mr-3"
          />
        </Link>
        <Link to="/">
          <p className="sm:none md:block text-3xl font-semibold">
            Teaching Load
          </p>
        </Link>
      </div>

      {/* <div>
        <p className="uppercase text-2xl">Teaching load</p>
      </div> */}

      <div className="links flex gap-5">
        {/* <div className="flex items-center justify-center flex-col">
          <BsHouse width={30} />
          <Link href={"/"}>Home</Link>
        </div>
        <div className="flex items-center justify-center flex-col">
          <BsGear width={30} />
          <Link href={"/mysettings"}>Settings</Link>
        </div> */}
        {/* <div className="flex items-center justify-center flex-col"> */}
        <div className="border-red-600">
          <Link to={"/logout"} className="">
            <button className="flex items-center justify-center flex-row py-1 px-2 border-2 rounded">
              {/* <span>
                <BsEscape className="mr-2" />
              </span> */}
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
