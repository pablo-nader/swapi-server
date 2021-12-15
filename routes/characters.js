const express = require('express');
const router = express.Router();

// load controller
const characterController = require('../controllers/characterController');

// middleware
const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'imgs/characters/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname.replace(/[ ()]/g, ''));
  }
});
const upload = multer({
  storage: storage
});

// View All Characters
// GET /api/characters/
// GET /api/characters/?page=number
// GET /api/characters/?name=string
router.get('/', characterController.index);

// View One Character
// /api/characters/{id}
router.get('/:id', characterController.get);

// Create Character
// POST /api/characters
router.post('/create', upload.single('imgFile'), characterController.create);

// Update Character
// PUT /api/characters
router.put('/edit/:id', upload.single('imgFile'), characterController.edit);

// Delete Character
// DELETE /api/characters
router.delete('/delete/:id', characterController.destroy);

// Restore Character
// PUT /api/characters
router.put('/restore/:id', characterController.restore);

module.exports = router;