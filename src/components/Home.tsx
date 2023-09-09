import { Link } from "react-router-dom";
import { Course, Department, Lecturer, SemesterList, fetchCentralDashboardDataNew, fetchCourses, fetchDepartments, fetchLecturers, fetchLoad, fetchSemesterList } from "../zustand/api/apis";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useNewLoadStore21 from "../zustand/newLoadStore2";

export default function Home() {

  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const setCourses = useNewLoadStore21((state) => state.setCourses);
  const setLecturers = useNewLoadStore21((state) => state.setLecturers);
  const setDepartments = useNewLoadStore21((state) => state.setDepartments);
  const setSemesterList = useNewLoadStore21((state) => state.setSemesterList);
  const setCentralDashboard = useNewLoadStore21((state) => state.setCentralDashboard);

  const setCheckedCourses = useNewLoadStore21(
    (state) => state.setCheckedCourses
  );
  const setCheckedLecturers = useNewLoadStore21(
    (state) => state.setCheckedLecturers
  );
  const setCheckedSemesterList = useNewLoadStore21(
    (state) => state.setCheckedSemesterList
  );

  // Fetching all courses
  const { data: courses, isSuccess: loadedCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  let myCourses: Course[] = [];
  if (loadedCourses) {
    myCourses = courses;
  }

  // Fetching lecturers
  const { data: lecturers, isSuccess: loadedLecturers } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturers,
  });

  let myLecturers: Lecturer[] = [];
  if (loadedLecturers) {
    myLecturers = lecturers;
  }

  // Fetching all load
  const { data: loads } = useQuery({
    queryKey: ["load"],
    queryFn: fetchLoad,
  });

  // console.log("Load: ", loads)

  // Fetchign semester list
  const {
    data: semesterList,
    isLoading,
  } = useQuery({
    queryKey: ["semesterlist"],
    queryFn: fetchSemesterList,
  });

  let semList: SemesterList[] = [];
  if (loadedLecturers) {
    semList = semesterList;
  }

  // Fetching departments
  const {
    data: departments,
    isSuccess: loadedDepartments,

  } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  let depts: Department[] = [];
  if (loadedDepartments) {
    depts = departments;
  }

  const {data: central} = useQuery({
    queryKey: ["central"],
    queryFn: fetchCentralDashboardDataNew
  })


  useMemo(() => {
    setLecturerLoad(loads);
    setCourses(myCourses);
    setLecturers(myLecturers);
    setCheckedCourses([]);
    setCheckedSemesterList([]);
    setCheckedLecturers([]);
    setDepartments(depts)
    setSemesterList(semList);
    setCentralDashboard(central)
    
    // fetchCentralDashboardData()
  }, [loads, myCourses, myLecturers, semList, depts, central]);
  

  if (isLoading) {
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
        <p className="text-center font-semibold text-green">Loading...</p>
      </>
    );
  }

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
