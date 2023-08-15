import useNewLoadStore21, { LecturerLoad } from "../zustand/newLoadStore2";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { Load, assignLoad } from "../zustand/api/apis";
import { toast } from "react-toastify";
import CourseSubgroup, { Course } from "./load/CourseSubgroup";
import useUserstore from "../zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useMemo, useState } from "react";

type AssignLoad = {
  courses: string;
  staff_id: number;
  CUs: string;
  assignee_id: number;
};

type ButtonProps = {
  broadcast: boolean;
};

const BelowButtons = ({ broadcast }: ButtonProps) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { id } = useUserstore((state) => state.user);
  const lecturers = useNewLoadStore21((state) => state.lecturers);
  const semesterlist = useNewLoadStore21((state) => state.semesterList);

  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);

  const checkedLecturers = useNewLoadStore21((state) => state.checkedLecturers);
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const checkedSemesterList = useNewLoadStore21(
    (state) => state.checkedSemesterList
  );

  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );

  const [theLoad, setTheLoad] = useState(lecturerLoad);

  const myCheckedCourse: Course = checkedCourses[0];

  const courseNames: string[] = [];
  const courseCreditUnits: number[] = [];

  let lecturerID: number;

  const assignCourses = async () => {
    const lecturersIDs: number[] = checkedLecturers.map(
      (lecturer) => lecturer.id
    );
    lecturerID = lecturersIDs[0];

    checkedCourses.forEach((course) => {
      courseNames.push(course.course_name);
      courseCreditUnits.push(+course.course_cus); // convert to number by adding a + sign
    });

    // Object which stores the post data
    const data: AssignLoad = {
      courses: JSON.stringify(courseNames),
      staff_id: lecturerID,
      CUs: JSON.stringify(courseCreditUnits),
      assignee_id: id,
    };

    mutate(data); // call the mutation function which will update the assigned load table
  };

  const { mutate, isLoading, isSuccess, data } = useMutation({
    mutationFn: (data: AssignLoad) => assignLoad(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["load"],
      });
      queryClient.refetchQueries({
        queryKey: ["load"],
        type: "active",
      });
    },
  });

  const notify = async (message: string) => {
    await toast.success(message, {
      toastId: 231,
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

  const errorNotification = async (message: string) => {
    await toast.error(message, {
      toastId: 232,
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

  let myLoad: any = [];

  function afterLoading() {
    if (data) {
      const newLoad = data?.teachingLoad;
      setLecturerLoad(data?.assignments?.assignments);
      setCheckedLecturers([]);
      setCheckedCourses([]);
      setCheckedSemesterList([]);

      notify(data.message);
    }
  }

  useEffect(() => {
    afterLoading();
  }, [data]);

  const user = useUserstore((state) => state.user);
  const broadcastLoad = async (id: number) => {
    console.log(id);
    try {
      const url = `https://teaching-load-api.onrender.com/api/broadcast/${id}`;
      const response = await axios.put(url);
      //Add toastify asynchronously
      navigate("/teaching-load/central");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex gap-4 justify-center items-center control_buttons ml-4 mt-3">
        <button
          className="text-green-700 px-4 rounded py-2 border-2 border-green-700 hover:bg-green-700 hover:text-white mt-2 hover:scale-95 disabled:opacity-50"
          type="button"
          // disabled={checkedCourses?.length === 0}
          disabled={checkedSemesterList?.length === 0}
          onClick={() => {
            const modal = document.querySelector(
              "[data-modal]"
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          New Subgroup
        </button>
        <button
          className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          type="button"
          onClick={() => assignCourses()}
          disabled={
            checkedCourses?.length === 0 || checkedLecturers?.length === 0
            // checkedSemesterList?.length === 0 || checkedLecturers?.length === 0
          }
        >
          {isLoading ? "Assigning load..." : "Assign"}
        </button>
        <button
          className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50"
          type="button"
          // disabled={broadcast === false ? true : true}
          disabled={!broadcast}
          onClick={() => broadcastLoad(user.id)}
        >
          Broadcast
        </button>
      </div>
      <dialog data-modal className="rounded-lg px-4 py-5 my-subgroup">
        <CourseSubgroup checkedCourse={myCheckedCourse} />
      </dialog>
    </>
  );
};

export default BelowButtons;
