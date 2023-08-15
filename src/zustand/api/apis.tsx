import axios from "axios";
export type Lecturer = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  role: string;
  email: string;
  isChecked: boolean;
};

export type Load = {
  id: number;
  courses: string;
  staff_id: number;
  CUs: number[];
  assignee_id?: number;
  staffName?: Lecturer;
};

type Subgroup = {
  id: number;
  subgroup_name: string;
  course_id: number;
  no_of_students: number;
};

export type Course = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  assignee_id?: number;
  isChecked: boolean;
  subgroups?: Subgroup[];
};

export type SemesterList = {
  id: number;
  course_name: string;
  course_code: string;
  course_cus: number;
  // assignee_id: number;
  isChecked: boolean;
  course: Course;
};

type AssignLoad = {
  courses: string;
  staff_id: number;
  CUs: string;
  assignee_id: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  // email_verified_at: null,
  // created_at: "2023-07-11T13:40:01.000000Z",
  // updated_at: "2023-07-11T13:40:01.000000Z"
};

type LoginResponse = {
  user: User;
  access_token: string;
  login: boolean;
};

type LoginData = {
  email: string;
  password: string;
};

export const fetchLecturers = async () => {
  const url = "https://teaching-load-api.onrender.com/api/getStaff";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const mydata = response.data.staff;
  const data: Lecturer[] = mydata.map((lecturer: Lecturer) => {
    return {
      id: lecturer.id,
      firstName: lecturer.firstName,
      lastName: lecturer.lastName,
      department: lecturer.department,
      role: lecturer.role,
      email: lecturer.email,
      isChecked: false,
    };
  });

  return data;
};

export const fetchLoad = async () => {
  const url = "https://teaching-load-api.onrender.com/api/allAssign";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const myload = response.data.assignments;

  const load: Load[] = myload?.map((load: Load) => {
    return {
      id: load.id,
      staff_id: load.staff_id,
      courses: JSON.parse(load.courses),
      CUs: load.CUs,
      assignee_id: load.assignee_id,
      staffName: {},
    };
  });

  return myload;
};

export const fetchCourses = async () => {
  const url = "https://teaching-load-api.onrender.com/api/courseUnits";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const mycourses = response.data.course_units;

  const courses: Course[] = mycourses.map((course: Course) => {
    return {
      id: course.id,
      course_cus: course.course_cus,
      course_code: course.course_code,
      course_name: course.course_name,
      isChecked: false,
      subgroups: course.subgroups,
    };
  });
  return courses;
};

export const fetchSemesterList = async () => {
  const url = "https://teaching-load-api.onrender.com/api/semesterlist";

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const mycourses = response.data?.semester_list;

  const courses = mycourses?.map((_course: any) => {
    return {
      id: _course.course?.id,
      course_cus: _course.course?.course_cus,
      course_code: _course.course?.course_code,
      course_name: _course.course?.course_name,
      isChecked: false,
      subgroups: _course.course?.subgroups,
      course: _course.course
    };
  });

  return courses;
};

export const assignLoad = async (data: AssignLoad) => {
  const url = "https://teaching-load-api.onrender.com/api/assign";

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });

  return response.data;
};

export const UserLogin = async (data: LoginData) => {
  const url = "https://teaching-load-api.onrender.com/api/login";

  const response = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
    },
  });
  const user: LoginResponse[] = response.data;

  return user;
};

// export const deleteAllLoad = async (data: DeleteAllLoad) => {
//   const url = "http://127.0.0.1:8000/api/delete";

//   const response = await axios.post(url, data, {
//     headers: {
//       "Content-Type": "application/json",
//       // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
//     },
//   });

//   return response.data.message;
// };

// export const deleteLoad = async (data: DeleteLoad) => {
//   const url = "http://127.0.0.1:8000/api/deleteLoad";

//   const response = await axios.post(url, data, {
//     headers: {
//       "Content-Type": "application/json",
//       // "Authorization" : `Bearer ${localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null}`
//     },
//   });

//   return response.data.message;
// };
