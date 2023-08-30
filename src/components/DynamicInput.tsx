import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BsPlusCircle, BsTrash, BsXCircleFill } from "react-icons/bs";
import { toast } from "react-toastify";

export type Subgroup = {
  [key: string]: number | string;
  subgroup_name: string;
  course_id: number;
  no_of_students: number;
};

type DynamicInputProps = {
  id: number;
  name: string;
};

const DynamicInput = ({ id, name }: DynamicInputProps) => {
  const modal = document.querySelector(".my-subgroup") as HTMLDialogElement;

  const notify = (message: string) => {
    toast.success(message, {
      toastId: 903,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  const errorNotification = (message: string) => {
    toast.error(message, {
      toastId: 403,
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const [subgroups, setSubgroups] = useState<Subgroup[]>([
    { course_id: id, subgroup_name: "", no_of_students: 0 },
    { course_id: id, subgroup_name: "", no_of_students: 0 },
  ]);

  function addSubgroup() {
    setSubgroups([
      ...subgroups,
      { course_id: id, subgroup_name: "", no_of_students: 0 },
    ]);
  }

  function removeSubgroup(index: number) {
    const newList: Subgroup[] = [...subgroups];
    newList.splice(index, 1);
    setSubgroups(newList);
  }

  function setSubgroupName(e: ChangeEvent<HTMLInputElement>, _index: number) {
    const { name, value } = e.target;
    const newList: Subgroup[] = [...subgroups];

    newList[_index][name] = value;
    setSubgroups(newList);
  }

  function setNumberOfStudents(
    e: ChangeEvent<HTMLInputElement>,
    _index: number
  ) {
    const { name, value } = e.target;
    const newList: Subgroup[] = [...subgroups];

    newList[_index][name] = Number(value);
    setSubgroups(newList);
  }

  const handleGroup = async () => {
    const url = "https://teaching-load-api.onrender.com/api/subgroup/create";
    try {
      const response = await axios.post(
        url,
        { subgroups: JSON.stringify(subgroups) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSubgroups([
        { course_id: id, subgroup_name: "", no_of_students: 0 },
        { course_id: id, subgroup_name: "", no_of_students: 0 },
      ]);
      notify(response.data.message);
    } catch (error) {
      console.log(error);
      // if(error)
      // errorNotification(error.response?.data.message);
    }
  };

  function reset() {
    setSubgroups([
      { course_id: id, subgroup_name: "", no_of_students: 0 },
      { course_id: id, subgroup_name: "", no_of_students: 0 },
    ]);
    modal?.close();
  }
  return (
    <div style={{ width: "400px" }} className="relative">
      <p className="text-center text-lg font-semibold mb-3">
        Sububgroup details for {name}
      </p>

      <p
        className="absolute -right-10 -top-0 text-2xl cursor-pointer"
        onClick={() => {
          reset();
        }}
      >
        <BsXCircleFill className="text-red-700" />
      </p>
      <div className="flex gap-2 flex-col px-4" style={{ width: "450px" }}>
        <div className="grid grid-cols-7 gap-2">
          <p className="text-m mb-0 font-m col-span-4" >Subgroup name</p>
          <p className="pr-3 text-m mb-0 font-m col-span-3">No. of students</p>
        </div>
      </div>
      <div style={{ width: "450px" }}>
        <div className="flex gap-2 flex-col items-center mx-4">
          {subgroups.map((item, index) => (
            <div className="grid grid-cols-7 gap-2" key={index}>
              <input
                type="text"
                name="subgroup_name"
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
                  rounded my-2
               
                  col-span-4
                  "
                value={item.subgroupName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setSubgroupName(e, index);
                }}
              />

              <input
                type="number"
                name="no_of_students"
                placeholder="eg. 100"
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
                  rounded my-2
                 col-span-2
                  "
                value={item.numberOfStudents}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setNumberOfStudents(e, index);
                }}
              />

              {
                // if index is greater than 1, show the remove button
                subgroups.length >= 3 && index >= 2 ? (
                  <BsTrash
                    className="text-3xl text-red-600 col-span-1 cursor-pointer"
                    onClick={() => removeSubgroup(index)}
                  />
                ) : (
                  ""
                )
              }
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
