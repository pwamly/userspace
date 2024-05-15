const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/users') {
    let body = '';
    
    // Collect data from request stream
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    // Parse and process data once all data is received
    req.on('end', () => {
      try {
        const userData = JSON.parse(body);
        
        // Perform validation (e.g., check if name and email are provided)
        if (!userData.name || !userData.email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Name and email are required' }));
        } else {
          // Create a new user (you may want to save it to a database)
          const newUser = { id: 1, ...userData };
          
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newUser));
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON data' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
