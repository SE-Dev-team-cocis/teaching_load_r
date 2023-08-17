import { Link, useNavigate } from "react-router-dom";
import { Course, Lecturer, SemesterList, fetchCourses, fetchLecturers, fetchLoad, fetchSemesterList } from "../zustand/api/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useNewLoadStore21 from "../zustand/newLoadStore2";


export default function Home() {
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const setCourses = useNewLoadStore21(state =>state.setCourses)
  // const lecturers = useNewLoadStore21((state) => state.lecturers);
  const setLecturers = useNewLoadStore21(state => state.setLecturers)
  const setSemesterList = useNewLoadStore21(state => state.setSemesterList)
  const setCheckedCourses = useNewLoadStore21(state => state.setCheckedCourses)
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );



  // Fetching all load
  const { data: loads, isSuccess: loadedLoads } = useQuery({
    queryKey: ["load"],
    queryFn: fetchLoad,
  });

  // Fetching all courses
  const { data: courses, isSuccess: loadedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  let myCourses: Course[] = [];
  if(loadedCourses){
    myCourses = courses
  }

  // Fetching lecturers
    const { data: lecturers, isSuccess: loadedLecturers } = useQuery({
      queryKey: ["lecturers"],
      queryFn: fetchLecturers,
    });

    // console.log("Lects: ", lecturers)

    let myLecturers: Lecturer[] = [];
    if (loadedLecturers) {
      myLecturers = lecturers;
    }

    // Fetchign semester list
    const { data: semesterList, isSuccess: loadedSemesterList } = useQuery({
      queryKey: ["semesterlist"],
      queryFn: fetchSemesterList,
    });

    // console.log("Semester list: ", semesterList)

    let semList: SemesterList[] = [];
    if (loadedLecturers) {
      semList = semesterList;
    }

  // console.log("Semester list: ", semesterList)

  useMemo(() => {
    setLecturerLoad(loads);
    setCourses(myCourses)
    setLecturers(myLecturers)
    setCheckedCourses([])
    setCheckedSemesterList([])
    setSemesterList(semList)
  }, []);

  return (
    <>
      <div className="buttons border-b-2 border-b-green-700 pt-4">
        <div className="flex gap-4">
          <Link to={"/teaching-load/new"} className="ml-5 mb-3">
            <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
              New
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-3"></div>
      <p className="text-center font-semibold text-green">
        No Load history at the moment
      </p>
    </>
  );
}
