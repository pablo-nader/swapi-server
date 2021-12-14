const express = require('express');
const router = express.Router();
const createTables = require('../models/index');
const characterSeeder = require('../models/seeders/characterSeeder');
const filmSeeder = require('../models/seeders/filmSeeder');
const planetSeeder = require('../models/seeders/planetSeeder');
const specieSeeder = require('../models/seeders/specieSeeder');
const starshipSeeder = require('../models/seeders/starshipSeeder');
const vehicleSeeder = require('../models/seeders/vehicleSeeder');

// GET ALL
// /api/install
router.get('/', (req, res) => {
    createTables(true, true);
    res.send('Creating Tables...');
    // if (status === 'ok') {
    //     console.log(msg);
    //     res.send(msg);

    // } else {
    //     console.log(msg);
    //     res.send(msg);
    // }

});

module.exports = router;