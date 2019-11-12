const express = require('express');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Detail_match:
 *     properties:
 *       tournament_result:
 *         type: Tournament_result
 *       type_event:
 *         type: string
 *       player:
 *         type: Player
 *       time:
 *         type: integer
 *       isLocalEvent:
 *         type: boolean
 */
const detail_match_controller = require('../controllers/detail_match');

router.get('/test', detail_match_controller.test);

/**
 * @swagger
 * /detail_matchs/get:
 *   get:
 *     tags:
 *       - Detail_matchs
 *     description: Returns all Detail_matchs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Detail_matchs
 *         schema:
 *           $ref: '#/definitions/Detail_match'
 */
router.get('/get', detail_match_controller.get);

/**
 * @swagger
 * /detail_matchs/{id}:
 *   get:
 *     tags:
 *       - Detail_matchs
 *     description: Returns a single Detail_match
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Detail_match's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single player
 *         schema:
 *           $ref: '#/definitions/Detail_match'
 */
router.get('/:id', detail_match_controller.detail_match_details);

/**
 * @swagger
 * /detail_matchs/create:
 *   post:
 *     tags:
 *       - Detail_matchs
 *     description: Creates a new detail_match
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: detail_match
 *         description: Detail_match object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Detail_match'
 *     responses:
 *       200:
 *         description: Player created successfully
 */
router.post('/create', detail_match_controller.createDetailMatch);

/**
 * @swagger
 * /detail_matchs/getByTournamentResult/{id}:
 *   get:
 *     tags:
 *       - Detail_matchs
 *     description: Returns a single detail_matchs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Detail_matchs's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single detail_matchs
 *         schema:
 *           $ref: '#/definitions/Detail_match'
 */
router.get('/getByTournamentResult/:tournament_result', detail_match_controller.getByTournamentResult);

/**
 * @swagger
 * /detail_matchs/{id}/update:
 *   put:
 *     tags:
 *       - Detail_matchs
 *     description: Updates a single detail_match
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: detail_match
 *         description: Detail_match object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Detail_match'
 *     responses:
 *       200:
 *         description: Detail_match udpated.
 */
router.put('/:id/update', detail_match_controller.detail_match_update);

/**
 * @swagger
 * /detail_matchs/{id}/delete:
 *   delete:
 *     tags:
 *       - Detail_matchs
 *     description: Deletes a single detail_match
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Detail_match's id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted successfully!
 */
router.delete('/:id/delete', detail_match_controller.detail_match_delete);

router.get('/admin/admin', function(req, res){
  res.render('event/adminEvent', { title: 'Detail Matchs' });
});

router.get('/admin/client', function(req, res){
  res.render('event/clientEvent', { title: 'Detail Matchs' });
});
module.exports = router;
