require("dotenv").config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB,process.env.USERNAME,process.env.PSWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT
});
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Appel des fichier modèles :
db.roles = require('./role.model')(sequelize,Sequelize);
db.responsables = require('./responsable.model')(sequelize,Sequelize);
db.utilisateurs = require('./utilisateur.model')(sequelize,Sequelize);
db.tempsTravails = require('./tempsTravail.model')(sequelize,Sequelize);
db.travailDifferentiels = require('./travailDifferentiel.model')(sequelize,Sequelize);
db.conges = require('./conges.model')(sequelize,Sequelize);
db.services = require('./service.model')(sequelize,Sequelize);
db.compteEpargneTemps = require('./cet.model')(sequelize,Sequelize);
db.contrat = require("./contrat.model")(sequelize,Sequelize);

// Relation entre table :
db.roles.hasMany(db.utilisateurs, {
    foreignKey: 'role_id'
});
db.utilisateurs.belongsTo(db.roles,{
    foreignKey: 'role_id'
});

db.utilisateurs.hasMany(db.contrat, {
    foreignKey: 'utilisateur_id'
});
db.contrat.belongsTo(db.utilisateurs, {
    foreignKey: 'utilisateur_id'
});

db.responsables.hasMany(db.utilisateurs, {
    foreignKey: 'responsable_id'
});
db.utilisateurs.belongsTo(db.responsables, {
    foreignKey: 'responsable_id'
});

db.utilisateurs.hasMany(db.tempsTravails, {
    foreignKey: 'utilisateur_id'
});
db.tempsTravails.belongsTo(db.utilisateurs, {
    foreignKey: 'utilisateur_id'
});

db.utilisateurs.hasMany(db.travailDifferentiels, {
    foreignKey: 'utilisateur_id'
});
db.travailDifferentiels.belongsTo(db.utilisateurs, {
    foreignKey: 'utilisateur_id'
});

db.utilisateurs.hasMany(db.conges, {
    foreignKey: 'utilisateur_id'
});
db.conges.belongsTo(db.utilisateurs, {
    foreignKey: 'utilisateur_id'
});

db.services.hasMany(db.utilisateurs,{
    foreignKey: 'service_id'
});
db.utilisateurs.belongsTo(db.services, {
    foreignKey: 'service_id'
});

db.utilisateurs.hasOne(db.compteEpargneTemps, {
    foreignKey: 'utilisateur_id'
});
db.compteEpargneTemps.belongsTo(db.utilisateurs, {
    foreignKey: 'utilisateur_id'
});

// Synchronisation des tables :
/*db.roles.sync({alter: true});
db.responsables.sync({alter: true});
db.utilisateurs.sync({alter: true});
db.tempsTravails.sync({alter: true});
db.travailDifferentiels.sync({alter: true});
db.conges.sync({alter: true});
db.services.sync({alter: true});
db.compteEpargneTemps.sync({alter: true});*/

module.exports = db;