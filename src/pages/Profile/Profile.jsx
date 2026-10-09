import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaIdCard,
  FaEdit
} from 'react-icons/fa';

import API from '../../api';

import './Profile.css';

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get('/auth/me');

      setUser(response.data.user);

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

  if (loading) {
    return (
      <div className="profile-page">
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Profile not found</h2>
      </div>
    );
  }

  const role = user.role?.toLowerCase();

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <div>

          <h1>
            My Profile
          </h1>

          <p>
            View and manage your profile information
          </p>

        </div>

        <button
          className="profile-edit-button"
          onClick={() =>
            navigate('/edit-profile')
          }
        >
          <FaEdit />
          Edit Profile
        </button>

      </div>


      {/* Profile Card */}

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
            <FaUser />
          </div>

          <div className="profile-name">

            <h2>
              {user.name}
            </h2>

            <p>
              {user.role}
            </p>

            <span className="profile-status">
              {user.status || 'Active'}
            </span>

          </div>

        </div>


        {/* Profile Information */}

        <div className="profile-info">

          {/* Email - All Users */}

          <div className="info-item">

            <div className="info-icon">
              <FaEnvelope />
            </div>

            <div>

              <span>
                Email
              </span>

              <strong>
                {user.email}
              </strong>

            </div>

          </div>


          {/* Phone - All Users */}

          <div className="info-item">

            <div className="info-icon">
              <FaPhone />
            </div>

            <div>

              <span>
                Phone
              </span>

              <strong>
                {user.phone || 'Not available'}
              </strong>

            </div>

          </div>


          {/* Student Information */}

          {role === 'student' && (
            <>

              <div className="info-item">

                <div className="info-icon">
                  <FaIdCard />
                </div>

                <div>

                  <span>
                    Student ID
                  </span>

                  <strong>
                    {user.studentId || 'Not available'}
                  </strong>

                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  <FaGraduationCap />
                </div>

                <div>

                  <span>
                    Course
                  </span>

                  <strong>
                    {user.course || 'Not available'}
                  </strong>

                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  <FaGraduationCap />
                </div>

                <div>

                  <span>
                    Department
                  </span>

                  <strong>
                    {user.department || 'Not available'}
                  </strong>

                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  <FaGraduationCap />
                </div>

                <div>

                  <span>
                    Semester
                  </span>

                  <strong>
                    {user.semester || 'Not available'}
                  </strong>

                </div>

              </div>

            </>
          )}


          {/* Teacher Information */}

          {role === 'teacher' && (
            <>

              <div className="info-item">

                <div className="info-icon">
                  <FaIdCard />
                </div>

                <div>

                  <span>
                    Teacher ID
                  </span>

                  <strong>
                    {user.teacherId || 'Not available'}
                  </strong>

                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  <FaGraduationCap />
                </div>

                <div>

                  <span>
                    Department
                  </span>

                  <strong>
                    {user.department || 'Not available'}
                  </strong>

                </div>

              </div>


              <div className="info-item">

                <div className="info-icon">
                  <FaGraduationCap />
                </div>

                <div>

                  <span>
                    Qualification
                  </span>

                  <strong>
                    {user.qualification || 'Not available'}
                  </strong>

                </div>

              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;
