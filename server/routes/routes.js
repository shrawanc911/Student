import express from 'express'
import { getAttendence } from '../controllers/controller.js';
import {getResult,getAvailableResult} from '../controllers/resultController.js';

const router = express.Router()

router.post("/:id",getAttendence);
router.get("/result/:enrollment",getResult);
router.get("/availableResult",getAvailableResult)

export default router;