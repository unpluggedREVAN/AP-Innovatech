import express from 'express'
import { authRoutes } from './routes/auth.routes.js'
import { projectRoutes } from './routes/proyectos.routes.js'
import { meetingRoutes } from './routes/reuniones.routes.js'
import { taskRoutes } from './routes/tareas.routes.js'
import { userRoutes } from './routes/users.routes.js'

const app = express();

//Configuracion de la app
app.use(express.json())

//Rutas de la app
app.use('/Innovatech', authRoutes)
app.use('/Innovatech', projectRoutes)
app.use('/Innovatech', meetingRoutes)
app.use('/Innovatech', taskRoutes)
app.use('/Innovatech', userRoutes)

export default app;