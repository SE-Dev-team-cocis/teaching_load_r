import Logo from "../assets/react.svg";
import { Link } from "react-router-dom";
import useUserstore from "../zustand/userStore";

const NavBar = () => {
  // const user:User =localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null
  // const { user } = useUserstore();
  const user = JSON.parse(localStorage.getItem("user"));

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
        {/* <span className="mr-3 block mt-3">Hi, {user.firstName}</span> */}

        <span className="mr-3 block mt-3">Hi, {user.firstName}</span>

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
