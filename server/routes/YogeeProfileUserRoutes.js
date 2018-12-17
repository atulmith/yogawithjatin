var express = require('express');
var router = express.Router();
var YogeeProfileUserController = require('../controllers/YogeeProfileUserController.js');

/*
 * GET
 */
router.get('/', YogeeProfileUserController.list);

/*
 * GET
 */
router.get('/:id', YogeeProfileUserController.show);

/*
 * POST
 */
router.post('/', YogeeProfileUserController.create);

/*
 * PUT
 */
router.put('/:id', YogeeProfileUserController.update);

/*
 * DELETE
 */
router.delete('/:id', YogeeProfileUserController.remove);

/*
 * POST Yogee Login 
 */
router.post('/yogeelogin', YogeeProfileUserController.yogeelogin);


module.exports = router;
