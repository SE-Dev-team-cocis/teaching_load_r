import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Settings from "./components/Settings";
import HomeAssign from "./components/HomeAssign";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teaching-load" element={<Home />} />
      <Route path="/teaching-load/new" element={<HomeAssign />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
