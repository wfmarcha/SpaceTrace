import React, { useEffect, useState } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Heading, Box, Stack, Center, Text } from "@chakra-ui/react";
// make vstack center aligned

// import json file
import data from "../Utils/demo_data.json";

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

  console.log(sorted_exhibit_scores);
}

function Home() {
  useEffect(() => {
    console.log(data);
    calculate_engagement(data);
  }, []);

  return (
    <Center>
      <Stack direction="column" w="95%">
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="10px">
          <h1>Engagement Score By Room</h1>
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
