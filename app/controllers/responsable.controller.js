const db = require("../models/connect");
const Responsable = db.responsables;
const Op = db.Sequelize.Op;
const regexMetaMail = /[\#\!\^\$\(\)\[\]\{\}\?\+\*\/\\\|]/;
const regexMeta = /[\#\@\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\#\@\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\-\_"]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.create = (req, res) => {
    
    // Valider la requête entrante.
    if (!req.body.nom && !req.body.prenom && !req.body.mail) {
        res.status(400).send({
            message : "Vous devez spécifier un nom, un prénom et une adresse mail pour saisir un responsable !"
        });
        return;
    } else if (!req.body.nom) {
        res.status(400).send({
            message : "Vous devez spécifier un nom !"
        });
        return;
    } else if (!req.body.prenom) {
        res.status(400).send({
            message : "Vous devez spécifier un prénom !"
        });
        return;
    } 
    else if (!req.body.mail) {
        res.status(400).send({
            message : "Vous devez spécifier une adresse mail !"
        });
        return;
    } else if (regexMeta.test(req.body.nom) || regexMeta.test(req.body.prenom) || regexMetaMail.test(req.body.mail)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexSpace.test(req.body.nom) || regexSpace.test(req.body.prenom) || regexSpace.test(req.body.mail)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } 
 
    // Créer un responsable.
    const responsable = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail
    };

    // Sauvegarder le responsable en base.
    Responsable.create(responsable).then(data => res.send(data)).catch((error) => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
    
    
};

exports.findAll = (req,res) => {
    // Valider la requête entrante.
    if (regexMeta.test(req.body.nom) || regexMeta.test(req.body.prenom) || regexMetaMail.test(req.body.mail)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    }

    const mail = req.body.mail;
    var condition = mail ? {mail: {[Op.iLike]: `%${mail}%`}} : null;

    Responsable.findAll({
        attributes: ['responsable_id', 'nom', 'prenom', 'mail'],
        where: condition}).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun responsable n'a été trouvé."})
            } else {
                res.send(data);
            };

    }).catch( error => {
        res.status(500).send({
            message: error
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
    const responsable_id = req.params.id;
    
    Responsable.findByPk(responsable_id)
    .then(data => {
        if (!data) {
            res.status(400).send({message: " Impossible de trouver le responsable spécifié avec l'ID : "+responsable_id+" !"});
        } else {
            res.send(data)
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });
};

exports.update = (req,res) => {
    const responsable_id = req.params.id;

    Responsable.update(req.body, {
        where: {responsable_id: responsable_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le responsable a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le responsable n'a pas pu être mit à jour."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

exports.delete = (req,res) => {
    const responsable_id = req.params.id;
    Responsable.destroy({
        where: {responsable_id: responsable_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le responsable a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le responsable n'a pas pu être supprimé."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

exports.deleteAll = (req,res) => {
    Responsable.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: "Les "+`${nums} `+" responsables ont bien été supprimés !" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression des responsables."
        });
      });

};

