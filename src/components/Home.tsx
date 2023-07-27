import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  // const navigate = useNavigate();
  const notify = (message: string) => {
    toast.success(message, {
      toastId: 543,
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

  const user = localStorage.getItem("loggedd_in");
  if (user === "true") {
    notify("You have logged in successfully");
    localStorage.setItem("loggedd_in", JSON.stringify(false));

  }
  return (
    <>
      <div className="buttons border-b-2 border-b-green-700 pt-4">
        <div className="flex gap-4">
          <Link to={"/teaching-load/new"} className="ml-5 mb-3">
            <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
              New
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-3"></div>
      <p className="text-center font-semibold text-green">
        No Load history at the moment
      </p>
    </>
  );
}
