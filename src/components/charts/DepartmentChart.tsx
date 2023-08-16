import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentChart = ({ data }: any) => {

      const chartData = {
        labels: ["Minimum Load", "Under Load", "Extra Load"],

        datasets: [
          {
            // label: "Department Summary",
            data: [...data],
            fill: true,
            backgroundColor: [
              "rgba(62, 110, 62, 0.9)",
              "rgba(233, 82, 82, 0.7)",
              "rgba(248, 248, 25, 0.97)",
            ],
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      };
  return (
    <div className="dept-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepartmentChart;
