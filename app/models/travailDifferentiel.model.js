module.exports = (sequelize, Sequelize) => {
    const travailDifferentiel = sequelize.define("travail_differentiel", {
        travail_diff_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        jour_supp: {
            type: Sequelize.REAL,
        },
        jour_moins: {
            type: Sequelize.REAL,
        },
        heure_supp: {
            type: Sequelize.REAL,
        },
        heure_moins: {
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