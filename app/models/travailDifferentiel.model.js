module.exports = (sequelize, Sequelize) => {
    const travailDifferentiel = sequelize.define("travail_differentiel", {
        travailDiff_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        jourSupp: {
            type: Sequelize.REAL,
        },
        jourMoins: {
            type: Sequelize.REAL,
        },
        heureSupp: {
            type: Sequelize.REAL,
        },
        heureMoins: {
            type: Sequelize.REAL,
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
    return travailDifferentiel;
};