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
    console.log(req.body.data);
    if (!req.body.data) {
        res.status(400).send({
            message : "Vous devez spécifier un tableau de donnée !"
        });
        return;
    };
    const tempsTravail = [];
    const tempsTravailErr = [];
    req.body.data.forEach(element => {

        if(!element.date){
            tempsTravailErr.push({message: "Vous n'avez pas spécifié de date !"},element)
        } else if (!element.valeur_heure && !element.valeur_jour)  {
            tempsTravailErr.push({message: "Vous n'avez pas spécifié de temps de travail !"},element)
        } else if (element.valeur_heure) {
            if (isNaN(element.valeur_heure)) {
                tempsTravailErr.push({message: "Veuillez entrer un temps de travail valide !"},element);
            } else {
                tempsTravail.push(element);
            }
        } else if (element.valeur_jour) {
            if (isNaN(element.valeur_jour)) {
                tempsTravailErr.push({message: "Veuillez entrer un temps de travail valide !"},element);
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
    if (regexMetaDate.test(req.body.date)) {
        res.status(400).send({
            message: "Caractère interdit détecté."
        });
        return;
    } else if (regexStringAccent.test(req.body.date)) {
        res.status(400).send({
            message: "Ne pas mettre d'accent pour un nom de temps de travail."
        });
        return;
    } else if (regexSpace.test(req.body.date)) {
        res.status(400).send({
            message: "Caractère interdit détecté dans temps de travail."
        });
        return;
    }

    const tempsTravailDate = req.body.date;
    var condition = tempsTravailDate ? {date: {[Op.iLike]: `%${tempsTravailDate}%`}} : null;

    TempsTravail.findAll()
    .then( data => {
            if (!data[0]) {
                res.status(500).send({ message: "Aucun temps de travail n'a été trouvé."})
            } else {
                res.send(data);
            };

    })
    .catch( error => {
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
        where: {temps_travail_id: tempsTravail_id}
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

