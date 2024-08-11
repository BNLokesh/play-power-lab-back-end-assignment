const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new SQLite database connection
const db = new sqlite3.Database(path.resolve(__dirname, '../../db/sqlite.db'), (err) => {
  if (err) {
    console.error('Could not connect to the database', err);
  } else {
    console.log('Connected to SQLite database');
    initializeSchema();
  }
});

// Initialize the database schema
function initializeSchema() {
  db.run(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Could not initialize schema', err);
    } else {
      console.log('Database schema initialized');
    }
  });
}

// Helper functions for database operations
db.runAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
};

db.allAsync = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  run: db.runAsync,
  all: db.allAsync,
};
