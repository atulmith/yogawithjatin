import { Router } from 'express';
import * as StudentbatchdetailsController from '../controllers/studentbatchdetails.controller';

const router = new Router();
// Get all Yogees
// router.route('/yogeeslist').get(UserregisterController.getUserregisters);

// Get one Yogee by id
// router.route('/yogeesbyid/:id').get(UserregisterController.getUserregister);

// Add a new Yogee
router.route('/batchsave').post(StudentbatchdetailsController.addStudentbatchdetails);

// Delete a Yogee by id
// router.route('/yogeesdelete/:id').delete(UserregisterController.deleteUserregister);


export default router;
