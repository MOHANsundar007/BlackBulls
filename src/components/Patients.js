import React, { useState } from 'react';
import './Patients.css';

function Patients() {
  const [patients, setPatients] = useState([
    'Patient 1', 'Patient 2', 'Patient 3',
    'Patient 4', 'Patient 5', 'Patient 6',
    'Patient 7', 'Patient 8', 'Patient 9',
    'Patient 10', 'Patient 11', 'Patient 12'
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="patients-container">
      <h2 className="info">List of Patients</h2>
      <div className="patients-grid">
        {filteredPatients.length === 0 ? (
          <div>No patients found.</div>
        ) : (
          filteredPatients.map((patient, index) => (
            <div key={index} className="patient-card">
              <h3>{patient}</h3>
              <p>Details</p> 
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Patients;
