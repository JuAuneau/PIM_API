module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        utilisateur_id: {
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
        },
        actif: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });

    return Utilisateur;
};
/**
 * @swagger
 *  components:
 *    schemas:
 *      Utilisateur:
 *        type: object
 *        required:
 *          - nom
 *          - prenom
 *          - mail
 *        properties:
 *          utilisateur_id:
 *            type: integer
 *          nom:
 *            type: string
 *          prenom:
 *            type: string
 *          mail:
 *            type: string
 *            format: email
 *            description: E-mail de l'utilisateur, doit être unique.
 *          actif:
 *            type: boolean
 *            description: Spécifie si l'utilisateur peut se connecter à l'application ou non, valeur par défaut True.
 *          role_id:
 *            type: integer
 *            description: Spécifie le rôle attribué à l'utilisateur, admin, rh ou standard.
 *          responsable_id:
 *            type: integer
 *            description: Spécifie le responsable de l'utilisateur, pour validation congés et heures supp.
 *          service_id:
 *            type: integer
 *            description: Attribue un service à l'utilisateur.
 *        example:
 *           nom: Test
 *           prenom: Utilisateur
 *           mail: utilisateur.test@briace.org
 *           role_id: 1
 *           responsable_id: 1
 *           service_id: 1
 */
