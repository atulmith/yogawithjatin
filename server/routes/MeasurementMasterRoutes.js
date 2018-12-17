var express = require('express');
var router = express.Router();
var MeasurementMasterController = require('../controllers/MeasurementMasterController.js');

/*
 * GET
 */
router.get('/', MeasurementMasterController.list);

/*
 * GET
 */
router.get('/:id', MeasurementMasterController.show);

/*
 * POST
 */
router.post('/', MeasurementMasterController.create);

/*
 * PUT
 */
router.put('/:id', MeasurementMasterController.update);

/*
 * DELETE
 */
router.delete('/:id', MeasurementMasterController.remove);

module.exports = router;
