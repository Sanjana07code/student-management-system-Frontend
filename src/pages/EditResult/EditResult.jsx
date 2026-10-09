import { useEffect, useState } from 'react';

import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave,
} from 'react-icons/fa';

import API from '../../api';

import './EditResult.css';

function EditResult() {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    semester: '',
    marks: '',
    totalMarks: 100,
  });

  useEffect(() => {
    fetchResult();
  }, [studentId]);

  const fetchResult = async () => {
    try {
      const response = await API.get(
        `/results/${studentId}`
      );

      const result = response.data.result;

      if (result) {
        setFormData({
          studentId: result.studentId,
          studentName: result.studentName,
          course: result.course,
          semester: result.semester,
          marks: result.marks,
          totalMarks: result.totalMarks,
        });
      }

    } catch (error) {
      console.error('Error fetching result:', error);

      alert(
        error.response?.data?.message ||
        'Result not found'
      );

      navigate('/results');
    }
  };

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

      await API.put(
        `/results/${studentId}`,
        {
          studentName: formData.studentName,
          course: formData.course,
          semester: formData.semester,
          marks,
          totalMarks,
        }
      );

      alert('Result updated successfully!');

      navigate('/results');

    } catch (error) {
      console.error('Error updating result:', error);

      alert(
        error.response?.data?.message ||
        'Failed to update result'
      );
    }
  };

  return (
    <div className="edit-result-page">

      <div className="edit-result-top">

        <Link
          to="/results"
          className="back-result-button"
        >
          <FaArrowLeft />
          Back to Results
        </Link>

        <h1>Edit Result</h1>
        <p>Update student result</p>

      </div>

      <form
        className="edit-result-form"
        onSubmit={handleSubmit}
      >

        <div className="edit-result-grid">

          <div className="edit-result-group">
            <label>Student ID</label>

            <input
              type="text"
              value={formData.studentId}
              readOnly
            />
          </div>

          <div className="edit-result-group">
            <label>Student Name</label>

            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-result-group">
            <label>Course</label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="CE">CE</option>
              <option value="ME">ME</option>
            </select>
          </div>

          <div className="edit-result-group">
            <label>Semester</label>

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
            >
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

          <div className="edit-result-group">
            <label>Marks Obtained</label>

            <input
              type="number"
              name="marks"
              min="0"
              max={formData.totalMarks}
              value={formData.marks}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-result-group">
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

        <div className="edit-result-buttons">

          <Link
            to="/results"
            className="edit-result-cancel"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="edit-result-save"
          >
            <FaSave />
            Update Result
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditResult;