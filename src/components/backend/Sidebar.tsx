import { Link, NavLink } from "react-router-dom";
import {
  BsBook,
  BsGear,
  BsHouse,
  BsChevronDown,
  BsPlusCircle,
  BsCardChecklist,
} from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import Image from "../../assets/images/person_holder.png";
import useUserstore from "../../zustand/userStore";
import { useEffect, useMemo, useState } from "react";

const Sidebar = () => {
  const route = window.location.pathname;
  const user = useUserstore((state) => state.user);
  const [open, setOpen] = useState(false);

//   useMemo(() => {
//     if (route === "/teaching-load/new") {
//       setOpen(true);
//     }
//   }, [route]);

  return (
    <div className="bg-white h-screen rounded-sm pt-5 sidebar">
      <div className="profile flex flex-col items-center justify-center border-b-2 border-b-green-700">
        <img src={Image} width={100} height={100} alt="person_image" />
        <div className="pt-2 flex flex-col items-center">
          <p>
            {user.lastName} {user.firstName}
          </p>
          <p className="text-center">{user.department}</p>
        </div>
      </div>

      <div className="sidebar_links ">
        <NavLink
          end
          to={"/admin"}
          // className={({ isActive }) => (isActive ? "active" : "")}
        //   onClick={() => setOpen(false)}
        >
          <div className="link_item ">
            <p className="flex items-center mt-1 py-1 px-5">
              <BsHouse className="mr-2" />
              <span>Staff</span>
            </p>
          </div>
        </NavLink>
        <NavLink
          end
          to={"/teaching-load/central"}
          onClick={() => setOpen(false)}
        >
          <div className="link_item ">
            <p className="flex items-center mt-1 py-1 px-5">
              <RxDashboard className="mr-2" />
              <span>Central Dashboard</span>
            </p>
          </div>
        </NavLink>

        <Link
          to={"/teaching-load/new"}
          onClick={() => setOpen((prev) => !prev)}
          className={`${
            open ? "bg-green-200" : ""
          } link_item flex justify-between items-center mt-1 py-1 px-5 cursor-pointer`}
        >
          <p className={` flex justify-around items-center`}>
            <span>
              <BsBook className="mr-2" />
            </span>
            Teaching Load
          </p>
          <span className="toggle-load">
            <BsChevronDown
              className={`${open ? "rotate-180 transition-200" : ""} ml-6`}
            />
          </span>
        </Link>

        {open && (
          <div className="inner-link block transition-400">
            <NavLink end to={"/teaching-load/new"}>
              <div
                className="link_item"
                style={{
                  paddingLeft: "23px",
                }}
              >
                <p className="flex items-center gap-2 mt-1 py-1 px-5">
                  <BsPlusCircle />
                  <span>New teaching load</span>
                </p>
              </div>
            </NavLink>
            <NavLink end to={"/semestercourses"}>
              <div
                className="link_item"
                style={{
                  paddingLeft: "23px",
                }}
              >
                <p className="flex items-center gap-2 mt-1 py-1 px-5">
                  <BsCardChecklist />
                  <span>Create semester list</span>
                </p>
              </div>
            </NavLink>
          </div>
        )}

        <NavLink end to={"/settings"} onClick={() => setOpen(false)}>
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
