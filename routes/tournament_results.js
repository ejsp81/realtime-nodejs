const express = require('express');
const router = express.Router();

const tournament_results_controller = require('../controllers/tournament_results');


router.get('/test', tournament_results_controller.test);

router.post('/create', tournament_results_controller.createTournamentResult);

router.get('/get', tournament_results_controller.get);

router.get('/getIsPlaying', tournament_results_controller.get_is_playing);

router.get('/:id', tournament_results_controller.tournament_result_details);

router.put('/:id/update', tournament_results_controller.tournament_result_update);

router.delete('/:id/delete', tournament_results_controller.tournament_result_delete);

router.put('/update/updateAll', tournament_results_controller.updateAll);

router.get('/', function(req, res){
  res.render('tournamentResult/index', { title: 'Tournament Result' });
});

module.exports = router;
