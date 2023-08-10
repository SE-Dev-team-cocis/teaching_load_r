import React from "react";

const Departments = () => {
  return (
    <div className="rounded-lg p-2 col-span-3 department">
      <div className="">
        <div className="summary">
          <p className="text-center font-semibold text-lg mb-2 text-gray-800">
            Networks department
          </p>
          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Lecturer</p>
            <p className="font-semibold text-gray-600">Total load</p>
          </div>
          <div className="list">
            <div className="flex justify-between">
              <p>Loor Jacobson</p>
              <p className="mr-4">20</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
            <div className="flex justify-between">
              <p>Ziggy Dee</p>
              <p className="mr-4">10</p>
            </div>
          </div>
        </div>
        <div className="details mt-2">
          <p>View details</p>
        </div>
        <div className="chart mt-2 text-center">
          <p className="pt-2">No. of lecturers Vs Total load</p>
        </div>
      </div>
    </div>
  );
};

export default Departments;
