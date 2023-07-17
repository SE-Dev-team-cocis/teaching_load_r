import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./Navbar";
import Sidebar from "./utilities/Sidebar";

const Layout = () => {
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

export default Layout;
