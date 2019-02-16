const { Client } = require('pg');
const express = require('express');

// Create express app
const server = express();

// Import and use middlewares
const bodyparser = require('body-parser');
const helmet = require('helmet');

server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(helmet());

// Import and pass route handler
const routes = require('./routes/Routes');

server.use(routes);

// Load config with database connection parameters
const dbConfig = require('./config/db');

// Test connection to postgresql database
const client = new Client(dbConfig);
client.connect()
  .then(() => console.log('Database connected...'))
  .then(() => client.end());

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
  console.log(`Server started and listening on port ${port}...`);
});
