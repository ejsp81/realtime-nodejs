const express = require('express');
const router = express.Router();

const event_controller = require('../controllers/events');


router.get('/test', event_controller.test);

router.post('/create', event_controller.createEvent);

router.get('/get', event_controller.get);

router.get('/:id', event_controller.event_details);

router.put('/:id/update', event_controller.event_update);

router.delete('/:id/delete', event_controller.event_delete);

router.put('/update/updateAll', event_controller.updateAll);

module.exports = router;
