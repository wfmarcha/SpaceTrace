import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Components/Header";
import { BrowserRouter } from "react-router-dom";

import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
// set default font to be Monstserrat
const theme = extendTheme({
  initialColorMode: "light",
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },

  // make it so that body background color is different shade of white
  styles: {
    global: {
      body: {
        bg: "blue.200",
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
