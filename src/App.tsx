import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

import Home from "./components/Home";
import NewTeachingLoad from "./components/load/NewTeachingLoad";
import Settings from "./components/Settings";
import NewLogin from "./components/NewLogin";
import BestInput from "./components/utilities/BestInput";
import MyTextInput from "./components/utilities/MyTextInput";
import NewInput from "./components/utilities/form/NewInput";
import Register2 from "./components/Register2";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<BestInput />} /> */}
      {/* <Route path="/" element={<MyTextInput />} />
       */}
      <Route path="/" element={<NewInput />} />

      <Route path="/register" element={<Register />} />
      {/* <Route path="/register" element={<Register2 />} /> */}

      <Route path="/teaching-load" element={<Home />} />
      <Route path="/teaching-load/new" element={<NewTeachingLoad />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default App;
