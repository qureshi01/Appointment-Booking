import React, { useState, useEffect } from 'react';
import './AppointmentByTime.css'; // Import CSS file for styling

function AppointmentsByTime() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointments');
        const data = await response.json();
        setAppointments(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-container">
      <h1 className="appointments-heading">Appointments</h1>
      <ul className="appointments-list">
        {appointments.map(appointment => (
          <li key={appointment.id} className="appointment-item">
            <div className="appointment-details">
              <p className="appointment-info"><strong>ID:</strong> {appointment.id}</p>
              <p className="appointment-info"><strong>Time:</strong> {appointment.appointmentTime}</p>
              <p className="appointment-info"><strong>Patient:</strong> {appointment.patient.name}</p>
              <p className="appointment-info"><strong>Contact:</strong> {appointment.patient.contact}</p>
              <p className="appointment-info"><strong>Doctor:</strong> {appointment.doctor.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsByTime;
