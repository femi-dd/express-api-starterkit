const express = require("express");
const mongoose = require("mongoose");

// Create express object
const server = express();

// Import and use middlewares
const bodyparser = require("body-parser");
const helmet = require("helmet");

server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());
server.use(helmet());

// Pass route handler
const routes = require("./routes/Routes");

server.use(routes);

// Connect to mongodb database
const dbConfig = require("./config/db");

mongoose
  .connect(dbConfig.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch(error => {
    console.log(`Mongoose : ${error}`);
  });

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
  console.log(`Server started and listening on port ${port}...`);
});
