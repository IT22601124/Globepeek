const express = require('express');
const router = express.Router();
const { addFavorite, getFavorites, removeFavorite } = require('../Controllers/favoriteController');
const authenticate = require('../middleware/authenticate'); // Middleware to verify token

// Add a favorite country
router.post('/add', authenticate, addFavorite);

// Get all favorite countries for the authenticated user
router.get('/', authenticate, getFavorites);

// Remove a favorite country
router.delete('/:countryId', authenticate, removeFavorite);

module.exports = router;