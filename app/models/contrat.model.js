module.exports = (sequelize,Sequelize) => {
    const contrat = sequelize.define("contrat", {
        contrat_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        annee: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        forfait_heure: {
            type: Sequelize.REAL
        },
        forfait_jour: {
            type: Sequelize.REAL
        },
        poste: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quota_cp: {
            type: Sequelize.REAL,
            allowNull: false
        },
        cpn: {
            type: Sequelize.REAL,
            allowNull: false,
            defaultValue: 0
        }
    });
    return contrat;
};

/**
 * @swagger
 *  components:
 *    schemas:
 *      Contrat:
 *        type: object
 *        required:
 *          - annee
 *          - poste
 *          - quota_cp
 *        properties:
 *          contrat_id:
 *            type: integer
 *          annee:
 *            type: real
 *          forfait_heure:
 *            type: real
 *          forfait_jour:
 *            type: real
 *          poste:
 *            type: string
 *            description: Spécifie le poste occupé par l'utilisateur.
 *          quota_cp:
 *            type: real
 *            description: Spécifie le nombre de congés payés que l'utilisateur a le droit de poser dans l'année.
 *          cpn:
 *            type: real
 *            description: Spécifie le congés payés de l'année n-1, valeur par défaut = 0.
 *          utilisateur_id:
 *            type: integer
 *            description: Attribue un utilisateur au contrat.
 *        example:
 *           contrat_id: 1
 *           annee: 2020
 *           forfait_heure: 1565
 *           forfait_jour: null
 *           poste: assistante administrative
 *           quota_cp: 36
 *           cpn: 0
 *           utilisateur_id: 14
 */