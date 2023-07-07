// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// export const options = {
//   indexAxis: "y",
//   elements: {
//     bar: {
//       borderWidth: 2
//     }
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false
//     },
//     title: {
//       display: false,
//       text: "General SMS - 150"
//     },
//     layout: {
//       padding: 50
//     },
//     datalabels: {
//       font: {
//         weight: "bold"
//       },
//       align: "end",
//       anchor: "end",
//       formatter: function (value, context) {
//         return context.chart.formattedData[context.dataIndex];
//       }
//     }
//   }
// };

// const formattedData = ["01:00", "00:30", "01:11"];

// export const data = {
//   labels: ["Answered", "Abandoned", "Waiting"],
//   datasets: [
//     {
//       data: [60, 30, 73],
//       backgroundColor: ["gray", "blue", "yellow"],
//       datalabels: {
//         formatter: function (value, context) {
//           return formattedData[context.dataIndex];
//         }
//       }
//     }
//   ]
// };

// export function App() {
//   return <Bar options={options} data={data} />;
// }
