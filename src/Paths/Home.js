import React, { useEffect, useState } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Heading, Box, Stack, Center, Text } from "@chakra-ui/react";
// make vstack center aligned

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// import json file
import data from "../Utils/demo_data.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function createChartDataset(data) {
  // Extract labels and values from the data
  const labels = data.map((entry) => entry[0]);
  const totalVisits = data.map((entry) => entry[1].total_visits);
  const totalMinutes = data.map((entry) => entry[1].total_minutes);
  const averageEngagement = data.map((entry) => entry[1].average_engagement);

  // Define the datasets
  const datasets = [
    {
      label: "Total Visits",
      data: totalVisits,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
    {
      label: "Total Minutes",
      data: totalMinutes,
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
    {
      label: "Average Engagement",
      data: averageEngagement,
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ];

  // Create the chart configuration object
  const chartConfig = {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets,
    },
    // options: {
    //   indexAxis: "y",
    //   scales: {
    //     y: {
    //       beginAtZero: true,
    //     },
    //   },
    //   plugins: {
    //     legend: {
    //       position: "right",
    //     },
    //   },
    // },
    options: {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    },
  };

  return chartConfig;
}

function calculate_engagement(journeys) {
  var exhibit_scores = {};

  for (var i = 0; i < journeys.length; i++) {
    var journey = journeys[i];

    for (var z = 0; z < journey.length; z++) {
      var exhibit_name = journey[z].loc;

      if (exhibit_name != "Exit") {
        if (!(exhibit_name in exhibit_scores)) {
          exhibit_scores[exhibit_name] = { total_visits: 0, total_minutes: 0 };
        }

        const millisecondsDiff = Math.abs(
          new Date(journey[z + 1].timestamp) - new Date(journey[z].timestamp)
        );

        var time_spent = Math.abs(Math.ceil(millisecondsDiff / 60000));
        exhibit_scores[exhibit_name].total_visits += 1;
        exhibit_scores[exhibit_name].total_minutes += time_spent;
      }
    }

    // iterate each exhibit score and add average engagement time
    for (var exhibit in exhibit_scores) {
      exhibit_scores[exhibit].average_engagement = Math.round(
        exhibit_scores[exhibit].total_minutes /
          exhibit_scores[exhibit].total_visits
      );
    }

    // sort by average engagement time
    var sorted_exhibit_scores = Object.entries(exhibit_scores).sort(
      (a, b) => a[1].average_engagement - b[1].average_engagement
    );
  }

  return sorted_exhibit_scores;
}

function Home() {
  const [chartData, setChartData] = useState(
    createChartDataset(calculate_engagement(data))
  );

  useEffect(() => {
    calculate_engagement(data);
    console.log(chartData);
  }, []);

  return (
    <Center fontWeight={"bold"} fontFamily={"Montserrat"}>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <Stack direction="column" w="95%">
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="10px">
          <h1>Engagement Score By Room</h1>
          <Bar data={chartData.data} options={chartData.options} />
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <Text>Overall Stats</Text>
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <h1>Bubble 3</h1>
        </Box>
      </Stack>
    </Center>
  );
}

export default Home;
