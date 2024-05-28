import { Router } from "express";

const router = Router();

router.put('/editUser');
router.get('/getUser');
router.get('/infoAllUsers')
router.delete('/deleteUser');

export const router;