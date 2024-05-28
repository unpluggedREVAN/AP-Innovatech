import express from 'express'
import { authRoutes } from './routes/auth.routes.js'
import { projectRoutes } from './routes/proyectos.routes.js'
import { meetingRoutes } from './routes/reuniones.routes.js'
import { taskRoutes } from './routes/tareas.routes.js'
import { userRoutes } from './routes/users.routes.js'
import mongoose from 'mongoose'

const app = express();

//Configuracion de la app
app.use(express.json())

//Conexion a MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB', err));

//Rutas de la app
app.use('/Innovatech', authRoutes)
app.use('/Innovatech', projectRoutes)
app.use('/Innovatech', meetingRoutes)
app.use('/Innovatech', taskRoutes)
app.use('/Innovatech', userRoutes)

export default app;