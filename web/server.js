// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Path to your static public folder
// const publicDir = path.join(__dirname, 'public');

// // Serve static files
// app.use(express.static(publicDir));

// // Set basic CORS headers
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// // Route for homepage and dashboard
// app.get('/', async (req, res) => {
//   res.sendFile(path.join(publicDir, 'get-started.html'));
// });

// app.get('/dashboard', async (req, res) => {
//   res.sendFile(path.join(publicDir, 'get-started.html'));
// });

// // Catch-all 404 route — ensure it's at the bottom
// app.get('*', async (req, res) => {
//   res.sendFile(path.join(publicDir, '404.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });


const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const publicDir = path.join(__dirname, 'public');

console.log(`publicDir${publicDir}`);
app.use(express.static(publicDir));

// Set basic CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define a route for GET requests to the root URL
// app.get('/', (req, res) => {
//   res.send('Hello World from Express!');
// });


// Route for homepage and dashboard
app.get('/', async (req, res) => {
  res.sendFile(path.join(publicDir, 'Dashboard.html'));
});

app.get('/Dashboard', async (req, res) => {
  res.sendFile(path.join(publicDir, 'Dashboard.html'));
});



// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});