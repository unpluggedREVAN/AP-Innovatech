import {Router} from 'express'

const router = Router();

router.post('/createMeeting')
router.get('/infoMeeting')
router.get('/infoAllMeetings')
router.put('/editMeeting')
router.delete('/deleteMeeting')

export default router;