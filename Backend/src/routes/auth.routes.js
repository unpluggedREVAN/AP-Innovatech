import { Router } from "express";
import {register, login, logout} from '../controllers/auth.controller.js'

const router = Router();

router.post('/register', register) //Listo
router.post('/login', login) //Listo
router.post('/logout', logout)

export default router;