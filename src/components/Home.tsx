import { Link } from "react-router-dom";

// import LoadSummary from "../zustand/LoadSummary";
// import { useQuery } from "@tanstack/react-query";
// import { fetchLoad } from "../zustand/api/apis";

type TotalLoadDetails = {
  total: number;
  id: number;
  staffId: number;
  staffName: object;
};

type NewLoad = {
  id: number;
  staff_id: number;
  courses: string[];
  CUs: number[];
};

export default function Home() {
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
