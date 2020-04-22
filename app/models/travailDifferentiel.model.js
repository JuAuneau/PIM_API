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

/**
 * @swagger
 *  components:
 *    schemas:
 *      travailDifferentiel:
 *        type: object
 *        required:
 *          - date
 *          - commentaire
 *        properties:
 *          travail_diff_id:
 *            type: integer
 *          date:
 *            type: string
 *            format: date
 *            description: La date du jour où la différence de travail a été faite.
 *          jour_supp:
 *            type: real
 *          jour_moins:
 *            type: real
 *          heure_supp:
 *            type: real
 *          heure_moins:
 *            type: real
 *          commentaire:
 *            type: string
 *            description: Spécifie la raison de la différence de travail par l'utilisateur.
 *          validation:
 *            type: boolean
 *            description: Spécifie si la modification du temps de travail a été validé par un suppérieur ou non, defaut = false.
 *          utilisateur_id:
 *            type: integer
 *            description: Attribue un utilisateur au temps de travail différentiel.
 *        example:
 *           travail_diff_id: 1
 *           date: 02/01/2020
 *           jour_supp: 0.5
 *           jour_moins: null
 *           heure_supp: null
 *           heure_moins: null
 *           commentaire: Mise à jour d'un logiciel
 *           validation: false
 *           utilisateur_id: 2
 */