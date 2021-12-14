const express = require('express');
const router = express.Router();
const planetController = require('../controllers/planetController');

// Find All Planets
// GET /api/planets/
// GET /api/planets/?page=number
// GET /api/planets/?name=string
router.get('/', planetController.index);

// View One Planet
// /api/planets/{id}
router.get('/:id', planetController.get);

// Create Planet
// POST /api/planets
router.post('/create', planetController.create);

// Update Planet
// PUT /api/planets
router.put('/edit/:id', planetController.edit);

// Delete Planet
// DELETE /api/planets
router.delete('/delete/:id', planetController.destroy);

// Restore Planet
// PUT /api/planets
router.put('/restore/:id', planetController.restore);

module.exports = router;
