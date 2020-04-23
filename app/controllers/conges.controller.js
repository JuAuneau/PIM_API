var moment = require("moment");
const db = require("../models/connect");
const Conges = db.conges;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\"]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.create = (req,res) => {
    if(!req.body.data) {
        res.status(400).send({
            message: "Impossible de traiter une requête vide."
        })
        return;
    };

    const conges = [];
    const congesErr = [];
    
    req.body.data.forEach(element => {

        if(!element.date_debut || !element.date_fin){
            congesErr.push({message: "Vous n'avez pas spécifié de date !"},element)
        } else if (moment(req.body.date_fin,["L"],'fr').isBefore(moment(req.body.date_debut))){
            congesErr.push({message: "La date de fin ne peut pas être avant la date de début de vos congés !"},element)
        } else {
            conges.push(element)
        }
        
    });
    Conges.bulkCreate(conges)
    .then(data => {
        res.status(200).send(data)
    })
    .catch( err => {
        res.status(500).send({
            message: err
        })
    })
};

exports.findAll = (req,res) => {
    Conges.findAll()
    .then(data => {
        if (!data[0]) {
            res.status(500).send({
                message: "Aucun congés n'a été trouvé."
            })
        } else {res.status(200).send(data);}
        
    })
    .catch( err => {
        res.status(500).send({
            message: err
        })
    })
};

exports.findById = (req,res) => {

};

exports.update = (req,res) => {
    const conges_id = req.params.id;

    Conges.update(req.body, {
        where: {conges_id: conges_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le conges a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le conges n'a pas pu être mit à jour."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

exports.deleteOne = (req,res) => {
    const conges_id = req.params.id;

    Conges.destroy({
        where: {conges_id: conges_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le congés a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le congés n'a pas pu être supprimé."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

exports.deleteAll = (req,res) => {

};