import axios from "axios";
type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
};

type Load = {
  id: number;
  staff_id: string;
  courses: string;
  CUs: string;
};

type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
};

type AssignLoad = {
  courses: string;
  staff_id: number;
  CUs: string;
};

export const fetchLecturers = async () => {
  const url = "http://127.0.0.1:8000/api/getStaff";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const data: Lecturer[] = response.data.staff;

  return data;
};

export const fetchLoad = async () => {
  const url = "http://127.0.0.1:8000/api/allAssign";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const load: Load[] = response.data.assignments;

  return load;
};

export const fetchCourses = async () => {
  const url = "http://127.0.0.1:8000/api/courseUnits";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const courses: Course[] = response.data.course_units;

  return courses;
};

export const assignLoad = async (data: AssignLoad) => {
  const url = "http://127.0.0.1:8000/api/assign";

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  // const courses: Course[] = response.data;

  return response.data;
};