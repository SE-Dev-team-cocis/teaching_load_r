import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Home from "./components/Home";
import NewTeachingLoad from "./components/load/NewTeachingLoad";
import Settings from "./components/Settings";
import NewHome from "./components/NewHome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewHome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teaching-load" element={<Home />} />
      <Route path="/teaching-load/new" element={<NewTeachingLoad />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
