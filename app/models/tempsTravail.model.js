module.exports = (sequelize, Sequelize) => {
    const tempsTravail = sequelize.define("temps_travail", {
        temps_travail_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        valeur_jour: {
            type: Sequelize.REAL,
        },
        valeur_heure: {
            type: Sequelize.REAL,
        }
    });
    return tempsTravail;
};