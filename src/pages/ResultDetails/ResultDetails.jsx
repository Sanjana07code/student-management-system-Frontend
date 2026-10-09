import { useEffect, useState } from 'react';

import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaEdit,
  FaChartBar,
} from 'react-icons/fa';

import API from '../../api';

import './ResultDetails.css';

function ResultDetails() {
  const { studentId } = useParams();

  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchResult();
  }, [studentId]);

  const fetchResult = async () => {
    try {
      const response = await API.get(
        `/results/${studentId}`
      );

      setResult(response.data.result);

    } catch (error) {
      console.error('Error fetching result:', error);

      setResult(null);
    }
  };

  if (!result) {
    return (
      <div className="result-details-page">

        <h2>Result not found</h2>

        <Link
          to="/results"
          className="back-result-button"
        >
          <FaArrowLeft />
          Back to Results
        </Link>

      </div>
    );
  }

  const percentage =
    result.totalMarks > 0
      ? Math.round(
          (result.marks / result.totalMarks) * 100
        )
      : 0;

  return (
    <div className="result-details-page">

      <div className="result-details-top">

        <Link
          to="/results"
          className="back-result-button"
        >
          <FaArrowLeft />
          Back to Results
        </Link>

        <div className="result-details-heading">

          <div className="result-icon">
            <FaChartBar />
          </div>

          <div>
            <h1>{result.studentName}</h1>
            <p>Academic Result Details</p>
          </div>

        </div>

      </div>

      <div className="result-details-card">

        <div className="result-details-header">

          <div>
            <h2>{result.studentName}</h2>
            <p>{result.studentId}</p>
          </div>

          <span
            className={
              result.status === 'Passed'
                ? 'result-detail-status passed'
                : 'result-detail-status failed'
            }
          >
            {result.status}
          </span>

        </div>

        <div className="result-details-grid">

          <div className="result-detail-item">
            <span>Student ID</span>
            <strong>{result.studentId}</strong>
          </div>

          <div className="result-detail-item">
            <span>Course</span>
            <strong>{result.course}</strong>
          </div>

          <div className="result-detail-item">
            <span>Semester</span>
            <strong>{result.semester}</strong>
          </div>

          <div className="result-detail-item">
            <span>Marks Obtained</span>
            <strong>{result.marks}</strong>
          </div>

          <div className="result-detail-item">
            <span>Total Marks</span>
            <strong>{result.totalMarks}</strong>
          </div>

          <div className="result-detail-item">
            <span>Grade</span>
            <strong>{result.grade}</strong>
          </div>

        </div>

        <div className="result-percentage-box">

          <div className="result-percentage-header">

            <span>Overall Percentage</span>

            <strong>{percentage}%</strong>

          </div>

          <div className="result-percentage-bar">

            <div
              className="result-percentage-fill"
              style={{
                width: `${percentage}%`,
              }}
            ></div>

          </div>

        </div>

        <div className="result-details-actions">

          <Link
            to={`/edit-result/${result.studentId}`}
            className="result-details-edit"
          >
            <FaEdit />
            Edit Result
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ResultDetails;