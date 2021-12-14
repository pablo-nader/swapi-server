const Film = require('../models/film');

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/films/';
    let response = {};
    let start = 0;
    let page = 1;
    let prev = null;
    let next = null;

    // if query exist
    // ex: /api/film/?page=n
    if (req.query.page) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * 10 -10;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    }

    Film.findAndCountAll({ offset: start, limit: 10 })
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
        Film.findByPk(id)
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
        title: req.body.title,
        episode_id: req.body.episode_id,
        opening_crawl: req.body.opening_crawl,
        director: req.body.director,
        producer: req.body.producer,
        release_date: req.body.release_date,
        url: null
    }
    Film.create(char)
    .then(data => {
        res.send(data);
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = (req, res) => {
    let id = req.params.id;
    if (!isNaN(id) && id > 0) {
        Film.findAndCountAll({ where: { title: req.body.title }})
        .then(data => {
            if (data.count !== 0) {
                res.send({ details: "Title already exists" });
            }
        })
        .catch(error => console.log(error));

        Film.findByPk(id)
        .then(char => {
            if (char) {
                char.title = req.body.title;
                char.episode_id = req.body.episode_id;
                char.opening_crawl = req.body.opening_crawl;
                char.director = req.body.director;
                char.producer = req.body.producer;
                char.release_date = req.body.release_date;
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
        Film.findByPk(id)
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "Film Deleted" });    
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
        Film.findByPk(id, { paranoid: false })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "Film Restored" });    
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