import { Link } from "react-router-dom";
import MukLogo from "../../assets/images/muk_logo.png";
import Form from "./Form";

const Login = () => {
  return (
    <div className="login_form border-2 border-green-700 bg-white rounded-lg p-5 ">
      <header className="flex justify-center items-center flex-col">
        <img
          src={MukLogo}
          alt="logo"
          style={{ width: "200px", height: "200px" }}
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
          <Form />
          <p className="mt-3 text-dark">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-green-700">Register</span>
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
