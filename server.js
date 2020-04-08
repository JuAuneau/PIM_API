const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models/connect");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/role.routes")(app);
require("./app/routes/responsable.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/utilisateur.routes")(app);
require("./app/routes/serviceUtilisateur.routes")(app);
require("./app/routes/tempsTravail.routes")(app);
require("./app/routes/tempsTravailUtilisateur.routes")(app);
require("./app/routes/cet.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
db.sequelize.sync({alter: true}).then(async ()=> {
  console.log("Base de données initialisée !")
}).then(
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}));
