import {Router} from 'express'

const router = Router();

router.post('/createPoject');
router.get('/getProject')
router.get('/getAllProjects')
router.put('/editProject')
router.delete('/deleteProject')

export default router;