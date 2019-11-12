const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Player:
 *     properties:
 *       name:
 *         type: string
 *       team:
 *         type: Team
 */
const player_controller = require('../controllers/player');


router.get('/test', player_controller.test);

/**
 * @swagger
 * /players/get:
 *   get:
 *     tags:
 *       - Players
 *     description: Returns all players
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of players
 *         schema:
 *           $ref: '#/definitions/Player'
 */
router.get('/get', player_controller.get);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     tags:
 *       - Players
 *     description: Returns a single player
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Player's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single player
 *         schema:
 *           $ref: '#/definitions/Player'
 */
router.get('/:id', player_controller.player_details);

/**
 * @swagger
 * /players/getByTeam/{id}:
 *   get:
 *     tags:
 *       - Players
 *     description: Returns a single player
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Player's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single player
 *         schema:
 *           $ref: '#/definitions/Player'
 */
router.get('/getByTeam/:id', player_controller.getByTeam);

/**
 * @swagger
 * /players/create:
 *   post:
 *     tags:
 *       - Players
 *     description: Creates a new player
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: player
 *         description: Player object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Player'
 *     responses:
 *       200:
 *         description: Player created successfully
 */
router.post('/create', player_controller.createPlayer);

/**
 * @swagger
 * /players/{id}/update:
 *   put:
 *     tags:
 *       - Players
 *     description: Updates a single player
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: player
 *         description: Player object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Player'
 *     responses:
 *       200:
 *         description: Player udpated.
 */
router.put('/:id/update', player_controller.player_update);

/**
 * @swagger
 * /players/{id}/delete:
 *   delete:
 *     tags:
 *       - Players
 *     description: Deletes a single player
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Player's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted successfully!
 */
router.delete('/:id/delete', player_controller.player_delete);


module.exports = router;
