import {Router} from 'express'
import {createMeeting, infoMeeting, infoAllMeetings, editMeeting, deleteMeeting} from '../controllers/reuniones.controller.js'

const router = Router();

router.post('/createMeeting', createMeeting) //Listo
router.get('/infoMeeting/:id', infoMeeting) //Listo
router.get('/infoAllMeetings', infoAllMeetings) //Listo
router.put('/editMeeting/:id', editMeeting) //Listo
router.delete('/deleteMeeting/:id', deleteMeeting) //Listo

export default router;