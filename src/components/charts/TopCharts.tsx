import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopCharts = ({ collegeLoad, totalStaff, courseSummary }: any) => {
  const LecturerProgress = {
    labels: ["Minimum Load", "Under Load", "Extra Load"],
    datasets: [
      {
        label: ["Minimum load", "Under load" "Extra load"],
        data: [
          collegeLoad?.min_load,
          collegeLoad?.extra_load,
          collegeLoad?.under_load,
        ],
        fill: true,
        backgroundColor: [
          "#ffff33",
          "#ff0000",
          "#2d862d",
        ],
      },
    ],
  };

  const CourseSummary = {
    labels: ["Assigned", "Unassigned"],
    datasets: [
      {
        label: ["Assigned courses", "Unassigned courses"],
        data: [
          courseSummary.allocated_courses,
          courseSummary.all_courses - courseSummary.allocated_courses,
        ],
        fill: true,
        backgroundColor: ["#2d862d", " #ff0000"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-12 gap-4 dashboard">
      <div className="col-span-6 dashboard_card rounded-lg">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <p>Lecturers progress</p>
            <p>Min load: {collegeLoad.min_load} </p>
            <p>Under load: {collegeLoad.under_load} </p>
            <p>Extra load: {collegeLoad.extra_load}</p>
            <p>Total staff: {totalStaff}</p>
          </div>
          <div className="col-span-8">
            <Doughnut data={LecturerProgress} />
          </div>
        </div>
      </div>
      <div className="col-span-6 dashboard_card rounded-lg">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <p>Courses summary</p>
            <p>Assigned: {courseSummary.allocated_courses}</p>
            <p>All courses: {courseSummary.all_courses}</p>
            <p>
              Unassigned:
              {courseSummary.all_courses - courseSummary.allocated_courses}
            </p>
          </div>
          <div className="col-span-8">
            <Pie data={CourseSummary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
