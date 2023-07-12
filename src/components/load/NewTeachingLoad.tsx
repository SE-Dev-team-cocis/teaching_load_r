import { Link } from "react-router-dom";

// import Sidebar from "../utilities/Sidebar";
import Sidebar from "../utilities/Sidebar";
import NavBar from "../Navbar";
import Footer from "../Footer";

import CourseUnits from "./CourseUnits";
import Lecturers from "./Lecturers";
import TeachingLoadSummary from "./TeachingLoadSummary";
import useLecturerStore from "../../zustand/lecturersStore";

export default function NewTeachingLoad() {
  const { realLecturers } = useLecturerStore();
  const assignCourses = () => {
    const CheckedOnes = realLecturers.filter((lecturer) =>
      lecturer.isChecked ? lecturer : null
    );
    console.log("checked lecturers: ", CheckedOnes);
  };
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <div className="buttons border-b-2 border-b-green-700 pt-4">
            <div className="flex gap-4">
              <Link to={"/teachingload/new"} className="ml-5 mb-3">
                <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                  New
                </button>
              </Link>
              {/* <Link to={"/teachingload/new"} className="ml-5 mb-3">
                <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                  New
                </button>
              </Link> */}
              <Link to={"/teachingload/new"} className="ml-5 mb-3">
                <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                  Cancel
                </button>
              </Link>
              {/* <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                    Cancel
                </button> */}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <CourseUnits />
            <Lecturers />
            <TeachingLoadSummary />
          </div>

          <div className="flex gap-4 justify-center items-center control_buttons ml-4 mt-3">
            <button
              className="text-green-700 px-4 rounded py-2 border-2 border-green-700 hover:bg-green-700 hover:text-white mt-2 hover:scale-95"
              type="button"
            >
              New Subgroup
            </button>
            <button
              className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
              type="button"
              onClick={assignCourses}
            >
              Assign
            </button>
            <button
              className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
              type="button"
            >
              Broadcast
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
