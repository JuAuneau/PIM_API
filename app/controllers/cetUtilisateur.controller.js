const db = require("../models/connect");
const CompteEpargneTemps = db.compteEpargneTemps;
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\"]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;


exports.findAll = (req,res) => {
    CompteEpargneTemps.findAll({
        attributes: ['cet_id','solde'],
        include: Utilisateurs
        }).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun cet n'a été trouvé."})
            } else {
                res.send(data);
            };

    }).catch( error => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
};

exports.findOneByUserMail = (req,res) => {
     
    const mail = req.params.mail;
    
    Utilisateurs.findAll({
        where: {mail: mail}
    }).catch ( error => {
        res.status(500).send({
            message: error + " Une erreur s'est produite, cet adresse mail n'existe pas ou l'entrée n'est pas valide !"
        });
    }).then( data => {
        console.log(data);
    
        if (!data[0].dataValues.utilisateur_id) {
            res.status(400).send({message: " Impossible de trouver l'utilisateur avec le mail :'  "+mail+" !"});
        } else {
            CompteEpargneTemps.findAll({
                where: {
                   utilisateur_id: data[0].dataValues.utilisateur_id 
                }
            })
            .then(data => {
                if (!data) {
                    res.status(400).send({message: " Impossible de trouver le cet de l'utilisateur  "+mail+" !"});
                } else {
                    res.send(data)
                }
            })
            .catch( error => {
                res.status(500).send({
                    message: error
                });
            });
        }
            
    })
    
};

exports.delete = (req,res) => {
    const cet_id = req.params.id;
    CompteEpargneTemps.destroy({
        where: {cet_id: cet_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le cet a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le cet n'a pas pu être supprimé."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

exports.deleteAll = (req,res) => {
    CompteEpargneTemps.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: "Les "+`${nums} `+" cets ont bien été supprimés !" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression des cets."
        });
      });

};

