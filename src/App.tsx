import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
// import Register from "./components/Register";
import Home from "./components/Home";
import Settings from "./components/Settings";
import HomeAssign from "./components/HomeAssign";
import Layout from "./components/Layout";
import CentralDashboard from "./components/CentralDashboard";
import SemesterCourses from "./components/load/SemesterCourses";
import UnassignedCourses from "./components/load/UnassignedCourses";
import AdminLayout from "./components/backend/AdminLayout";
import AdminHome from "./components/backend/AdminHome";
import Register from "./features/registration/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/register" element={<Register/>} />

      <Route element={<Layout />}>
        <Route path="/teaching-load" element={<Home />} />
        <Route path="/teaching-load/new" element={<HomeAssign />} />
        <Route path="/teaching-load/central" element={<CentralDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/semestercourses" element={<SemesterCourses />} />
        {/* <Route path="/trial" element={<UnassignedCourses id={1}/>} /> */}
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default App;
