import React, { useMemo, useRef, useState } from 'react'
import { CourseType } from '../../functions/BackendSchemas';
import axios from 'axios';
import CreateCourse from './CreateCourse';
import EditCourse from './EditCourse';

const Courses = () => {

       const createCourseRef = useRef<HTMLDialogElement>(null);
       const editCourseRef = useRef<HTMLDialogElement>(null);


      const closeEditModal = () => {
        if (editCourseRef.current) {
          editCourseRef.current?.close()
        }
      }


        const openCreateCourseModal = () => {
            createCourseRef.current?.showModal()
        };

        const closeCreateCourseModal = () => {
            createCourseRef.current?.close();
        };

    const url =
    "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/courseUnits";

  const [courseUnits, setCourseUnits] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourseUnits = async () => {
    try {
      setLoading(true);
      const response = await axios(url);
      console.log(response.data)
      setCourseUnits(response.data.course_units);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useMemo(() => {
    fetchCourseUnits();
  }, []);
  return (
        <section className="mt-4 px-4">
         <button
          className="px-4 py-2 bg-green-700 rounded text-white mt-3 mb-1 "
          onClick={openCreateCourseModal}
        >
          Add Course
        </button>
     
         <table className="w-full border-2 border-b-gray-400 rounded">
        <thead className="bg-gray-50 bottom-2 border-gray-200">
          <tr>
            <th className="p-2 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className=" p-2 text-sm font-semibold tracking-wide text-left">
              Course Name
            </th>
            <th className="  p-2 text-sm font-semibold tracking-wide text-left">
                Course Code 
            </th>
             <th className="  p-2 text-sm font-semibold tracking-wide text-left">
                Course Cus 
            </th>
            <th className="  p-2 text-sm font-semibold tracking-wide text-center">
                  Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {courseUnits?.map((course: any, index) => (
            <tr key={index} className="hover:bg-green-400 hover:bg-opacity-20">
              <td className="p-2 text-sm text-gray-700 text-left">
                {index + 1}
              </td>
              <td className="p-2 text-sm text-gray-700 text-left">
                {course.course_name}
              </td>
           
              <td className="p-2 text-sm text-gray-700 text-left">
                {course.course_code}
              </td>
                <td className="p-2 text-sm text-gray-700 text-left">
                {course.course_cus}
              </td>
              <td className="p-2 text-sm text-gray-700 text-center">
                    <span className="mr-3 text-blue-700 cursor-pointer" onClick={()=>editCourseRef.current?.showModal()}>
                    Edit
                </span>
                <span className="text-red-700 cursor-pointer">
                    Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <dialog ref={createCourseRef} className="rounded-lg">
          <CreateCourse closeModal={closeCreateCourseModal} />
      </dialog>

      <dialog ref={editCourseRef} className="rounded-lg collegeDialog">
        <EditCourse closeModal={closeEditModal}/>
      </dialog>
    </section>
  )
}

export default Courses