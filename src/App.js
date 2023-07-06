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
        <div className="navbar">
          <p>Buffalo Museum</p>
          <button className="mobile-nav-toggle" onClick={toggleMobileNav}>
            <i className={isMobileNavOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>
        {isMobileNavOpen && (
          <nav className="mobile-nav">
            <ul>
              <li>Menu Item 1</li>
              <li>Menu Item 2</li>
              <li>Menu Item 3</li>
              {/* Add more menu items as needed */}
            </ul>
          </nav>
        )}
        <p>Learn React</p>
      </header>
    </div>
  );
}

export default App;
