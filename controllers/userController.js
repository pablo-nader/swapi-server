const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// load model
const User = require('../models/user');

// SECRET KEY 
const SECRET_KEY = "tukiti-ras-ras-ras";

// params/query
exports.index = (req, res) => {
    let url = req.protocol + '://' + req.get('host') + '/api/users/';
    let response = {};
    let start = 0;
    let queryLimit = 10;
    let page = 1;
    let prev = null;
    let next = null;
    let searchName = '';

    // if query exist
    // ex: /api/users/?page=n
    if (req.query.page && !req.query.name) {
        if (!isNaN(req.query.page) && req.query.page > 0) {
            start = req.query.page * queryLimit - queryLimit;
            page = Number(req.query.page);
        } else {
            // Bad request
            res.send({ details: "Not Found"});
        }
    } else if (req.query.name && req.query.name.length > 0) {
        searchName = req.query.name;
        queryLimit = 100;
    }

    User.findAndCountAll({ 
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
    let email = req.params.email;
    if (email.length > 0) {
        User.findOne({ where: { email: req.params.email }})
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
    // check if user exists

    User.findAndCountAll({ where: { email: req.body.email } })
    .then(data => {
        if (data.count !== 0) {
            res.send({ error: "Email already exists" });
        }
    })
    .catch(error => console.log(error));

    const hashedPassword = (bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)));

    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };

    User.create(user)
    .then(data => {
        // create and sign token
        const payload = {
            id: data.id,
            name: data.name,
            email: data.email
        };

        jwt.sign(
            payload, 
            SECRET_KEY, 
            { expiresIn: 7200 }, // 2 hours
            (error, token) => {
                if (error) throw error;

                res.send({token, user: payload});
            }
        );
        
    })
    .catch(error => res.send(error));   
}

// body
exports.edit = async (req, res) => {
    if (req.params.email.length > 0) {
        let user = await User.findOne({ where: { email: req.params.email }});

        if (user) {
            if (req.body.email) user.email = req.body.email;
            if (req.body.name) user.name = req.body.name;
            if (req.body.password) {
                const hashedPassword = (bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)));
                user.password = hashedPassword;
            }

            user.save()
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.send(error);
            })

        } else {
            // Bad Request
            res.send({ error: "User Not Found"});
        }
    } else {
        res.send({ error: "Email is invalid"});
    }
}

exports.destroy = (req, res) => {
    let email = req.params.email;
    if (email.length > 0) {
        User.findOne({ where: { email: req.params.email } })
        .then(data => {
            if (data) {
                data.destroy();
                res.send({ details: "User Deleted" });    
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
    let email = req.params.email;
    if (email.length > 0) {
        User.findOne({ where: { email: req.params.email } })
        .then(data => {
            if (data) {
                data.restore();
                res.send({ details: "User Restored" });    
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

exports.login = (req, res) => {
    User.findAndCountAll({ where: { email: req.body.email } })
    .then(data => {
        if (data.count === 1) {
            if (bcrypt.compareSync(req.body.password, data.rows[0].password)) {
                // create and sign token
                const payload = {
                    id: data.rows[0].id,
                    name: data.rows[0].name,
                    email: data.rows[0].email
                };

                jwt.sign(
                    payload, 
                    SECRET_KEY, 
                    { expiresIn: 7200 }, // 2 hours
                    (error, token) => {
                        if (error) throw error;

                        res.send({token, user: payload});
                    }
                );
            } else {
                res.send({ error: "The password is invalid"});
            }
        } else {
            res.send({ error: "The email is invalid"});
        }
    })
    .catch(error => res.send(error));
}