var express = require('express');
var router = express.Router();
var AdminUserController = require('../controllers/AdminUserController.js');

/*
 * GET
 */
router.get('/', AdminUserController.list);

/*
 * GET
 */
router.get('/:id', AdminUserController.show);

/*
 * POST
 */
router.post('/', AdminUserController.create);

/*
 * PUT
 */
router.put('/:id', AdminUserController.update);

/*
 * DELETE
 */
router.delete('/:id', AdminUserController.remove);

module.exports = router;
