import {
  Load,
  fetchCourses,
  fetchLecturers,
  fetchLoad,
  fetchSemesterList,
} from "../zustand/api/apis";

import LoadSummary from "./load/LoadSummary";
import { useQuery } from "@tanstack/react-query";
import Lecturers from "./load/Lecturers";
import Courses from "./load/Courses";
import BelowButtons from "./BelowButtons";
import useUserstore from "../zustand/userStore";
import axios from "axios";
import { toast } from "react-toastify";
import useNewLoadStore21 from "../zustand/newLoadStore2";
import { useEffect, useMemo } from "react";

// export type Load = {
//   id: number;
//   staff_id: number;
//   courses: string;
//   CUs: number[];
//   // Cus: string;

//   staffName?: Lecturer;
// };

type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  isChecked: boolean;
};

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

export type TotalLoad = {
  total: number;
  id: number;
  staffId: number;
  staffName: Lecturer;
  assignee_id: number;
};

export default function HomeAssign() {
  const modal = document.querySelector(".mydialog") as HTMLDialogElement;
  const { id } = useUserstore((state) => state.user);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);

  const {
    data: lecturers,
    isLoading,
    isSuccess: loadedLecturers,
  } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturers,
  });

  let myLecturers: Lecturer[] = [];
  if (loadedLecturers) {
    myLecturers = lecturers;
  }

  const { data: courses, isSuccess: loadedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  let myCourses: Course[] = [];
  if (loadedCourses) {
    myCourses = courses;
  }

  const { data: loads, isSuccess: loadedLoads } = useQuery({
    queryKey: ["load"],
    queryFn: fetchLoad,
  });

  useMemo(() => {
    setLecturerLoad(loads);
  }, []);

  const { data: semesterlist, isSuccess: semesterList } = useQuery({
    queryKey: ["semesterlist"],
    queryFn: fetchSemesterList,
  });

  let fetchedSemesterList: Course[] = [];
  if (semesterList) {
    fetchedSemesterList = semesterlist;
  }

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
    modal?.close(); // closing the dialog box

    const assignee_id: number = id;
    const semester: number = 1;

    const data = {
      assignee_id,
      semester,
    };

    try {
      const url = "https://teaching-load-api.onrender.com/api/delete";
      const response = await axios.delete(url, { data });

      console.log("All load: ", response.data);
      
    } catch (error) {}
  };

  if (isLoading)
    return <p className="text-center mt-4 font-medium text-lg">Loading...</p>;

  var broadcast: boolean = loads?.length === 0 ? false : true;

  return (
    <>
      <div className="col-span-3">
        <div className="buttons border-b-2 border-b-green-700 pt-4">
          <div className="flex items-center justify-end">
            <button
              className="btn mb-3 mr-4 hover:bg-red-600 outline-none hover:text-white px-5 py-2 border-2 border-red-400 rounded disabled:opacity-30 disabled:bg-red-600 disabled:text-white"
              disabled={loads?.length === 0}
              onClick={() => {
                const modal = document.querySelector(
                  ".mydialog"
                ) as HTMLDialogElement;
                modal?.showModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <Courses courses={myCourses} />
          <Lecturers lecturers={myLecturers} />
          <LoadSummary />
        </div>

        <BelowButtons broadcast={broadcast} />

        <dialog data-modal className="rounded-lg p-5 outline-none mydialog">
          <div className="confirm">
            <div className=" text-lg mb-3">
              Are you sure you want to delete all the load <br /> you assigned
              this semester? <br />
              <span className="block mt-2">
                <span className="text-lg font-semibold"> Note:</span> This
                process <span className="underline">cannot</span> be reversed
                once you <br />
                agree to delete
              </span>
            </div>

            <div className="flex justify-around items-center gap-5">
              <button
                className="w-full text-white px-4 rounded py-2 bg-red-600 mt-2 hover:scale-95 outline-none"
                onClick={() => deleteAllLoad()}
              >
                Yes
              </button>
              <button
                className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                onClick={() => {
                  modal?.close();
                }}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
