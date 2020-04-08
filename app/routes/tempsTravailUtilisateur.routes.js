module.exports = app => {
    const tempsTravailUtilisateur = require('../controllers/tempsTravailUtilisateur.controller');

    var router = require("express").Router();


    // Trouver tous les utilisateurs de tous les services : 
    router.get("/", tempsTravailUtilisateur.findAll);
    // Trouver tous les utilisateurs d'un service :
    router.get("/:id", tempsTravailUtilisateur.findAllByUserId);


    app.use('/api/tempsTravail/users', router);
}