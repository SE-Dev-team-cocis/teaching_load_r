import { Link } from "react-router-dom";
import { BsBook, BsGear, BsHouse } from "react-icons/bs";
import Image from "../../assets/images/person_holder.png";

const Sidebar = () => {
  return (
    <div className="bg-white h-screen rounded-sm pt-5 mb-2">
      <div className="profile flex flex-col items-center justify-center border-b-2 border-b-green-700">
        <img src={Image} width={100} height={100} alt="person_image" />
        <div className="pt-2">
          <h4>Dr. Loor Jacobson</h4>
          <p className="text-center">Networks dept</p>
        </div>
      </div>

      <div className="sidebar_links ">
        <Link to={"/"}>
          <div className="link_item">
            <p className="flex items-center mt-1 py-1 px-5 ">
              <BsHouse className="mr-2" />
              <span>Home</span>
            </p>
          </div>
        </Link>
        <Link to={"/teaching-load"}>
          <div className="link_item">
            <p className="flex items-center mt-1 py-1 px-5 ">
              <BsBook className="mr-2" />
              {/* <Link href={"/teachingload"}>Teaching Load</Link> */}
              <span>Teaching Load</span>

              {/* <Link href={"/teachingload"}>Teaching Load</Link> */}
            </p>
          </div>
        </Link>
        <Link to={"/settings"}>
          <div className="link_item">
            <p className="flex items-center mt-1 py-1 px-5">
              <BsGear className="mr-2" />
              <span>Settings</span>
              {/* <Link href={"/mysettings"}>Settings</Link> */}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
