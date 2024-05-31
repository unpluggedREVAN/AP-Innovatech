import {Router} from 'express'
import {createProject, getProject, getAllProjects, editProject, deleteProject} from '../controllers/proyectos.controller.js'

const router = Router();

router.post('/createProject', createProject); //Listo
router.get('/getProject/:id', getProject) //Listo
router.get('/getAllProjects', getAllProjects) //Listo
router.put('/editProject/:id', editProject) //Listo
router.delete('/deleteProject/:id', deleteProject) //Listo

export default router;