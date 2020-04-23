module.exports = app => {

    const swaggerJsdoc = require("swagger-jsdoc");
    const swaggerUi = require("swagger-ui-express");
    var router = require("express").Router();

    var session = require('express-session');
    var Keycloak = require('keycloak-connect');

    var memoryStore = new session.MemoryStore();
    var keycloak = new Keycloak({ store: memoryStore });
    
    
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
              url: "http://localhost:3000/api"
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
        "./app/routes/cetUtilisateur.routes.js",
        "./app/routes/serviceUtilisateur.routes.js",
        "./app/routes/tempsTravailUtilisateur.routes.js",
        "./app/models/contrat.model.js",
        "./app/models/travailDifferentiel.model.js",
        "./app/models/conges.model.js",
        "./app/routes/tempsTravailDiff.routes.js"
    ]
      };
      const specs = swaggerJsdoc(options);
      router.use("/", swaggerUi.serve);
      router.get(
        "/docs", 
        swaggerUi.setup(specs, {
          explorer: false
        }), 
      );
      
      app.use('/api',router);
      
}
