var express = require('express');
var router = express.Router();
var YogeeMeasurementController = require('../controllers/YogeeMeasurementController.js');

/*
 * GET
 */
router.get('/', YogeeMeasurementController.list);

/*
 * GET
 */
router.get('/:id', YogeeMeasurementController.show);

/*
 * POST
 */
// router.post('/', YogeeMeasurementController.create);
router.post('/', YogeeMeasurementController.saveandupdatemeasurement);

router.post('/getusermeasurements',YogeeMeasurementController.getUsersMeasurement)
/*
 * PUT
 */
router.put('/:id', YogeeMeasurementController.update);

/*
 * DELETE
 */
router.delete('/:id', YogeeMeasurementController.remove);


module.exports = router;
