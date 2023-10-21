import { Outlet } from "react-router-dom";
import Footer from "../Footer";

import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import NavBar from "../Navbar";

const AdminLayout = () => {
  return (
    <>
    <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <AdminNavbar />
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
