module.exports = (sequelize, Sequelize) => {
    const Conge = sequelize.define("conge", {
        conges_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dateDebut: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        dateFin: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        joursOuvres: {
            type: Sequelize.REAL,
        },
        demieJAM: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        demieJPM: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        commentaire: {
            type: Sequelize.STRING,
            allowNull: false
        },
        validation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    return Conge;
};