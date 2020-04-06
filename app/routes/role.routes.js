module.exports = app => {
    const roles = require('../controllers/role.controller');

    var router = require("express").Router();

    // Créer un nouveau rôle :
    router.post("/", roles.create);
    // Voir tous les rôles déjà créés : 
    router.get("/", roles.findAll);
    // Recherche de rôle par id :
    router.get("/:id", roles.findOneById);
    // Mettre à jour un rôle :
    router.put("/:id", roles.update);
    // Supprimer un rôle : 
    router.delete("/:id", roles.delete);
    // Supprimer tous les rôles :
    router.delete("/", roles.deleteAll);


    app.use('/api/roles', router);
}