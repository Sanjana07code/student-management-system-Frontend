import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import Dashboard from './pages/Dashboard/Dashboard';

import Students from './pages/Students/Students';
import AddStudent from './pages/AddStudent/AddStudent';
import EditStudent from './pages/EditStudent/EditStudent';
import StudentDetails from './pages/StudentDetails/StudentDetails';

import Teachers from './pages/Teachers/Teachers';
import AddTeacher from './pages/AddTeacher/AddTeacher';
import EditTeacher from './pages/EditTeacher/EditTeacher';
import TeacherDetails from './pages/TeacherDetails/TeacherDetails';

import Courses from './pages/Courses/Courses';
import AddCourse from './pages/AddCourse/AddCourse';
import EditCourse from './pages/EditCourse/EditCourse';
import CourseDetails from './pages/CourseDetails/CourseDetails';

import Attendance from './pages/Attendance/Attendance';
import AddAttendance from './pages/AddAttendance/AddAttendance';
import EditAttendance from './pages/EditAttendance/EditAttendance';
import AttendanceDetails from './pages/AttendanceDetails/AttendanceDetails';

import Results from './pages/Results/Results';
import AddResult from './pages/AddResult/AddResult';
import EditResult from './pages/EditResult/EditResult';
import ResultDetails from './pages/ResultDetails/ResultDetails';

import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';

import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================== PUBLIC PAGES ==================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ==================== DASHBOARD LAYOUT ==================== */}

        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          {/* ==================== STUDENTS ==================== */}

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/add-student"
            element={<AddStudent />}
          />

          <Route
            path="/edit-student/:studentId"
            element={<EditStudent />}
          />

          <Route
            path="/student-details/:studentId"
            element={<StudentDetails />}
          />


          {/* ==================== TEACHERS ==================== */}

          <Route
            path="/teachers"
            element={<Teachers />}
          />

          <Route
            path="/add-teacher"
            element={<AddTeacher />}
          />

          <Route
            path="/edit-teacher/:teacherId"
            element={<EditTeacher />}
          />

          <Route
            path="/teacher-details/:teacherId"
            element={<TeacherDetails />}
          />


          {/* ==================== COURSES ==================== */}

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/add-course"
            element={<AddCourse />}
          />

          <Route
            path="/edit-course/:courseCode"
            element={<EditCourse />}
          />

          <Route
            path="/course-details/:courseCode"
            element={<CourseDetails />}
          />


          {/* ==================== ATTENDANCE ==================== */}

          <Route
            path="/attendance"
            element={<Attendance />}
          />

          <Route
            path="/add-attendance"
            element={<AddAttendance />}
          />

          <Route
            path="/edit-attendance/:studentId"
            element={<EditAttendance />}
          />

          <Route
            path="/attendance-details/:studentId"
            element={<AttendanceDetails />}
          />


          {/* ==================== RESULTS ==================== */}

          <Route
            path="/results"
            element={<Results />}
          />

          <Route
            path="/add-result"
            element={<AddResult />}
          />

          <Route
            path="/edit-result/:studentId"
            element={<EditResult />}
          />

          <Route
            path="/result-details/:studentId"
            element={<ResultDetails />}
          />


          {/* ==================== PROFILE ==================== */}

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/edit-profile"
            element={<EditProfile />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;