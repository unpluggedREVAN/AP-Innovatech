import { Router } from "express";
import {editUser, getUser, infoAllUser, deleteUser} from '../controllers/users.controller.js'

const router = Router();

router.put('/editUser/:id', editUser); //Listo
router.get('/getUser/:id', getUser); //Listo
router.get('/infoAllUsers', infoAllUser) //Listo
router.delete('/deleteUser/:id', deleteUser); //Listo

export default router;