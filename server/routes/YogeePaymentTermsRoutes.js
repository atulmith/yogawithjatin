var express = require('express');
var router = express.Router();
var YogeePaymentTermsController = require('../controllers/YogeePaymentTermsController.js');

/*
 * GET
 */
router.get('/', YogeePaymentTermsController.list);

/*
 * GET
 */
router.get('/:id', YogeePaymentTermsController.show);

/*
 * POST
 */
router.post('/', YogeePaymentTermsController.create);

router.post('/createAndPaymenthistory',YogeePaymentTermsController.createAndPaymenthistory);
/*
 * PUT
 */
router.put('/:id', YogeePaymentTermsController.update);

/*
 * DELETE
 */
router.delete('/:id', YogeePaymentTermsController.remove);

module.exports = router;
