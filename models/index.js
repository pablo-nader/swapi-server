// import Sequelize
const sequelize = require('../config/db');

// import Models
const Character = require('./character');
const Film = require('./film');
const Planet = require('./planet');
const Specie = require('./specie');
const Starship = require('./starship');
const Vehicle = require('./vehicle');
const User = require('./user');

// import Seeders
const seeders = [
    require('../models/seeders/characterSeeder'),
    require('../models/seeders/filmSeeder'),
    require('../models/seeders/planetSeeder'),
    require('../models/seeders/specieSeeder'),
    require('../models/seeders/starshipSeeder'),
    require('../models/seeders/vehicleSeeder')
];

// Setting relations
Planet.hasMany(Character);
Character.belongsTo(Planet, {
    foreignKey: {
      name: 'homeworld'
    },
    references: {
        model: Planet, 
        key: 'url'
    }
});

Planet.hasMany(Specie);
Specie.belongsTo(Planet, {
    foreignKey: {
      name: 'homeworld'
    },
    references: {
        model: Planet, 
        key: 'url'
    }
});

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

// fn to load Seeders
const loadSeeder = (seeder) => {
    // define model 
    let model = seeder[0];
    // split seeder to remove arrays values
    let data = seeder[1].map(e => {
        let obj = {};
        
        for (const key in e) {
            if (!Array.isArray(e[key])) {
                obj[key] = e[key];
            }
        }
        return obj;
    });

    // Insert data
    model.bulkCreate(data)
    .then(msg => console.log(msg))
    .catch(error => console.log(error));
}

// fn to create Tables and load data
const createTables = (forced = false, loadSeeders = false) => {
    // create all tables and relations
    sequelize.sync({force: forced})
    .then(res => {
        console.log(res);
        // insert data
        setTimeout(() => {
            if (loadSeeders) {
                seeders.forEach(e => loadSeeder(e));
            }
        }, 500);
    })
    .catch(res => {
        console.log(res);
    });
}

module.exports = createTables;