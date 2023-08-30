import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import useNewLoadStore21 from "../../zustand/newLoadStore2";


ChartJS.register(ArcElement, Tooltip, Legend);

// const TopCharts = ({ collegeLoad, totalStaff, courseSummary }: any) => {
const TopCharts = () => {


  const centralDashboard = useNewLoadStore21(state => state.centralDashboard)
  
  const LecturerProgress = {
    labels: ["Minimum Load", "Under Load", "Extra Load"],
    datasets: [
      {
        label: "Lecturer's progress",
        data: [
          centralDashboard?.overall_total_load.min_load,
          centralDashboard?.overall_total_load.under_load,
          centralDashboard?.overall_total_load.extra_load

          // collegeLoad?.min_load,
          // collegeLoad?.under_load,
          // collegeLoad?.extra_load,
        ],
        fill: true,
        backgroundColor: ["#ffff33", "#ff0000", "#2d862d"],
      },
    ],
  };

  const CourseSummary = {
    labels: ["Assigned", "Unassigned"],
    datasets: [
      {
        label: "Course summary",
        data: [
          // courseSummary.allocated_courses,
          // courseSummary.all_courses - courseSummary.allocated_courses,
          centralDashboard.course_summary.allocated_courses,
          centralDashboard.course_summary.all_courses - centralDashboard.course_summary.allocated_courses,
        ],
        fill: true,
        backgroundColor: ["#2d862d", "#ff0000"],
      },
    ],
  };

  return (
    // {
    //   // collegeLoad < 1
    // }
    <div className="grid grid-cols-12 gap-4 dashboard">
      <div className="col-span-6 dashboard_card rounded-lg">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <p>Lecturers progress</p>
            {/* <p>Min load: {collegeLoad.min_load} </p>
            <p>Under load: {collegeLoad.under_load} </p>
            <p>Extra load: {collegeLoad.extra_load}</p>
            <p>Total staff: {totalStaff}</p> */}
            <p>Min load: {centralDashboard?.overall_total_load.min_load} </p>
            <p>
              Under load: {centralDashboard?.overall_total_load.under_load}{" "}
            </p>
            <p>
              Extra load: {centralDashboard?.overall_total_load.extra_load}{" "}
            </p>
            <p>Total staff: {centralDashboard.total_staff}</p>
          </div>
          <div className="col-span-8 top-chart">
            <Doughnut data={LecturerProgress} />
          </div>
        </div>
      </div>
      <div className="col-span-6 dashboard_card rounded-lg">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <p>Courses summary</p>
            {/* <p>Assigned: {courseSummary.allocated_courses}</p>
            <p>All courses: {courseSummary.all_courses}</p> */}
            <p>Assigned: {centralDashboard.course_summary.allocated_courses}</p>
            <p>All courses: {centralDashboard.course_summary.all_courses}</p>
            <p>
              Unassigned:
              {centralDashboard.course_summary.all_courses -
                centralDashboard.course_summary.allocated_courses}
            </p>
          </div>
          <div className="col-span-8 top-chart">
            <Pie data={CourseSummary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCharts;
