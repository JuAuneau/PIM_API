module.exports = (sequelize, Sequelize) => {
    const CompteEpargneTemps = sequelize.define("compte_epargne_temps", {
        cet_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        solde: {
            type: Sequelize.REAL,
            allowNull: false,
        },
    });
    return CompteEpargneTemps;
};