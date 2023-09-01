import LoadSummary from "./load/LoadSummary";
import { useQuery } from "@tanstack/react-query";
import Lecturers from "./load/Lecturers";
import Courses from "./load/Courses";
import BelowButtons from "./BelowButtons";
import useUserstore from "../zustand/userStore";
import axios from "axios";
import useNewLoadStore21 from "../zustand/newLoadStore2";
import { useRef, useState } from "react";
import { successNotification } from "./utilities/toastify/Toastify";

export default function HomeAssign() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { id } = useUserstore((state) => state.user);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const setCentralDashboard = useNewLoadStore21(
    (state) => state.setCentralDashboard
  );
  const [deleting, setDeleting] = useState(false);

  const deleteAllLoad = async () => {
    setDeleting(true);
    const assignee_id: number = id;
    const semester: number = 1;

    const data = {
      assignee_id,
      semester,
    };

    try {
      const url = `https://teaching-load-api.onrender.com/api/delete`;
      const response = await axios.delete(url, { data });

      // console.log("Response: ", response.data);
      setLecturerLoad(response.data?.assignments?.assignments);
      setCentralDashboard(response.data?.others);
      setDeleting(false);
      modalRef.current?.close(); // closing the dialog box
      successNotification(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  var broadcast: boolean = lecturerLoad?.length === 0 ? false : true;

  return (
    <>
      <div className="col-span-3">
        <div className="buttons border-b-2 border-b-green-700 pt-4">
          <div className="flex items-center justify-end">
            <button
              className="btn mb-3 mr-4 hover:bg-red-600 outline-none hover:text-white px-5 py-2 border-2 border-red-400 rounded disabled:opacity-30 disabled:bg-red-600 disabled:text-white"
              disabled={lecturerLoad?.length === 0}
              onClick={() => {
                // const modal = document.querySelector(
                //   ".mydialog"
                // ) as HTMLDialogElement;
                modalRef.current?.showModal();
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <Courses />
          <Lecturers />
          <LoadSummary />
        </div>

        <BelowButtons broadcast={broadcast} />

        <dialog
          data-modal
          className="rounded-lg p-5 outline-none mydialog"
          ref={modalRef}
        >
          <div className="confirm">
            <div className=" text-lg mb-3">
              Are you sure you want to delete all the load <br /> you assigned
              this semester? <br />
              <span className="block mt-2">
                <span className="text-lg font-semibold"> Note:</span> This
                process <span className="underline">cannot</span> be reversed
                once you <br />
                agree to delete
              </span>
            </div>

            <div className="flex justify-around items-center gap-5">
              <button
                className="w-full text-white px-4 rounded py-2 bg-red-600 mt-2 hover:scale-95 outline-none"
                onClick={() => deleteAllLoad()}
                disabled={deleting}
              >
                {deleting ? "Deleting load..." : "Yes"}
                {/* Yes */}
              </button>
              <button
                className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
                onClick={() => {
                  modalRef.current?.close();
                }}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
