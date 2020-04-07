module.exports = app => {
    const services = require('../controllers/serviceUtilisateur.controller');

    var router = require("express").Router();


    // Trouver tous les utilisateurs de tous les services : 
    router.get("/", services.findAll);
    // Trouver tous les utilisateurs d'un service :
    router.get("/:id", services.findAllByServiceId);


    app.use('/api/service/users', router);
}