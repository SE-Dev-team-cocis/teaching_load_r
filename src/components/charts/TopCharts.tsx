import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopCharts = ({ collegeLoad, totalStaff, courseSummary }: any) => {
  const LecturerProgress = {
    labels: ["Minimum Load", "Under Load", "Extra Load"],
    datasets: [
      {
        label: "Lecturer's summary",
        data: [
          collegeLoad?.min_load,
          collegeLoad?.extra_load,
          collegeLoad?.under_load,
        ],
        fill: true,
        backgroundColor: [
          "rgb(62, 110, 62)",
          "rgb(233, 82, 82)",
          "rgb(248, 248, 25)",
        ],
      },
    ],
  };

  const CourseSummary = {
    labels: ["Assigned", "Unassigned" ],
    datasets: [
      {
        label: "Lecturer's summary",
        data: [
          courseSummary.allocated_courses,
          courseSummary.all_courses - courseSummary.allocated_courses,
        ],
        fill: true,
        backgroundColor: [
          "rgb(62, 110, 62)",
          "rgb(248, 248, 25)",
        ],
      },
    ],
  };

  const data = {
    labels: ["Minimum Load", "Under Load", "Extra Load"],

    datasets: [
      {
        label: "Lecturer Summary",
        data: [10, 35, 75],
        fill: true,
        backgroundColor: "rgba(200,192,192,1)",
      },
    ],
  };
  return (
    <div className="grid grid-cols-12 gap-4 dashboard">
      <div className="col-span-6 dashboard_card rounded-lg">
        <p>Lecturers progress</p>
        <div className="flex gap-3">
          <div>
            <p>Min load: {collegeLoad.min_load} </p>
            <p>Under load: {collegeLoad.under_load} </p>
            <p>Extra load: {collegeLoad.extra_load}</p>
            <p>Total staff: {totalStaff}</p>
          </div>
          <div>
            <Doughnut data={LecturerProgress} />
          </div>
        </div>
      </div>
      <div className="col-span-6 dashboard_card rounded-lg">
        <p>Courses summary</p>
        <p>Assigned: {courseSummary.allocated_courses}</p>
        <p>All courses: {courseSummary.all_courses}</p>
        <p>
          Unassigned: 
          {courseSummary.all_courses - courseSummary.allocated_courses}
        </p>
         <div>
            <Pie data={CourseSummary} />
          </div>
      </div>
    </div>
  );
};

export default TopCharts;
