const { Op } = require("sequelize");

const Vehicle = require('../models/vehicle');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/vehicles/';
    let response = {};
    let start = 0;
    let queryLimit = 10;
    let page = 1;
    let prev = null;
    let next = null;
    let searchName = '';

    // if query exist
    // ex: /api/vehicle/?page=n
    if (req.query.page && !req.query.name) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    } else if (req.query.name && req.query.name.length > 0) {
        searchName = req.query.name;
        queryLimit = 100;
    }a

    Vehicle.findAndCountAll({ 
        where: {
            name: {
                [Op.substring]: searchName
            } 
        },
        offset: start, 
        limit: queryLimit 
    })
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
        Vehicle.findByPk(id)
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
    const imgFile = req.file.originalname.replace(/[ ()]/g, '');
    let vehicle = {
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
        vehicle_class: req.body.vehicle_class,
        image: imgFile,
        url: null
    }
    Vehicle.create(vehicle)
    .then(data => {
        res.send(data);
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = (req, res) => {
    let imgFile;
    if (req.file) {
        imgFile = req.file.originalname.replace(/[ ()]/g, '');
    } else {
        imgFile = false;
    }

    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Vehicle.findAndCountAll({ where: { name: req.body.name }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Name already exists" });
            }
        })
        .catch(error => console.log(error));

        Vehicle.findByPk(id)
        .then(vehicle => {
            if (vehicle) {
                vehicle.name = req.body.name;
                vehicle.model = req.body.model;
                vehicle.manufacturer = req.body.manufacturer;
                vehicle.cost_in_credits = req.body.cost_in_credits;
                vehicle.length = req.body.length;
                vehicle.max_atmosphering_speed = req.body.max_atmosphering_speed;
                vehicle.crew = req.body.crew;
                vehicle.passengers = req.body.passengers;
                vehicle.cargo_capacity = req.body.cargo_capacity;
                vehicle.consumables = req.body.consumables;
                vehicle.vehicle_class = req.body.vehicle_class;
                if (imgFile) {
                    vehicle.image= imgFile;
                }              
                vehicle.url = null;

                vehicle.save()
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
        Vehicle.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Vehicle Deleted" });    
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
        Vehicle.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Vehicle Restored" });    
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