import { Router } from "express";
import {createForo, editForo, infoAllForo, infoForo} from '../controllers/foros.controller.js'

const router = Router();

router.post('/createForo', createForo)
router.put('/editForo/:id', editForo)
router.get('/infoAllForos', infoAllForo)
router.get('/infoForo/:id', infoForo)

export default router;