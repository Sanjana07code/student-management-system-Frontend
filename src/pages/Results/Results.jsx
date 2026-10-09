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

import './Results.css';

function Results() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await API.get('/results');

      setResults(response.data.results || []);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this result?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/results/${studentId}`);

      setResults(
        results.filter(
          (result) => result.studentId !== studentId
        )
      );

      alert('Result deleted successfully!');
    } catch (error) {
      console.error('Error deleting result:', error);

      alert(
        error.response?.data?.message ||
        'Failed to delete result'
      );
    }
  };

  const filteredResults = results.filter((result) => {
    const search = searchTerm.toLowerCase();

    return (
      result.studentName
        ?.toLowerCase()
        .includes(search) ||
      result.studentId
        ?.toLowerCase()
        .includes(search) ||
      result.course
        ?.toLowerCase()
        .includes(search) ||
      result.semester
        ?.toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="results-page">

      <div className="results-header">

        <div>
          <h1>Results</h1>
          <p>Manage student academic results</p>
        </div>

        <Link
          to="/add-result"
          className="add-result-button"
        >
          <FaPlus />
          Add Result
        </Link>

      </div>

      <div className="results-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search results..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

      </div>

      <div className="results-table-container">

        <table className="results-table">

          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Course</th>
              <th>Semester</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredResults.length > 0 ? (

              filteredResults.map((result) => (

                <tr key={result.studentId}>

                  <td>
                    <Link
                      to={`/result-details/${result.studentId}`}
                      className="result-name-link"
                    >
                      {result.studentName}
                    </Link>
                  </td>

                  <td>{result.studentId}</td>

                  <td>{result.course}</td>

                  <td>{result.semester}</td>

                  <td>
                    {result.marks}/{result.totalMarks}
                  </td>

                  <td>
                    <span className="grade-badge">
                      {result.grade}
                    </span>
                  </td>

                  <td>
                    <span
                      className={
                        result.status === 'Passed'
                          ? 'result-status passed'
                          : 'result-status failed'
                      }
                    >
                      {result.status}
                    </span>
                  </td>

                  <td>

                    <div className="result-actions">

                      <Link
                        to={`/result-details/${result.studentId}`}
                        className="result-view-button"
                        title="View Result"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/edit-result/${result.studentId}`}
                        className="result-edit-button"
                        title="Edit Result"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="result-delete-button"
                        title="Delete Result"
                        onClick={() =>
                          handleDelete(result.studentId)
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
                  colSpan="8"
                  className="no-results"
                >
                  No results found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Results;