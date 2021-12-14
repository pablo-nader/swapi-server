const Starship = require('../models/starship');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/starships/';
    let response = {};
    let start = 0;
    let page = 1;
    let prev = null;
    let next = null;

    // if query exist
    // ex: /api/starship/?page=n
    if (req.query.page) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    }

    Starship.findAndCountAll({ offset: start, limit: 10 })
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
        Starship.findByPk(id)
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
    let char = {
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        cost_in_credits: req.body.cost_in_credits,
        length: req.body.length,
        max_atmosphering_speed: req.body.max_atmosphering_speed,
        crew: req.body.crew,
        passengers: req.body.passengers,
        cargo_capacity: req.body.cargo_capacity,
        consumables: req.body.consumables,
        hyperdrive_rating: req.body.hyperdrive_rating,
        starship_class: req.body.starship_class,
        url: null
    }
    Starship.create(char)
    .then(data => {
        res.send(data);
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Starship.findAndCountAll({ where: { name: req.body.name }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Name already exists" });
            }
        })
        .catch(error => console.log(error));

        Starship.findByPk(id)
        .then(char => {
            if (char) {
                char.name = req.body.name;
                char.model = req.body.model;
                char.manufacturer = req.body.manufacturer;
                char.cost_in_credits = req.body.cost_in_credits;
                char.length = req.body.length;
                char.max_atmosphering_speed = req.body.max_atmosphering_speed;
                char.crew = req.body.crew;
                char.passengers = req.body.passengers;
                char.cargo_capacity = req.body.cargo_capacity;
                char.consumables = req.body.consumables;
                char.hyperdrive_rating = req.body.hyperdrive_rating;
                char.MGLT = req.body.MGLT;
                char.starship_class = req.body.starship_class;
                char.url = null;
 
                char.save()
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
        Starship.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Starship Deleted" });    
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
        Starship.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Starship Restored" });    
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