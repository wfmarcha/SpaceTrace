import React, { useState } from "react";
import "./App.css";

function App() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Buffalo Museum</p>
      </header>
    </div>
  );
}

export default App;
