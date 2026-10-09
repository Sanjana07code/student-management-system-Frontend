import { useEffect, useState } from 'react';

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarCheck
} from 'react-icons/fa';

import API from '../../api';

import './Dashboard.css';

function Dashboard() {

  const [statsData, setStatsData] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    attendance: 0
  });

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      const [
        studentsResponse,
        teachersResponse,
        coursesResponse,
        attendanceResponse
      ] = await Promise.all([
        API.get('/students'),
        API.get('/teachers'),
        API.get('/courses'),
        API.get('/attendance')
      ]);

      const studentList =
        studentsResponse.data.students || [];

      const teacherList =
        teachersResponse.data.teachers || [];

      const courseList =
        coursesResponse.data.courses || [];

      const attendanceList =
        attendanceResponse.data.attendance || [];


      // Calculate average attendance
      let attendancePercentage = 0;

      if (attendanceList.length > 0) {

        const totalPercentage =
          attendanceList.reduce((sum, record) => {

            if (record.totalClasses > 0) {
              return (
                sum +
                (record.present /
                  record.totalClasses) *
                  100
              );
            }

            return sum;

          }, 0);

        attendancePercentage =
          Math.round(
            totalPercentage /
            attendanceList.length
          );
      }


      setStatsData({
        students: studentList.length,
        teachers: teacherList.length,
        courses: courseList.length,
        attendance: attendancePercentage
      });


      // Show latest 4 students
      setStudents(
        studentList.slice(0, 4)
      );

    } catch (error) {

      console.error(
        'Error fetching dashboard data:',
        error
      );

    }
  };


  const stats = [
    {
      icon: <FaUserGraduate />,
      title: 'Total Students',
      value: statsData.students
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'Total Teachers',
      value: statsData.teachers
    },
    {
      icon: <FaBook />,
      title: 'Total Courses',
      value: statsData.courses
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Attendance',
      value: `${statsData.attendance}%`
    }
  ];


  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-small-title">
            OVERVIEW
          </p>

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back! Here's what's happening
            with your college today.
          </p>
        </div>

      </div>


      {/* Statistics */}

      <div className="stats-grid">

        {stats.map((stat, index) => (

          <div
            className="stat-card"
            key={index}
          >

            <div className="stat-icon">
              {stat.icon}
            </div>

            <div>

              <p>
                {stat.title}
              </p>

              <h2>
                {stat.value}
              </h2>

            </div>

          </div>

        ))}

      </div>


      {/* Recent Students */}

      <div className="recent-section">

        <div className="section-header">

          <div>
            <h2>
              Recent Students
            </h2>

            <p>
              Recently added students
            </p>
          </div>

          <button>
            View All
          </button>

        </div>


        <div className="student-table-container">

          <table>

            <thead>

              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Course</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {students.length > 0 ? (

                students.map((student, index) => (

                  <tr key={index}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.studentId}
                    </td>

                    <td>
                      {student.course}
                    </td>

                    <td>

                      <span
                        className={
                          student.status === 'Active'
                            ? 'status-active'
                            : 'status-inactive'
                        }
                      >
                        {student.status}
                      </span>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4">
                    No students found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;