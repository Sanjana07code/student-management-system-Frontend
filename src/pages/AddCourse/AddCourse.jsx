import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave,
} from 'react-icons/fa';

import API from '../../api';

import './AddCourse.css';

function AddCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    duration: '',
    students: 0,
    department: '',
    description: '',
    status: 'Active',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await API.post('/courses', {
        name: formData.name,
        code: formData.code.toUpperCase(),
        duration: formData.duration,
        students: Number(formData.students),
        department: formData.department,
        description: formData.description,
        status: formData.status,
      });

      alert('Course added successfully!');

      navigate('/courses');
    } catch (error) {
      console.error('Error adding course:', error);

      alert(
        error.response?.data?.message ||
        'Failed to add course'
      );
    }
  };

  return (
    <div className="add-course-page">

      <div className="add-course-top">

        <Link
          to="/courses"
          className="back-course-button"
        >
          <FaArrowLeft />
          Back to Courses
        </Link>

        <div>
          <h1>Add Course</h1>
          <p>Add a new course</p>
        </div>

      </div>

      <form
        className="course-form"
        onSubmit={handleSubmit}
      >

        <div className="course-form-grid">

          <div className="course-form-group">
            <label>Course Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter course name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-form-group">
            <label>Course Code</label>

            <input
              type="text"
              name="code"
              placeholder="Example: CSE"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-form-group">
            <label>Duration</label>

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="">Select duration</option>
              <option value="4 Years">4 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="2 Years">2 Years</option>
            </select>
          </div>

          <div className="course-form-group">
            <label>Number of Students</label>

            <input
              type="number"
              name="students"
              min="0"
              value={formData.students}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-form-group">
            <label>Department</label>

            <input
              type="text"
              name="department"
              placeholder="Enter department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="course-form-group full-width">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter course description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

        </div>

        <div className="course-form-buttons">

          <Link
            to="/courses"
            className="course-cancel-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="course-save-button"
          >
            <FaSave />
            Save Course
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddCourse;