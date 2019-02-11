const ItemModel = require('../models/ItemModel');

// Creates a new item
exports.createNewItem = (req, res) => {
   const item = req.body;
   console.log(item);

   ItemModel.createItem(new ItemModel(item), (error, item) => {
      if (error) {
         res.status(500).json({
            msg: 'An error occured',
            error: error
         });
      }

      if (item != null || item) {
         res.status(201).json({
            msg: 'successfully created item.',
            data: {
               item: item
            }
         });
      }
   })
}

// Gets all items
exports.getAllItems = (req, res) => {
   ItemModel.readItems((error, items) => {
      if (error) {
         res.status(500).json({
            msg: 'An error occured',
            error: error
         });
      }

      if (items != null || items) {
         res.status(200).json({
            msg: 'success',
            data: {
               items: items
            }
         });
      }
   })
}

// Updates an existing item by its id
exports.updateItemById = (req, res) => {
   const item = req.body;
   ItemModel.updateItem(item, (error, item) => {
      if (error) {
         res.status(500).json({
            msg: 'An error occured',
            error: error
         });
      }

      if (item != null || item) {
         res.status(200).json({
            msg: 'item updated',
            data: {
               item: item
            }
         });
      }
   })
}

// Deletes an existing item by its id
exports.deleteItemById = (req, res) => {
   const id = req.params.id;
   ItemModel.deleteItem(id, (error, item) => {
      if (error) {
         res.status(500).json({
            msg: 'An error occured',
            error: error
         });
      }

      if (item != null || item) {
         res.status(200).json({
            msg: 'item deleted',
            data: {
               item: item
            }
         });
      }
   })
}
