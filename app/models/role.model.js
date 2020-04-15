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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Role:
 *        type: object
 *        required:
 *          - role
 *          - description
 *        properties:
 *          role_id:
 *            type: integer
 *          role:
 *            type: string
 *            description: Le nom du rôle.
 *          description:
 *            type: string
 *            description: La description du rôle.
 *        example:
 *           role_id: 1
 *           role: Adminstrateur
 *           description: Le rôle administrateur de l'application.
 */