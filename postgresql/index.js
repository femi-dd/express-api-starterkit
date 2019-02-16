const { Pool, Client } = require('pg');
const express = require('express');

const server = express();

// Load config with database connection parameters
const bodyparser = require('body-parser');

// Import and use middlewares
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());

// Pass route handler
const routes = require('./routes/Routes');

server.use(routes);

// Test connection to postgresql database
const dbConfig = require('./config/db');

const client = new Client(dbConfig);
client.connect()
  .then(() => console.log('Database connected...'))
  .then(() => client.end());

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
  console.log(`Server started and listening on port ${port}...`);
});
