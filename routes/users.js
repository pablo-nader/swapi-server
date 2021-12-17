const express = require('express');
const router = express.Router();

// load controller
const userController = require('../controllers/userController');


// View All Users
// GET /api/users/
// GET /api/users/?page=number
// GET /api/users/?name=string
router.get('/', userController.index);

// View One User
// /api/users/{id}
router.get('/:id', userController.get);

// Create User
// POST /api/users
router.post('/create', userController.create);

// Update User
// PUT /api/users
router.put('/edit/:id', userController.edit);

// Delete User
// DELETE /api/users
router.delete('/delete/:id', userController.destroy);

// Restore User
// PUT /api/users
router.put('/restore/:id', userController.restore);

module.exports = router;