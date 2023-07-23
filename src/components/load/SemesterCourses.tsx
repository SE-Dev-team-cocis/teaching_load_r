import { ChangeEvent, useMemo, useState } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
};

const SemesterCourses = () => {
  const allcourses = useNewLoadStore21((state) => state.allCourses);
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const [filterText, setFilterText] = useState("");
  const [myCourses, setMyCourses] = useState<Course[]>([]);

  useMemo(() => {
    // setCheckedCourses(allcourses);
    setMyCourses(allcourses);
  }, [allcourses]);

  function handleCheckedCourses(id: number) {
    // const updatedCourses: Course[] = allcourses.map((course: Course) =>
    const updatedCourses: Course[] = myCourses.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );

    console.log("Updated courses: ", updatedCourses);

    // setCheckedCourses(updatedCourses);
    setMyCourses(updatedCourses);

    const checkedOnes = updatedCourses.filter((course) => {
      return course.isChecked === true;
    });

    setCheckedCourses(checkedOnes); // Setting only the checked courses
  }

  console.log("Checked courses: ", checkedCourses);

  const filteredCourses = myCourses.filter((course) => {
    return (
      course.course_name.toLowerCase().includes(filterText.toLowerCase()) ||
      course.course_code.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  function handleSemesterCourses() {
    // console.log("Semester courses: ", checkedCourses);
    const data = checkedCourses;

    // Handle post request here
  }

  return (
    <div
      style={{ width: "800px" }}
      className="px-10 bg-white mx-auto pb-10 pt-2 mt-10 rounded-lg"
    >
      <p className="text-center text-2xl mt-4">Create Semester list</p>

      <div className="text-center pr-10">
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
      </div>

      {/* <div className="flex justify-between items-center gap-5"> */}
      <div className="grid grid-cols-4 gap-5 mb-3">
        <p className="pl-9 font-semibold col-span-2">Course name</p>
        <p className="font-semibold col-span-1">Course code</p>
        <p className="font-semibold col-span-1">Credit units</p>
      </div>

      <div className="course_list">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="hover:bg-green-300 py-1 cursor-pointer transition"
          >
            {/* <div className="flex justify-between items-center flex-row mx-9"> */}
            <div className="grid grid-cols-4 gap-4">
              <p key={course.course_code} className="text-left col-span-2">
                <input
                  type="checkbox"
                  className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                  name="courseUnitss[]"
                  checked={course.isChecked}
                  value={course.id}
                  onChange={() => handleCheckedCourses(course.id)}
                />
                {course.course_name}
              </p>

              <div key={course.course_code} className="col-span-1">
                {course.course_code}
              </div>
              <p key={course.course_code} className="ml-9 col-span-1">
                {+course.course_cus}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className=" text-white px-5 rounded py-2 bg-green-700 mt-2 hover:scale-95"
          type="button"
          onClick={handleSemesterCourses}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default SemesterCourses;
