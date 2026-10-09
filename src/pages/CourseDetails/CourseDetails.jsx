import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';

import {
  FaArrowLeft,
  FaEdit,
  FaBook,
} from 'react-icons/fa';

import API from '../../api';

import './CourseDetails.css';

function CourseDetails() {
  const { courseCode } = useParams();

  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, [courseCode]);

  const fetchCourse = async () => {
    try {
      const response = await API.get(
        `/courses/${courseCode}`
      );

      setCourse(response.data.course);
    } catch (error) {
      console.error('Error fetching course:', error);
      setCourse(null);
    }
  };

  if (!course) {
    return (
      <div className="course-details-page">

        <h2>Course not found</h2>

        <Link
          to="/courses"
          className="back-course-button"
        >
          <FaArrowLeft />
          Back to Courses
        </Link>

      </div>
    );
  }

  return (
    <div className="course-details-page">

      <div className="course-details-top">

        <Link
          to="/courses"
          className="back-course-button"
        >
          <FaArrowLeft />
          Back to Courses
        </Link>

        <div className="course-details-heading">

          <div className="course-icon">
            <FaBook />
          </div>

          <div>
            <h1>{course.name}</h1>
            <p>Course Details</p>
          </div>

        </div>

      </div>

      <div className="course-details-card">

        <div className="course-details-header">

          <div>
            <h2>{course.name}</h2>
            <span>{course.code}</span>
          </div>

          <span
            className={
              course.status === 'Active'
                ? 'course-detail-status active'
                : 'course-detail-status inactive'
            }
          >
            {course.status}
          </span>

        </div>

        <div className="course-details-grid">

          <div className="course-detail-item">
            <span>Course Code</span>
            <strong>{course.code}</strong>
          </div>

          <div className="course-detail-item">
            <span>Duration</span>
            <strong>{course.duration}</strong>
          </div>

          <div className="course-detail-item">
            <span>Students</span>
            <strong>{course.students}</strong>
          </div>

          <div className="course-detail-item">
            <span>Department</span>
            <strong>{course.department}</strong>
          </div>

        </div>

        <div className="course-description">

          <h3>Description</h3>

          <p>
            {course.description ||
              'No description available.'}
          </p>

        </div>

        <div className="course-details-actions">

          <Link
            to={`/edit-course/${course.code}`}
            className="course-details-edit"
          >
            <FaEdit />
            Edit Course
          </Link>

        </div>

      </div>

    </div>
  );
}

export default CourseDetails;