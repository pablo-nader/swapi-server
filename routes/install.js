const express = require('express');
const router = express.Router();
const createTables = require('../models/index');

// GET ALL
// /api/install
router.get('/', (req, res) => {
    createTables(true, true);
    res.send('Creating Tables...');
});

module.exports = router;