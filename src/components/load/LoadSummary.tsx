import { BsTrash } from "react-icons/bs";
import axios from "axios";
import useUserstore from "../../zustand/userStore";
import { Load} from "../../zustand/api/apis";
import useNewLoadStore21 from "../../zustand/newLoadStore2";
import { successNotification, errorNotification } from "../utilities/toastify/Toastify";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setLoad } from "../../features/load/loadSlice";
import { setCentralDashboardData } from "../../features/dashboard/dashboardSlice";

const LoadSummary = () => {
  //RTK
  const rtKLoad = useAppSelector(state => state.load.load)
  const staff = useAppSelector((state) => state.staff.staff);
  const dispatch = useAppDispatch()


  const deleteLoadRef = useRef<HTMLDialogElement>(null)
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(0)
 
  const lecturerLoad = useNewLoadStore21((state) => state.lecturerLoad);
  const setLecturerLoad = useNewLoadStore21((state) => state.setLecturerLoad);
  const setCentralDashboard = useNewLoadStore21(
    (state) => state.setCentralDashboard
  );


  // const allLecturers = useNewLoadStore21((state) => state.lecturers);
  const { id } = useUserstore((state) => state.user);

  // const newtotalLoad = lecturerLoad?.map((load: Load) => {
  const newtotalLoad = rtKLoad?.map((load: Load) => {
    return {
      total: load.CUs.reduce((a: number, b: number) => a + b, 0),
      // total: load.total,

      id: load.id,
      staffId: load.staff_id,
      // staffName: allLecturers?.find((lecturer) => {
      staffName: staff?.find((lecturer) => {

        if (lecturer.id === load.staff_id) {
          return `${lecturer.firstName} ${lecturer.lastName}`;
        }
      }),
      assignee_id: load.assignee_id,
    };
  });

  const myFiltered = newtotalLoad?.filter((load) => {
    return load.assignee_id === id;
  });

  const deleteLoad = async (_assigneeID: number, _loadID: number) => {
    const data = {
      assignee_id: _assigneeID,
      id: _loadID,
    };

    try {
      // const url = "https://teaching-load-api.onrender.com/api/deleteload";
       const url = "https://teachingloadfive-82f4e24a-6a04-4f8b-8cae.cranecloud.io/api/deleteload";
      
      setDeleting(true)

      const response = await axios.delete(url, { data });
      if (response.status === 200) {
        setDeleting(false)
        successNotification("Load deleted successfully");
        // setCentralDashboard(response.data?.others)
        // setLecturerLoad(response.data?.assignments.assignments);

        console.log(response.data)
        
        //RTK
        dispatch(setLoad(response.data?.assignments.assignments));
        dispatch(setCentralDashboardData(response.data?.others)) // we must set the central dashboard data

        closeModal()
      }else{

        errorNotification(response.data?.message)
      }
    } catch (error: any) {
      console.error("Error: ", error.response.data.message);
      setDeleting(false)
      errorNotification(error.response.data.message);
      closeModal()
    }
  };

  function showModal(loadId: number){
    setDeleteId(loadId)
    deleteLoadRef.current?.showModal()
  }
   function closeModal() {
     deleteLoadRef.current?.close();
   }

  return (
    <div className="card p-3 bg-white ml-3 rounded-lg mr-2 ">
      <div className="px-2 ">
        <p className="mb-4 text-xl font-semibold">Teaching Load Summary</p>

        {myFiltered?.length === 0 ? (
          <p className="text-center">No teaching load assigned yet</p>
        ) : (
          <>
            <div className="flex justify-between items-center px-2">
              <p className="text-lg font-medium">Lecturer</p>
              <p
                className="text-lg font-medium"
                style={{ paddingRight: "2.25rem" }}
              >
                Load
              </p>
            </div>
            <div className="list">
              <div className="flex justify-between">
                <div className="flex justify-center items-left flex-col pr-3">
                  {myFiltered?.map((lecturer) => (
                    <div
                      key={lecturer.id}
                      className="flex justify-between items-center px-2"
                    >
                      <p key={lecturer.id}>
                        {lecturer.staffName?.firstName}{" "}
                        {lecturer.staffName?.lastName}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center flex-col pr-4">
                  {myFiltered?.map((load) => (
                    <div key={load.id}>
                      {load.total === 0 ? (
                        <div className="flex justify-between items-center">
                          <span className="text-red-700 mr-2 ">
                            {load.total}
                          </span>
                          <BsTrash
                            className="text-red-400 cursor-pointer"
                            // onClick={() => deleteLoad(id, load.id)}
                            onClick={() => showModal(load.id)}
                          />
                        </div>
                      ) : load.total < 10 ? (
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-500 mr-4 pl-4">
                            {load.total}
                          </span>
                          <BsTrash
                            className="text-red-400 cursor-pointer"
                            // onClick={() => deleteLoad(id, load.id)}
                            onClick={() => showModal(load.id)}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">{load.total}</span>
                          <BsTrash
                            className="text-red-400 cursor-pointer ml-5"
                            // onClick={() => deleteLoad(id, load.id)}
                            onClick={() => showModal(load.id)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <dialog
        data-modal
        className="rounded-lg p-5 outline-none mydialog"
        ref={deleteLoadRef}
      >
        <div className="confirm">
          <div className=" text-lg mb-3">
            <p className="font-semibold text-2xl mt-4">
              Are you sure you want to delete this teaching load?
            </p>
            <p>
              Deleting this information will mean that the allocated Teaching{" "}
              <br />
              Load will be deleted.
              <br />
              <span className="underline">Are you sure?</span>
            </p>
            {/* <br />
            <br /> */}
            {/* <span className="block mt-2">
              <span className="text-lg font-semibold"> Note:</span> This process{" "}
              <span className="underline">cannot</span> be reversed once you{" "}
              <br />
              agree to delete
            </span> */}
          </div>

          <div className="flex justify-center items-center gap-5">
            <button
              className="w-full text-white px-4 rounded py-2 bg-red-600 mt-2 hover:scale-95 outline-none disabled:bg-opacity-60"
              onClick={() => deleteLoad(id, deleteId)}
              disabled={deleting}
            >
              {deleting ? "Deleting load..." : "Yes"}
            </button>
            <button
              className="w-full text-white px-4 rounded py-2 bg-green-700 mt-2 hover:scale-95"
              onClick={() => {
                deleteLoadRef.current?.close();
              }}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LoadSummary;
