import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Settings from "./components/Settings";
import HomeAssign from "./components/HomeAssign";
import Layout from "./components/Layout";
import CentralDashboard from "./components/CentralDashboard";
import SemesterCourses from "./components/load/SemesterCourses";
// import MuzTrial from "./components/MuzTrial";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route path="/teaching-load" element={<Home />} />
        <Route path="/teaching-load/new" element={<HomeAssign />} />
        <Route path="/teaching-load/central" element={<CentralDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/semestercourses" element={<SemesterCourses />} />
      </Route>
        {/* <Route path="/trial" element={<MuzTrial />} /> */}
    </Routes>
  );
};

export default App;
