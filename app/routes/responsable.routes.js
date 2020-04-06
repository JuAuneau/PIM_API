module.exports = app => {
    const responsables = require('../controllers/responsable.controller');

    var router = require("express").Router();

    // Créer un nouveau responsable :
    router.post("/", responsables.create);
    // Voir tous les responsables déjà créés : 
    router.get("/", responsables.findAll);
    // Recherche de responsable par id :
    router.get("/:id", responsables.findOneById);
    // Mettre à jour un responsable :
    router.put("/:id", responsables.update);
    // Supprimer un responsable : 
    router.delete("/:id", responsables.delete);
    // Supprimer tous les responsables :
    router.delete("/", responsables.deleteAll);


    app.use('/api/responsables', router);
}