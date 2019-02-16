const ItemModel = require('../models/ItemModel');

// Create new item
exports.createNewItem = (req, res) => {
  const item = req.body;

  ItemModel.AddNewItem(item, res)
    .then((error, result) => {
      if (error) {
        res.status(500).json({
          msg: 'An error occured',
          err: error,
        });
      } else {
        res.status(201).json({
          msg: 'Item successfully created.',
          data: {
            item,
          },
        });
      }
    });
};

// Read all items
exports.getAllItems = (req, res) => {
  ItemModel.getAllItems()
    .then((result) => {
      res.status(200).json({
        msg: 'Success',
        data: {
          items: result.rows,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    });
};

// Update an item
exports.updateItemById = (req, res) => {
  const item = req.body;

  if (req.params.id !== item.id) {
    res.status(400).json({
      msg: 'Id\'s are not identical',
    });
    return;
  }

  ItemModel.updateItem(item)
    .then((result) => {
      res.status(200).json({
        msg: 'Item successfully updated',
        data: {
          item,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    });
};

// Delete an existing item
exports.deleteItemById = (req, res) => {
  const { id } = req.params;

  ItemModel.deleteItem(id)
    .then((result) => {
      res.status(200).json({
        msg: 'Item successfully deleted',
        data: id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        msg: 'An error occured',
        err: error.message,
      });
    });
};
