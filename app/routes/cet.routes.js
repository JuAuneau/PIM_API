module.exports = app => {
    const cets = require('../controllers/cet.controller');

    var router = require("express").Router();

    // Créer un nouveau cet :
    router.post("/", cets.create);
    // Voir tous les cets déjà créés : 
    router.get("/", cets.findAll);
    // Recherche de cet par id :
    router.get("/:id", cets.findOneById);
    // Mettre à jour un cet :
    router.put("/:id", cets.update);
    // Supprimer un cet : 
    router.delete("/:id", cets.delete);
    // Supprimer tous les cets :
    router.delete("/", cets.deleteAll);


    app.use('/api/cets', router);
}