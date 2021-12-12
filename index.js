const express = require('express');
const conn = require('./config/db');

// create server
const app = express();
// set port
const PORT = process.env.PORT || 4000;

// body parser
app.use(express.json({extended: true}));

// set routes
// // api/users/
// app.use('/api/users', require('./routes/users'));
// api/characters/
app.use('/api/characters', require('./routes/characters'));
// // api/films/
// app.use('/api/films', require('./routes/films'));
// // api/planets/
// app.use('/api/planets', require('./routes/planets'));
// // api/species/
// app.use('/api/species', require('./routes/species'));
// // api/starships/
// app.use('/api/starships', require('./routes/starships'));
// // api/vehicles/
// app.use('/api/vehicles', require('./routes/vehicles'));

app.listen(PORT, () => {
    console.log(`---- SERVER RUNNING AT PORT ${PORT} ----`);
});
