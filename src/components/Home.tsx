import { Link } from "react-router-dom";
import CourseUnits from "./load/CourseUnits";
import Lecturers from "./load/Lecturers";
import TeachingLoadSummary from "./load/TeachingLoadSummary";
// import Sidebar from "../utilities/Sidebar";
import Sidebar from "./utilities/Sidebar";
import Footer from "./Footer";
import NavBar from "./Navbar";
import LecturersTrial from "./load/LecturersTrial";
export default function Home() {
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <div className="buttons border-b-2 border-b-green-700 pt-4">
            <div className="flex gap-4">
              <Link to={"/teaching-load/new"} className="ml-5 mb-3">
                <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                  New
                </button>
              </Link>
              {/* <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                    Cancel
                </button> */}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <CourseUnits />
            {/* <Lecturers /> */}
            <LecturersTrial />
            <TeachingLoadSummary />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
