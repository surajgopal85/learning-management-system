import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ThingComponent from "./components/ThingComponent";
import OtherComponent from "./components/Other/OtherComponent";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other">Other</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ThingComponent />} />
          <Route path="/other" element={<OtherComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
