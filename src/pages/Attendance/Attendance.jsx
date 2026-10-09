import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
} from 'react-icons/fa';

import API from '../../api';

import './Attendance.css';

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await API.get('/attendance');

      const records = response.data.attendance || [];

      const updatedRecords = records.map((record) => {
        const percentage =
          record.totalClasses > 0
            ? Math.round(
                (record.present / record.totalClasses) * 100
              )
            : 0;

        let status = 'Low';

        if (percentage >= 90) {
          status = 'Excellent';
        } else if (percentage >= 75) {
          status = 'Good';
        }

        return {
          ...record,
          month:
            record.month ||
            new Date().toLocaleString('default', {
              month: 'long',
            }),
          percentage,
          status,
        };
      });

      setAttendance(updatedRecords);
    } catch (error) {
      console.error(
        'Error fetching attendance:',
        error
      );

      alert('Failed to load attendance records');
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this attendance record?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/attendance/${studentId}`);

      setAttendance(
        attendance.filter(
          (record) => record.studentId !== studentId
        )
      );

      alert('Attendance deleted successfully!');
    } catch (error) {
      console.error(
        'Error deleting attendance:',
        error
      );

      alert(
        error.response?.data?.message ||
        'Failed to delete attendance'
      );
    }
  };

  const filteredAttendance = attendance.filter((record) => {
    const search = searchTerm.toLowerCase();

    return (
      record.studentName
        .toLowerCase()
        .includes(search) ||
      record.studentId
        .toLowerCase()
        .includes(search) ||
      record.course
        .toLowerCase()
        .includes(search) ||
      record.month
        .toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="attendance-page">

      <div className="attendance-header">
        <div>
          <h1>Attendance</h1>
          <p>Manage student attendance records</p>
        </div>

        <Link
          to="/add-attendance"
          className="add-attendance-button"
        >
          <FaPlus />
          Add Attendance
        </Link>
      </div>

      <div className="attendance-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search attendance..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />
      </div>

      <div className="attendance-table-container">

        <table className="attendance-table">

          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Course</th>
              <th>Month</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredAttendance.length > 0 ? (

              filteredAttendance.map((record) => (

                <tr key={record.studentId}>

                  <td>
                    <Link
                      to={`/attendance-details/${record.studentId}`}
                      className="attendance-name-link"
                    >
                      {record.studentName}
                    </Link>
                  </td>

                  <td>{record.studentId}</td>

                  <td>{record.course}</td>

                  <td>{record.month}</td>

                  <td>{record.present}</td>

                  <td>{record.absent}</td>

                  <td>
                    <strong>
                      {record.percentage}%
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`attendance-status ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>

                  <td>
                    <div className="attendance-actions">

                      <Link
                        to={`/attendance-details/${record.studentId}`}
                        className="attendance-view-button"
                        title="View Attendance"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/edit-attendance/${record.studentId}`}
                        className="attendance-edit-button"
                        title="Edit Attendance"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="attendance-delete-button"
                        title="Delete Attendance"
                        onClick={() =>
                          handleDelete(record.studentId)
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
                  colSpan="9"
                  className="no-attendance"
                >
                  No attendance records found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Attendance;