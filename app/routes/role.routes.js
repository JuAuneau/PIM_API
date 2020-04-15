module.exports = app => {
    const roles = require('../controllers/role.controller');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestion des rôles.
 */
/**
 * @swagger
 * path:
 *  /roles/:
 *    post:
 *      summary: Créer un nouveau rôle.
 *      tags: [Roles]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *        "200":
 *          description: Attribus d'un rôle.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Créer un nouveau rôle :
    router.post("/", roles.create);
/**
 * @swagger
 * path:
 *  /roles/:
 *    get:
 *      summary: Retourne tous les rôles.
 *      tags: [Roles]
 *      responses:
 *        "200":
 *          description: Un tableau de données des rôles.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "500":
 *          description: Aucun rôle n'a été trouvé.
 */
    // Voir tous les rôles déjà créés : 
    router.get("/", roles.findAll);
/**
 * @swagger
 * path:
 *  /roles/{role_id}:
 *    get:
 *      summary: Retourne un rôle via son ID.
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du rôle
 *      responses:
 *        "200":
 *          description: Un rôle et sa description.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "400":
 *          description: Impossible de trouver le rôle spécifié avec l'ID {role_id}.
 */
    // Recherche de rôle par id :
    router.get("/:id", roles.findOneById);
/**
 * @swagger
 * path:
 *  /roles/{role_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un rôle.
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du rôle
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Role'
 *      responses:
 *        "201":
 *          description: Le rôle a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Mettre à jour un rôle :
    router.put("/:id", roles.update);
/**
 * swagger
 * path:
 *  /roles/{role_id}:
 *    delete:
 *      summary: Supprimer un rôle via son ID (route inactive).
 *      tags: [Roles]
 *      parameters:
 *        - in: path
 *          name: role_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du rôle.
 *      responses:
 *        "201":
 *          description: Le rôle a bien été supprimé.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "400":
 *          description: le rôle n'a pas pu être supprimé.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer un rôle : 
    //router.delete("/:id", roles.delete);
/**
 * swagger
 * path:
 *  /roles/:
 *    delete:
 *      summary: Supprimer tous les rôles (route inactive).
 *      tags: [Roles]
 *      responses:
 *        "201":
 *          description: Les (nombres) rôles ont bien été supprimés.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer tous les rôles :
    //router.delete("/", roles.deleteAll);


    app.use('/api/roles', router);
}