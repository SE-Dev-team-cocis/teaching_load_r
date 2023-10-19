import { ChangeEvent, useState } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import useUserstore from "../../zustand/userStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { successNotification } from "../utilities/toastify/Toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setNewCourses, setNewSemesterList } from "../../features/courses/courseSlice";

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

const SemesterCourses = () => {
  //RTK
  const myUserID = useAppSelector((state) => state.user.user.id);
  const courses = useAppSelector((state) => state.courses.course);
  const dispatch = useAppDispatch();


  // console.log("RTK courses: ", courses)

  const navigate = useNavigate();
  // const user = useUserstore((state) => state.user);
  // const staff_id = user.id;

  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);


  const setCourses = useNewLoadStore21((state) => state.setCourses);

  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );

  const [creating, setCreating] = useState(false);

  function handleCheckedCourses(id: number) {
    // const updatedCourses: Course[] = allcourses.map((course: Course) =>
    const updatedCourses: Course[] = courses.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );

    setCourses(updatedCourses);
    dispatch(setNewCourses(updatedCourses));

    const checkedOnes: Course[] = updatedCourses.filter((course) => {
      return course.isChecked === true;
    });

    setCheckedCourses(checkedOnes); // Setting only the checked courses
  }
  async function handleSemesterCourses() {
    const data = checkedCourses.map((checked) => {
      return {
        // staff_id: staff_id,
        staff_id: myUserID,
        course_id: checked.id,
        semester: 1,
      };
    });

    // console.log("Data: ", data);
    // 

    // const url =
    //   "https://teaching-load-api.onrender.com/api/semesterlist/create";

    const url =
      "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/semesterlist/create";
    
    setCreating(true);
    try {
      const response = await axios.post(
        url,
        { semester_list: data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const mylist = response.data?.semesterlist;
      let theArray: any[] = [];
      const newlist: any[] = mylist?.map((item: any) => {
        theArray.push(item.course);
      });

      // console.log("Semester list response: ", mylist);

      setSemesterList(theArray);
      setCheckedCourses([]);

      // setCourses(allcourses)
      // setCourses(
      //   allcourses.map((course: Course) => {

      dispatch(
        setNewCourses(
          courses.map((course: Course) => {
            return { ...course, isChecked: false };
          })
        )
      );

      dispatch(
        setNewSemesterList(
          mylist.map((course: Course) => {
            return { ...course, isChecked: false };
          })
        )
      );
      setCreating(false);
      successNotification(response.data.message);
      navigate("/teaching-load/new");
    } catch (error) {
      console.error(error);
    }
  }

  const [filterText, setFilterText] = useState("");
  // console.log("Filter text: ", filterText)
  return (
    <div
      style={{ width: "800px" }}
      className="px-10 bg-white mx-auto pb-10 pt-2 mt-10 rounded-lg"
    >
      <p className="text-center text-2xl mt-4">Create Semester list</p>
      <>
        <input
          type="text"
          placeholder="Search for a course here by it's name, or course code"
          className="
          focus:outline-none
          focus:ring-1
          focus:ring-green-700
          py-2
          px-4
          border
          border-gray
          focus:border-teal-500
          w-full
          rounded my-3
          mb-4     
          "
          value={filterText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilterText(e.target.value)
          }
        />
      </>

      <div className="grid grid-cols-12 mb-3">
        <span className="col-span-1"></span>
        <p className="font-semibold col-span-6">Course name</p>
        <p className="font-semibold col-span-2">Course code</p>
        <p className="font-semibold col-span-2 text-center">Credit units</p>
      </div>

      <div className="course_list">
        {/* {allcourses */}
        {courses
          ?.filter((courseUnit: any) => {
            return filterText.toLowerCase() === ""
              ? courseUnit
              : courseUnit.course_name
                  .toLowerCase()
                  .includes(filterText.toLowerCase()) ||
                  courseUnit.course_code
                    .toLowerCase()
                    .includes(filterText.toLowerCase());
          })
          .map((course: Course, index: number) => (
            <div key={index} className="grid grid-cols-12 gap-3">
              <input
                type="checkbox"
                className="col-span-1 mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                name="course[]"
                checked={course.isChecked}
                value={course.id}
                onChange={() => handleCheckedCourses(course.id)}
              />
              <p className="col-span-6">{course.course_name}</p>
              <p className="col-span-3">{course.course_code}</p>
              <p className="col-span-1 pr-7"> {course.course_cus}</p>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className=" text-white px-5 rounded py-2 bg-green-700 mt-2 hover:scale-95"
          type="button"
          onClick={handleSemesterCourses}
        >
          {creating ? "Creating Semester list" : "Create Semester List"}
        </button>
      </div>
    </div>
  );
};

export default SemesterCourses;
