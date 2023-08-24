import useNewLoadStore21 from "../zustand/newLoadStore2";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { Lecturer, Load, assignLoad } from "../zustand/api/apis";
import CourseSubgroup, { Course } from "./load/CourseSubgroup";
import useUserstore from "../zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { successNotification, errorNotification } from "./utilities/toastify/Toastify";

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

  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const semesterList = useNewLoadStore21((state) => state.semesterList);
  const lecturers = useNewLoadStore21((state) => state.lecturers);

  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  
  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );

  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);
  const setLecturers = useNewLoadStore21((state) => state.setLecturers);

  const myCheckedCourse: Course = checkedCourses[0];

  const courseNames: string[] = [];
  const courseCreditUnits: number[] = [];

  const checkedLecturer = lecturers?.find((lect) =>
    lect.isChecked === true ? lect.id : null
  );

  const myid: any = checkedLecturer?.id;
  const [assigning, setAssigning] = useState(false)
  const [broadcasting, setBroadcasting] = useState(false)

  // Function to assign courses
  const assignCourses = async () => {

    checkedCourses.forEach((course) => {
      courseNames.push(course.course_name);
      courseCreditUnits.push(+course.course_cus); // convert to number by adding a + sign
    });

    // Object which stores the post data
    const data: AssignLoad = {
      courses: JSON.stringify(courseNames),
      staff_id: myid,
      CUs: JSON.stringify(courseCreditUnits),
      assignee_id: id,
    };


    const url = "https://teaching-load-api.onrender.com/api/assign";
    try{
      
    setAssigning(true)
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
      },
    });
    setAssigning(false)
    setLecturerLoad(response.data?.assignments?.assignments);
    setCheckedLecturers([]);
    setCheckedCourses([]);
    setSemesterList(
      semesterList.map((course: Course) => {
        return { ...course, isChecked: false };
      })
    );
    setLecturers(
      lecturers.map((lecturer: Lecturer) => {
        return { ...lecturer, isChecked: false };
      })
    );

    successNotification(response.data?.message); 

    }catch(error){
      errorNotification("Unable to assign load")
      console.error(error)
    }

    // mutate(data); // call the mutation function which will update the assigned load table
  };


  const user = useUserstore((state) => state.user);
  const broadcastLoad = async (id: number) => {
    setBroadcasting(true)
    try {
      const url = `https://teaching-load-api.onrender.com/api/broadcast/${id}`;
      const response = await axios.put(url);
      setBroadcasting(false)
      successNotification("The assigned load has been successfully broadcast");
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
          disabled={checkedCourses?.length === 0}
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
            checkedCourses?.length === 0 || checkedLecturer === undefined
            // checkedSemesterList?.length === 0 || checkedLecturers?.length === 0
          }
        >
          {assigning ? "Assigning load..." : "Assign"}
        </button>
        <button
          className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50"
          type="button"
          // disabled={broadcast === false ? true : true}
          disabled={!broadcast}
          onClick={() => broadcastLoad(user.id)}
        >
          {broadcasting ? "Broadcasting load...": "Broadcast"}
        </button>
      </div>
      <dialog data-modal className="rounded-lg px-4 py-5 my-subgroup">
        <CourseSubgroup checkedCourse={myCheckedCourse} />
      </dialog>
    </>
  );
};

export default BelowButtons;
