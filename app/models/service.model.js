module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        service_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        service: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        }
    });
    return Service;
};