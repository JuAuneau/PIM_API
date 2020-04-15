const db = require("../models/connect");
const Role = db.roles;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\$\(\)\[\]\{\}\?\+\*\.\/\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\|\']/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.create = (req, res) => {
    console.log(req);
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
    } else if (regexMetaMax.test(req.body.role) || regexMeta.test(req.body.description)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexStringAccent.test(req.body.role)) {
        res.status(400).send({
            message: "Ne pas mettre d'accent pour un nom de rôle."
        });
        return;
    } else if (regexSpace.test(req.body.role)) {
        res.status(400).send({
            message: "Espace interdit dans rôle."
        });
        return;
    }
    
    // Créer un rôle.
    const role = {
        role: req.body.role,
        description: req.body.description
    };

    // Sauvegarder le rôle en base.
    Role.create(role).then(data => res.send(data)).catch((error) => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
    
    
};

exports.findAll = (req,res) => {
    // Valider la requête entrante.
    if (regexMetaMax.test(req.body.role) || regexMeta.test(req.body.description)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexStringAccent.test(req.body.role)) {
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

    const role = req.body.role;
    var condition = role ? {role: {[Op.iLike]: `%${role}%`}} : null;

    Role.findAll({
        attributes: ['role_id','role','description'],
        where: condition}).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun rôle n'a été trouvé."})
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
    const role_id = req.params.id;
    
    Role.findByPk(role_id)
    .then(data => {
        if (!data) {
            res.status(400).send({message: " Impossible de trouver le rôle spécifié avec l'ID : "+role_id+" !"});
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
    const role_id = req.params.id;

    Role.update(req.body, {
        where: {role_id: role_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le rôle a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le rôle n'a pas pu être mit à jour."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });
};

exports.delete = (req,res) => {
    const role_id = req.params.id;
    Role.destroy({
        where: {role_id: role_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le rôle a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le rôle n'a pas pu être supprimé."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

exports.deleteAll = (req,res) => {
    Role.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: "Les "+`${nums} `+" rôles ont bien été supprimés !" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression des rôles."
        });
      });

};

