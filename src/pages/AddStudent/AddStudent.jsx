import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AddStudent.css';
import API from '../../api';
function AddStudent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    course: '',
    department: '',
    semester: '',
    status: 'Active',
    address: ''
  });

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      await API.post('/students', formData);

      alert('Student added successfully');

      navigate('/students');
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        'Unable to add student'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">

      <div className="add-student-header">
        <h1>Add Student</h1>
        <p>Add a new student to the system</p>
      </div>

      <form
        className="student-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            required
          />
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Example: STU005"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label>Course</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Example: B.Tech CSE"
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Computer Science and Engineering"
            required
          />
        </div>

        <div className="form-group">
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="Example: 5th"
            required
          />
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label>Address</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="form-buttons">

          <button
            type="button"
            onClick={() => navigate('/students')}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Student'}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddStudent;