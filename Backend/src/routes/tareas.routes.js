import {Router} from 'express';
import {createTask, infoTask, infoAllTasks, editTask, deleteTask} from '../controllers/tareas.controller.js'

const router = Router();

router.post('/createTask', createTask) //Listo
router.get('/infoTask/:id', infoTask) //Listo
router.get('/infoAllTasks/:idProject', infoAllTasks)
router.put('/editTask/:id', editTask) //Listo
router.delete('/deleteTask/:id', deleteTask) //Listo

export default router;