import { useEffect, useState } from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';

import './EditStudent.css';
import API from '../../api';
function EditStudent() {
  const { studentId } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(
          `/students/${studentId}`
        );

        const student = response.data.student;

        setFormData({
          name: student.name || '',
          studentId: student.studentId || '',
          email: student.email || '',
          phone: student.phone || '',
          course: student.course || '',
          department: student.department || '',
          semester: student.semester || '',
          status: student.status || 'Active',
          address: student.address || ''
        });
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
          'Unable to load student'
        );

        navigate('/students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId, navigate]);

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
      setSaving(true);

      await API.put(
        `/students/${studentId}`,
        formData
      );

      alert('Student updated successfully');

      navigate('/students');
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        'Unable to update student'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading student...</p>;
  }

  return (
    <div className="edit-student-page">

      <div className="edit-student-header">
        <h1>Edit Student</h1>
        <p>Update student information</p>
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
            required
          />
        </div>

        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            value={formData.studentId}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Student'}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditStudent;