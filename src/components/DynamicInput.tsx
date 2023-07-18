import { ChangeEvent, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";

type Subgroup = {
  [key: string]: number | string;
  subgroupName: string;
  numberOfStudents: number;
};

const DynamicInput = () => {
  const [subgroup, setSubgroup] = useState<Subgroup[]>([
    { subgroupName: "", numberOfStudents: 0 },
  ]);

  function addSubgroup() {
    setSubgroup([...subgroup, { subgroupName: "", numberOfStudents: 0 }]);
  }

  function setSubgroupName(e: ChangeEvent<HTMLInputElement>, _index: number) {
    const { name, value } = e.target;
    const newList: Subgroup[] = [...subgroup];

    newList[_index][name] = value;

    setSubgroup(newList);
  }

  function handleGroup() {
    console.log("Object: ", subgroup);
  }
  return (
    <div style={{ width: "400px" }} className="mt-3">
      <div className="flex gap-2 flex-col px-4" style={{ width: "450px" }}>
        <div className="flex gap-5 flex-row justify-between">
          <p className="text-m mb-0 font-m">Subgroup name</p>
          <p className="pr-3 text-m mb-0 font-m">Number of students</p>
        </div>
      </div>
      {/* <div className="services flex gap-4 items-center p-5"> */}
      <div style={{ width: "450px" }}>
        <div className="flex gap-2 flex-col">
          {subgroup.map((item, index) => (
            <div className="flex justify-between gap-5 px-4" key={index}>
              <input
                type="text"
                name="subgroupName"
                placeholder="eg. Group A"
                className="
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-700
                  py-1
                  px-3
                  border
                  border-gray
                  focus:border-teal-500
                  mt-0
                  rounded my-3
                  w-3/5
                  "
                value={item.subgroupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSubgroupName(e, index);
                }}
              />

              <input
                type="number"
                name="numberOfStudents"
                placeholder="Enter number of students"
                className="
                  focus:outline-none
                  focus:ring-1
                  focus:ring-green-700
                  py-1
                  px-3
                  border    
                  border-gray
                  focus:border-teal-500
                  mt-0
                  rounded my-3
                  w-2/5
                  "
                value={item.numberOfStudents}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSubgroupName(e, index);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="" style={{ width: "450px" }}>
        <div className="px-2">
          <button
            type="button"
            className="bg-green-500 px-3 py-2 text-white rounded m-2 flex items-center gap-2 "
            onClick={addSubgroup}
          >
            <BsPlusCircle />
            Add new subgroup
          </button>
        </div>

        <div className="px-2 mx-2">
          <button
            type="button"
            className="text-white px-5 rounded py-2 bg-green-700 mt-2 hover:scale-95 disabled:opacity-50 disabled:hover:scale-100 w-full"
            onClick={handleGroup}
          >
            Save Subgroup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicInput;
