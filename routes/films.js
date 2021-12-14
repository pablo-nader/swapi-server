const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

// Find All Films
// GET /api/films/
// GET /api/films/?page=number
// GET /api/films/?name=string
router.get('/', filmController.index);

// View One Film
// /api/films/{id}
router.get('/:id', filmController.get);

// Create Film
// POST /api/films
router.post('/create', filmController.create);

// Update Film
// PUT /api/films
router.put('/edit/:id', filmController.edit);

// Delete Film
// DELETE /api/films
router.delete('/delete/:id', filmController.destroy);

// Restore Film
// PUT /api/films
router.put('/restore/:id', filmController.restore);

module.exports = router;
