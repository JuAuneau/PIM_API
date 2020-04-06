module.exports = app => {
    const roles = require('../controllers/responsable.controller');

    var router = require("express").Router();

    // Créer un nouveau responsable :
    router.post("/", roles.create);
    // Voir tous les responsables déjà créés : 
    router.get("/", roles.findAll);
    // Recherche de responsable par id :
    router.get("/:id", roles.findOneById);
    // Mettre à jour un responsable :
    router.put("/:id", roles.update);
    // Supprimer un responsable : 
    router.delete("/:id", roles.delete);
    // Supprimer tous les responsables :
    router.delete("/", roles.deleteAll);


    app.use('/api/responsables', router);
}