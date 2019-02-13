const express = require('express');
const router = express.Router();

const ItemController = require('../controllers/ItemController');

// Create new item
router.post('/items/new', ItemController.createNewItem);

// Gets all items
router.get('/items', ItemController.getAllItems);

// Update item
router.put('/item/:id', ItemController.updateItemById);

// Delete item by id
router.delete('/item/:id', ItemController.deleteItemById);

module.exports = router;
