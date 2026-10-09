import { Link } from 'react-router-dom';

import { FaGraduationCap } from 'react-icons/fa';

import './Navbar.css';

function Navbar() {

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* Logo */}

        <Link
          to="/"
          className="navbar-logo"
        >

          <FaGraduationCap />

          <span className="brand-name">
            CampusHub
          </span>

        </Link>


        {/* Navigation */}

        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <a href="#about">
            About
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#contact">
            Contact
          </a>

        </div>


        {/* Buttons */}

        <div className="navbar-buttons">

          <Link
            to="/login"
            className="login-button"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="register-button"
          >
            Register
          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;