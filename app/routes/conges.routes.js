module.exports = app => {
    const conges = require("../controllers/conges.controller");
    var router = require("express").Router();

    router.post('/', conges.create);

    router.get('/', conges.findAll);

    router.put('/:id', conges.update);

    router.delete('/:id', conges.deleteOne);

    app.use("/api/conges", router);
};