import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientList.css'; // Import CSS file for styling

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data));
  }, []);

  return (
    <div className="patient-list-container">
      <h1 className="patient-list-heading">Patients</h1>
      <ul className="patient-list">
        {patients.map(patient => (
          <li key={patient.id} className="patient-list-item">
            <div>
              <span className="patient-name">{patient.name}</span> 
              <span className="patient-contact">({patient.contact})</span>
            </div>
            <Link to={`/book-appointment/${patient.id}`} className="book-appointment-link">Book Appointment</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientList;
