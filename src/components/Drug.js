import React, { useState } from 'react';
import './Drug.css';

function Drug() {
  const [drugs, setDrugs] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    if (!drugs.trim()) {
      setResult("Please enter at least one drug.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/check_interaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugs: drugs.split(',').map(drug => drug.trim()) }),
      });

      const data = await response.json();

      // Log the response data for debugging
      console.log("Data from backend:", data);

      if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        // Set result with the interaction information from the backend
        setResult(data.interaction_info);
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="drug-container">
      <h1>Drug Interaction Checker</h1>
      <textarea
        placeholder="Enter drug names separated by commas"
        value={drugs}
        onChange={(e) => setDrugs(e.target.value)}
      />
      <button onClick={handleSubmit}>Check Interaction</button>
      <div className="result">
        <h2>Interaction Information:</h2>
        {result && <p>{result}</p>} {/* Display the result directly */}
      </div>
    </div>
  );
}

export default Drug;
