const express = require('express');
const router = express.Router();

// GET /api/users/:userId/documents
router.get('/:userId/documents', (req, res) => {
  res.json({ message: `Placeholder for documents of user ${req.params.userId}` });
});

// POST /api/users/:userId/documents
router.post('/:userId/documents', (req, res) => {
  res.json({ message: `Placeholder for creating a new document for user ${req.params.userId}` });
});

module.exports = router;
