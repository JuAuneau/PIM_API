module.exports = app => {

    const Utilisateur = require("../models/utilisateur.model");
    const swaggerJsdoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");
    var router = require("express").Router();

    // Swagger set up
    const options = {
        swaggerDefinition: {
          openapi: "3.0.0",
          info: {
            title: "Time to document that Express API you built",
            version: "1.0.0",
            description:
              "A test project to understand how easy it is to document and Express API",
            contact: {
              name: "Briacé",
              url: "https://briace.org",
            }
          },
          servers: [
            {
              url: "http://localhost:8080/api"
            }
          ]
        },
        apis: ["./app/models/utilisateur.model.js",
        "./app/routes/utilisateur.routes.js",
        "./app/models/role.model.js",
        "./app/routes/role.routes.js",
        "./app/models/service.model.js",
        "./app/routes/service.routes.js",
        "./app/models/responsable.model.js",
        "./app/routes/responsable.routes.js",
        "./app/models/cet.model.js",
        "./app/routes/cet.routes.js",
        "./app/models/tempsTravail.model.js",
        "./app/routes/tempsTravail.routes.js",
        "./app/routes/cetUtilisateur.routes.js"
    ]
      };
      const specs = swaggerJsdoc(options);
      router.use("/", swaggerUi.serve);
      router.get(
        "/",
        swaggerUi.setup(specs, {
          explorer: false
        })
      );
      app.use('/api/docs', router);
}
