import { fetchCourses, fetchLecturers, fetchLoad } from "../zustand/api/apis";

import LoadSummary from "./load/LoadSummary";
import { useQuery } from "@tanstack/react-query";

import Lecturers from "./load/Lecturers";
import Courses from "./load/Courses";

import BelowButtons from "./BelowButtons";

import useUserstore from "../zustand/userStore";
import axios from "axios";
import { toast } from "react-toastify";

type Load = {
  id: number;
  staff_id: number;
  courses: string;
  CUs: string;
  staffName?: Lecturer;
};

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

  // console.log("Lecturers from use query,", lecturers);

  const { data: courses, isSuccess: loadedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  let myCourses: Course[] = [];
  if (loadedCourses) {
    myCourses = courses;
  }

  // console.log("My courses : ", myCourses);

  const { data: loads, isSuccess: loadedLoads } = useQuery({
    queryKey: ["load"],
    queryFn: fetchLoad,
  });

  console.log("myInitial load: ", loads);

  let myTotalLoad: Load[] = [];

  if (loadedLoads) {
    myTotalLoad = loads;
  }

  // const totalLoad: TotalLoadDetails[] = newLoad?.map((load) => {
  const totalLoad = myTotalLoad?.map((load: Load) => {
    // console.log("Load: ", load);
    // const totalCus = JSON.parse(load.CUs);
    // const myArray: number[] = load.CUs.length
    //   return cu;
    // });

    // console.log("My items length: ", load.CUs[0]);
    return {
      ...load,
      total: load.CUs.reduce((a: number, b: number) => a + b, 0),
      id: load.id,
      staffId: load.staff_id,
      // staffName: newLecturers?.find((lecturer) => {
      staffName: lecturers?.find((lecturer) => {
        if (lecturer.id === load.staff_id) {
          return `${lecturer.firstName} ${lecturer.lastName}`;
        }
      }),
      assignee_id: load.staff_id,
    };
  });

  console.log("Total load", totalLoad);

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
    modal?.close(); // closing the dialog box

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
  // console.log("Can broadcast: ", broadcast);

  return (
    <>
      <div className="col-span-3">
        <div className="buttons border-b-2 border-b-green-700 pt-4">
          <div className="flex items-center justify-end">
            <button
              className="btn mb-3 mr-4 hover:bg-red-600 outline-none hover:text-white px-5 py-2 border-2 border-red-400 rounded disabled:opacity-30 disabled:bg-red-600 disabled:text-white"
              disabled={totalLoad?.length === 0}
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
          {/* <Courses courses={courses} /> */}
          <Courses courses={myCourses} />

          {/* <Lecturers lecturers={newLecturers} /> */}
          <Lecturers lecturers={myLecturers} />

          <LoadSummary totalLoad={totalLoad} />
        </div>

        <BelowButtons broadcast={broadcast} />

        <dialog data-modal className="rounded-lg p-5 outline-none mydialog">
          <div className="confirm">
            <p className=" text-lg mb-3">
              Are you sure you want to delete all the load <br /> you assigned
              this semester? <br />
              <span className="block mt-2">
                <span className="text-lg font-semibold"> Note:</span> This
                process <span className="underline">cannot</span> be reversed
                once you <br />
                agree to delete
              </span>
            </p>

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
