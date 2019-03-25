const express = require("express");
const mysqlx = require("@mysql/xdevapi");

// Create express object
const server = express();

// Load config with database connection parameters
const bodyparser = require("body-parser");
const helmet = require("helmet");

// Import and use middlewares
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(helmet());

// Pass route handler
const routes = require("./routes/Routes");

server.use(routes);

// Test connection to mysql database
const dbConfig = require("./config/db");

mysqlx
  .getSession(dbConfig)
  .then(() => console.log("Database connected..."))
  .catch(error => {
    console.log(error);
  });

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
  console.log(`Server started and listening on port ${port}...`);
});
