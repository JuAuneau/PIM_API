module.exports = app => {
    const cets = require('../controllers/cet.controller');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: CETs
 *   description: Gestion des Comptes Epargne Temps.
 */
/**
 * @swagger
 * path:
 *  /cets/:
 *    post:
 *      summary: Créer un nouveau cet.
 *      tags: [CETs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CET'
 *      responses:
 *        "200":
 *          description: Attribus d'un cet.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Créer un nouveau cet :
    router.post("/", cets.create);
/**
 * @swagger
 * path:
 *  /cets/:
 *    get:
 *      summary: Retourne tous les cets.
 *      tags: [CETs]
 *      responses:
 *        "200":
 *          description: Un tableau de données des cets.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "500":
 *          description: Aucun cet n'a été trouvé.
 */
    // Voir tous les cets déjà créés : 
    router.get("/", cets.findAll);
/**
 * @swagger
 * path:
 *  /cets/{cet_id}:
 *    get:
 *      summary: Retourne un cet via son ID.
 *      tags: [CETs]
 *      parameters:
 *        - in: path
 *          name: cet_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du cet
 *      responses:
 *        "200":
 *          description: Un cet et sa description.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "400":
 *          description: Impossible de trouver le cet spécifié avec l'ID {cet_id}.
 */
    // Recherche de cet par id :
    router.get("/:id", cets.findOneById);
 /**
 * @swagger
 * path:
 *  /cets/{cet_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un cet.
 *      tags: [CETs]
 *      parameters:
 *        - in: path
 *          name: cet_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du cet
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CET'
 *      responses:
 *        "201":
 *          description: Le cet a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Mettre à jour un cet :
    router.put("/:id", cets.update);
/**
 * swagger
 * path:
 *  /cets/{cet_id}:
 *    delete:
 *      summary: Supprimer un cet via son ID (route inactive).
 *      tags: [CETs]
 *      parameters:
 *        - in: path
 *          name: cet_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du cet.
 *      responses:
 *        "201":
 *          description: Le cet a bien été supprimé.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "400":
 *          description: le cet n'a pas pu être supprimé.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer un cet : 
    //router.delete("/:id", cets.delete);
/**
 * swagger
 * path:
 *  /cets/:
 *    delete:
 *      summary: Supprimer tous les cets (route inactive).
 *      tags: [CETs]
 *      responses:
 *        "201":
 *          description: Les (nombres) cets ont bien été supprimés.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CET'
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer tous les cets :
   // router.delete("/", cets.deleteAll);


    app.use('/api/cets', router);
}