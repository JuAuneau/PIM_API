const db = require("../models/connect");
const TempsTravail = db.tempsTravails;
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
    // Valider la requête entrante.
    if (!req.body.data) {
        res.status(400).send({
            message : "Vous devez spécifier une date !"
        });
        return;
    };
    const tempsTravail = [];
    const tempsTravailErr = [];
    req.body.data.forEach(element => {

        console.log(element.date);
        console.log(element.valeurHeure);
        console.log(element.valeurJour);

        if (regexMetaDate.test(element.date) || (regexMetaDate.test(element.valeurHeure) || regexMetaDate.test(element.valeurJour))) {
            res.status(400).send({
                message: "Caractère interdit détecté."
            });
        } else if (regexSpace.test(element.date) || (regexSpace.test(element.valeurJour) || regexSpace.test(element.valeurHeure))) {
            res.status(400).send({
                message: "Caractère interdit détecté !"
            });
        } else if (element.valeurHeure) {
            if (isNaN(element.valeurHeure)) {
                tempsTravailErr.push(element);
            } else {
                tempsTravail.push(element);
            }
        } else if (element.valeurJour) {
            if (isNaN(element.valeurJour)) {
                tempsTravailErr.push(element);
            } else {
                tempsTravail.push(element);
            }
        } 
        
    });

    // Sauvegarder le temps de travail en base.
        TempsTravail.bulkCreate(tempsTravail).then(data => res.send({data,tempsTravailErr})).catch((error) => {
            res.status(500).send({
               message: error.errors[0].message
            });
        }); 
};

exports.findAll = (req,res) => {
    // Valider la requête entrante.
    if (regexMetaDate.test(req.body.tempsTravailDate)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexStringAccent.test(req.body.tempsTravailDate)) {
        res.status(400).send({
            message: "Ne pas mettre d'accent pour un nom de temps de travail."
        });
        return;
    } else if (regexSpace.test(req.body.tempsTravailDate)) {
        res.status(400).send({
            message: "Caractère interdit détecté dans temps de travail."
        });
        return;
    }

    const tempsTravailDate = req.body.date;
    var condition = tempsTravailDate ? {tempsTravailDate: {[Op.iLike]: `%${tempsTravailDate}%`}} : null;

    TempsTravail.findAll({
        attributes: ['tempsTravail_id','date','valeurHeure','valeurJour','utilisateurUtilisateurId'],
        where: condition}).then( data => {
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
    const tempsTravail_id = req.params.id;

    TempsTravail.update(req.body, {
        where: {tempsTravail_id: tempsTravail_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le temps de travail a correctement été mit à jour."})
        } else {
            res.status(400).send({message: "Le temps de travail n'a pas pu être mit à jour."})
        }
    })
    .catch( error => {
        res.status(500).send({
            message: error
        });
    });

};

/*exports.delete = (req,res) => {
    const tempsTravail_id = req.params.id;
    TempsTravail.destroy({
        where: {tempsTravail_id: tempsTravail_id}
    })
    .then(num => {
        console.log(num);
        if(num == 1) {
            res.send({message: "Le temps de travail a correctement été supprimé"})
        } else {
            res.status(400).send({message: "Le temps de travail n'a pas pu être supprimé."})
        }
    })
    .catch(error => {
        res.status(500).send({
            error
        });
    });

};

exports.deleteAll = (req,res) => {
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

