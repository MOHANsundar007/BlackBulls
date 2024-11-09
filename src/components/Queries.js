import React, { useState } from 'react';
import './Queries.css'

function Queries() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/retrieve-documents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <h2>Document Retrieval System</h2>
            <input className = "qq"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query"
            />
            <button onClick={handleSearch}>Search</button>

            {results && (
                <div>
                    <h3>Most relevant document:</h3>
                    <p><strong>File:</strong> {results.most_relevant_title}</p>
                    <p><strong>Content:</strong> {results.most_relevant_content}</p>

                    <h3>Cosine Similarity Scores for All Documents:</h3>
                    <ul>
                        {results.similarity_scores.map((item, index) => (
                            <li className = "score" key={index}>{item.title}: {item.score}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Queries;