import { useEffect, useState } from 'react';
import {
  Link,
  useParams
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaEdit,
  FaChalkboardTeacher
} from 'react-icons/fa';

import API from '../../api';
import './TeacherDetails.css';

function TeacherDetails() {

  const { teacherId } = useParams();

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {

    const fetchTeacher = async () => {

      try {

        const response = await API.get(
          `/teachers/${teacherId}`
        );

        setTeacher(
          response.data.teacher
        );

      } catch (error) {

        console.error(
          'Teacher details error:',
          error
        );

        setTeacher(null);

      }

    };

    fetchTeacher();

  }, [teacherId]);

  if (!teacher) {

    return (
      <div className="teacher-details-page">

        <div className="teacher-details-header">

          <div>

            <h1>Teacher Not Found</h1>

            <p>
              The teacher you are looking for does not exist.
            </p>

          </div>

          <Link
            to="/teachers"
            className="teacher-back-button"
          >
            <FaArrowLeft />
            Back to Teachers
          </Link>

        </div>

      </div>
    );

  }

  return (
    <div className="teacher-details-page">

      <div className="teacher-details-header">

        <div>

          <h1>Teacher Details</h1>

          <p>
            View teacher information
          </p>

        </div>

        <Link
          to="/teachers"
          className="teacher-back-button"
        >
          <FaArrowLeft />
          Back to Teachers
        </Link>

      </div>

      <div className="teacher-profile-card">

        <div className="teacher-profile-top">

          <div className="teacher-avatar">
            <FaChalkboardTeacher />
          </div>

          <div className="teacher-basic-info">

            <h2>
              {teacher.name}
            </h2>

            <p>
              Teacher ID: {teacher.teacherId}
            </p>

            <span
              className={
                teacher.status === 'Active'
                  ? 'teacher-detail-status active'
                  : 'teacher-detail-status inactive'
              }
            >
              {teacher.status}
            </span>

          </div>

          <Link
            to={`/edit-teacher/${teacher.teacherId}`}
            className="edit-teacher-button"
          >
            <FaEdit />
            Edit Teacher
          </Link>

        </div>

        <div className="teacher-info-grid">

          <div className="teacher-info-item">

            <span>Email</span>

            <strong>
              {teacher.email ||
                'Not provided'}
            </strong>

          </div>

          <div className="teacher-info-item">

            <span>Phone</span>

            <strong>
              {teacher.phone ||
                'Not provided'}
            </strong>

          </div>

          <div className="teacher-info-item">

            <span>Department</span>

            <strong>
              {teacher.department ||
                'Not provided'}
            </strong>

          </div>

          <div className="teacher-info-item">

            <span>Qualification</span>

            <strong>
              {teacher.qualification ||
                'Not provided'}
            </strong>

          </div>

          <div className="teacher-info-item">

            <span>Experience</span>

            <strong>
              Faculty Member
            </strong>

          </div>

          <div className="teacher-info-item">

            <span>Address</span>

            <strong>
              {teacher.address ||
                'Not provided'}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TeacherDetails;