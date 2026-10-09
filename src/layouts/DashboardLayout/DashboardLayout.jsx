import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';

import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

      <main className="dashboard-main">

        <Outlet />

      </main>

    </div>
  );
}

export default DashboardLayout;