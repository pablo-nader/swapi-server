const express = require('express');
const router = express.Router();
const specieController = require('../controllers/specieController');

// Find All Species
// GET /api/species/
// GET /api/species/?page=number
// GET /api/species/?name=string
router.get('/', specieController.index);

// View One Specie
// /api/species/{id}
router.get('/:id', specieController.get);

// Create Specie
// POST /api/species
router.post('/create', specieController.create);

// Update Specie
// PUT /api/species
router.put('/edit/:id', specieController.edit);

// Delete Specie
// DELETE /api/species
router.delete('/delete/:id', specieController.destroy);

// Restore Specie
// PUT /api/species
router.put('/restore/:id', specieController.restore);

module.exports = router;
