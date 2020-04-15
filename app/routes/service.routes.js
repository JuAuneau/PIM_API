module.exports = app => {
    const services = require('../controllers/service.controller');

    var router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Gestion des services.
 */
/**
 * @swagger
 * path:
 *  /services/:
 *    post:
 *      summary: Créer un nouveau service.
 *      tags: [Services]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      responses:
 *        "200":
 *          description: Attribus d'un service.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Créer un nouveau service :
    router.post("/", services.create);
/**
 * @swagger
 * path:
 *  /services/:
 *    get:
 *      summary: Retourne tous les services.
 *      tags: [Services]
 *      responses:
 *        "200":
 *          description: Un tableau de données des services.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "500":
 *          description: Aucun service n'a été trouvé.
 */
    // Voir tous les services déjà créés : 
    router.get("/", services.findAll);
/**
 * @swagger
 * path:
 *  /services/{service_id}:
 *    get:
 *      summary: Retourne un service via son ID.
 *      tags: [Services]
 *      parameters:
 *        - in: path
 *          name: service_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du service
 *      responses:
 *        "200":
 *          description: Un service et sa description.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "400":
 *          description: Impossible de trouver le service spécifié avec l'ID {service_id}.
 */
    // Recherche de service par id :
    router.get("/:id", services.findOneById);
/**
 * @swagger
 * path:
 *  /services/{service_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un service.
 *      tags: [Services]
 *      parameters:
 *        - in: path
 *          name: service_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du service
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Service'
 *      responses:
 *        "201":
 *          description: Le service a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Mettre à jour un service :
    router.put("/:id", services.update);
/**
 * swagger
 * path:
 *  /services/{service_id}:
 *    delete:
 *      summary: Supprimer un service via son ID (route inactive).
 *      tags: [Services]
 *      parameters:
 *        - in: path
 *          name: service_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du service.
 *      responses:
 *        "201":
 *          description: Le service a bien été supprimé.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "400":
 *          description: le service n'a pas pu être supprimé.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer un service : 
    //router.delete("/:id", services.delete);
/**
 * swagger
 * path:
 *  /services/:
 *    delete:
 *      summary: Supprimer tous les services (route inactive).
 *      tags: [Services]
 *      responses:
 *        "201":
 *          description: Les (nombres) services ont bien été supprimés.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Service'
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer tous les services :
    //router.delete("/", services.deleteAll);



    app.use('/api/services', router);
}