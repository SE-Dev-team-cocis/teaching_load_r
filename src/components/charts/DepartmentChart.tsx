import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DepartmentChart = ({ data }: any) => {

      const chartData = {
        labels: ["Minimum Load", "Under Load", "Extra Load"],
        datasets: [
          {
            label: "Department Summary",
            data: [...data],
            fill: true,
            backgroundColor: [
              "#ff0000",
              "#ffff33",
              "#2d862d",
            ],
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        // legend: false,
      };
  return (
    <div className="">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DepartmentChart;
