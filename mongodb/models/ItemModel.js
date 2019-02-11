const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemModel = new Schema({
   name: {
      type: String,
      required: true
   },
   color: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true
   }
});

const Item = (module.exports = mongoose.model('Item', ItemModel));

// Model queries
module.exports.createItem = (item, callback) => {
   item.save(callback);
}

module.exports.readItems = (callback) => {
   Item.find(callback);
}

module.exports.updateItem = (item, callback) => {
   Item.update(item, callback);
}

module.exports.deleteItem = (id, callback) => {
   Item.deleteOne({ _id: id }, callback);
}
