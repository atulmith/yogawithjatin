import { Router } from 'express';
import * as UserregisterController from '../controllers/userregister.controller';

const router = new Router();

// Get all Yogees
router.route('/yogeeslist').get(UserregisterController.getUserregisters);

// Get one Yogee by id
router.route('/yogeesbyid/:id').get(UserregisterController.getUserregister);

// Add a new Yogee
router.route('/yogeessave').post(UserregisterController.addUserregister);

// Delete a Yogee by id
router.route('/yogeesdelete/:id').delete(UserregisterController.deleteUserregister);


export default router;
