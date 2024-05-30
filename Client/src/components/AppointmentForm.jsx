import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AppointmentForm.css'; // Import CSS file for styling

function AppointmentForm() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: '',
    appointmentTime: '',
    appointmentTitle: '',
    appointmentChannel: '',
    appointmentType: '',
    isWalkIn: false,
    bloodPressure: '',
    temperature: '',
    height: '',
    weight: '',
    spo2: '',
    pulseRate: '',
    needForDoctor: '',
    reason: '',
    note: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch patient data
    fetch(`http://localhost:8080/api/patients/${patientId}`)
      .then(response => response.json())
      .then(data => setPatientData(data));

    // Fetch doctors data
    fetch('http://localhost:8080/api/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data));
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue
    });

    if (name === 'isWalkIn') {
      if (newValue) {
        // If walk-in appointment is selected, hide appointment time
        setFormData(prevState => ({
          ...prevState,
          appointmentTime: '' // Clear appointment time
        }));
      } else {
        // If walk-in appointment is deselected, show appointment time
        // You might fetch or set a default appointment time here
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patient: { id: patientId },
        doctor: { id: formData.doctorId },
        appointmentTime: formData.appointmentTime,
        appointmentTitle: formData.appointmentTitle,
        appointmentChannel: formData.appointmentChannel,
        appointmentType: formData.appointmentType,
        isWalkIn: formData.isWalkIn,
        bloodPressure: formData.bloodPressure,
        temperature: formData.temperature,
        height: formData.height,
        weight: formData.weight,
        spo2: formData.spo2,
        pulseRate: formData.pulseRate,
        needForDoctor: formData.needForDoctor,
        reason: formData.reason,
        note: formData.note
      })
    })
    .then(response => response.json())
    .then(() => {
      // After successful submission, reset the form data
      setFormData({
        doctorId: '',
        appointmentTime: '',
        appointmentTitle: '',
        appointmentChannel: '',
        appointmentType: '',
        isWalkIn: false,
        bloodPressure: '',
        temperature: '',
        height: '',
        weight: '',
        spo2: '',
        pulseRate: '',
        needForDoctor: '',
        reason: '',
        note: ''
      });
      setSuccessMessage('Appointment booked successfully!');
    });
  };
  
  const handleReset = () => {
    // Reset all form fields to their initial values
    setFormData({
      doctorId: '',
      appointmentTime: '',
      appointmentTitle: '',
      appointmentChannel: '',
      appointmentType: '',
      isWalkIn: false,
      bloodPressure: '',
      temperature: '',
      height: '',
      weight: '',
      spo2: '',
      pulseRate: '',
      needForDoctor: '',
      reason: '',
      note: ''
    });
    setSuccessMessage('');
  };

  return (
    <div className="appointment-form-container">
      <h1>Book Appointment</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="patient-details">
        <h2>Patient Details</h2>
        <p>Name: {patientData.name}</p>
        <p>Contact Number: {patientData.contact}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorId">Select Doctor</label>
          <select name="doctorId" value={formData.doctorId} onChange={handleChange}>
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
        </div>
        {!formData.isWalkIn && (
          <>
            <div className="form-group">
              <label htmlFor="appointmentTime">Appointment Time</label>
              <input type="datetime-local" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="appointmentTitle">Appointment Title</label>
              <input type="text" name="appointmentTitle" value={formData.appointmentTitle} onChange={handleChange} />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="appointmentChannel">Appointment Channel</label>
          <input type="text" name="appointmentChannel" value={formData.appointmentChannel} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentType">Appointment Type</label>
          <input type="text" name="appointmentType" value={formData.appointmentType} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="isWalkIn" checked={formData.isWalkIn} onChange={handleChange} />
            Walk-in Appointment
          </label>
        </div>
        <div className="tab">
          <div className="form-group">
            <label htmlFor="bloodPressure">Blood Pressure</label>
            <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="temperature">Temperature</label>
            <input type="text" name="temperature" value={formData.temperature} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input type="text" name="height" value={formData.height} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="spo2">SpO2</label>
            <input type="text" name="spo2" value={formData.spo2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="pulseRate">Pulse Rate</label>
            <input type="text" name="pulseRate" value={formData.pulseRate} onChange={handleChange} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="needForDoctor">Need for Doctor</label>
          <select name="needForDoctor" value={formData.needForDoctor} onChange={handleChange}>
            <option value="">Select Need for Doctor</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
