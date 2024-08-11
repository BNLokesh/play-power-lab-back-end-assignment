const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// In-memory user store for demonstration purposes
const users = [
  { id: 1, username: 'user1', password: 'password1' }
];

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);

  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
