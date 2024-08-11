const express = require('express');
const router = express.Router();
const db = require('../models/database');
const authenticateToken = require('../middleware/authenticateToken');

// Apply authentication middleware to all routes in this file
router.use(authenticateToken);

// Create a new assignment
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await db.run('INSERT INTO assignments (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ id: result.lastID, title, description });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Read all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await db.all('SELECT * FROM assignments');
    res.json(assignments);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Update an assignment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await db.run('UPDATE assignments SET title = ?, description = ? WHERE id = ?', [title, description, id]);
    res.send('Assignment updated');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM assignments WHERE id = ?', [id]);
    res.send('Assignment deleted');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
