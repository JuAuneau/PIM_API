module.exports = app => {
    const utilisateurs = require('../controllers/utilisateur.controller');

    var router = require("express").Router();

    // Créer un nouveau utilisateur :
    router.post("/", utilisateurs.create);
    // Voir tous les utilisateurs déjà créés : 
    router.get("/", utilisateurs.findAll);
    // Recherche de utilisateur par id :
    router.get("/:id", utilisateurs.findOneById);
    // Mettre à jour un utilisateur :
    router.put("/:id", utilisateurs.update);
    // Supprimer un utilisateur : 
    router.delete("/:id", utilisateurs.delete);
    // Supprimer tous les utilisateurs :
    router.delete("/", utilisateurs.deleteAll);


    app.use('/api/utilisateurs', router);
}