import React from "react";

type CreateCourseProps = {
  closeModal: () => void
};
const CreateCourse = ({closeModal}: CreateCourseProps) => {
  return (
    <div className="p-5 outline-none mydialog">
      <p onClick={closeModal} className="cursor-pointer">X</p>
      <p> Create course</p>
    </div>
  );
};

export default CreateCourse;
