import useNewLoadStore21, { LecturerLoad } from "../zustand/newLoadStore2";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { Lecturer, Load, assignLoad } from "../zustand/api/apis";
import { toast } from "react-toastify";
import CourseSubgroup, { Course } from "./load/CourseSubgroup";
import useUserstore from "../zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { memo, useEffect, useMemo, useState } from "react";
import { successNotification } from "./utilities/toastify/Toastify";

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

  const checkedLecturers = useNewLoadStore21((state) => state.checkedLecturers);
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const checkedSemesterList = useNewLoadStore21(
    (state) => state.checkedSemesterList
  );

  // console.log("Sem list: ", semesterList)

  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );
  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);
  const setLecturers = useNewLoadStore21((state) => state.setLecturers);

  const [theLoad, setTheLoad] = useState(lecturerLoad);

  const myCheckedCourse: Course = checkedCourses[0];

  const courseNames: string[] = [];
  const courseCreditUnits: number[] = [];

  let lecturerID: number;
  const checkedLecturer = lecturers?.find((lect) =>
    lect.isChecked === true ? lect.id : null
  );
  console.log("Checked lecturer: ", checkedLecturer);

  const myid: any = checkedLecturer?.id;
  const assignCourses = async () => {
    // const lecturersIDs: number[] = checkedLecturers.map(
    //   (lecturer) => lecturer.id
    // );
    // lecturerID = lecturersIDs[0];
    // const lecturer = lecturers.find((lecturer) => lecturer.id === lecturerID);

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

    // setCheckedSemesterList([]);
    // setCheckedCourses([])

    // console.log("Assigm data: ", data);

    // const url = "https://teaching-load-api.onrender.com/api/assign";

    // const response = await axios.post(url, data, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    //   },
    // });

    // console.log("Response data: ", response.data)

    mutate(data); // call the mutation function which will update the assigned load table
    // setCheckedCourses([]);
    // setCheckedLecturers([]);
    // setLecturerLoad(response.data.assignments?.assignments);
    // successNotification(response.data?.message);
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

  let myLoad: any = [];

  function afterLoading() {
    if (data) {
      // const newLoad = data?.teachingLoad;
      setLecturerLoad(data?.assignments?.assignments);
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

      successNotification(data.message);
    }
  }

  // useMemo(() => {
  //   // setCheckedSemesterList(semesterList);
  // }, [])

  useEffect(() => {
    afterLoading();
  }, [data]);

  const user = useUserstore((state) => state.user);
  const broadcastLoad = async (id: number) => {
    try {
      const url = `https://teaching-load-api.onrender.com/api/broadcast/${id}`;
      const response = await axios.put(url);
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
            checkedCourses?.length === 0 || checkedLecturer === undefined
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
