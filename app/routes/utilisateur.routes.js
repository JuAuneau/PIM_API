"use strict";
module.exports = app => {

    const utilisateurs = require('../controllers/utilisateur.controller');
    const Utilisateurs = require('../models/utilisateur.model');

    var router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs.
 */
/**
 * @swagger
 * path:
 *  /utilisateurs/:
 *    post:
 *      summary: Créer un nouvel utilisateur
 *      tags: [Utilisateurs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Utilisateur'
 *      responses:
 *        "200":
 *          description: Attribus d'un utilisateur.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Créer un nouveau utilisateur :
    router.post("/", utilisateurs.create);
/**
 * @swagger
 * path:
 *  /utilisateurs/:
 *    get:
 *      summary: Retourne tous les utilisateurs.
 *      tags: [Utilisateurs]
 *      responses:
 *        "200":
 *          description: Un tableau de données utilisateurs.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "500":
 *          description: Aucun utilisateur n'a été trouvé.
 */
    // Voir tous les utilisateurs déjà créés : 
    router.get("/", utilisateurs.findAll);
/**
 * @swagger
 * path:
 *  /utilisateurs/{user_id}:
 *    get:
 *      summary: Mettre à jour un ou plusieurs attribus d'un urilisateur.
 *      tags: [Utilisateurs]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id de l'utilisateur
 *      responses:
 *        "200":
 *          description: Un utilisateur et ses attribus.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "400":
 *          description: Impossible de trouver le utilisateur spécifié avec l'ID {user_id}.
 */
    // Recherche de utilisateur par id :
    router.get("/:id", utilisateurs.findOneById);
/**
 * @swagger
 * path:
 *  /utilisateurs/{user_id}:
 *    put:
 *      summary: Mettre à jour un ou plusieurs attribus d'un utilisateur via son ID.
 *      tags: [Utilisateurs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Utilisateur'
 *      responses:
 *        "201":
 *          description: L'utilisateur a bien été mit à jour.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "400":
 *          description: Un message d'erreur lié à une mauvaise entrée utilisateur.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */    
    // Mettre à jour un utilisateur :
    router.put("/:id", utilisateurs.update);
/**
 * swagger
 * path:
 *  /utilisateurs/{user_id}:
 *    delete:
 *      summary: Supprimer un utilisateur via son ID.
 *      tags: [Utilisateurs]
 *      parameters:
 *        - in: path
 *          name: user_id
 *          schema:
 *            type: integer
 *          required: true
 *          description: l'id de l'utilisateur
 *      responses:
 *        "201":
 *          description: L'utilisateur a bien été supprimé.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "400":
 *          description: l'utilisateur n'a pas pu être supprimé.
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer un utilisateur : 
   // router.delete("/:id", utilisateurs.delete);
/**
 * swagger
 * path:
 *  /utilisateurs/:
 *    delete:
 *      summary: Supprimer tous les utilisateurs.
 *      tags: [Utilisateurs]
 *      responses:
 *        "201":
 *          description: Les (nombres) utilisateurs ont bien été supprimés.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Utilisateur'
 *        "500":
 *          description: un message d'erreur lié à une erreur en base de données.
 */
    // Supprimer tous les utilisateurs :
    //router.delete("/", utilisateurs.deleteAll);


    app.use('/api/utilisateurs', router);
}