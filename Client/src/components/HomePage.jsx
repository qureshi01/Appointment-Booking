import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS file for styling

function HomePage() {
  return (
    <div className="main-container">
      <h1 className="main-heading">Welcome to Your Clinic</h1>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li className="main-nav-item">
            <Link to="/appointments" className="main-nav-link">
              Show All Appointments
            </Link>
          </li>
          <li className="main-nav-item">
            <Link to="/book-appointment" className="main-nav-link">
              Book Appointment
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
