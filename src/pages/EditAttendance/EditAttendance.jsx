import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave
} from 'react-icons/fa';

import API from '../../api';

import './EditAttendance.css';

function EditAttendance() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    course: '',
    totalClasses: '',
    present: '',
    absent: ''
  });

  useEffect(() => {
    fetchAttendance();
  }, [studentId]);

  const fetchAttendance = async () => {
    try {
      const response = await API.get(
        `/attendance/${studentId}`
      );

      const record = response.data.attendance;

      if (record) {
        setFormData({
          studentId: record.studentId,
          studentName: record.studentName,
          course: record.course,
          totalClasses: record.totalClasses,
          present: record.present,
          absent: record.absent
        });
      }

    } catch (error) {
      console.error(
        'Error fetching attendance:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to load attendance'
      );
    }
  };

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
      await API.put(`/attendance/${studentId}`, {
        studentName: formData.studentName,
        course: formData.course,
        totalClasses: Number(
          formData.totalClasses
        ),
        present: Number(formData.present),
        absent: Number(formData.absent)
      });

      alert('Attendance updated successfully!');

      navigate('/attendance');

    } catch (error) {
      console.error(
        'Error updating attendance:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to update attendance'
      );
    }
  };

  return (
    <div className="edit-attendance-page">

      <div className="edit-attendance-header">

        <div>
          <h1>Edit Attendance</h1>
          <p>Update student attendance record</p>
        </div>

      </div>

      <form
        className="edit-attendance-card"
        onSubmit={handleSubmit}
      >

        <div className="attendance-edit-grid">

          <div className="attendance-edit-group">
            <label>Student ID</label>

            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              disabled
            />
          </div>

          <div className="attendance-edit-group">
            <label>Student Name</label>

            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-edit-group">
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

          <div className="attendance-edit-group">
            <label>Total Classes</label>

            <input
              type="number"
              name="totalClasses"
              min="1"
              value={formData.totalClasses}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-edit-group">
            <label>Present</label>

            <input
              type="number"
              name="present"
              min="0"
              value={formData.present}
              onChange={handleChange}
              required
            />
          </div>

          <div className="attendance-edit-group">
            <label>Absent</label>

            <input
              type="number"
              name="absent"
              min="0"
              value={formData.absent}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="edit-attendance-actions">

          <button
            type="button"
            className="attendance-edit-back"
            onClick={() =>
              navigate('/attendance')
            }
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            type="submit"
            className="attendance-edit-save"
          >
            <FaSave />
            Update Attendance
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditAttendance;