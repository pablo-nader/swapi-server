const express = require('express');
const router = express.Router();
const starshipController = require('../controllers/starshipController');

// Find All Starships
// GET /api/starships/
// GET /api/starships/?page=number
// GET /api/starships/?name=string
router.get('/', starshipController.index);

// View One Starship
// /api/starships/{id}
router.get('/:id', starshipController.get);

// Create Starship
// POST /api/starships
router.post('/create', starshipController.create);

// Update Starship
// PUT /api/starships
router.put('/edit/:id', starshipController.edit);

// Delete Starship
// DELETE /api/starships
router.delete('/delete/:id', starshipController.destroy);

// Restore Starship
// PUT /api/starships
router.put('/restore/:id', starshipController.restore);

module.exports = router;
