import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    // <div>
    //   <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
    // </div>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
