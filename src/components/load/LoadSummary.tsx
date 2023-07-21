import { BsTrash } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";
import useUserstore from "../../zustand/userStore";

type TotalLoadDetails = {
  total: number;
  id: number;
  staffId: number;
  staffName: object;
  assignee_id: number;
};

type LoadPops = {
  totalLoad: TotalLoadDetails[];
};

const notify = (message: string) => {
  toast.success(message, {
    toastId: 26,
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

const LoadSummary = ({ totalLoad }: LoadPops) => {
  const { id } = useUserstore((state) => state.user);
  // console.log("Total load data: ", totalLoad);

  const myFiltered = totalLoad?.filter((load) => {
    return load.assignee_id === id;
  });

  const deleteLoad = async (_assigneeID: number, _loadID: number) => {
    const data = {
      assignee_id: _assigneeID,
      id: _loadID,
    };

    try {
      const url = "http://127.0.0.1:8000/api/deleteload";
      const response = await axios.delete(url, { data });
      if (response.status === 200) {
        notify(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2007);
      }
      // console.log("Response: ", response);
    } catch (error) {}
  };

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
                  {myFiltered?.map((lecturer: TotalLoadDetails) => (
                    <div
                      key={lecturer.id}
                      className="flex justify-between items-center px-2"
                    >
                      <p key={lecturer.id}>
                        {lecturer.staffName.firstName}{" "}
                        {lecturer.staffName.lastName}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center flex-col pr-4">
                  {myFiltered?.map((load) => (
                    <p key={load.id}>
                      {load.total === 0 ? (
                        <div className="flex justify-between items-center">
                          <span className="text-red-700 mr-2 ">
                            {load.total}
                          </span>
                          <BsTrash
                            className="text-red-400 cursor-pointer"
                            onClick={() => deleteLoad(id, load.id)}
                          />
                        </div>
                      ) : load.total < 10 ? (
                        <div className="flex justify-between items-center">
                          <span className="text-yellow-500 mr-4 pl-4">
                            {load.total}
                          </span>
                          <BsTrash
                            className="text-red-400 cursor-pointer"
                            onClick={() => deleteLoad(id, load.id)}
                          />
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <span className="text-green-700">{load.total}</span>
                          <BsTrash
                            className="text-red-400 cursor-pointer ml-5"
                            onClick={() => deleteLoad(id, load.id)}
                          />
                        </div>
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadSummary;
