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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Service:
 *        type: object
 *        required:
 *          - Service
 *        properties:
 *          service_id:
 *            type: integer
 *          service:
 *            type: string
 *            description: Le nom du service.
 *        example:
 *           service_id: 1
 *           service: Service Informatique
 */