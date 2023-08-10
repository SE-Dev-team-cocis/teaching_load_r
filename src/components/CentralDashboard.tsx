import Departments from "./charts/Departments";
import TopCharts from "./charts/TopCharts";

const CentralDashboard = () => {
  return (
    <div>
      <TopCharts />

      <div className="grid grid-cols-12 gap-2 px-5">
        <Departments />
        <Departments />
        <Departments />
        <Departments />
      </div>
    </div>
  );
};

export default CentralDashboard;
