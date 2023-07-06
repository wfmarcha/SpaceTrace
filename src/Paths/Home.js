import React, { useState } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Heading, Box, Stack, Center } from "@chakra-ui/react";

// make vstack center aligned

function Home() {
  return (
    <Center>
      <Stack direction="column" w="90%">
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="10px">
          <h1>Bubble 1</h1>
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <h1>Bubble 2</h1>
        </Box>
        <Box backgroundColor="white" borderRadius={"15px"} p="10px" mt="5px">
          <h1>Bubble 3</h1>
        </Box>
      </Stack>
    </Center>
  );
}

export default Home;
