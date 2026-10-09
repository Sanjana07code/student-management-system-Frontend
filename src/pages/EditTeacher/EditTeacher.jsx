import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaSave
} from 'react-icons/fa';

import API from '../../api';
import './EditTeacher.css';

function EditTeacher() {

  const { teacherId } = useParams();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);

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

  useEffect(() => {

    const fetchTeacher = async () => {

      try {

        const response = await API.get(
          `/teachers/${teacherId}`
        );

        const foundTeacher =
          response.data.teacher;

        if (foundTeacher) {

          setTeacher(foundTeacher);

          setFormData({
            name: foundTeacher.name || '',
            id: foundTeacher.teacherId || '',
            email: foundTeacher.email || '',
            phone: foundTeacher.phone || '',
            department:
              foundTeacher.department || '',
            status:
              foundTeacher.status || 'Active',
            qualification:
              foundTeacher.qualification || '',
            address:
              foundTeacher.address || ''
          });

        }

      } catch (error) {

        console.error(
          'Fetch teacher error:',
          error
        );

        setTeacher(null);

      }

    };

    fetchTeacher();

  }, [teacherId]);

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

      await API.put(
        `/teachers/${teacherId}`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          status: formData.status,
          qualification:
            formData.qualification,
          address: formData.address
        }
      );

      alert(
        'Teacher updated successfully!'
      );

      navigate('/teachers');

    } catch (error) {

      console.error(
        'Update teacher error:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to update teacher'
      );

    }

  };

  if (!teacher) {

    return (
      <div className="edit-teacher-page">

        <h1>Teacher Not Found</h1>

        <p>
          The teacher you are trying to edit does not exist.
        </p>

        <Link
          to="/teachers"
          className="teacher-back-button"
        >
          <FaArrowLeft />
          Back to Teachers
        </Link>

      </div>
    );

  }

  return (
    <div className="edit-teacher-page">

      <div className="edit-teacher-header">

        <div>
          <h1>Edit Teacher</h1>
          <p>Update teacher information</p>
        </div>

        <Link
          to="/teachers"
          className="teacher-back-button"
        >
          <FaArrowLeft />
          Back to Teachers
        </Link>

      </div>

      <div className="edit-teacher-card">

        <form onSubmit={handleSubmit}>

          <div className="teacher-form-row">

            <div className="teacher-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="teacher-form-group">
              <label>Teacher ID</label>

              <input
                type="text"
                value={formData.id}
                readOnly
              />
            </div>

          </div>

          <div className="teacher-form-row">

            <div className="teacher-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
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
                <option value="Active">
                  Active
                </option>
                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <div className="teacher-form-group">
            <label>Qualification</label>

            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </div>

          <div className="teacher-form-group">
            <label>Address</label>

            <textarea
              name="address"
              rows="4"
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
              Update Teacher
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTeacher;