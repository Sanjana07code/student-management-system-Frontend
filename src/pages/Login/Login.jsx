import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaUserTag
} from 'react-icons/fa';

import API from '../../api';

import './Login.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    role: 'student',
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        '/auth/login',
        {
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      alert('Login successful');

      navigate('/dashboard');

    } catch (error) {
      alert(
        error.response?.data?.message ||
        'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Side */}

      <div className="login-left">

        <div className="login-brand">
          <FaGraduationCap />
          <span>
            Student Management System
          </span>
        </div>

        <div className="login-welcome">

          <p className="login-small-text">
            WELCOME BACK
          </p>

          <h1>
            Manage Students
            <span> Smarter.</span>
          </h1>

          <p>
            Login to access your student management
            dashboard and manage academic information
            easily.
          </p>

        </div>

      </div>


      {/* Right Side */}

      <div className="login-right">

        <div className="login-card">

          <div className="login-heading">

            <h2>
              Login
            </h2>

            <p>
              Enter your account details to continue.
            </p>

          </div>


          {/* Login Form */}

          <form onSubmit={handleSubmit}>

            {/* Role */}

            <div className="form-group">

              <label htmlFor="role">
                Login As
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
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Forgot Password */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                />

                <span>
                  Remember me
                </span>

              </label>

              <a href="#forgot-password">
                Forgot Password?
              </a>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? 'Logging in...'
                : 'Login'}
            </button>

          </form>


          {/* Register */}

          <div className="register-text">

            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create Account
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

export default Login;