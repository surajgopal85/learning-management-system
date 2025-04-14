import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ThingComponent from "./components/ThingComponent";
import OtherComponent from "./components/Other/OtherComponent";
import { TeacherProfile } from "./components/Profile/TeacherProfile";
import { EditTeacherProfile } from "./components/Profile/EditProfile";
import { EditTeacherPage } from "./components/Profile/EditTeacherPage";
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <div className="admin-nav">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/allTeachers">View, Remove, Edit All Teachers</Link>
              </li>
              <li>
                <Link to="/buildProfile">Add Teacher</Link>
              </li>
            </ul>
          </nav>
        </div>
        

        <Routes>
          <Route path="/" element={<ThingComponent />} />
          <Route path="/allTeachers" element={<OtherComponent />} />
          <Route path="/buildProfile" element={<TeacherProfile />} />
          <Route path='/editProfile/:id' element={<EditTeacherPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
