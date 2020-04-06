const db = require("../models/connect");
const Service = db.services;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\"]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.create = (req, res) => {
    
    // Valider la requête entrante.
    if (!req.body.service) {
        res.status(400).send({
            message : "Vous devez spécifier un nom pour votre service !"
        });
        return;
    } else if (regexMetaMax.test(req.body.service)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } 
 
    // Créer un service.
    const service = {
        service: req.body.service
    };

    // Sauvegarder le service en base.
    Service.create(service).then(data => res.send(data)).catch((error) => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
    
    
};

exports.findAll = (req,res) => {
    // Valider la requête entrante.
    if (regexMetaMax.test(req.body.service)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    }
    const service = req.body.service;
    var condition = service ? {service: {[Op.iLike]: `%${service}%`}} : null;

    Service.findAll({
        attributes: ['service_id','service'],
        where: condition}).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun service n'a été trouvé."})
            } else {
                res.send(data);
            };

    }).catch( error => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
};

exports.findOneById = (req,res) => {
     if(!regexInt.test(req.params.id) || regexMetaMax.test(req.params.id) || regexStringMax.test(req.params.id)) {
        res.status(400).send({
            message: "Vous devez spécifier un ID valide."
        });
        return;
    }
    const service_id = req.params.id;
    
    Service.findByPk(service_id)
    .then(data => {
        if (!data) {
            res.status(400).send({message: " Impossible de trouver le service spécifié avec l'ID : "+service_id+" !"});
        } else {
            res.send(data)
        }
    })
    .catch( error => {
        res.status(500).send({
            error
        });
    });
};

exports.update = (req,res) => {
    const service_id = req.params.id;

    Service.update(req.body, {
        where: {service_id: service_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le service a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le service n'a pas pu être mit à jour."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

exports.delete = (req,res) => {
    const service_id = req.params.id;
    Service.destroy({
        where: {service_id: service_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le service a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le service n'a pas pu être supprimé."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

exports.deleteAll = (req,res) => {
    Service.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: "Les "+`${nums} `+" services ont bien été supprimés !" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression des services."
        });
      });

};

