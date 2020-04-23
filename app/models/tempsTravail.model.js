module.exports = (sequelize, Sequelize) => {
    const tempsTravail = sequelize.define("temps_travail", {
        temps_travail_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        valeur_jour: {
            type: Sequelize.REAL,
        },
        valeur_heure: {
            type: Sequelize.REAL,
        },
        previsionnel: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    });
    return tempsTravail;
};
/**
 * @swagger
 *  components:
 *    schemas:
 *      tempsTravail:
 *        type: object
 *        required:
 *          - date
 *          - utilisateur_id
 *        properties:
 *          temps_travail_id:
 *            type: integer
 *          date:
 *            type: string
 *            format: date
 *            description: La date du jour travaillé.
 *          valeur_jour:
 *            type: real
 *            description: La valeur si forfait jour, 1 0.5 ou 0
 *          valeur_heure:
 *            type: real
 *            description: La valeur des heures travaillées ce jour.
 *          previsionnel:
 *            type: boolean
 *            description: Défini si le temps de travail est prévisionnel ou réel, valeur par défaut = true.
 *          utilisateur_id:
 *            type: real
 *            description: L'ID de l'utilisateur lié à ce temps de travail.
 *        example:
 *           temps_travail_id: 1
 *           date: 02/01/2020
 *           valeur_jour: 1
 *           previsionnel: true
 *           utilisateur_id: 1
 *      tempsTravailArray:
 *        type: object
 *        properties:
 *          data:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                date:
 *                  type: string
 *                  format: date
 *                  description: La date du jour travaillé.
 *                valeur_jour:
 *                  type: real
 *                  description: La valeur si forfait jour, 1 0.5 ou 0
 *                valeur_heure:
 *                  type: real
 *                  description: La valeur des heures travaillées ce jour.
 *                previsionnel:
 *                  type: boolean
 *                  description: Défini si le temps de travail est prévisionnel ou réel, valeur par défaut = true.
 *                utilisateur_id:
 *                  type: real
 *                  description: L'ID de l'utilisateur lié à ce temps de travail.
 *              example:
 *                temps_travail_id: 1
 *                date: '2020-04-14'
 *                valeur_jour: 1
 *                previsionnel: true
 *                utilisateur_id: 4
 */