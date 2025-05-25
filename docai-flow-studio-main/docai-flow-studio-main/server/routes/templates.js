const express = require('express');
const router = express.Router();

// GET /api/templates
router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Sample Template 1' }, { id: 2, name: 'Sample Template 2' }]);
});

// GET /api/templates/:id
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: `Sample Template ${req.params.id}` });
});

module.exports = router;
