import React from "react";
import Sidebar from "./utilities/Sidebar";
import NavBar from "./Navbar";

const Settings = () => {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <p>Settings page</p>
        </div>
      </div>
    </>
  );
};

export default Settings;
