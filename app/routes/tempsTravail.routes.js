module.exports = app => {
    const tempsTravail = require('../controllers/tempsTravail.controller');

    var router = require("express").Router();

    /**
 * @swagger
 * tags:
 *   name: tempsTravails
 *   description: Gestion des tempsTravails.
 */
/**
*  @swagger
*  path:
*    /tempsTravails/:
*      post:
*        summary: Créer un nouveau temps de travail.
*        tags: [tempsTravails]
*        requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/arrayData'
*        responses:
*          "200":
*            description: Attribus d'un temps de travail.
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/tempsTravail'
*          "400":
*            description: Un message d'erreur lié à une mauvaise entrée utilisateur.
*/
    // Créer un nouveau utilisateur :
    router.post("/", tempsTravail.create);
/**
 * @swagger
 * path:
 *  /tempsTravails/:
 *    get:
 *      summary: Retourne tous les tempsTravails.
 *      tags: [tempsTravails]
 *      responses:
 *        "200":
 *          description: Un tableau de données des tempsTravails.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tempsTravail'
 *        "500":
 *          description: Aucun temps de travail n'a été trouvé.
 */
    // Voir tous les tempsTravail déjà créés : 
    router.get("/", tempsTravail.findAll);
/**
 * @swagger
 * path:
 *  /tempsTravails/{temps_travail_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un temps de travail.
 *      tags: [tempsTravails]
 *      parameters:
 *        - in: path
 *          name: temps_travail_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du temps de travail
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tempsTravail'
 *      responses:
 *        "201":
 *          description: Le temps de travail a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/tempsTravail'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Mettre à jour un temps de travail:
    router.put("/:id", tempsTravail.update);
    // Supprimer un utilisateur : 
    //router.delete("/:id", tempsTravail.delete);
    // Supprimer tous les tempsTravail :
    //router.delete("/", tempsTravail.deleteAll);


    app.use('/api/tempsTravails', router);
}