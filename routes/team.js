const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Team:
 *     properties:
 *       name:
 *         type: string
 *       shield:
 *         type: string
 */
const team_controller = require('../controllers/teams');


router.get('/test', team_controller.test);

/**
 * @swagger
 * /teams/get:
 *   get:
 *     tags:
 *       - Teams
 *     description: Returns all teams
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of teams
 *         schema:
 *           $ref: '#/definitions/Team'
 */
router.get('/get', team_controller.get);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     description: Returns a single team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Team's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single team
 *         schema:
 *           $ref: '#/definitions/Team'
 */
router.get('/:id', team_controller.team_details);

/**
 * @swagger
 * /teams/create:
 *   post:
 *     tags:
 *       - Teams
 *     description: Creates a new team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: team
 *         description: Team object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Team'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/create', team_controller.createTeam);

/**
 * @swagger
 * /teams/{id}/update:
 *   put:
 *     tags:
 *       - Teams
 *     description: Updates a single team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: team
 *         description: Team object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Team'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/:id/update', team_controller.team_update);

/**
 * @swagger
 * /teams/{id}/delete:
 *   delete:
 *     tags:
 *       - Teams
 *     description: Deletes a single team
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Team's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/:id/delete', team_controller.team_delete);


router.get('/', function(req, res){
  res.render('team/index', { title: 'Equipos' });
});

module.exports = router;
