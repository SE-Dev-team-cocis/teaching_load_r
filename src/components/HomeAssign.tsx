import { fetchCourses, fetchLecturers, fetchLoad } from "../zustand/api/apis";

import LoadSummary from "./load/LoadSummary";
import { useQuery } from "@tanstack/react-query";

import Lecturers from "./load/Lecturers";
import Courses from "./load/Courses";

import BelowButtons from "./BelowButtons";

import useUserstore from "../zustand/userStore";
import axios from "axios";
import { toast } from "react-toastify";

// type Lecturer = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   department: string;
//   role: string;
// };

type RealLecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  isChecked?: boolean;
};

// type Load = {
//   id: number;
//   staff_id: number;
//   courses: string;
//   CUs: string;
//   assignee_id: number;
// };
type NewLoad = {
  id: number;
  staff_id: number;
  courses: string[];
  CUs: number[];
  assignee_id: number;
};

// type LecturerDetails = {
//   name: string;
//   id: number;
// };

// type TotalLoadDetails = {
//   total: number;
//   id: number;
//   staffId: number;
//   staffName: object;
//   assignee_id: number;
// };

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

type DeleteAllLoad = {
  assignee_id: number;
  semester: number;
};

export default function HomeAssign() {
  const { data: lecturers, isLoading } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturers,
  });

  const newLecturers: RealLecturer[] = lecturers?.map((lecturer) => {
    // const newLecturers = lecturers?.map((lecturer) => {
    return { ...lecturer, isChecked: false };
  });

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const newCourses: Course[] = courses?.map((course) => {
    // const newCourses = courses?.map((course) => {
    return { ...course, isChecked: false };
  });
  console.log("Courses with course subgroups", newCourses);

  const { data: load } = useQuery({
    queryKey: ["load"],
    queryFn: fetchLoad,
  });

  const newLoad: NewLoad[] = load?.map((load) => {
    // const newLoad = load?.map((load) => {
    return {
      ...load,
      courses: JSON.parse(load.courses),
      CUs: JSON.parse(load.CUs),
    };
  });

  // const totalLoad: TotalLoadDetails[] = newLoad?.map((load) => {
  const totalLoad = newLoad?.map((load) => {
    return {
      total: load.CUs.reduce((a: number, b: number) => a + b, 0),
      id: load.id,
      staffId: load.staff_id,
      staffName: newLecturers?.find((lecturer) => {
        if (lecturer.id === load.staff_id) {
          return `${lecturer.firstName} ${lecturer.lastName}`;
        }
      }),
      assignee_id: load.assignee_id,
    };
  });

  const { id } = useUserstore((state) => state.user);

  const notify = (message: string) => {
    toast.success(message, {
      toastId: 23,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const deleteAllLoad = async () => {
    const assignee_id: number = id;
    const semester: number = 1;

    const data = {
      assignee_id,
      semester,
    };

    try {
      const url = "http://127.0.0.1:8000/api/delete";
      const response = await axios.delete(url, { data });
      if (response.status === 200) {
        notify(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2007);
      }
    } catch (error) {}
  };

  if (isLoading) return <p>Loading...</p>;

  const broadcast: boolean = totalLoad?.length === 0 ? false : true;
  console.log("Can broadcast: ", broadcast);

  return (
    <div className="col-span-3">
      <div className="buttons border-b-2 border-b-green-700 pt-4">
        <div className="flex items-center justify-end">
          <button
            onClick={deleteAllLoad}
            className="btn mb-3 mr-4 hover:bg-red-600 outline-none hover:text-white px-5 py-2 border-2 border-red-400 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <Courses courses={newCourses} />
        <Lecturers lecturers={newLecturers} />
        <LoadSummary totalLoad={totalLoad} />
      </div>

      <BelowButtons broadcast={broadcast} />
    </div>
  );
}
