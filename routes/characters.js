const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// GET ALL
// /api/characters/
router.get('/', characterController.index);
router.post('/create', characterController.create);
// GET One
// /api/characters/{id}
router.get('/:id', characterController.get);

module.exports = router;
