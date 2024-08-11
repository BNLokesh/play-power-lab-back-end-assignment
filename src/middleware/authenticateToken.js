const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware function to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get the token from the header

  if (token == null) return res.sendStatus(401); // If no token, return Unauthorized
  

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid, return Forbidden

    req.user = user; // Attach user information to request object
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = authenticateToken;
