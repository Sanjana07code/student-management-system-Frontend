import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye
} from 'react-icons/fa';

import './Teachers.css';
import API from '../../api';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get teachers from MongoDB
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await API.get('/teachers');

        setTeachers(response.data.teachers || []);
      } catch (error) {
        console.error(
          'Error fetching teachers:',
          error
        );

        alert(
          error.response?.data?.message ||
          'Failed to load teachers'
        );
      }
    };

    fetchTeachers();
  }, []);

  // Delete teacher
  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this teacher?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/teachers/${teacherId}`
      );

      setTeachers((currentTeachers) =>
        currentTeachers.filter(
          (teacher) =>
            teacher.teacherId !== teacherId
        )
      );

      alert('Teacher deleted successfully');
    } catch (error) {
      console.error(
        'Error deleting teacher:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to delete teacher'
      );
    }
  };

  // Search teachers
  const filteredTeachers = teachers.filter(
    (teacher) => {
      const search =
        searchTerm.toLowerCase();

      return (
        teacher.name
          ?.toLowerCase()
          .includes(search) ||
        teacher.teacherId
          ?.toLowerCase()
          .includes(search) ||
        teacher.department
          ?.toLowerCase()
          .includes(search) ||
        teacher.email
          ?.toLowerCase()
          .includes(search)
      );
    }
  );

  return (
    <div className="teachers-page">

      <div className="teachers-header">

        <div>
          <h1>Teachers</h1>
          <p>Manage all teachers</p>
        </div>

        <Link
          to="/add-teacher"
          className="add-teacher-button"
        >
          <FaPlus />
          Add Teacher
        </Link>

      </div>

      <div className="teachers-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search teachers..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
        />

      </div>

      <div className="teachers-table-container">

        <table className="teachers-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Teacher ID</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredTeachers.length > 0 ? (

              filteredTeachers.map(
                (teacher) => (

                  <tr
                    key={teacher._id}
                  >

                    <td>
                      <Link
                        to={`/teacher-details/${teacher.teacherId}`}
                        className="teacher-name-link"
                      >
                        {teacher.name}
                      </Link>
                    </td>

                    <td>
                      {teacher.teacherId}
                    </td>

                    <td>
                      {teacher.department}
                    </td>

                    <td>
                      {teacher.email}
                    </td>

                    <td>

                      <span
                        className={
                          teacher.status ===
                          'Active'
                            ? 'teacher-status active'
                            : 'teacher-status inactive'
                        }
                      >
                        {teacher.status}
                      </span>

                    </td>

                    <td>

                      <div className="teacher-actions">

                        <Link
                          to={`/teacher-details/${teacher.teacherId}`}
                          className="teacher-view-button"
                          title="View Teacher"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/edit-teacher/${teacher.teacherId}`}
                          className="teacher-edit-button"
                          title="Edit Teacher"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="teacher-delete-button"
                          title="Delete Teacher"
                          onClick={() =>
                            handleDelete(
                              teacher.teacherId
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: 'center',
                    padding: '30px'
                  }}
                >
                  No teachers found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Teachers;