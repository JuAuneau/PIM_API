module.exports = app => {
    const tempsTravailDiff = require('../controllers/tempsTravailDiff.controller');

    var router = require("express").Router();
 /**
 * @swagger
 * tags:
 *   name: temps de travail différentiel
 *   description: Gestion des temps de travail différentiels, heures supplémentaires etc.
 */
/**
*  @swagger
*  path:
*    /travailDiffs/:
*      post:
*        summary: Créer un nouveau temps de travail différentiel.
*        tags: [temps de travail différentiel]
*        requestBody:
*          required: true
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/travailDifferentiel'
*        responses:
*          "200":
*            description: Attribus d'un temps de travail différentiel.
*            content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/travailDifferentiel'
*          "400":
*            description: Un message d'erreur lié à une mauvaise entrée utilisateur.
*/
    router.post("/", tempsTravailDiff.create);

/**
 * @swagger
 * path:
 *  /travailDiffs/:
 *    get:
 *      summary: Retourne tous les temps de travail différentiel.
 *      tags: [temps de travail différentiel]
 *      responses:
 *        "200":
 *          description: Un tableau de données des temps de travail différentiel.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travailDifferentiel'
 *        "500":
 *          description: Aucun temps de travail n'a été trouvé.
 */
    router.get("/", tempsTravailDiff.findAll);

/**
 * @swagger
 * path:
 *  /travailDiffs/{travail_diff_id}:
 *    put:
 *      summary: Mettre à jour un temps de travail différentiel.
 *      tags: [temps de travail différentiel]
 *      parameters:
 *        - in: path
 *          name: travail_diff_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id du temps de travail différentiel.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/travailDifferentiel'
 *      responses:
 *        "201":
 *          description: Le temps de travail différentiel a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/travailDifferentiel'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    router.put("/:id", tempsTravailDiff.update);

    app.use("/api/travailDiffs", router);
}