require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/connect");
const morgan = require("morgan");
const app = express();
const swagger = require("swagger-ui-dist").absolutePath();
var session = require('express-session');
var Keycloak = require('keycloak-connect');

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });



var whiteList = ['http://127.0.0.1:51437','http://localhost:8081','http://localhost:8080','http://127.0.0.1:8081','http://127.0.0.1:8080'];
var corsOptions = {
  origin: "*"/*function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }*/
}


app.use(cors(corsOptions));
app.use(morgan('dev'));

const http = require("http");
//const routes = require('./app/routes')

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
//app.usee("/", routes);
require("./app/routes/role.routes")(app);
require("./app/routes/responsable.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/utilisateur.routes")(app);
require("./app/routes/serviceUtilisateur.routes")(app);
require("./app/routes/tempsTravail.routes")(app);
require("./app/routes/tempsTravailUtilisateur.routes")(app);
require("./app/routes/cet.routes")(app);
require("./app/routes/cetUtilisateur.routes")(app);
require("./app/routes/tempsTravailDiff.routes")(app);
require("./app/routes/conges.routes")(app);
require("./app/routes/docs.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync({}).then(async ()=> {
  console.log("Base de données initialisée !")
}).then(
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}));
