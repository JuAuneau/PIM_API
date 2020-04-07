module.exports = app => {
    const services = require('../controllers/service.controller');

    var router = require("express").Router();

    // Créer un nouveau service :
    router.post("/", services.create);
    // Voir tous les services déjà créés : 
    router.get("/", services.findAll);
    // Recherche de service par id :
    router.get("/:id", services.findOneById);
    // Mettre à jour un service :
    router.put("/:id", services.update);
    // Supprimer un service : 
    router.delete("/:id", services.delete);
    // Supprimer tous les services :
    router.delete("/", services.deleteAll);



    app.use('/api/services', router);
}