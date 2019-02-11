const express = require('express');
const mongoose = require('mongoose');
const server = express();

// Import and use middlewares
const bodyparser = require('body-parser');
server.use(bodyparser.urlencoded({ extended: false }));
server.use(bodyparser.json());

// Pass route handler
const routes = require('./routes/Routes');
server.use(routes);

// Connect to mongodb database
mongoose
   .connect(
      'mongodb connection string',
      {
         useNewUrlParser: true,
         useCreateIndex: true
      })
   .then(() => {
      console.log(`Database connected...`);
   })
   .catch(error => {
      console.log(`Mongoose : ${error}`);
   });

// Create server and listening configurations
const port = process.env.port || 8000;
server.listen(port, () => {
   console.log(`Server started and listsening on port ${port}...`);
});
