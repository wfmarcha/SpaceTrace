import React, { useState } from "react";
// import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Heading, Box, Stack, Center } from "@chakra-ui/react";


const images = ["First-Floor_BMS_8.2022.jpg", "Second-Floor_BMS_9.2.22-pdf.jpg", "Third-Floor_BMS_8.2022.jpg", "Fourth-Floor_BMS_8.2022.jpg"]



function Heatmaps() {
  const [expandedBoxes, setExpandedBoxes] = useState([false, false, false, false]);

  const handleClick = (index) => {
    const updatedBoxes = [...expandedBoxes];
    updatedBoxes[index] = !updatedBoxes[index];
    setExpandedBoxes(updatedBoxes);
  };

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '10px',
    marginTop: '10px',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '37%',
    margin: 'auto'
  };

  return (
    <div style={{fontWeight:"bold"}}>
      <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'/>
      <div style={boxStyle} onClick={() => handleClick(0)}>
        <h1 style={{ marginTop: 0 }}>Floor 1</h1>
        {expandedBoxes[0] && <img style={imageStyle} src={images[0]} alt="Heatmap 1" />}
      </div>
      <div style={boxStyle} onClick={() => handleClick(1)}>
        <h1 style={{ marginTop: 0 }}>Floor 2</h1>
        {expandedBoxes[1] && <img style={imageStyle} src={images[1]} alt="Heatmap 2" />}
      </div>
      <div style={boxStyle} onClick={() => handleClick(2)}>
        <h1 style={{ marginTop: 0 }}>Floor 3</h1>
        {expandedBoxes[2] && <img style={imageStyle} src={images[2]} alt="Heatmap 3" />}
      </div>
      <div style={boxStyle} onClick={() => handleClick(3)}>
        <h1 style={{ marginTop: 0 }}>Floor 4</h1>
        {expandedBoxes[3] && <img style={imageStyle} src={images[3]} alt="Heatmap 4" />}
      </div>
    </div>
  );
}
export default Heatmaps;
