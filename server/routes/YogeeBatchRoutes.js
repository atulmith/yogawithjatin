var express = require('express');
var router = express.Router();
var YogeeBatchController = require('../controllers/YogeeBatchController.js');

/*
 * GET
 */
router.get('/', YogeeBatchController.list);

/*
 * GET
 */
router.get('/:id', YogeeBatchController.show);

/*
 * POST
 */
router.post('/', YogeeBatchController.create);

/*
 * PUT
 */
router.put('/:id', YogeeBatchController.update);

/*
 * DELETE
 */
router.delete('/:id', YogeeBatchController.remove);

module.exports = router;
