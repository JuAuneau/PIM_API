module.exports = app => {
    const cets = require('../controllers/cetUtilisateur.controller');
    
    
    var router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: CET par Utilisateur
 *   description: Gestion des Comptes Epargne Temps.
 */
/**
 * @swagger
 * path:
 *  /cetUtilisateur/:
 *    get:
 *      summary: Retourne un CET et son utilisateur.
 *      tags: [CET par Utilisateur]
 *      responses:
 *        "200":
 *          description: Un tableau de données des cets.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/cetUtilisateur'
 *        "500":
 *          description: Aucun cet n'a été trouvé.
 */
    // Voir tous les cets déjà créés : 
    router.get("/", cets.findAll);
/**
 * @swagger
 * path:
 *  /cetUtilisateur/{mail}:
 *    get:
 *      summary: Rechercher un cet via le mail de l'utilisateur.
 *      tags: [CET par Utilisateur]
 *      parameters:
 *        - in: path
 *          name: mail
 *          schema:
 *            type: string
 *          required: true
 *          description: le mail du user
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
    // Recherche de cet par id utilisateur :
    router.get("/:mail", cets.findOneByUserMail);
 

    app.use('/api/cetUtilisateur', router);
}
/**
 * @swagger
 *  components:
 *    schemas:
 *      cetUtilisateur:
 *        type: object
 *        properties:
 *          cet_id:
 *            type: integer
 *          solde:
 *            type: string
 *            description: Le nom du rôle.
 *          utilisateur:
 *            type: object
 *            properties:
 *              utilisateur_id:
 *                type: integer
 *              nom:
 *                type: string
 *              prenom:
 *                type: string
 *              mail:
 *                type: string
 *              actif:
 *                type: boolean
 *              role_id:
 *                type: integer
 *              responsable_id:
 *                type: integer
 *              service_id:
 *                type: integer
 *            description: La description de l'utilisateur lié au compte.
 *        example:
 *           cet_id: 1
 *           solde: 11
 *           utilisateur:
 *             properties:
 *               utilisateur_id: 4
 *               nom: Doe
 *               prenom: John
 *               mail: john.doe@briace.org
 *               actif: true
 *               role_id: 1
 *               responsable_id: null
 *               service_id: 1
 */