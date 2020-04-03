module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        role_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Role;
};