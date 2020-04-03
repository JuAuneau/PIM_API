const db = require("../models/connect");
const Role = db.roles;
//const Op = db.Sequelize.Op;

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
    }

    // Créer un rôle.
    const role = {
        role: req.body.role,
        description: req.body.description
    };
    console.log(role);
    console.log(Role);
    // Sauvegarder le rôle en base.
    Role.create(role).then(data => res.send(data));
};

exports.findAll = (req,res) => {

};

exports.findOne = (req,res) => {

};

exports.update = (req,res) => {

};

exports.delete = (req,res) => {

};

exports.deleteAll = (req,res) => {

};

