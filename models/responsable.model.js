module.exports = (sequelize, Sequelize) => {
    const Responsable = sequelize.define("responsable", {
        responsable_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prenom: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        }
    });
    return Responsable;
};