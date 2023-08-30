import { useMemo, useState } from "react";
import { ChangeEvent } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import useUserstore from "../../zustand/userStore";
import { Link } from "react-router-dom";

type Subgroup = {
  id: number;
  subgroup_name: string;
  course_id: number;
  no_of_students: number;
  isChecked: boolean;
};
type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  isChecked: boolean;
  subgroups?: Subgroup[];
};

type CourseProps = {
  courses: Course[];
};

const Courses = () => {
  const user = useUserstore((state) => state.user);

  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const checkedCourses = useNewLoadStore21((state) => state.checkedCourses);
  const allCourses = useNewLoadStore21((state) => state.allCourses);

  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);
  const semesterList = useNewLoadStore21((state) => state.semesterList);
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );

  function handleCheckedCourses(id: number) {
    const updatedCourses: Course[] = semesterList.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );

    // setSemesterList(updatedCourses);
    setSemesterList(updatedCourses);

    const checkedOnes = updatedCourses.filter((course: Course) => {
      return course.isChecked === true;
    });

    setCheckedCourses(checkedOnes);
  }
  const [filterText, setFilterText] = useState("");
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Courses</p>
      {semesterList.length > 1 ? (
        <>
          <input
            type="text"
            placeholder="Search for a course here..."
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
            rounded my-3"
            value={filterText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterText(e.target.value)
            }
          />
        </>
      ) : (
        ""
      )}
      <div className="list">
        {/* {allCourses */}
        {semesterList.length > 1 ? (
          semesterList
            ?.filter((courseUnit: any) => {
              return filterText.toLowerCase() === ""
                ? courseUnit
                : courseUnit.course_name.toLowerCase().includes(filterText);
            })
            .map((courseUnit: Course, index: number) => (
              <div key={index} className="flex flex-col">
                <div>
                  <input
                    type="checkbox"
                    className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                    name="courseUnits[]"
                    checked={courseUnit.isChecked}
                    value={courseUnit.id}
                    onChange={() => handleCheckedCourses(courseUnit.id)}
                  />
                  {courseUnit.course_name}
                </div>
                {courseUnit.subgroups?.length === 0 ? (
                  ""
                ) : (
                  <>
                    <div className="ml-5 flex flex-col">
                      {courseUnit.subgroups?.map((group) => (
                        <div key={group.id} className="font-sm">
                          <input
                            type="checkbox"
                            className="mr-3 ml-2 h-4 w-4 text-green-700 border-2 focus:bg-green-700 focus:ring-green-700 rounded"
                            name="subgroups[]"
                            checked={group.isChecked}
                            value={group.id}
                            // onChange={() => handleCheckedCourses(courseUnit.id)}
                          />
                          {group.subgroup_name}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))
        ) : (
          <>
            <div className="flex items-center justify-center flex-col mt-8">
              <p>You currently have no semester list</p>
              <button className="mt-3 bg-green-700 text-white px-4 py-2 rounded-md">
                <Link to={"/semestercourses"}>Create Semester list</Link>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
