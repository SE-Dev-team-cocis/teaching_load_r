import { useMemo, useState } from "react";
import { ChangeEvent } from "react";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { useQuery } from "@tanstack/react-query";
import { fetchSemesterList } from "../../zustand/api/apis";
import useUserstore from "../../zustand/userStore";

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

// const Courses = ({ courses }: CourseProps) => {
const Courses = () => {

  const user = useUserstore(state => state.user)

  // const setCourses = useNewLoadStore21((state) => state.setCourses);
  // const allCourses = useNewLoadStore21((state) => state.allCourses);
  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );

  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);
  const semesterList = useNewLoadStore21((state) => state.semesterList);
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );

  const { data: semesterlist, isSuccess: loadedLoads } = useQuery({
    queryKey: ["load"],
    queryFn: fetchSemesterList,
  });

  // console.log("Semester list", semesterlist);
  
  useMemo(() => {
    // setCourses(semesterList);
    setSemesterList(semesterlist)
    // setSemesterList(courses);
  }, []);
    
  // console.log("Semester list: ", semesterList)


  function handleCheckedCourses(id: number) {
    const updatedCourses: Course[] = semesterList.map((course: Course) =>
      course.id === id ? { ...course, isChecked: !course.isChecked } : course
    );
    console.log("Updated ones: ", updatedCourses);

    setSemesterList(updatedCourses);

    const checkedOnes = updatedCourses.filter((course: Course) => {
      return course.isChecked === true;
    });

    // setChe

    setCheckedCourses(checkedOnes); // Setting only the checked courses
    // console.log("Checked ones: ", checkedOnes);
  }
  const [filterText, setFilterText] = useState("");
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Courses</p>
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
      <div className="list">
        {/* {allCourses */}
        {semesterList
          ?.filter((courseUnit: any) => {
            return filterText.toLowerCase() === ""
              ? courseUnit
              : courseUnit.course_name.toLowerCase().includes(filterText);
          })
          .map((courseUnit: Course) => (
            <div key={courseUnit.id} className="flex flex-col">
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
          ))}
      </div>
    </div>
  );
};

export default Courses;
