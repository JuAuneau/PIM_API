module.exports = app => {
    const roles = require('../controllers/role.controller');

    var router = require("express").Router();

    // Créer un nouveau rôle :
    router.post("/", roles.create);
    // Voir tous les rôles déjà créés : 
    router.get("/", roles.findAll);



    app.use('/api/roles', router);
}