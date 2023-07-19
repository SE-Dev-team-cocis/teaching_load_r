import React from "react";
import useNewLoadStore21 from "../zustand/newLoadStore2";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { assignLoad } from "../zustand/api/apis";
import { toast } from "react-toastify";
import CourseSubgroup from "./load/CourseSubgroup";
import useUserstore from "../zustand/userStore";

type AssignLoad = {
  courses: string;
  staff_id: number;
  CUs: string;
  assignee_id: number;
};

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

const BelowButtons = () => {
  const queryClient = new QueryClient();
  const { id } = useUserstore((state) => state.user);

  const checkedLecturers = useNewLoadStore21((state) => state.checkedLecturers);
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);

  const courseNames: string[] = [];
  const courseCreditUnits: number[] = [];
  const lecturerIDs: number[] = [];
  let lecturerID: number;

  const assignCourses = () => {
    const lecturersIDs: number[] = checkedLecturers.map(
      (lecturer) => lecturer.id
    );
    lecturerID = lecturersIDs[0];
    // console.log("Lecturer ID: ", lecturerID);

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

    // console.log("Data: ", data);
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
  const assignId = 231;
  const notify = (message: string) => {
    toast.success(message, {
      toastId: assignId,
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

  console.log("Mutated response: ", data);

  if (isSuccess) {
    notify(data.message);
    setTimeout(() => {
      window.location.reload();
    }, 2005);
  }

  return (
    <>
      <div className="flex gap-4 justify-center items-center control_buttons ml-4 mt-3">
        <button
          className="text-green-700 px-4 rounded py-2 border-2 border-green-700 hover:bg-green-700 hover:text-white mt-2 hover:scale-95"
          type="button"
          // disabled={true}
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
          onClick={assignCourses}
          disabled={isLoading}
        >
          {isLoading ? "Assigning load..." : "Assign"}
        </button>
        <button
          className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
          type="button"
        >
          Broadcast
        </button>
      </div>
      <dialog data-modal className="rounded-lg px-4 py-5">
        <CourseSubgroup checkedCourse={checkedCourses[0]} />
      </dialog>
    </>
  );
};

export default BelowButtons;
