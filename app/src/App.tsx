import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AboutSchool } from "./components/About";
import { AdminTeacherView } from "./components/Admin/AdminTeacherView";
import { AdminCourseView } from "./components/Admin/AdminCourseView";
import { EditTeacherPage } from "./components/Admin/Teachers/EditTeacherPage";
import { AdminStudentView } from "./components/Admin/AdminStudentView";
import './App.css';
import { AddCourse } from "./components/Admin/Courses/AddCourse";
import { EditStudentInformation } from "./components/Admin/Students/EditStudentInformation";

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
              <li>
                <Link to='/admin/students'>Admin - Add Student (more coming)</Link>
              </li>
            </ul>
          </nav>
        </div>
        

        <Routes>
          <Route path="/" element={<AboutSchool />} />
          <Route path="/admin/teachers" element={<AdminTeacherView />} />
          <Route path="/admin/teacher/edit/:id" element={<EditTeacherPage />} />
          <Route path="/admin/courses" element={<AdminCourseView />} />
          <Route path="/admin/students" element={<AdminStudentView />} />
          <Route path='/admin/student/edit/:id' element={<EditStudentInformation />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
