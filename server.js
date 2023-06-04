const express = require('express');
const { Connection, Request } = require('tedious');
require('dotenv').config(); //Environment variables are loaded from .env file, secure way to store credentials
const app = express();
const port = 3001; // Port number for the server to listen on

// Create a connection to your Azure SQL Database
const config = {
  authentication: {
    options: {
        // Azure Active Directory integrated authentication
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    type: 'default',
  },
  server: process.env.DB_SERVER_NAME,
  options: {
    database: process.env.DB_NAME,
    encrypt: true,
  },
};

const connection = new Connection(config);

// Connect to the Azure SQL Database
connection.on('connect', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define an API endpoint to fetch Pokemon data
app.get('/pokemon', (req, res) => {
  const request = new Request('SELECT * FROM pokemon', (err, rowCount, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });

  connection.execSql(request);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
