module.exports = app => {
    const cets = require('../controllers/cetUtilisateur.controller');

    var router = require("express").Router();

    // Voir tous les cets déjà créés : 
    router.get("/all", cets.findAll);
    // Recherche de cet par id utilisateur :
    router.get("/mail", cets.findOneByUserMail);
 

    app.use('/api/cetUtilisateur', router);
}