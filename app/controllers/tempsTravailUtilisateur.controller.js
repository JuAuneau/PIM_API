const db = require("../models/connect");
const TempsTravail = db.tempsTravails;
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\"\:\;\=\+]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.findAll = (req,res) => {
    
    Utilisateur.findAll({
        attributes: ['nom','prenom','mail'],
        include: TempsTravail
    }).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun temps de travail n'a été trouvé."})
            } else {
                res.send(data);
            };

    }).catch( error => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
};

exports.findAllByUserId = (req,res) => {
        if(!regexInt.test(req.params.id) || regexMetaMax.test(req.params.id) || regexStringMax.test(req.params.id)) {
        res.status(400).send({
            message: "Vous devez spécifier un ID valide."
        });
        return;
    }
    const utilisateurUtilisateurId = req.params.id;
    
    Utilisateur.findByPk(utilisateurUtilisateurId, {include: TempsTravail})
    .then(data => {
        if (!data) {
            res.status(400).send({message: " Impossible de trouver les temps de travail de l'utilisateur spécifié avec l'ID : "+utilisateurUtilisateurId+" !"});
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