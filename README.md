# Node.js Micro-service for Classroom Assignments

This project is a Node.js micro-service for managing student assignments, complete with authentication and CRUD operations for assignments. The application is Dockerized for easy deployment.

## Table of Contents

- [Project Overview](#project-overview)
- [Step 1: Setting Up Your Node.js Project](#step-1-setting-up-your-nodejs-project)
- [Step 2: Building the Application](#step-2-building-the-application)
- [Step 3: Dockerize Your Application](#step-3-dockerize-your-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [License](#license)

## Project Overview

The **Classroom Assignments Micro-service** is designed to handle student assignments with the following features:
- Authentication using JWT
- CRUD operations for assignments
- Docker containerization for deployment

## Step 1: Setting Up Your Node.js Project

### 1.1 Initialize Your Project

1. Open your terminal.
2. Create a new directory and navigate into it:

   ```bash
   mkdir my_project
   cd my_project
   ```

3. Initialize a new Node.js project:

   ```bash
   npm init -y
   ```

### 1.2 Install Dependencies

Install the required dependencies:

```bash
npm install express sqlite3 jsonwebtoken dotenv
```

### 1.3 Directory Structure

Organize your project files as follows:

```
my_project/
│
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   └── assignments.js
│   ├── models/
│   │   └── database.js
│   ├── middleware/
│   │   └── authenticateToken.js
│   └── app.js
│
├── db/
│   └── sqlite.db
│
├── .env
├── Dockerfile
├── package.json
└── README.md
```

## Step 2: Building the Application

### 2.1 Create the Express Server (`src/app.js`)

```javascript
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 2.2 Define Routes and Logic

- **Authentication Routes (`src/routes/auth.js`)**: Handle login and issue JWTs.
- **Assignments Routes (`src/routes/assignments.js`)**: Implement CRUD operations for assignments.
- **Database Setup (`src/models/database.js`)**: Manage SQLite database connections and schema.

### Example `src/routes/auth.js`

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock authentication route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Generate a JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
```

### Example `src/routes/assignments.js`

```javascript
const express = require('express');
const router = express.Router();
const db = require('../models/database');

// CRUD operations for assignments
// Create, Get, Update, Delete implementation here

module.exports = router;
```

## Step 3: Dockerize Your Application

### 3.1 Write a Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Use the official Node.js 14 image as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) files
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "src/app.js"]
```

### 3.2 Build the Docker Image

From your project directory (where your Dockerfile is), run:

```bash
docker build -t my_microservice .
```

### 3.3 Run Your Docker Container

After the image is built, run it with:

```bash
docker run -p 3000:3000 my_microservice
```

This command maps port 3000 of the container to port 3000 on your host, allowing you to access the application via `localhost:3000`.

## API Endpoints

For detailed API endpoints, refer to the [API Documentation](https://bold-crater-286345.postman.co/workspace/My-Workspace~ae2c7446-bd10-4ab7-8397-94ee08847203/collection/34619336-af7f74b4-7981-4ae8-a7c1-86f00c807b29?action=share&creator=34619336) section.

## Database Schema

The SQLite database schema should be defined in SQL migration files located in the `db` directory.

## API Documentation

API documentation is available in the Postman Collection format. You can import the collection into Postman to test the API endpoints.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to adjust or expand upon the README based on your specific implementation details and additional requirements.
