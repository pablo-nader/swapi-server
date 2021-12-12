const sequelize = require('../config/db');
const Character = require('./character');
const Film = require('./film');
const Planet = require('./planet');
const Specie = require('./specie');
const Starship = require('./starship');
const Vehicle = require('./vehicle');
const User = require('./user');

Planet.hasMany(Character);
Character.belongsTo(Planet);

Planet.hasMany(Specie);
Specie.belongsTo(Planet);

Planet.belongsToMany(Film, { through: 'FilmPlanet'});
Film.belongsToMany(Planet, { through: 'FilmPlanet'});

Specie.belongsToMany(Film, { through: 'FilmSpecie' });
Film.belongsToMany(Specie, { through: 'FilmSpecie' });

Character.belongsToMany(Film, { through: 'CharacterFilm' });
Film.belongsToMany(Character, { through: 'CharacterFilm' });

Character.belongsToMany(Specie, { through: 'CharacterSpecie' });
Specie.belongsToMany(Character, { through: 'CharacterSpecie' });

Character.belongsToMany(Vehicle, { through: 'CharacterVehicle' });
Vehicle.belongsToMany(Character, { through: 'CharacterVehicle' });

Character.belongsToMany(Starship, { through: 'CharacterStarship' });
Starship.belongsToMany(Character, { through: 'CharacterStarship' });

Vehicle.belongsToMany(Film, { through: 'FilmVehicle' });
Film.belongsToMany(Vehicle, { through: 'FilmVehicle' });

sequelize.sync({force: true})
// sequelize.sync()
.then(msg => console.log("OK ==> ", msg))
.catch(error => ("ERROR ==> ", error));  