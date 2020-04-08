module.exports = app => {
    const cets = require('../controllers/cetUtilisateur.controller');

    var router = require("express").Router();

    // Voir tous les cets déjà créés : 
    router.get("/all", cets.findAll);
    // Recherche de cet par id utilisateur :
    router.get("/mail", cets.findOneByUserMail);
    // Mettre à jour un cet :
    router.put("/:id", cets.update);
    // Supprimer un cet : 
    router.delete("/:id", cets.delete);
    // Supprimer tous les cets :
    router.delete("/", cets.deleteAll);


    app.use('/api/cetUtilisateur', router);
}