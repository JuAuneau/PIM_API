module.exports = app => {
    const responsables = require('../controllers/responsable.controller');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Responsables
 *   description: Gestion des responsables.
 */
/**
 * @swagger
 * path:
 *  /responsables/:
 *    post:
 *      summary: Créer un nouveau responsable.
 *      tags: [Responsables]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Responsable'
 *      responses:
 *        "200":
 *          description: Attribus d'un responsable.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Créer un nouveau responsable :
    router.post("/", responsables.create);
/**
 * @swagger
 * path:
 *  /responsables/:
 *    get:
 *      summary: Retourne tous les responsables.
 *      tags: [Responsables]
 *      responses:
 *        "200":
 *          description: Un tableau de données des responsables.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "500":
 *          description: Aucun responsable n'a été trouvé.
 */
    // Voir tous les responsables déjà créés : 
    router.get("/", responsables.findAll);
/**
 * @swagger
 * path:
 *  /responsables/{responsable_id}:
 *    get:
 *      summary: Retourne un responsable via son ID.
 *      tags: [Responsables]
 *      parameters:
 *        - in: path
 *          name: responsable_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du responsable
 *      responses:
 *        "200":
 *          description: Un responsable et sa description.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "400":
 *          description: Impossible de trouver le responsable spécifié avec l'ID {responsable_id}.
 */
    // Recherche de responsable par id :
    router.get("/:id", responsables.findOneById);
/**
 * @swagger
 * path:
 *  /responsables/{responsable_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un responsable.
 *      tags: [Responsables]
 *      parameters:
 *        - in: path
 *          name: responsable_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du responsable
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Responsable'
 *      responses:
 *        "201":
 *          description: Le responsable a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Mettre à jour un responsable :
    router.put("/:id", responsables.update);
/**
 * swagger
 * path:
 *  /responsables/{responsable_id}:
 *    delete:
 *      summary: Supprimer un responsable via son ID (route inactive).
 *      tags: [Responsables]
 *      parameters:
 *        - in: path
 *          name: responsable_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du responsable.
 *      responses:
 *        "201":
 *          description: Le responsable a bien été supprimé.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "400":
 *          description: le responsable n'a pas pu être supprimé.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer un responsable : 
   // router.delete("/:id", responsables.delete);
/**
 * swagger
 * path:
 *  /responsables/:
 *    delete:
 *      summary: Supprimer tous les responsables (route inactive).
 *      tags: [Responsables]
 *      responses:
 *        "201":
 *          description: Les (nombres) responsables ont bien été supprimés.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Responsable'
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer tous les responsables :
    //router.delete("/", responsables.deleteAll);


    app.use('/api/responsables', router);
}