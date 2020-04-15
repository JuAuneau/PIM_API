module.exports = (sequelize, Sequelize) => {
    const CompteEpargneTemps = sequelize.define("compte_epargne_temps", {
        cet_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        solde: {
            type: Sequelize.REAL,
            allowNull: false,
        },
    });
    return CompteEpargneTemps;
};
/**
 * @swagger
 *  components:
 *    schemas:
 *      CET:
 *        type: object
 *        required:
 *          - solde
 *          - utilisateur_id
 *        properties:
 *          cet_id:
 *            type: integer
 *          solde:
 *            type: real
 *            description: Le nombre de jours épargnés.
 *          utilisateur_id:
 *            type: integer
 *            description: l'ID de l'utilisateur lié à ce compte épargne temps.
 *        example:
 *           cet_id: 1
 *           solde: 14
 *           utilisateur_id: 1
 */