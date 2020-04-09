module.exports = (sequelize, Sequelize) => {
    const Conge = sequelize.define("conge", {
        conges_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date_debut: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        date_fin: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        jours_ouvres: {
            type: Sequelize.REAL,
        },
        demie_jam: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        demie_jpm: {
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