import { useNavigate, Link } from "react-router-dom";
import useUserstore from "../../zustand/userStore";
import MukLogo from "../../assets/images/muk_logo.png"
import Form from "./Form";


const Register = () => {
  return (
    <div className="register_form border-2 border-green-700 rounded-lg px-5">
      <header className="flex justify-center items-center flex-col">
        <img
          src={MukLogo}
          alt="logo"
          style={{ width: "150px", height: "150px" }}
          className="me-5 muk_logo"
          loading="lazy"
        />
        <p className="text-green-700 font-semibold text-xl">
          MAKERERE UNIVERSITY
        </p>
        <p className="text-green-700 font-semibold">Teaching Load</p>
      </header>
      <div className="">
        <div className=" bg-white mt-2 rounded-md mb-5">
            <h4 className="text-green-700 text-center text-xl font-semibold mb-5">
              Create an account
            </h4>

      <Form />
           
          <p className="mt-3 text-dark">
            Already have an account?
            <Link to="/">
              <span className="text-green-700 mx-2">Login</span>
            </Link>
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
