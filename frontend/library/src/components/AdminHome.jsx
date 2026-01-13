import React from 'react'
import './AdminHome.css'
import { Link } from 'react-router-dom'
import './AdminHome.css';

function AdminHome() {

  let logid = localStorage.getItem('loginadminid')
  console.log('logid', logid)

  return (
    <div className="admin-home">

      {/* Navbar */}
      <nav className="admin-navbar">
        <div className="admin-logo">Admin Panel</div>

        <ul className="admin-nav-links">
          <li><Link to="/">Login Page</Link></li>
          <li><Link to="/StudentHome">Student Home</Link></li>
           <li><Link to="/AdminBooks">Manage Books</Link></li>
           <li><Link to="/AdminIssueRequests">Manage Requests</Link></li>
          <li><Link to="/EditBook ">Logout</Link></li>

        </ul>
      </nav>

      {/* Description Section */}
      <section className="admin-description">
        <h2>Welcome, Admin</h2>
        <p>
          This dashboard allows you to manage users, doctors, and system settings.
          You can monitor activity, update information, and maintain the overall
          functionality of the platform. Use the navigation bar above to explore
          different sections of the admin panel.
        </p>
      </section>

    </div>
  )
}

export default AdminHome
