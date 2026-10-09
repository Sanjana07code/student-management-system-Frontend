import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaSave
} from 'react-icons/fa';

import API from '../../api';
import './AddTeacher.css';

function AddTeacher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    department: '',
    status: 'Active',
    qualification: '',
    address: ''
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
      await API.post('/teachers', {
        name: formData.name,
        teacherId: formData.id,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        status: formData.status,
        qualification: formData.qualification,
        address: formData.address
      });

      alert('Teacher added successfully!');

      navigate('/teachers');
    } catch (error) {
      console.error(
        'Add teacher error:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to add teacher'
      );
    }
  };

  return (
    <div className="add-teacher-page">

      <div className="add-teacher-header">

        <div>
          <h1>Add Teacher</h1>
          <p>Add a new teacher to the system</p>
        </div>

        <Link
          to="/teachers"
          className="teacher-back-button"
        >
          <FaArrowLeft />
          Back to Teachers
        </Link>

      </div>

      <div className="teacher-form-card">

        <form onSubmit={handleSubmit}>

          <div className="teacher-form-row">

            <div className="teacher-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter teacher name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="teacher-form-group">
              <label>Teacher ID</label>

              <input
                type="text"
                name="id"
                placeholder="Example: TCH005"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="teacher-form-row">

            <div className="teacher-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="teacher-form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="teacher-form-row">

            <div className="teacher-form-group">
              <label>Department</label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Department
                </option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="IT">IT</option>
                <option value="CE">CE</option>
                <option value="ME">ME</option>
              </select>
            </div>

            <div className="teacher-form-group">
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

          </div>

          <div className="teacher-form-group">
            <label>Qualification</label>

            <input
              type="text"
              name="qualification"
              placeholder="Example: M.Tech, PhD"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>

          <div className="teacher-form-group">
            <label>Address</label>

            <textarea
              name="address"
              rows="4"
              placeholder="Enter teacher address"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="teacher-form-actions">

            <Link
              to="/teachers"
              className="teacher-cancel-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="teacher-save-button"
            >
              <FaSave />
              Save Teacher
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTeacher;