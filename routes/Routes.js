const express = require('express');
const passport = require('passport');

const router = express.Router();

const ItemController = require('../controllers/ItemController');
const AuthController = require('../controllers/AuthController');

// Create new item
router.post('/items', ItemController.createNewItem);

// Gets all items
router.get('/items', ItemController.getAllItems);

// Protected route
// Update item
router.put('/items/:id', ItemController.updateItemById);

// Delete item by id
router.delete('/items/:id', ItemController.deleteItemById);

// Login route
router.post('/login', AuthController.login);

//  Signup route
router.post('/register', AuthController.register);

// Profile route
router.get('/profile/:username', passport.authenticate('jwt', { session: false }), AuthController.profile);

module.exports = router;
