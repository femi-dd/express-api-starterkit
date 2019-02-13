const express = require('express');
const mysqlx = require('@mysql/xdevapi');
const server = express();

// Load config with database connection parameters
const db_config = require('./config/db');

// Import and use middlewares
const bodyparser = require('body-parser');
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());

// Pass route handler
const routes = require('./routes/Routes');
server.use(routes);

// Test connection to mysql database
mysqlx
   .getSession(db_config)
   .then(session => {
      console.log('Database connected...');
   })
   .catch(error => {
      console.log(error);
   });

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
   console.log(`Server started and listening on port ${port}...`);
});
