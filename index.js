// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle POST requests
app.post('/api/users', (req, res) => {
  // Get data from the request body
  const { name, email } = req.body;

  // Perform validation (e.g., check if name and email are provided)
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Create a new user (you may want to save it to a database)
  const newUser = { id: 1, name, email };

  // Send a response with the created user
  res.status(201).json(newUser);
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
