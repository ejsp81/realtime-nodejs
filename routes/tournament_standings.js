const express = require('express');
const router = express.Router();

const tournament_standings_controller = require('../controllers/tournament_standings');

router.get('/test', tournament_standings_controller.test);

router.post('/create', tournament_standings_controller.createTournamentStanding);

router.get('/get', tournament_standings_controller.get);

router.get('/getByTeam/:id', tournament_standings_controller.getByTeam);

router.get('/:id', tournament_standings_controller.tournament_standings_details);

router.put('/:id/update', tournament_standings_controller.tournament_standings_update);

router.delete('/:id/delete', tournament_standings_controller.tournament_standings_delete);

router.put('/update/updateAll', tournament_standings_controller.updateAll);

router.get('/', function(req, res){
  res.render('tournamentStanding/index', { title: 'Tournament Standing' });
});

module.exports = router;
