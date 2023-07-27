import useNewLoadStore21 from "../zustand/newLoadStore2";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { assignLoad } from "../zustand/api/apis";
import { toast } from "react-toastify";
import CourseSubgroup, { Course } from "./load/CourseSubgroup";
import useUserstore from "../zustand/userStore";

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
  const queryClient = new QueryClient();
  const { id } = useUserstore((state) => state.user);

  const checkedLecturers = useNewLoadStore21((state) => state.checkedLecturers);
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );

  const myCheckedCourse: Course = checkedCourses[0];

  const courseNames: string[] = [];
  const courseCreditUnits: number[] = [];

  let lecturerID: number;

  const assignCourses = () => {
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

  const notify = (message: string) => {
    toast.success(message, {
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

  if (isSuccess) {
    if (data.status === false) {
      errorNotification(data.message);
      setTimeout(() => {
        setCheckedLecturers([]);
        setCheckedCourses([]);
        window.location.reload();
      }, 2005);
    } else {
      notify(data.message);
      setTimeout(() => {
        setCheckedLecturers([]);
        setCheckedCourses([]);
        window.location.reload();
      }, 2005);
    }
  }

  return (
    <>
      <div className="flex gap-4 justify-center items-center control_buttons ml-4 mt-3">
        <button
          className="text-green-700 px-4 rounded py-2 border-2 border-green-700 hover:bg-green-700 hover:text-white mt-2 hover:scale-95 disabled:opacity-50"
          type="button"
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
          onClick={assignCourses}
          disabled={
            checkedCourses?.length === 0 || checkedLecturers?.length === 0
          }
        >
          {isLoading ? "Assigning load..." : "Assign"}
        </button>
        <button
          className="text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50"
          type="button"
          // disabled={broadcast === false ? true : true}
          disabled={!broadcast}
        >
          Broadcast
        </button>
      </div>
      <dialog data-modal className="rounded-lg px-4 py-5">
        <CourseSubgroup checkedCourse={myCheckedCourse} />
      </dialog>
    </>
  );
};

export default BelowButtons;
