import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye
} from 'react-icons/fa';

import API from '../../api';

import './Students.css';

function Students() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get students from Backend
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await API.get('/students');

      setStudents(response.data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);

      setError(
        error.response?.data?.message ||
        'Unable to load students'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Delete student
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this student?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/students/${studentId}`);

      setStudents((currentStudents) =>
        currentStudents.filter(
          (student) =>
            student.studentId !== studentId
        )
      );

      alert('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);

      alert(
        error.response?.data?.message ||
        'Unable to delete student'
      );
    }
  };

  // Search students
  const filteredStudents = students.filter(
    (student) => {
      const search = searchTerm.toLowerCase();

      return (
        student.name
          ?.toLowerCase()
          .includes(search) ||
        student.studentId
          ?.toLowerCase()
          .includes(search) ||
        student.course
          ?.toLowerCase()
          .includes(search) ||
        student.email
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <div className="students-page">

      {/* Header */}
      <div className="students-header">

        <div>
          <h1>Students</h1>
          <p>Manage all students</p>
        </div>

        <Link
          to="/add-student"
          className="add-student-button"
        >
          <FaPlus />
          Add Student
        </Link>

      </div>


      {/* Search */}
      <div className="students-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

      </div>


      {/* Error */}
      {error && (
        <div
          style={{
            padding: '15px',
            marginBottom: '20px',
            background: '#ffe6e6',
            color: '#d00',
            borderRadius: '8px'
          }}
        >
          {error}
        </div>
      )}


      {/* Table */}
      <div className="students-table-container">

        <table className="students-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Course</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>


          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '30px'
                  }}
                >
                  Loading students...
                </td>
              </tr>

            ) : filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <tr key={student._id}>

                  {/* Name */}
                  <td>

                    <Link
                      to={`/student-details/${student.studentId}`}
                      className="student-name-link"
                    >
                      {student.name}
                    </Link>

                  </td>


                  {/* Student ID */}
                  <td>
                    {student.studentId}
                  </td>


                  {/* Course */}
                  <td>
                    {student.course}
                  </td>


                  {/* Email */}
                  <td>
                    {student.email}
                  </td>


                  {/* Status */}
                  <td>

                    <span
                      className={
                        student.status === 'Active'
                          ? 'status active'
                          : 'status inactive'
                      }
                    >
                      {student.status}
                    </span>

                  </td>


                  {/* Actions */}
                  <td>

                    <div className="student-actions">

                      {/* View */}
                      <Link
                        to={`/student-details/${student.studentId}`}
                        className="view-button"
                        title="View Student"
                      >
                        <FaEye />
                      </Link>


                      {/* Edit */}
                      <Link
                        to={`/edit-student/${student.studentId}`}
                        className="edit-button"
                        title="Edit Student"
                      >
                        <FaEdit />
                      </Link>


                      {/* Delete */}
                      <button
                        className="delete-button"
                        title="Delete Student"
                        onClick={() =>
                          handleDelete(
                            student.studentId
                          )
                        }
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '30px'
                  }}
                >
                  No students found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;