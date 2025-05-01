import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AboutSchool } from "./components/About";
import { AdminTeacherView } from "./components/Admin/AdminTeacherView";
import { AdminCoursesView } from "./components/Admin/Courses/AdminCoursesView";
import { EditTeacherPage } from "./components/Admin/Teachers/EditTeacherPage";
import './App.css';
import { AddCourse } from "./components/Admin/Courses/AddCourse";

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
                <Link to="/admin/courses">Admin - View & Change Courses</Link>
              </li>
              <li>
                <Link to="/admin/teachers">Admin - View & Change Teacher Roster</Link>
              </li>
            </ul>
          </nav>
        </div>
        

        <Routes>
          <Route path="/" element={<AboutSchool />} />
          <Route path="/admin/teachers" element={<AdminTeacherView />} />
          <Route path="/admin/teacher/edit/:id" element={<EditTeacherPage />} />
          <Route path="/admin/courses" element={<AdminCoursesView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
