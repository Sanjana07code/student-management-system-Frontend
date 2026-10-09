import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaEdit,
  FaCalendarCheck,
} from 'react-icons/fa';

import API from '../../api';

import './AttendanceDetails.css';

function AttendanceDetails() {
  const { studentId } = useParams();

  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, [studentId]);

  const fetchAttendance = async () => {
    try {
      const response = await API.get(
        `/attendance/${studentId}`
      );

      const data = response.data.attendance;

      if (data) {
        const percentage =
          data.totalClasses > 0
            ? Math.round(
                (data.present /
                  data.totalClasses) *
                  100
              )
            : 0;

        let status = 'Low';

        if (percentage >= 90) {
          status = 'Excellent';
        } else if (percentage >= 75) {
          status = 'Good';
        }

        setRecord({
          ...data,
          month:
            data.month ||
            new Date().toLocaleString(
              'default',
              { month: 'long' }
            ),
          percentage,
          status,
        });
      }

    } catch (error) {
      console.error(
        'Error fetching attendance:',
        error
      );

      setRecord(null);
    }
  };

  if (!record) {
    return (
      <div className="attendance-details-page">

        <h2>Attendance record not found</h2>

        <Link
          to="/attendance"
          className="back-attendance-button"
        >
          <FaArrowLeft />
          Back to Attendance
        </Link>

      </div>
    );
  }

  return (
    <div className="attendance-details-page">

      <div className="attendance-details-top">

        <Link
          to="/attendance"
          className="back-attendance-button"
        >
          <FaArrowLeft />
          Back to Attendance
        </Link>

        <div className="attendance-details-heading">

          <div className="attendance-icon">
            <FaCalendarCheck />
          </div>

          <div>
            <h1>{record.studentName}</h1>
            <p>Attendance Details</p>
          </div>

        </div>

      </div>

      <div className="attendance-details-card">

        <div className="attendance-details-header">

          <div>
            <h2>{record.studentName}</h2>
            <p>{record.studentId}</p>
          </div>

          <span
            className={`attendance-detail-status ${record.status.toLowerCase()}`}
          >
            {record.status}
          </span>

        </div>

        <div className="attendance-details-grid">

          <div className="attendance-detail-item">
            <span>Student ID</span>
            <strong>{record.studentId}</strong>
          </div>

          <div className="attendance-detail-item">
            <span>Course</span>
            <strong>{record.course}</strong>
          </div>

          <div className="attendance-detail-item">
            <span>Month</span>
            <strong>{record.month}</strong>
          </div>

          <div className="attendance-detail-item">
            <span>Present Days</span>
            <strong>{record.present}</strong>
          </div>

          <div className="attendance-detail-item">
            <span>Absent Days</span>
            <strong>{record.absent}</strong>
          </div>

          <div className="attendance-detail-item">
            <span>Attendance Percentage</span>
            <strong>
              {record.percentage}%
            </strong>
          </div>

        </div>

        <div className="attendance-percentage-box">

          <div className="percentage-header">
            <span>Attendance Progress</span>

            <strong>
              {record.percentage}%
            </strong>
          </div>

          <div className="percentage-bar">

            <div
              className="percentage-fill"
              style={{
                width: `${record.percentage}%`,
              }}
            ></div>

          </div>

        </div>

        <div className="attendance-details-actions">

          <Link
            to={`/edit-attendance/${record.studentId}`}
            className="attendance-details-edit"
          >
            <FaEdit />
            Edit Attendance
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AttendanceDetails;