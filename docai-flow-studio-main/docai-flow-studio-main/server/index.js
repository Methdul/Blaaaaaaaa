const express = require('express');
const cors = require('cors');
// const { Pool } = require('pg'); // Will be used later for database connection

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies

// Placeholder for database connection setup
// const pool = new Pool({
//   user: 'your_db_user',
//   host: 'localhost',
//   database: 'your_db_name',
//   password: 'your_db_password',
//   port: 5432,
// });

// Basic status route
app.get('/api/status', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Placeholder for other routes (Auth, Templates, User Documents)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/templates', require('./routes/templates'));
app.use('/api/users', require('./routes/userDocuments'));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
