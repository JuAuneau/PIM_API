module.exports = app => {
    const tempsTravailUtilisateur = require('../controllers/tempsTravailUtilisateur.controller');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Temps de Travail par Utilisateur
 *   description: Gestion des Temps de travail.
 */
/**
 * @swagger
 * path:
 *  /tempsTravail/users/:
 *    get:
 *      summary: Retourne les utilisateurs et tous les temps de travail.
 *      tags: [Temps de Travail par Utilisateur]
 *      responses:
 *        "200":
 *          description: Un tableau de données des temps de travail par utilisateur.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tempsTravailUtilisateur'
 *        "500":
 *          description: Aucun temps de travail n'a été trouvé.
 */
    // Trouver tous les utilisateurs de tous les services : 
    router.get("/", tempsTravailUtilisateur.findAll);

/**
 * @swagger
 * path:
 *  /tempsTravail/users/{utilisateur_id}:
 *    get:
 *      summary: Retourne un service via son ID avec les utilisateurs de ce service.
 *      tags: [Temps de Travail par Utilisateur]
 *      parameters:
 *        - in: path
 *          name: utilisateur_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id de l'utilisateur.
 *      responses:
 *        "200":
 *          description: Un utilisateur et ses temps de travail.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tempsTravailUtilisateur'
 *        "400":
 *          description: Impossible de trouver le service spécifié avec l'ID {service_id}.
 */
    // Trouver tous les utilisateurs d'un service :
    router.get("/:id", tempsTravailUtilisateur.findAllByUserId);


    app.use('/api/tempsTravail/users', router);
}

/**
 * @swagger
 *  components:
 *    schemas:
 *      tempsTravailUtilisateur:
 *        type: object
 *        properties:
 *          nom:
 *            type: string
 *            example: Doe
 *          prenom:
 *            type: string
 *            example: John
 *          mail: 
 *            type: string
 *            example: john.doe@briace.org
 *          temps_travails:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                temps_travail_id:
 *                  type: integer
 *                  example: 5
 *                date:
 *                  type: string
 *                  format: date
 *                  example: '2020-04-01'
 *                valeur_jour:
 *                  type: real
 *                  example: 0.5
 *                valeur_heure:
 *                  type: real
 *                  example: 7
 *                utilisateur_id:
 *                  type: integer
 *                  example: 4
 */