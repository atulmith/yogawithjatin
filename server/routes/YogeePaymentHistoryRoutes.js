var express = require('express');
var router = express.Router();
var YogeePaymentHistoryController = require('../controllers/YogeePaymentHistoryController.js');

/*
 * GET
 */
router.get('/', YogeePaymentHistoryController.list);

/*
 * GET
 */
router.get('/:id', YogeePaymentHistoryController.show);

/*
 * POST
 */
router.post('/', YogeePaymentHistoryController.create);

/*
 * PUT
 */
router.put('/:id', YogeePaymentHistoryController.update);

/*
 * DELETE
 */
router.delete('/:id', YogeePaymentHistoryController.remove);

module.exports = router;
