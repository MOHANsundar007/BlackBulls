import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';
import './Dashboard.css';

function Dashboard() {
  const [persons, setPersons] = useState([]);
  const [currentPersonId, setCurrentPersonId] = useState(null);
  const [currentPerson, setCurrentPerson] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    const lastIdRef = ref(database, 'lastId');
    onValue(lastIdRef, (snapshot) => {
      const id = snapshot.val() || 0;
      setLastId(id);
    });

    const personsRef = ref(database, 'persons');
    onValue(personsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedPersons = Object.keys(data).map((id) => ({
        id: parseInt(id),
        ...data[id],
      }));
      setPersons(loadedPersons);
    });
  }, []);

  const handleAddPerson = () => {
    if (!currentPerson.name || !currentPerson.symptoms || !currentPerson.diagnosis || !currentPerson.treatment) {
      alert('Please fill in all details before adding a new person.');
      return;
    }

    const newId = lastId + 1;
    setLastId(newId);
    const newPerson = { id: newId, name: '', symptoms: '', diagnosis: '', treatment: '' };
    setPersons([...persons, newPerson]);
    setCurrentPersonId(newId);
    setCurrentPerson(newPerson);
    setIsEditing(true);

    set(ref(database, 'lastId'), newId);
  };

  const handleSaveDetails = () => {
    if (!currentPerson.name || !currentPerson.symptoms || !currentPerson.diagnosis || !currentPerson.treatment) {
      alert('Please fill in all details before saving.');
      return;
    }

    if (!currentPersonId) {
      console.error('No valid person ID found.');
      return;
    }

    const personRef = ref(database, `persons/${currentPersonId}`);
    set(personRef, currentPerson)
      .then(() => {
        alert('Details saved successfully!');
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error saving details:', error);
        alert('Error: ' + error.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectPerson = (id) => {
    const person = persons.find((p) => p.id === id);
    setCurrentPersonId(id);
    setCurrentPerson(person);
    setIsEditing(false);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Doctor's Dashboard</h2>
        <button className="add-button" onClick={handleAddPerson} disabled={isEditing}>
          + Add Person
        </button>
      </aside>

      <main className="details-section">
        <h2 className="per">List of Persons</h2>
        <div className="person-list">
          {persons.map((person) => (
            <div
              key={person.id}
              className="person-card"
              onClick={() => handleSelectPerson(person.id)}
            >
              <h4>Person {person.id}</h4>
            </div>
          ))}
        </div>

        {currentPersonId ? (
          <div className="details-form">
            {isEditing ? (
              <>
                <h3>Editing Details for Person {currentPersonId}</h3>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentPerson.name}
                    onChange={handleChange}
                    placeholder="Enter person's name"
                    required
                  />
                </div>
                <div>
                  <label>Symptoms</label>
                  <textarea
                    name="symptoms"
                    value={currentPerson.symptoms}
                    onChange={handleChange}
                    placeholder="Enter symptoms"
                    required
                  ></textarea>
                </div>
                <div>
                  <label>Diagnosis</label>
                  <textarea
                    name="diagnosis"
                    value={currentPerson.diagnosis}
                    onChange={handleChange}
                    placeholder="Enter diagnosis"
                    required
                  ></textarea>
                </div>
                <div>
                  <label>Treatment</label>
                  <textarea
                    name="treatment"
                    value={currentPerson.treatment}
                    onChange={handleChange}
                    placeholder="Enter treatment"
                    required
                  ></textarea>
                </div>
                <button className="save-button" onClick={handleSaveDetails}>
                  Save Details
                </button>
              </>
            ) : (
              <div className="person-info">
                <div>
                  <label>Name:</label>
                  <p>{currentPerson.name}</p>
                </div>
                <div>
                  <label>Symptoms:</label>
                  <p>{currentPerson.symptoms}</p>
                </div>
                <div>
                  <label>Diagnosis:</label>
                  <p>{currentPerson.diagnosis}</p>
                </div>
                <div>
                  <label>Treatment:</label>
                  <p>{currentPerson.treatment}</p>
                </div>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="no-selection">Select a person to view details.</div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
