import { useState, ChangeEvent, useEffect } from "react";

type CourseUnit = {
  id: number;
  courseCode: string;
  courseName: string;
  creditUnits: number;
  isChecked: boolean;
};
const initialCourseUnits: CourseUnit[] = [
  {
    id: 1,
    courseCode: "BSE 2204",
    courseName: "Requirements Engineering",
    creditUnits: 3,
    isChecked: false,
  },
  {
    id: 2,
    courseCode: "BSE 2204",
    courseName: "Numerical Methods",
    creditUnits: 3,
    isChecked: false,
  },
  {
    id: 3,
    courseCode: "BSE 2203",
    courseName: "Object Oriented Programming",
    creditUnits: 3,
    isChecked: false,
  },
  {
    id: 4,
    courseCode: "BSE 2293",
    courseName: "Distributed Systems",
    creditUnits: 4,
    isChecked: false,
  },
  {
    id: 5,
    courseCode: "CSC 1903",
    courseName: "User Interface Design",
    creditUnits: 3,
    isChecked: false,
  },
  {
    id: 6,
    courseCode: "CSC 4672",
    courseName: "Embedded Systems",
    creditUnits: 4,
    isChecked: false,
  },
];
const CourseUnits = () => {
  const [courseUnits, setCourseUnits] =
    useState<CourseUnit[]>(initialCourseUnits);
  const [cuFilterText, setCuFilterText] = useState("");

  function handleCheckBoxChange(id: number) {
    const updatedList = courseUnits.map((courseUnit) =>
      courseUnit.id === id
        ? { ...courseUnit, isChecked: !courseUnit.isChecked }
        : courseUnit
    );
    setCourseUnits(updatedList);
  }

  // List of selected course units...
  const checkedCourseUnits: CourseUnit[] = courseUnits.filter((courseUnit) =>
    courseUnit.isChecked === true ? courseUnit : ""
  );
  // console.log("Checked courseUnits...", checkedCourseUnits);
  //   const store = useStore();
  //   useEffect(() => {
  //     store.setCourseUnits();
  //   }, []);

  // console.log("Course units: ", store.courseUnits);
  // console.log(myCourseUnits);
  return (
    <div className="card p-3 bg-white ml-3 rounded-lg ">
      <p className="text-xl font-semibold">Course Units</p>
      <input
        type="text"
        placeholder="Search for lecturer here..."
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
        value={cuFilterText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCuFilterText(e.target.value)
        }
      />
      <div className="list">
        {courseUnits
          .filter((courseUnit) => {
            return cuFilterText.toLowerCase() === ""
              ? courseUnit
              : courseUnit.courseName.toLowerCase().includes(cuFilterText);
          })
          .map((courseUnit) => (
            <p key={courseUnit.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-3"
                name="courseUnits[]"
                checked={courseUnit.isChecked}
                value={courseUnit.id}
                onChange={() => handleCheckBoxChange(courseUnit.id)}
              />
              {courseUnit.courseName}
            </p>
          ))}
      </div>
    </div>
  );
};

export default CourseUnits;
