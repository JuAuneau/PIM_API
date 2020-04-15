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
/**
 * @swagger
 *  components:
 *    schemas:
 *      Responsable:
 *        type: object
 *        required:
 *          - nom
 *          - prenom
 *          - mail
 *        properties:
 *          responsable_id:
 *            type: integer
 *          nom:
 *            type: string
 *          prenom:
 *            type: string
 *          mail:
 *            type: string
 *            format: email
 *        example:
 *           responsable_id: 1
 *           nom: Doe
 *           prenom: John
 *           mail: john.doe@briace.org
 */