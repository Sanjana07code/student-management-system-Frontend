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

import './Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get('/courses');
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      alert('Failed to load courses');
    }
  };

  const handleDelete = async (courseCode) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/courses/${courseCode}`);

      setCourses(
        courses.filter((course) => course.code !== courseCode)
      );

      alert('Course deleted successfully!');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert(
        error.response?.data?.message ||
        'Failed to delete course'
      );
    }
  };

  const filteredCourses = courses.filter((course) => {
    const search = searchTerm.toLowerCase();

    return (
      course.name.toLowerCase().includes(search) ||
      course.code.toLowerCase().includes(search) ||
      course.department.toLowerCase().includes(search)
    );
  });

  return (
    <div className="courses-page">

      <div className="courses-header">
        <div>
          <h1>Courses</h1>
          <p>Manage all courses</p>
        </div>

        <Link
          to="/add-course"
          className="add-course-button"
        >
          <FaPlus />
          Add Course
        </Link>
      </div>

      <div className="courses-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />
      </div>

      <div className="courses-table-container">
        <table className="courses-table">

          <thead>
            <tr>
              <th>Course Name</th>
              <th>Code</th>
              <th>Duration</th>
              <th>Students</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <tr key={course.code}>

                  <td>
                    <Link
                      to={`/course-details/${course.code}`}
                      className="course-name-link"
                    >
                      {course.name}
                    </Link>
                  </td>

                  <td>{course.code}</td>

                  <td>{course.duration}</td>

                  <td>{course.students}</td>

                  <td>
                    <span
                      className={
                        course.status === 'Active'
                          ? 'course-status active'
                          : 'course-status inactive'
                      }
                    >
                      {course.status}
                    </span>
                  </td>

                  <td>
                    <div className="course-actions">

                      <Link
                        to={`/course-details/${course.code}`}
                        className="course-view-button"
                        title="View Course"
                      >
                        <FaEye />
                      </Link>

                      <Link
                        to={`/edit-course/${course.code}`}
                        className="course-edit-button"
                        title="Edit Course"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        className="course-delete-button"
                        title="Delete Course"
                        onClick={() =>
                          handleDelete(course.code)
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
                  className="no-courses"
                >
                  No courses found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Courses;