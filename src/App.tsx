import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Settings from "./components/Settings";
import HomeAssign from "./components/HomeAssign";
import Layout from "./components/Layout";
import CentralDashboard from "./components/CentralDashboard";
import SemesterCourses from "./components/load/SemesterCourses";
import DepartmentDetails from "./components/load/DepartmentDetails";
import Trial from "./components/Trial";
import UnassignedCourses from "./components/load/UnassignedCourses";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/teaching-load" element={<Home />} />
        <Route path="/teaching-load/new" element={<HomeAssign />} />
        <Route path="/teaching-load/central" element={<CentralDashboard />} />
        <Route
          path="/teaching-load/central/:name"
          element={<DepartmentDetails />}
        />

        <Route path="/settings" element={<Settings />} />
        <Route path="/semestercourses" element={<SemesterCourses />} />
        <Route path="/trial" element={<UnassignedCourses />} />
      </Route>
    </Routes>
  );
};

export default App;
