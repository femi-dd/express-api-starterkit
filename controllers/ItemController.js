const ItemModel = require('../models/ItemModel');

// Creates a new item
exports.createNewItem = (req, res) => {
  const newItem = req.body;

  ItemModel.createItem(new ItemModel(newItem), (error, item) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        error,
      });
    }

    if (item !== null || item) {
      res.status(201).json({
        msg: 'successfully created item.',
        data: {
          item,
        },
      });
    }
  });
};

// Gets all items
exports.getAllItems = (req, res) => {
  ItemModel.readItems((error, items) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        error,
      });
    }

    if (items != null || items) {
      res.status(200).json({
        msg: 'success',
        data: {
          items,
        },
      });
    }
  });
};

// Updates an existing item by its id
exports.updateItemById = (req, res) => {
  const itemToUpdate = req.body;
  if (itemToUpdate.id !== req.params.id) {
    res.status(400).json({
      msg: "Id's not identical",
    });
  }

  ItemModel.updateItem(itemToUpdate, (error, item) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        error,
      });
    }

    if (item != null || item) {
      res.status(200).json({
        msg: 'item updated',
        data: {
          item,
        },
      });
    }
  });
};

// Deletes an existing item by its id
exports.deleteItemById = (req, res) => {
  const { id } = { ...req.params };
  ItemModel.deleteItem(id, (error, item) => {
    if (error) {
      res.status(500).json({
        msg: 'An error occured',
        error,
      });
    }

    if (item != null || item) {
      res.status(200).json({
        msg: 'item deleted',
        data: {
          item,
        },
      });
    }
  });
};
