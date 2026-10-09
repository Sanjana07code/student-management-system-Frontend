import { NavLink } from 'react-router-dom';

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarCheck,
  FaChartBar,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';

import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <FaUserGraduate />

        <span>
          Student MS
        </span>

      </div>


      {/* Navigation */}

      <nav className="sidebar-nav">

        <p className="sidebar-title">
          MAIN MENU
        </p>

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/students"
          className="sidebar-link"
        >
          <FaUserGraduate />
          <span>Students</span>
        </NavLink>


        <NavLink
          to="/teachers"
          className="sidebar-link"
        >
          <FaChalkboardTeacher />
          <span>Teachers</span>
        </NavLink>


        <NavLink
          to="/courses"
          className="sidebar-link"
        >
          <FaBook />
          <span>Courses</span>
        </NavLink>


        <NavLink
          to="/attendance"
          className="sidebar-link"
        >
          <FaCalendarCheck />
          <span>Attendance</span>
        </NavLink>


        <NavLink
          to="/results"
          className="sidebar-link"
        >
          <FaChartBar />
          <span>Results</span>
        </NavLink>


        <p className="sidebar-title sidebar-account-title">
          ACCOUNT
        </p>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <FaUser />
          <span>Profile</span>
        </NavLink>

      </nav>


      {/* Logout */}

      <div className="sidebar-bottom">

        <button className="logout-button">

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;