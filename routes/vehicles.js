const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Find All Vehicles
// GET /api/vehicles/
// GET /api/vehicles/?page=number
// GET /api/vehicles/?name=string
router.get('/', vehicleController.index);

// View One Vehicle
// /api/vehicles/{id}
router.get('/:id', vehicleController.get);

// Create Vehicle
// POST /api/vehicles
router.post('/create', vehicleController.create);

// Update Vehicle
// PUT /api/vehicles
router.put('/edit/:id', vehicleController.edit);

// Delete Vehicle
// DELETE /api/vehicles
router.delete('/delete/:id', vehicleController.destroy);

// Restore Vehicle
// PUT /api/vehicles
router.put('/restore/:id', vehicleController.restore);

module.exports = router;
