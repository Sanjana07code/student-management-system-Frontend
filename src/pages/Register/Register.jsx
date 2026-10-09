import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag
} from 'react-icons/fa';

import API from '../../api';

import './Register.css';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: 'student',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert('Please fill all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        '/auth/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );

      alert(
        response.data.message ||
        'Registration successful'
      );

      navigate('/login');

    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* Left Side */}

      <div className="register-left">

        <div className="register-brand">
          <FaGraduationCap />
          <span>
            Student Management System
          </span>
        </div>

        <div className="register-welcome">

          <p className="register-small-text">
            CREATE YOUR ACCOUNT
          </p>

          <h1>
            Join Our
            <span> College System.</span>
          </h1>

          <p>
            Create your account and get access to
            student management, academic records and
            other college services.
          </p>

        </div>

      </div>


      {/* Right Side */}

      <div className="register-right">

        <div className="register-card">

          <div className="register-heading">

            <h2>
              Create Account
            </h2>

            <p>
              Fill in the details to create your account.
            </p>

          </div>


          {/* Register Form */}

          <form onSubmit={handleSubmit}>

            {/* Name */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="input-box">

                <FaUser />

                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Role */}

            <div className="form-group">

              <label htmlFor="role">
                Register As
              </label>

              <div className="input-box">

                <FaUserTag />

                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="student">
                    Student
                  </option>

                  <option value="teacher">
                    Teacher
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>

            </div>


            {/* Email */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-box">

                <FaEnvelope />

                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Password */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-box">

                <FaLock />

                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Confirm Password */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-box">

                <FaLock />

                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Register Button */}

            <button
              type="submit"
              className="register-submit"
              disabled={loading}
            >
              {loading
                ? 'Creating Account...'
                : 'Create Account'}
            </button>

          </form>


          {/* Login */}

          <div className="login-text">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>


          {/* Back Home */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;