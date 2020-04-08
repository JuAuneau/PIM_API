module.exports = (sequelize, Sequelize) => {
    const tempsTravail = sequelize.define("temps_travail", {
        tempsTravail_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        valeurJour: {
            type: Sequelize.REAL,
        },
        valeurHeure: {
            type: Sequelize.REAL,
        }
    });
    return tempsTravail;
};