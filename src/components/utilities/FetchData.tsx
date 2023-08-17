import { useQuery } from "@tanstack/react-query";
import { Course, fetchCourses, fetchLecturers, fetchLoad } from "../../zustand/api/apis";

export function fetchData() {
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
  if (loadedCourses) {
    myCourses = courses;
  }

  // Fetching lecturers
  const { data: lecturers, isSuccess: loadedLecturers } = useQuery({
    queryKey: ["lecturers"],
    queryFn: fetchLecturers,
  });
}
