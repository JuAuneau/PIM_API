const db = require("../models/connect");
const Role = db.roles;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexSpace = /\s/;
const regexString = /[âäàéèùêëîïôöçñ]/;

exports.create = (req, res) => {
    
    // Valider la requête entrante.
    if (!req.body.role && !req.body.description) {
        res.status(400).send({
            message : "Vous devez spécifier un nom de rôle et une decription!"
        });
        return;
    } else if (!req.body.role) {
        res.status(400).send({
            message : "Vous devez spécifier un nom de rôle !"
        });
        return;
    } else if (!req.body.description) {
        res.status(400).send({
            message : "Vous devez spécifier une decription!"
        });
        return;
    } else if (regexMeta.test(req.body.role) || regexMeta.test(req.body.description)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexString.test(req.body.role)) {
        res.status(400).send({
            message: "Ne pas mettre d'accent pour un nom de rôle."
        });
        return;
    } else if (regexSpace.test(req.body.role)) {
        res.status(400).send({
            message: "Caractère interdit détecté dans rôle."
        });
        return;
    }
 
    // Créer un rôle.
    const role = {
        role: req.body.role,
        description: req.body.description
    };

    console.log(role);
    console.log(Role);

    // Sauvegarder le rôle en base.
    Role.create(role).then(data => res.send(data)).catch((error) => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
    
    
};

exports.findAll = (req,res) => {
    const role = req.body.role;
    var condition = role? {role: {[Op.iLike]: `%${role}%`}} : null;

    Role.findAll({where: condition}).then( data => {
        res.send(data);
    }).catch( error => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
};

exports.findOne = (req,res) => {

};

exports.update = (req,res) => {

};

exports.delete = (req,res) => {

};

exports.deleteAll = (req,res) => {

};

