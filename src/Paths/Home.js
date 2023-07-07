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

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

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
    // {
    //   label: "Total Visits",
    //   data: totalVisits,
    //   backgroundColor: "rgba(255, 99, 132, 0.5)",
    //   borderColor: "rgba(255, 99, 132, 1)",
    //   borderWidth: 1,
    //   hidden: true,
    // },
    // {
    //   label: "Total Minutes",
    //   data: totalMinutes,
    //   backgroundColor: "rgba(54, 162, 235, 0.5)",
    //   borderColor: "rgba(54, 162, 235, 1)",
    //   borderWidth: 1,
    //   hidden: true,
    // },
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
    options: {
      scales: {
        y: {
          beginAtZero: true,
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
const images =["id.jpg", "reader.jpg"]
  const [chartData, setChartData] = useState(
    createChartDataset(calculate_engagement(data))
  );

  useEffect(() => {
    console.log(data);
    calculate_engagement(data);
  }, []);

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '37%',
    margin: 'auto',
    marginTop: "10px"
  }; 
  const [expandedBoxes, setExpandedBoxes] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const updatedBoxes = [...expandedBoxes];
    updatedBoxes[index] = !updatedBoxes[index];
    setExpandedBoxes(updatedBoxes);
  };


  return (
    <Center fontWeight={"bold"} fontFamily={"Montserrat"}>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat"
        rel="stylesheet"
      />
      <Stack direction="column" w="95%">
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="10px">
          <h1>Average Minutes Spent Per Room</h1>
          <Bar data={chartData.data} options={chartData.options} />
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <Text>Room Leaderboard</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Room</Th>
                <Th isNumeric>Average Minutes Spent</Th>
                <Th isNumeric>Total Visitors</Th>
              </Tr>
            </Thead>
            <Tbody>
              {calculate_engagement(data)
                .reverse()
                .map((exhibit) => (
                  <Tr key={exhibit[0]}>
                    <Td>{exhibit[0]}</Td>
                    <Td isNumeric>{exhibit[1].average_engagement}</Td>
                    <Td isNumeric>{exhibit[1].total_visits}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <h1 onClick={() => handleClick(0)}>Information</h1>
          {expandedBoxes[0] && <div><Center><h1>RFID Tag</h1></Center><img style={imageStyle} src={images[0]} alt="RFID Tag" /> 
          <a  target="_blank" href="https://www.atlasrfidstore.com/alien-squiggle-rfid-clear-wet-inlay-aln-9640-higgs-3/?utm_device=c&utm_feeditemid=&utm_term=&utm_source=google&utm_medium=cpc&utm_campaign=03-Shopping-Top%20Sellers&hsa_cam=13462510247&hsa_grp=122959257306&hsa_mt=&hsa_src=g&hsa_ad=526881206526&hsa_acc=4442410237&hsa_net=adwords&hsa_kw=&hsa_tgt=pla-294682000766&hsa_ver=3&gclid=Cj0KCQjw756lBhDMARIsAEI0Agl_5FJuY2GQGb61Jbv-QHjqMB6YHMIAuGoaPTzXdBZLv7PJbiJP8r8aAkfUEALw_wcB"><Center><button style={{color: "white" , width: "20%" , padding: "5px" , borderRadius: "10px" , backgroundColor: "green", margin: "0 auto",   fontFamily: "Montserrat"}}>View</button></Center></a>
          <Center marginTop="30px"><h1>RFID Reader</h1></Center><img style={imageStyle} src={images[1]} alt="RFID Reader" /> 
          <a  target="_blank" href="https://www.atlasrfidstore.com/alien-squiggle-rfid-clear-wet-inlay-aln-9640-higgs-3/?utm_device=c&utm_feeditemid=&utm_term=&utm_source=google&utm_medium=cpc&utm_campaign=03-Shopping-Top%20Sellers&hsa_cam=13462510247&hsa_grp=122959257306&hsa_mt=&hsa_src=g&hsa_ad=526881206526&hsa_acc=4442410237&hsa_net=adwords&hsa_kw=&hsa_tgt=pla-294682000766&hsa_ver=3&gclid=Cj0KCQjw756lBhDMARIsAEI0Agl_5FJuY2GQGb61Jbv-QHjqMB6YHMIAuGoaPTzXdBZLv7PJbiJP8r8aAkfUEALw_wcB"><Center><button style={{color: "white" , width: "20%" , padding: "5px" , borderRadius: "10px" , backgroundColor: "green", margin: "0 auto",   fontFamily: "Montserrat"}}>View</button></Center></a> </div>}
        </Box>
      </Stack>
    </Center>
  );
}

export default Home;
