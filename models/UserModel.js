const mongoose = require('mongoose');

const { Schema } = { ...mongoose };

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('user', UserModel);
module.exports = User;

// Model queries
const createUser = (newUser, callback) => {
  User.create(newUser, { _id: 1, username: 1 }, callback);
};

const readUser = (username, callback) => {
  const query = { username };
  User.findOne(query, callback);
};

const confirm = (id, callback) => {
  User.findById(id, callback);
};

module.exports = {
  createUser,
  readUser,
  confirm,
};
