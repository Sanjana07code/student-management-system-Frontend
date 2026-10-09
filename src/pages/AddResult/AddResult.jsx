import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave,
} from 'react-icons/fa';

import API from '../../api';

import './AddResult.css';

function AddResult() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    semester: '',
    marks: '',
    totalMarks: 100,
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
      const marks = Number(formData.marks);
      const totalMarks = Number(formData.totalMarks);

      if (marks > totalMarks) {
        alert(
          'Marks obtained cannot be greater than total marks.'
        );
        return;
      }

      if (marks < 0 || totalMarks <= 0) {
        alert('Please enter valid marks.');
        return;
      }

      const response = await API.post('/results', {
        studentId: formData.studentId,
        studentName: formData.studentName,
        course: formData.course,
        semester: formData.semester,
        marks,
        totalMarks,
      });

      if (response.data.success) {
        alert('Result added successfully!');

        navigate('/results');
      }

    } catch (error) {
      console.error('Error adding result:', error);

      alert(
        error.response?.data?.message ||
        'Failed to add result'
      );
    }
  };

  return (
    <div className="add-result-page">

      <div className="add-result-top">

        <Link
          to="/results"
          className="back-result-button"
        >
          <FaArrowLeft />
          Back to Results
        </Link>

        <h1>Add Result</h1>
        <p>Add a new student result</p>

      </div>

      <form
        className="result-form"
        onSubmit={handleSubmit}
      >

        <div className="result-form-grid">

          <div className="result-form-group">
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

          <div className="result-form-group">
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

          <div className="result-form-group">
            <label>Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select course</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
            </select>
          </div>

          <div className="result-form-group">
            <label>Semester</label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
              <option value="3rd Semester">3rd Semester</option>
              <option value="4th Semester">4th Semester</option>
              <option value="5th Semester">5th Semester</option>
              <option value="6th Semester">6th Semester</option>
              <option value="7th Semester">7th Semester</option>
              <option value="8th Semester">8th Semester</option>
            </select>
          </div>

          <div className="result-form-group">
            <label>Marks Obtained</label>

            <input
              type="number"
              name="marks"
              min="0"
              max={formData.totalMarks}
              placeholder="Example: 85"
              value={formData.marks}
              onChange={handleChange}
              required
            />
          </div>

          <div className="result-form-group">
            <label>Total Marks</label>

            <input
              type="number"
              name="totalMarks"
              min="1"
              value={formData.totalMarks}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="result-form-buttons">

          <Link
            to="/results"
            className="result-cancel-button"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="result-save-button"
          >
            <FaSave />
            Save Result
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddResult;