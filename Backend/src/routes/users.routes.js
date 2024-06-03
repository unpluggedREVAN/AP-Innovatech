import { Router } from "express";
import {editUser, getUser, infoAllUser, deleteUser, userChangeStatus} from '../controllers/users.controller.js'

const router = Router();

router.put('/editUser/:id', editUser); //Listo
router.get('/getUser/:id', getUser); //Listo
router.get('/infoAllUsers/:id', infoAllUser) //Listo
router.delete('/deleteUser/:id', deleteUser); //Listo
router.post('/userChangeStatus/:id/:status', userChangeStatus) //Listo

export default router;