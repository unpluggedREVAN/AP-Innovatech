import { Router } from "express";
import { createMessage } from '../controllers/mensajes.controller.js'

const router = Router();

router.post('/createMessage', createMessage)

export default router