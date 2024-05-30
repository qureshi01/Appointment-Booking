import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AppointmentForm from './components/AppointmentForm';
import AppointmentsByTime from './components/AppointmentsByTime';
import PatientList from './components/PatientList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments" element={<AppointmentsByTime />} />
        <Route path="/book-appointment" element={<PatientList />} />
        <Route path="/book-appointment/:patientId" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
