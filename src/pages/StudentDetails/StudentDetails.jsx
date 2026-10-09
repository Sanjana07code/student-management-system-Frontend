import { useEffect, useState } from 'react';
import {
  Link,
  useParams
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaEdit
} from 'react-icons/fa';


import './StudentDetails.css';
import API from '../../api';
function StudentDetails() {
  const { studentId } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(
          `/students/${studentId}`
        );

        setStudent(response.data.student);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
          'Unable to load student'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (loading) {
    return <p>Loading student...</p>;
  }

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="student-details-page">

      <div className="student-details-header">

        <div>
          <h1>Student Details</h1>
          <p>View student information</p>
        </div>

        <div>

          <Link
            to="/students"
            className="back-button"
          >
            <FaArrowLeft />
            Back
          </Link>

          <Link
            to={`/edit-student/${student.studentId}`}
            className="edit-button"
          >
            <FaEdit />
            Edit
          </Link>

        </div>

      </div>

      <div className="student-details-card">

        <h2>{student.name}</h2>

        <div className="student-info-grid">

          <div>
            <strong>Student ID</strong>
            <p>{student.studentId}</p>
          </div>

          <div>
            <strong>Email</strong>
            <p>{student.email}</p>
          </div>

          <div>
            <strong>Phone</strong>
            <p>{student.phone}</p>
          </div>

          <div>
            <strong>Course</strong>
            <p>{student.course}</p>
          </div>

          <div>
            <strong>Department</strong>
            <p>{student.department}</p>
          </div>

          <div>
            <strong>Semester</strong>
            <p>{student.semester}</p>
          </div>

          <div>
            <strong>Status</strong>
            <p>{student.status}</p>
          </div>

          <div>
            <strong>Address</strong>
            <p>{student.address || 'Not provided'}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;