import MukLogo from "../assets/images/muk_logo.png";
import { Link, useNavigate } from "react-router-dom";
import useUserstore from "../zustand/userStore";
import { BsEscape } from "react-icons/bs";

const NavBar = () => {
  const navigate = useNavigate();
  const user = useUserstore((state) => state.user);

  function handleDelete() {
    localStorage.clear();
    localStorage.setItem(
      "logged_out", // setting the logged_in using zustand
      JSON.stringify(true)
    );
    navigate("/");
  }

  return (
    <nav className="nav shadow flex w-full justify-between items-center bg-white px-3 py-3 border-b-3 border-black  text-green-700 text-xl">
      <div className="logo flex items-center flex-row">
        <Link to={"/teaching-load"}>
          <img
            src={MukLogo}
            width={60}
            height={60}
            alt="makerere_logo"
            loading="lazy"
            className="mr-3"
          />
        </Link>
        <Link to="/">
          <p className="sm:none md:block text-3xl font-semibold">
            Teaching Load
          </p>
        </Link>
      </div>

      <div className="links flex items-center justufy-center gap-5">
        <p className="mr-3 ">Hi, {user.firstName}</p>

        <div className="border-2 border-red-600 rounded text-red-600">
          <button
            className="flex items-center justify-center flex-row py-1 px-4 border-2 rounded"
            onClick={handleDelete}
          >
            <span>
              <BsEscape className="mr-2" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
