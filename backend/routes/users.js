import express from 'express';
const router = express.Router();

import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        name:
 *          type: string
 *        age:
 *          type: integer
 *      example:
 *        name: Pepe
 *        age: 22
 */

router.get('/users/', getUsers);
/**
* @swagger
* /users:
*  get:
*   summary: Retorna todo los usuarios
*   tags: [User]
*   responses:
*     200:
*       description: array con todos los usuarios
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/User'
*   responses:
*     200:
*       description : array con todos los usuarios
*/
router.get('/users/:id', getUserById);
/**
* @swagger
* /users/{id}:
*  post:
*   summary: retorna un usuario
*   tags: [User]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/User'
*   responses:
*     200:
*       description: usuario por id
*       content:
*          application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/User'
*     500:
*       description: Error al intentar eliminar un registro de la tabla de usuarios
*/

router.post('/users/', createUser);
/**
* @swagger
* /users:
*  post:
*   summary: create a new user
*   tags: [User]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/User'
*   responses:
*     200:
*       description: new user created
*/
router.put('/users/:id', updateUser);
/**
* @swagger
* /users/{id}:
*  delete:
*   summary: Actualizar usuario
*   tags: [usuario]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: number
*       required: true
*       description: Id usuario
*   responses:
*     200:
*       description: Actualizado
*     404: 
*       description: usuario no encontrado
*     500:
*       description: Error al intentar actualizar un registro de la tabla de usuarios
*/

router.delete('/users/:id', deleteUser);
/**
* @swagger
* /users/{id}:
*  delete:
*   summary: Eliminar usuario
*   tags: [usuario]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: number
*       required: true
*       description: Id usuario
*   responses:
*     200:
*       description: Eliminado
*     404: 
*       description: usuario no encontrado
*     500:
*       description: Error al intentar eliminar un registro de la tabla de usuarios
*/

export default router;