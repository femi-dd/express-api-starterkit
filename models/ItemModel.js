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
const createItem = (newItem, callback) => {
  newItem.save(callback);
};

const readItems = (callback) => {
  Item.find(callback);
};

const updateItem = (item, callback) => {
  Item.update(item, callback);
};

const deleteItem = (itemId, callback) => {
  Item.deleteOne({ _id: itemId }, callback);
};

module.exports = {
  createItem,
  readItems,
  updateItem,
  deleteItem,
};
