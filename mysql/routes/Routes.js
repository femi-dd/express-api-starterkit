const express = require('express');

const router = express.Router();

// Import and pass controllers to routes
const ItemController = require('../controllers/ItemController');

// Create new item
router.post('/items', ItemController.createNewItem);

// Gets all items
router.get('/items', ItemController.getAllItems);

// Update item
router.put('/items/:id', ItemController.updateItemById);

// Delete item by id
router.delete('/items/:id', ItemController.deleteItemById);

module.exports = router;
