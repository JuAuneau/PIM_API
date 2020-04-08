module.exports = app => {
    const tempsTravail = require('../controllers/tempsTravail.controller');

    var router = require("express").Router();

    // Créer un nouveau utilisateur :
    router.post("/", tempsTravail.create);
    // Voir tous les tempsTravail déjà créés : 
    router.get("/", tempsTravail.findAll);
    // Recherche de utilisateur par id :
    //router.get("/:id", tempsTravail.findOneById);
    // Mettre à jour un utilisateur :
    router.put("/:id", tempsTravail.update);
    // Supprimer un utilisateur : 
    //router.delete("/:id", tempsTravail.delete);
    // Supprimer tous les tempsTravail :
    //router.delete("/", tempsTravail.deleteAll);


    app.use('/api/tempsTravails', router);
}