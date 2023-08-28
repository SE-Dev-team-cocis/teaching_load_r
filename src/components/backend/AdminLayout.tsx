import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
