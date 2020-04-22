const db = require("../models/connect");
const TempsTravailDiff = db.travailDifferentiels;
const Op = db.Sequelize.Op;
const regexMetaDate = /[\!\^\$\(\)\[\]\{\}\?\+\*\\\|]/;
const regexMeta = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|]/;
const regexMetaMax = /[\!\^\$\(\)\[\]\{\}\?\+\*\.\/\\\|\'\"]/;
const regexSpace = /\s/;
const regexString = /[a-zA-Z]/;
const regexStringAccent = /[âäàéèùêëîïôöçñ]/;
const regexStringMax = /[a-zA-Zâäàéèùêëîïôöçñ]/
const regexInt = /[0-9]/;

exports.create = (req, res) => {
    const travailDiff = {};
    
    // Valider la requête entrante.
    if (!req.body.date) {
        res.status(400).send({
            message : "Vous devez spécifier une date !"
        });
        return;
    } else if (!req.body.commentaire) {
        res.status(400).send({
            message: "Vous devez spécifier un commentaire"
        })
    };

    if (regexMetaDate.test(req.body.date) || (regexMetaDate.test(req.body.jour_supp) || regexMetaDate.test(req.body.jour_moins) || regexMetaDate.test(req.body.heure_supp) || regexMetaDate.test(req.body.heure_moins))) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
    } else if (regexSpace.test(req.body.date) || (regexSpace.test(req.body.jour_supp) || regexSpace.test(req.body.jour_moins) || regexSpace.test(req.body.heure_supp) || regexSpace.test(req.body.heure_moins))) {
        res.status(400).send({
            message: "Caractère interdit détecté !"
        });
    } else if (req.body.jour_supp) {
        if (isNaN(req.body.jour_supp)) {
            travailDiff = {
                date: req.body.date,
                jour_supp: req.body.jour_supp,
                commentaire: req.body.commentaire,
                utilisateur_id: req.body.utilisateur_id
            }
        } else {
            res.status(400).send({
                message: "La valeur spécifiée doit être un nombre."
            })
        }
    } else if (req.body.jour_moins) {
        if (isNaN(req.body.jour_moins)) {
            travailDiff = {
                date: req.body.date,
                jour_moins: req.body.jour_moins,
                commentaire: req.body.commentaire,
                utilisateur_id: req.body.utilisateur_id
            }
        } else {
            res.status(400).send({
                message: "La valeur spécifiée doit être un nombre."
            })
        }
    } else if (req.body.heure_supp) {
        if (isNaN(req.body.heure_supp)) {
            travailDiff = {
                date: req.body.date,
                jour_supp: req.body.heure_supp,
                commentaire: req.body.commentaire,
                utilisateur_id: req.body.utilisateur_id
            }
        } else {
            res.status(400).send({
                message: "La valeur spécifiée doit être un nombre."
            })
        }
    } else if (req.body.heure_moins) {
        if (isNaN(req.body.heure_moins)) {
            travailDiff = {
                date: req.body.date,
                jour_supp: req.body.heure_moins,
                commentaire: req.body.commentaire,
                utilisateur_id: req.body.utilisateur_id
            }
        } else {
            res.status(400).send({
                message: "La valeur spécifiée doit être un nombre."
            })
        }
    }
        
    

    // Sauvegarder le temps de travail différentiel en base.
        TempsTravailDiff.create(travailDiff).then(data => res.send({data})).catch((error) => {
            res.status(500).send({
               message: error.errors[0].message
            });
        }); 
};

exports.findAll = (req,res) => {
   

    TempsTravailDiff.findAll({
        attributes: ['travail_diff_id','date','jour_supp','jour_moins','heure_supp','heure_moins','commentaire','utilisateur_id'],
    }).then( data => {
            console.log(data);
            if (!data[0]) {
                res.status(500).send({ message: "Aucun temps de travail n'a été trouvé."})
            } else {
                res.status(200).send(data);
            };

    }).catch( error => {
        res.status(500).send({
           message: error.errors[0].message
        });
    });
};


/*exports.findOneById = (req,res) => {
     if(!regexInt.test(req.params.id) || regexMetaMax.test(req.params.id) || regexStringMax.test(req.params.id)) {
        res.status(400).send({
            message: "Vous devez spécifier un ID valide."
        });
        return;
    }
    const tempsTravail_id = req.params.id;
    
    TempsTravail.findByPk(tempsTravail_id)
    .then(data => {
        if (!data) {
            res.status(400).send({message: " Impossible de trouver le temps de travail spécifié avec l'ID : "+tempsTravail_id+" !"});
        } else {
            res.send(data)
        }
    })
    .catch( error => {
        res.status(500).send({
            error
        });
    });
};*/

exports.update = (req,res) => {
    const travail_diff_id = req.params.id;

    TempsTravailDiff.update(req.body, {
        where: {travail_diff_id: travail_diff_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.status(200).send({message: "Le temps de travail différentiel a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le temps de travail différentiel n'a pas pu être mit à jour."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

exports.delete = (req,res) => {
    const travail_diff_id = req.params.id;
    TempsTravailDiff.destroy({
        where: {travail_diff_id: travail_diff_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.status(200).send({message: "Le temps de travail différentiel a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le temps de travail différentiel n'a pas pu être supprimé."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

/*exports.deleteAll = (req,res) => {
    TempsTravail.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: "Les "+`${nums} `+" temps de travails ont bien été supprimés !" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur est survenue lors de la suppression des temps de travails."
        });
      });

};
*/

