const mongoose = require('mongoose');

const { Schema } = { ...mongoose };

const ItemModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Item = mongoose.model('item', ItemModel);
module.exports = Item;

// Model queries
module.exports.createItem = (newItem, callback) => {
  newItem.save(callback);
};

module.exports.readItems = (callback) => {
  Item.find(callback);
};

module.exports.updateItem = (item, callback) => {
  Item.update(item, callback);
};

module.exports.deleteItem = (itemId, callback) => {
  Item.deleteOne({ _id: itemId }, callback);
};
