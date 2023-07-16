import { Link } from "react-router-dom";

import Sidebar from "./utilities/Sidebar";
import Footer from "./Footer";
import NavBar from "./Navbar";
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
  // const { data: load } = useQuery({
  //   queryKey: ["load"],
  //   queryFn: fetchLoad,
  // });

  // // const newLoad: NewLoad[] = load?.map((load) =>
  // const newLoad: NewLoad[] = load?.map((load) => {
  //   return {
  //     ...load,
  //     courses: JSON.parse(load.courses),
  //     CUs: JSON.parse(load.CUs),
  //   };
  // });

  // const totalLoad: TotalLoadDetails[] = newLoad?.map((load) => {
  //   // return load.CUs.reduce((a, b) => a + b, 0);
  //   return {
  //     total: load.CUs.reduce((a, b) => a + b, 0),
  //     id: load.id,
  //     staffId: load.staff_id,
  //     staffName: newLecturers?.find((lecturer) => {
  //       if (lecturer.id === load.staff_id) {
  //         return `${lecturer.firstName} ${lecturer.lastName}`;
  //       }
  //     }),
  //   };
  // });
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-4">
        <Sidebar />
        <div className="col-span-3">
          <div className="buttons border-b-2 border-b-green-700 pt-4">
            <div className="flex gap-4">
              <Link to={"/teaching-load/new"} className="ml-5 mb-3">
                <button className="btn hover:bg-green-700 outline-none hover:text-white px-5 py-2 border-2 border-green-400 rounded">
                  New
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-3">
            {/* <TeachingLoadSummary /> */}
            {/* <LoadSummary totalLoad={totalLoad} /> */}
            <p className="text-center font-semibold text-green">
              No Load history at the moment
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
