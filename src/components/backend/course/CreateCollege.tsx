import React from 'react'
type CreateCollegeProps = {
    closeModal: () => void
}
const CreateCollege = ({ closeModal }: CreateCollegeProps) => {
  return (
    <div className="p-5 outline-none mydialog">
      <p onClick={closeModal} className="cursor-pointer">
        X
      </p>
      <p>Create college</p>
    </div>
  );
};

export default CreateCollege