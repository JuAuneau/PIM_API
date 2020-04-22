module.exports = (sequelize, Sequelize) => {
    const Conge = sequelize.define("conge", {
        conges_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date_debut: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        date_fin: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        jours_ouvres: {
            type: Sequelize.REAL,
        },
        demie_jam: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        demie_jpm: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        commentaire: {
            type: Sequelize.STRING,
            allowNull: false
        },
        validation: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        refus: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        motif: {
            type: Sequelize.STRING,
        }
    });
    return Conge;
};

/**
 * @swagger
 *  components:
 *    schemas:
 *      Congés:
 *        type: object
 *        properties:
 *          data:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                conges_id:
 *                  type: integer
 *                date_debut:
 *                  type: string
 *                  format: date
 *                  description: La date de début des congés.
 *                date_fin:
 *                  type: string
 *                  format: date
 *                  description: La date de fin des congés.
 *                jour_ouvres:
 *                  type: real
 *                demie_jam:
 *                  type: real
 *                  description: Si cp = demie journée du matin.
 *                demie_jpm:
 *                  type: real
 *                  description: Si cp = demie journée de l'après-midi.
 *                commentaire:
 *                  type: string
 *                  description: Commentaire de congés.
 *                validation:
 *                  type: boolean
 *                  description: Etat de validation des congés, valeur par défaut false.
 *                refus:
 *                  type: boolean
 *                  description: Si refusé, valeur défini à True.
 *                motif:
 *                  type: string
 *                  description: Motif du refus des congés.
 *                utilisateur_id:
 *                  type: real
 *                  description: L'ID de l'utilisateur lié à ce temps de travail.
 *              example:
 *                conges_id: 1
 *                date_debut: '2020-04-14'
 *                date_fin: '2020-04-24'
 *                jour_ouvres: 9
 *                demie_jam: false
 *                demie_jpm: false
 *                commentaire: Congés d'hiver.
 *                validation: true
 *                refus: false
 *                motif: null
 *                utilisateur_id: 4
 */