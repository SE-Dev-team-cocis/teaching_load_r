import { NavLink } from "react-router-dom";
import {
  BsBook,
  BsGear,
  BsHouse,
  BsChevronDown,
  BsPlusCircle,
  BsCardChecklist,
} from "react-icons/bs";
import Image from "../../assets/images/person_holder.png";
import useUserstore from "../../zustand/userStore";

type User = {
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  // password: string
  email: string;
};

const Sidebar = () => {
  const user = useUserstore((state) => state.user);
  return (
    <div className="bg-white h-screen rounded-sm pt-5 mb-2 sidebar">
      <div className="profile flex flex-col items-center justify-center border-b-2 border-b-green-700">
        <img src={Image} width={100} height={100} alt="person_image" />
        <div className="pt-2">
          <h4>
            {user.lastName} {user.firstName}
          </h4>
          <p className="text-center">{user.department}</p>
        </div>
      </div>

      <div className="sidebar_links ">
        <NavLink
          end
          to={"/teaching-load"}
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="link_item ">
            <p className="flex items-center mt-1 py-1 px-5">
              <BsHouse className="mr-2" />
              <span>Dashboard</span>
            </p>
          </div>
        </NavLink>
        <NavLink
          end
          to={"/teaching-load/central"}
          // className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="link_item ">
            <p className="flex items-center mt-1 py-1 px-5">
              <BsHouse className="mr-2" />
              <span>Central Dashboard</span>
            </p>
          </div>
        </NavLink>
        <NavLink end to={"/teaching-load/new"}>
          <div className="link_item flex justify-between items-center mt-1 py-1 px-5 ">
            <p className="flex justify-around items-center">
              <span>
                <BsBook className="mr-2" />
              </span>
              Teaching Load
            </p>
            <span className="toggle-load">
              <BsChevronDown className="ml-6" />
            </span>
          </div>
        </NavLink>

        <div
          className="inner-link"
          style={{
            marginLeft: "23px",
            display: "block",
            backgroundColor: "white",
          }}
        >
          <div className="link_item">
            <p className="flex items-center gap-2 mt-1 py-1 px-5">
              <BsPlusCircle />
              <span>New teaching load</span>
            </p>
          </div>
          <NavLink end to={"/semestercourses"}>
            <div className="link_item">
              <p className="flex items-center gap-2 mt-1 py-1 px-5">
                <BsCardChecklist />
                <span>Create semester list</span>
              </p>
            </div>
          </NavLink>
        </div>

        <NavLink end to={"/settings"}>
          <div className="link_item">
            <p className="flex items-center mt-1 py-1 px-5">
              <BsGear className="mr-2" />
              <span>Settings</span>
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
