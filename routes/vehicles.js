const express = require('express');
const router = express.Router();

// load controller
const vehicleController = require('../controllers/vehicleController');

// middleware
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/imgs/vehicles/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname.replace(/[ ()]/g, ''));
  }
});
const upload = multer({
  storage: storage
});

// View All Vehicles
// GET /api/vehicles/
// GET /api/vehicles/?page=number
// GET /api/vehicles/?name=string
router.get('/', vehicleController.index);

// View One Vehicle
// /api/vehicles/{id}
router.get('/:id', vehicleController.get);

// Create Vehicle
// POST /api/vehicles
router.post('/create', upload.single('imgFile'), vehicleController.create);

// Update Vehicle
// PUT /api/vehicles
router.put('/edit/:id', upload.single('imgFile'), vehicleController.edit);

// Delete Vehicle
// DELETE /api/vehicles
router.delete('/delete/:id', vehicleController.destroy);

// Restore Vehicle
// PUT /api/vehicles
router.put('/restore/:id', vehicleController.restore);

module.exports = router;
