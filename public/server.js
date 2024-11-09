const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for requests from React app running on localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow React frontend on port 3000 to access the API
  methods: ['GET', 'POST'], // Specify allowed methods (GET, POST)
}));

app.use(express.json()); // Middleware to parse JSON bodies

// POST endpoint to check drug interaction
app.post('/check_interaction', (req, res) => {
  const { drugs } = req.body;

  if (!drugs || drugs.length === 0) {
    return res.status(400).json({ error: 'No drugs provided.' });
  }

  // Example logic for drug interaction
  const interactionInfo = `Interactions found for drugs: ${drugs.join(', ')}`;
  
  // Send the interaction information as JSON response
  res.json({ interaction_info: interactionInfo });
});

// Start the server on port 5000
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
