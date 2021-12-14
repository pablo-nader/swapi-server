const express = require('express');
const conn = require('./config/db');
const cors = require('cors');
const { urlencoded } = require("express");

// create server
const app = express();
// set port
const PORT = process.env.PORT || 4000;

app.use(cors());
// body parser
app.use(urlencoded({extended: true}));
app.use(express.json());
// set routes
// // api/users/
// app.use('/api/users', require('./routes/users'));

// Install App
app.use('/api/install', require('./routes/install'));
// // api/films/
// app.use('/api/films', require('./routes/films'));

// // api/species/
// app.use('/api/species', require('./routes/species'));
// // api/starships/
// app.use('/api/starships', require('./routes/starships'));


// api/characters/
app.use('/api/characters', require('./routes/characters'));
// api/vehicles/
app.use('/api/vehicles', require('./routes/vehicles'));
// api/planets/
app.use('/api/planets', require('./routes/planets'));

app.listen(PORT, () => {
    console.log(`---- SERVER RUNNING AT PORT ${PORT} ----`);
});
