module.exports = (sequelize, Sequelize) => {
    const CompteEpargneTemps = sequelize.define("CompteEpargneTemps", {
        cet_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        joursEpargnes: {
            type: Sequelize.REAL,
            allowNull: false,
        },
    });
    return CompteEpargneTemps;
};