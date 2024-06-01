import {Router} from 'express';
import {createTask, infoTask, editTask, deleteTask, infoTasksToDo, infoTasksProgress, infoTasksDone} from '../controllers/tareas.controller.js'

const router = Router();

router.post('/createTask', createTask) //Listo
router.get('/infoTask/:id', infoTask) //Listo
router.get('/infoTasksToDo/:idProject', infoTasksToDo) //Listo
router.get('/infoTasksProgress/:idProject', infoTasksProgress) //Listo
router.get('/infoTasksDone/:idProject', infoTasksDone) //Listo
router.put('/editTask/:id', editTask) //Listo
router.delete('/deleteTask/:id', deleteTask) //Listo

export default router;