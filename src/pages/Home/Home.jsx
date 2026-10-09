import { Link } from 'react-router-dom';

import {
  FaUserGraduate,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaChartBar,
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

import Navbar from '../../components/Navbar/Navbar';

import './Home.css';

function Home() {

  const features = [
    {
      icon: <FaUserGraduate />,
      title: 'Student Management',
      text: 'Manage student information, profiles and academic details easily.'
    },
    {
      icon: <FaBook />,
      title: 'Course Management',
      text: 'Manage courses, departments, semesters and student enrollment.'
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Teacher Management',
      text: 'Maintain teacher information and subject details in one place.'
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Attendance Tracking',
      text: 'Record and monitor student attendance efficiently.'
    },
    {
      icon: <FaChartBar />,
      title: 'Results & Marks',
      text: 'Manage student marks, grades and academic results.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure & Reliable',
      text: 'Keep college information organized with secure authentication.'
    }
  ];

  return (
    <div className="home-page">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section className="hero-section">

          <div className="hero-content">

            <p className="hero-small-text">
              WELCOME TO CAMPUSHUB
            </p>

            <h1>
              A Student Management
              <span>System</span>
            </h1>

            <p className="hero-description">
              CampusHub is a simple and efficient platform to
              manage students, teachers, courses, attendance
              and academic results in one place.
            </p>

            <div className="hero-buttons">

              <Link
                to="/register"
                className="primary-button"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="secondary-button"
              >
                Login
              </Link>

            </div>

          </div>


          {/* Hero Image */}

          <div className="hero-illustration">

            <img
              src="/student-hero.png"
              alt="Student using CampusHub"
            />

          </div>

        </section>
        
        
        {/* ================= CONTACT ================= */}
        <section
          className="about-section"
          id="about"
        >

          <div className="section-heading">

            <p>
              ABOUT THE SYSTEM
            </p>

            <h2>
              Everything You Need to Manage Students
            </h2>

            <span>
              Our Student Management System helps colleges
              organize important academic and student information
              in a simple and centralized platform.
            </span>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="section-heading">

            <p>
              OUR FEATURES
            </p>

            <h2>
              Powerful Features, Simple Experience
            </h2>

            <span>
              Manage your college activities from one convenient system.
            </span>

          </div>


          <div className="features-grid">

            {features.map((feature, index) => (

              <div
                className="feature-card"
                key={index}
              >

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* ================= CONTACT ================= */}

        <section
          className="contact-section"
          id="contact"
        >

          <div className="contact-content">

            <div className="contact-text">

              <p className="contact-small-text">
                CONTACT US
              </p>

              <h2>
                Get in Touch With CampusHub
              </h2>

              <p>
                Have questions about our Student Management
                System? Contact us for more information.
              </p>

              <Link
                to="/register"
                className="primary-button"
              >
                Create Account
              </Link>

            </div>


            <div className="contact-info">

              <div className="contact-item">

                <FaEnvelope />

                <div>
                  <h4>
                    Email
                  </h4>

                  <p>
                    support@campushub.com
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <FaPhone />

                <div>
                  <h4>
                    Phone
                  </h4>

                  <p>
                    +91 98765 43210
                  </p>
                </div>

              </div>


              <div className="contact-item">

                <FaMapMarkerAlt />

                <div>
                  <h4>
                    Address
                  </h4>

                  <p>
                    Kolkata, West Bengal, India
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <p>
          © 2026 CampusHub | Smart Campus. Better Management.
        </p>

      </footer>

    </div>
  );
}

export default Home;