import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import projectRoutes from './routes/proyectos.routes.js'
import meetingRoutes from './routes/reuniones.routes.js'
import taskRoutes from './routes/tareas.routes.js'
import userRoutes from './routes/users.routes.js'
import mongoose from 'mongoose'

const app = express();

//Configuracion de la app
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))

//Conexion a MongoDB
mongoose.connect("mongodb+srv://Drio:Kzds1234@cluster0.oko7jhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB', err));

//Rutas de la app
app.use('/Innovatech', authRoutes)
app.use('/Innovatech', projectRoutes)
app.use('/Innovatech', meetingRoutes)
app.use('/Innovatech', taskRoutes)
app.use('/Innovatech', userRoutes)

export default app;