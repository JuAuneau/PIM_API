module.exports = app => {
    const services = require('../controllers/serviceUtilisateur.controller');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Service par Utilisateur
 *   description: Gestion des Comptes Epargne Temps.
 */
/**
 * @swagger
 * path:
 *  /service/users/:
 *    get:
 *      summary: Retourne tous les services et ses utilisateurs.
 *      tags: [Service par Utilisateur]
 *      responses:
 *        "200":
 *          description: Un tableau de données des cets.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serviceUtilisateur'
 *        "500":
 *          description: Aucun cet n'a été trouvé.
 */
    // Trouver tous les utilisateurs de tous les services : 
    router.get("/", services.findAll);

/**
 * @swagger
 * path:
 *  /service/users/{service_id}:
 *    get:
 *      summary: Retourne un service via son ID avec les utilisateurs de ce service.
 *      tags: [Service par Utilisateur]
 *      parameters:
 *        - in: path
 *          name: service_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du service.
 *      responses:
 *        "200":
 *          description: Un service et ses utilisateurs.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/serviceUtilisateur'
 *        "400":
 *          description: Impossible de trouver le service spécifié avec l'ID {service_id}.
 */
    // Trouver tous les utilisateurs d'un service :
    router.get("/:id", services.findAllByServiceId);


    app.use('/api/service/users', router);
}
/**
 * @swagger
 *  components:
 *    schemas:
 *      serviceUtilisateur:
 *        type: object
 *        properties:
 *          service_id:
 *            type: integer
 *            example: 1
 *          service:
 *            type: string
 *            description: Le nom du service.
 *            example: Service Informatique
 *          utilisateur:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                utilisateur_id:
 *                  type: integer
 *                  example: 1
 *                nom:
 *                  type: string
 *                  example: Doe
 *                prenom:
 *                  type: string
 *                  example: John
 *                mail:
 *                  type: string
 *                  example: john.doe@briace.org
 *                actif:
 *                  type: boolean
 *                  example: true
 *                role_id:
 *                  type: integer
 *                  example: 1
 *                responsable_id:
 *                  type: integer
 *                  example: 1
 *                service_id:
 *                  type: integer
 *                  example: 1
 */