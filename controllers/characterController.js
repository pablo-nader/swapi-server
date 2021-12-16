const Character = require('../models/character');
const Planet = require('../models/planet');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/characters/';
    let response = {};
    let start = 0;
    let page = 1;
    let prev = null;
    let next = null;

    // if query exist
    // ex: /api/character/?page=n
    if (req.query.page) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    } else if (req.query.name && req.query.name.length > 0) {
        Character.findAndCountAll({ 
            where: {
                name: req.query.name;
            }
            // offset: start, 
            // limit: 10 
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

    Character.findAndCountAll({ offset: start, limit: 10 })
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
        Character.findByPk(id)
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
    let char = {
        name: req.body.name,
        height: req.body.height,
        mass: req.body.mass,
        hair_color: req.body.hair_color,
        skin_color: req.body.skin_color,
        eye_color: req.body.eye_color,
        birth_year: req.body.birth_year,
        gender: req.body.gender,
        homeworld: req.body.homeworld,
        image: imgFile,
        url: null
    };

    Character.create(char)
    .then(data => {
        console.log(data);
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
        Character.findAndCountAll({ where: { name: req.body.name }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Name already exists" });
            }
        })
        .catch(error => console.log(error));

        Character.findByPk(id)
        .then(char => {
            if (char) {
                char.name = req.body.name;
                char.height = req.body.height;
                char.mass = req.body.mass;
                char.hair_color = req.body.hair_color;
                char.skin_color = req.body.skin_color;
                char.eye_color = req.body.eye_color;
                char.birth_year = req.body.birth_year;
                char.gender = req.body.gender;
                char.homeworld = req.body.homeworld;
                if (imgFile) {
                    char.image= imgFile;
                }                
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
        Character.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Character Deleted" });    
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
        Character.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Character Restored" });    
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