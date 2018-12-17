import { Router } from 'express';
import * as StudentattendenceController from '../controllers/studentattendence.controller';

const router = new Router();

// Add a new Post
router.route('/takeattendence').post(StudentattendenceController.takeattendenceofYogee);


export default router;
