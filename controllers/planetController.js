const Planet = require('../models/planet');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/planets/';
    let response = {};
    let start = 0;
    let page = 1;
    let prev = null;
    let next = null;

    // if query exist
    // ex: /api/planet/?page=n
    if (req.query.page) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    }

    Planet.findAndCountAll({ offset: start, limit: 10 })
    .then(data => {
        // Setting previous page
        if (page > 1) {
            if (page-1 === 1) {
                prev = `${url}`;
            } else {
                prev = `${url}?page=${page-1}`;
            }
        }
        // Setting next page
        if ((page+1) <= Math.ceil(data.count/10)) {
            next = `${url}?page=${page+1}`;
        }

        response.count = data.count;
        response.prev = prev;
        response.next = next;
        response.results = data.rows;

        res.send(response);
    })
    .catch(error => {
        res.send(error);
    })
}

exports.get = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Planet.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);    
            } else {
                res.send({ data: false });
            }
        })
        .catch(error => res.send(error));
    } else {
        // Bad Request
        res.send({ details: "Not Found"});
    }
}

// body
exports.create = (req, res) => {
    let planet = {
        name: req.body.name,
        rotation_period: req.body.rotation_period,
        orbital_period: req.body.orbital_period,
        diameter: req.body.diameter,
        climate: req.body.climate,
        gravity: req.body.gravity,
        terrain: req.body.terrain,
        surface_water: req.body.surface_water,
        population: req.body.population,
        url: null
    }
    Planet.create(planet)
    .then(data => {
        res.send(data);
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Planet.findAndCountAll({ where: { name: req.body.name }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Name already exists" });
            }
        })
        .catch(error => console.log(error));

        Planet.findByPk(id)
        .then(planet => {
            if (planet) {
                planet.name = req.body.name;
                planet.rotation_period = req.body.rotation_period;
                planet.orbital_period = req.body.orbital_period;
                planet.diameter = req.body.diameter;
                planet.climate = req.body.climate;
                planet.gravity = req.body.gravity;
                planet.terrain = req.body.terrain;
                planet.surface_water = req.body.surface_water;
                planet.population = req.body.population;
                planet.url = null;
                
                planet.save()
                .then(data => res.send(data))
                .catch(error => console.log(error));
            } else {
                res.send({ details: "ID Not Found" });
            }
        })
        .catch(error => res.send(error));
    } else {
        // Bad Request
        res.send({ details: "ID Not Found"});
    }
}

exports.destroy = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Planet.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Planet Deleted" });    
            } else {
                res.send({ details: "Not Found" });
            }
        })
        .catch(error => res.send(error));
    } else {
        // Bad Request
        res.send({ details: "Not Found"});
    }
}

exports.restore = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Planet.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Planet Restored" });    
            } else {
                res.send({ details: "Not Found" });
            }
        })
        .catch(error => res.send(error));
    } else {
        // Bad Request
        res.send({ details: "Not Found"});
    }
}