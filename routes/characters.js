const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Find All Characters
// GET /api/characters/
// GET /api/characters/?page=number
// GET /api/characters/?name=string
router.get('/', characterController.index);

// View One Character
// /api/characters/{id}
router.get('/:id', characterController.get);

// Create Character
// POST /api/characters
router.post('/create', characterController.create);

// Update Character
// PUT /api/characters
router.put('/edit/:id', characterController.edit);

// Delete Character
// DELETE /api/characters
router.delete('/delete/:id', characterController.destroy);

// Restore Character
// PUT /api/characters
router.put('/restore/:id', characterController.restore);

module.exports = router;
