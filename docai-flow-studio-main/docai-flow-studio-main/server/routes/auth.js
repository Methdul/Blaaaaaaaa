const express = require('express');
const router = express.Router();

// POST /api/auth/register
router.post('/register', (req, res) => {
  res.json({ message: 'User registration placeholder' });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  res.json({ message: 'User login placeholder' });
});

module.exports = router;
