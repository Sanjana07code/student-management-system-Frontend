import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave
} from 'react-icons/fa';

import API from '../../api';

import './AddAttendance.css';

function AddAttendance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    totalClasses: '',
    present: '',
    absent: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await API.post('/attendance', {
        studentId: formData.studentId,
        studentName: formData.studentName,
        course: formData.course,
        totalClasses: Number(formData.totalClasses),
        present: Number(formData.present),
        absent: Number(formData.absent),
        month: new Date().toLocaleString(
          'default',
          { month: 'long' }
        )
      });

      alert('Attendance added successfully!');

      navigate('/attendance');

    } catch (error) {
      console.error(
        'Error adding attendance:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to add attendance'
      );
    }
  };

  return (
    <div className="add-attendance-page">

      <div className="add-attendance-header">

        <div>
          <h1>Add Attendance</h1>
          <p>Add a new student attendance record</p>
        </div>

      </div>

      <form
        className="add-attendance-card"
        onSubmit={handleSubmit}
      >

        <div className="attendance-form-grid">

          <div className="attendance-form-group">
            <label>Student ID</label>

            <input
              type="text"
              name="studentId"
              placeholder="Example: STU005"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Student Name</label>

            <input
              type="text"
              name="studentName"
              placeholder="Enter student name"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Course
              </option>

              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
            </select>
          </div>

          <div className="attendance-form-group">
            <label>Total Classes</label>

            <input
              type="number"
              name="totalClasses"
              min="1"
              placeholder="Example: 50"
              value={formData.totalClasses}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Present</label>

            <input
              type="number"
              name="present"
              min="0"
              placeholder="Example: 45"
              value={formData.present}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-form-group">
            <label>Absent</label>

            <input
              type="number"
              name="absent"
              min="0"
              placeholder="Example: 5"
              value={formData.absent}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="add-attendance-actions">

          <button
            type="button"
            className="attendance-back-button"
            onClick={() =>
              navigate('/attendance')
            }
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            type="submit"
            className="attendance-save-button"
          >
            <FaSave />
            Save Attendance
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddAttendance;