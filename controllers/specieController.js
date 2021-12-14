const Specie = require('../models/specie');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/species/';
    let response = {};
    let start = 0;
    let page = 1;
    let prev = null;
    let next = null;

    // if query exist
    // ex: /api/specie/?page=n
    if (req.query.page) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    }

    Specie.findAndCountAll({ offset: start, limit: 10 })
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
        Specie.findByPk(id)
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
        classification: req.body.classification,
        designation: req.body.designation,
        average_height: req.body.average_height,
        skin_colors: req.body.skin_colors,
        hair_colors: req.body.hair_colors,
        eye_colors: req.body.eye_colors,
        average_lifespan: req.body.average_lifespan,
        homeworld: req.body.homeworld,
        language: req.body.language,
        url: null
    }
    Specie.create(char)
    .then(data => {
        res.send(data);
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Specie.findAndCountAll({ where: { name: req.body.name }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Name already exists" });
            }
        })
        .catch(error => console.log(error));

        Specie.findByPk(id)
        .then(char => {
            if (char) {
                char.name = req.body.name;
                char.classification = req.body.classification;
                char.designation = req.body.designation;
                char.average_height = req.body.average_height;
                char.skin_colors = req.body.skin_colors;
                char.hair_colors = req.body.hair_colors;
                char.eye_colors = req.body.eye_colors;
                char.average_lifespan = req.body.average_lifespan;
                char.homeworld = req.body.homeworld;
                char.language = req.body.language;

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
        Specie.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Specie Deleted" });    
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
        Specie.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Specie Restored" });    
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