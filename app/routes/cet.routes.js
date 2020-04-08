module.exports = app => {
    const roles = require('../controllers/cet.controller');

    var router = require("express").Router();

    // Créer un nouveau cet :
    router.post("/", roles.create);
    // Voir tous les cets déjà créés : 
    router.get("/", roles.findAll);
    // Recherche de cet par id :
    router.get("/:id", roles.findOneById);
    // Mettre à jour un cet :
    router.put("/:id", roles.update);
    // Supprimer un cet : 
    router.delete("/:id", roles.delete);
    // Supprimer tous les cets :
    router.delete("/", roles.deleteAll);


    app.use('/api/cets', router);
}