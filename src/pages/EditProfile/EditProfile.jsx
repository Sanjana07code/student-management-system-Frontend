import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';

import API from '../../api';

import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    studentId: '',
    teacherId: '',
    course: '',
    semester: '',
    department: '',
    qualification: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/auth/me');
      const user = response.data.user;

      setFormData({
        name: user.name || '',
        role: user.role || '',
        email: user.email || '',
        phone: user.phone || '',
        studentId: user.studentId || '',
        teacherId: user.teacherId || '',
        course: user.course || '',
        semester: user.semester || '',
        department: user.department || '',
        qualification: user.qualification || ''
      });

    } catch (error) {
      console.error(
        'Error fetching profile:',
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const role =
        formData.role.toLowerCase();

      let updateData = {
        name: formData.name,
        email: formData.email
      };

      // Admin
      if (role === 'admin') {
        updateData.phone = formData.phone;
      }

      // Student
      if (role === 'student') {
        updateData.phone = formData.phone;
        updateData.course = formData.course;
        updateData.department = formData.department;
        updateData.semester = formData.semester;
      }

      // Teacher
      if (role === 'teacher') {
        updateData.phone = formData.phone;
        updateData.department = formData.department;
        updateData.qualification =
          formData.qualification;
      }

      console.log(
        'Sending profile data:',
        updateData
      );

      const response = await API.put(
        '/auth/profile',
        updateData
      );

      console.log(
        'Profile update response:',
        response.data
      );

      alert(
        response.data.message ||
        'Profile updated successfully!'
      );

      // Fetch fresh profile data
      // after update
      await fetchProfile();

      navigate('/profile');

    } catch (error) {
      console.error(
        'Profile update error:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Profile update failed'
      );

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  const role =
    formData.role.toLowerCase();

  return (
    <div className="edit-profile-page">

      <div className="edit-profile-header">
        <div>
          <h1>Edit Profile</h1>
          <p>
            Update your profile information
          </p>
        </div>
      </div>


      <form
        className="edit-profile-card"
        onSubmit={handleSubmit}
      >

        <div className="form-grid">

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-group">
            <label>Role</label>

            <input
              type="text"
              value={formData.role}
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


          {role === 'student' && (
            <>

              <div className="form-group">
                <label>Student ID</label>

                <input
                  type="text"
                  value={formData.studentId}
                  disabled
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

            </>
          )}


          {role === 'teacher' && (
            <>

              <div className="form-group">
                <label>Teacher ID</label>

                <input
                  type="text"
                  value={formData.teacherId}
                  disabled
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
                <label>Qualification</label>

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>

            </>
          )}

        </div>


        <div className="edit-profile-actions">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate('/profile')
            }
          >
            <FaArrowLeft />
            Back
          </button>


          <button
            type="submit"
            className="save-profile-button"
            disabled={saving}
          >
            <FaSave />

            {saving
              ? 'Saving...'
              : 'Save Profile'}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProfile;
