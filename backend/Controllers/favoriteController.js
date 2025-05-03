const Favorite = require('../models/Favorite');

// Add a favorite country
exports.addFavorite = async (req, res) => {
  const { country } = req.body;
  const userId = req.user.id; // Extracted from the token by the authenticate middleware

  try {
    // Check if the country is already a favorite
    const exists = await Favorite.findOne({ userId, 'country.cca3': country.cca3 });
    if (exists) {
      return res.status(400).json({ error: 'Country is already in favorites' });
    }

    const favorite = new Favorite({ userId, country });
    await favorite.save();
    res.json({ success: true, message: 'Favorite added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

// Get all favorite countries for a user
exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.find({ userId });
    res.json({ success: true, favorites });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve favorites' });
  }
};

// Remove a favorite country
exports.removeFavorite = async (req, res) => {
  const { countryId } = req.params; // Country ID (e.g., `cca3`) passed as a route parameter
  const userId = req.user.id;

  try {
    const result = await Favorite.findOneAndDelete({ userId, 'country.cca3': countryId });
    if (!result) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ success: true, message: 'Favorite removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};