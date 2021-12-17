const express = require('express');
const conn = require('./config/db');
const cors = require('cors');
const { urlencoded } = require("express");

// create server
const app = express();

// set port
const PORT = process.env.PORT || 4000;

// use cors
app.use(cors());

// body parser
app.use(urlencoded({extended: true}));
app.use(express.json());

// static Routes
app.use('/', express.static(__dirname + '/public'));

// Install App
// COMMENT THIS LINE AFTER LOAD SEEDERS!!
app.use('/api/install', require('./routes/install'));

// Routes
// users
app.use('/api/users', require('./routes/users'));

// films
app.use('/api/films', require('./routes/films'));

// species
app.use('/api/species', require('./routes/species'));

// starships
app.use('/api/starships', require('./routes/starships'));

// characters
app.use('/api/characters', require('./routes/characters'));

// vehicles
app.use('/api/vehicles', require('./routes/vehicles'));

// planets
app.use('/api/planets', require('./routes/planets'));

app.listen(PORT, () => {
    console.log(`---- SERVER RUNNING AT PORT ${PORT} ----`);
});