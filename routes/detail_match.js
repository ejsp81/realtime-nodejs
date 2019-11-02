const express = require('express');
const router = express.Router();

const detail_match_controller = require('../controllers/detail_match');


router.get('/test', detail_match_controller.test);

router.get('/get', detail_match_controller.get);

router.get('/:id', detail_match_controller.detail_match_details);

router.post('/create', detail_match_controller.createDetailMatch);

router.get('/getByTournamentResult/:tournament_result', detail_match_controller.getByTournamentResult);

router.put('/:id/update', detail_match_controller.detail_match_update);

router.delete('/:id/delete', detail_match_controller.detail_match_delete);

router.get('/admin/admin', function(req, res){
  res.render('event/adminEvent', { title: 'Detail Matchs' });
});

router.get('/admin/client', function(req, res){
  res.render('event/clientEvent', { title: 'Detail Matchs' });
});
module.exports = router;
