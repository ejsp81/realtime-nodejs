const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Tournament_result:
 *     properties:
 *       local_team:
 *         type: Team
 *       visitor_team:
 *         type: Team
 *       local_goals:
 *         type: integer
 *       visitor_goals:
 *         type: integer
 *       is_playing:
 *         type: boolean
 *       current_time:
 *         type: integer
 */
const tournament_results_controller = require('../controllers/tournament_results');

router.get('/test', tournament_results_controller.test);

/**
 * @swagger
 * /tournament_results/create:
 *   post:
 *     tags:
 *       - Tournament_results
 *     description: Creates a new tournament_result
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournament_result
 *         description: Tournament_result object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tournament_result'
 *     responses:
 *       200:
 *         description: Tournament_result created successfully
 */
router.post('/create', tournament_results_controller.createTournamentResult);

/**
 * @swagger
 * /tournament_results/get:
 *   get:
 *     tags:
 *       - Tournament_results
 *     description: Returns all Tournament_results
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Tournament_result
 *         schema:
 *           $ref: '#/definitions/Tournament_result'
 */
router.get('/get', tournament_results_controller.get);

/**
 * @swagger
 * /tournament_results/getIsPlaying/{is_playing}:
 *   get:
 *     tags:
 *       - Tournament_results
 *     description: Returns matches that are playing
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: is_playing
 *         description: true or false
 *         in: path
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: A single tournament_result
 *         schema:
 *           $ref: '#/definitions/Tournament_result'
 */
router.get('/getIsPlaying/:is_playing', tournament_results_controller.get_is_playing);

/**
 * @swagger
 * /tournament_results/{id}:
 *   get:
 *     tags:
 *       - Tournament_results
 *     description: Returns a single Tournament_result
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tournament_result's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single tournament_result
 *         schema:
 *           $ref: '#/definitions/Tournament_result'
 */
router.get('/:id', tournament_results_controller.tournament_result_details);

/**
 * @swagger
 * /tournament_results/{id}/update:
 *   put:
 *     tags:
 *       - Tournament_results
 *     description: Updates a single tournament_result
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: tournament_result
 *         description: Tournament_result object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Tournament_result'
 *     responses:
 *       200:
 *         description: Tournament_result udpated.
 */
router.put('/:id/update', tournament_results_controller.tournament_result_update);

/**
 * @swagger
 * /tournament_results/{id}/delete:
 *   delete:
 *     tags:
 *       - Tournament_results
 *     description: Deletes a single dournament_result
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Tournament_result's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted successfully!
 */
router.delete('/:id/delete', tournament_results_controller.tournament_result_delete);

router.put('/update/updateAll', tournament_results_controller.updateAll);

router.get('/', function(req, res){
  res.render('tournamentResult/index', { title: 'Tournament Result' });
});

module.exports = router;
