const Character = require('../models/character');
const Planet = require('../models/planet');

exports.index =  (req, res) => {
    Character.findAndCountAll({ offset: 0, limit: 10 })
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    })
}
exports.create =  (req, res) => {
    Character.create({
        "name": "Luke Skywalker", 
        "height": "172", 
        "mass": "77", 
        "hair_color": "blond", 
        "skin_color": "fair", 
        "eye_color": "blue", 
        "birth_year": "19BBY", 
        "gender": "male", 
    }).then(msg => res.send(msg));
    
    Character.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    })
    
}

exports.get =  (req, res) => {
    let id2 = req.params.id;
    // Character.findOne({id : id2})
    res.send(`get by id: ${id2}`);
}