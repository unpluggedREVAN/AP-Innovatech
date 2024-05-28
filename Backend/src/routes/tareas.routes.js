import {Router} from 'express';

const router = Router();

router.post('/createTask')
router.get('/infoTask')
router.get('/infoAllTasks')
router.put('/editTask')
router.delete('/deleteTask')

export default router;