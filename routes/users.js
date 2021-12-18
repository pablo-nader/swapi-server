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
// /api/users/{email}
router.get('/:email', userController.get);

// Create User
// POST /api/users
router.post('/create', userController.create);

// Update User
// PUT /api/users
router.put('/edit/:email', userController.edit);

// Delete User
// DELETE /api/users
router.delete('/delete/:email', userController.destroy);

// Restore User
// PUT /api/users
router.put('/restore/:email', userController.restore);

// Login
// POST /api/users/login
router.post('/login', userController.login);

module.exports = router;