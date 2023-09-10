import React from 'react'
import { useAppSelector } from '../../store/hooks'

const Settings = () => {
    const user = useAppSelector(state => state.user.user)

  return (
    <div className="relative">
      <section
        className="text-black p-4"
        style={{ backgroundColor: "#f7f7f9" }}
      >
        {/* // <section className='text-white p-4' style={{ backgroundColor: "black" }}> */}

        <p className="text-center text-3xl mb-3">Your profile </p>
        <div className="flex ">
          <p className="w-1/6">Name: </p>
          <p className="w-5/6">{`${user.firstName} ${user.lastName}`}</p>
        </div>

        <div className="flex ">
          <p className="w-1/6">Email: </p>
          <p className="w-5/6">{`${user.email}`}</p>
        </div>
        <div className="flex ">
          <p className="w-1/6">Role: </p>
          <p className="w-5/6">{`${user.role} `}</p>
        </div>

        <div className="flex ">
          <p className="w-1/6">Department: </p>
          <p className="w-5/6">{` ${user.department}`}</p>
        </div>
      </section>
    </div>
  );
}

export default Settings