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

import './EditCourse.css';

function EditCourse() {
  const { courseCode } = useParams();
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

  useEffect(() => {
    fetchCourse();
  }, [courseCode]);

  const fetchCourse = async () => {
    try {
      const response = await API.get(
        `/courses/${courseCode}`
      );

      setFormData(response.data.course);
    } catch (error) {
      console.error('Error fetching course:', error);

      alert(
        error.response?.data?.message ||
        'Failed to load course'
      );
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
      await API.put(`/courses/${courseCode}`, {
        name: formData.name,
        duration: formData.duration,
        students: Number(formData.students),
        department: formData.department,
        description: formData.description,
        status: formData.status,
      });

      alert('Course updated successfully!');

      navigate('/courses');
    } catch (error) {
      console.error('Error updating course:', error);

      alert(
        error.response?.data?.message ||
        'Failed to update course'
      );
    }
  };

  return (
    <div className="edit-course-page">

      <div className="edit-course-top">

        <Link
          to="/courses"
          className="back-course-button"
        >
          <FaArrowLeft />
          Back to Courses
        </Link>

        <h1>Edit Course</h1>
        <p>Update course information</p>

      </div>

      <form
        className="edit-course-form"
        onSubmit={handleSubmit}
      >

        <div className="edit-course-grid">

          <div className="edit-course-group">
            <label>Course Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-course-group">
            <label>Course Code</label>

            <input
              type="text"
              name="code"
              value={formData.code}
              readOnly
            />
          </div>

          <div className="edit-course-group">
            <label>Duration</label>

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="4 Years">4 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="2 Years">2 Years</option>
            </select>
          </div>

          <div className="edit-course-group">
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

          <div className="edit-course-group">
            <label>Department</label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-course-group">
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

          <div className="edit-course-group edit-full-width">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

        </div>

        <div className="edit-course-buttons">

          <Link
            to="/courses"
            className="edit-course-cancel"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="edit-course-save"
          >
            <FaSave />
            Update Course
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditCourse;