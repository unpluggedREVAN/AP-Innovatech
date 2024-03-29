const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const reunionesRoutes = require('./routes/reunionesRoutes');
const colaboradoresRoutes = require('./routes/colaboradoresRoutes');
const registroLogin = require('./routes/registroLogin');
const cors = require('cors')

dotenv.config();
const app = express();

app.use(cors({origin : "exp://192.168.0.14:8082"}));
// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Uso de las rutas"
app.use('/reuniones', reunionesRoutes);
app.use('/colaboradores', colaboradoresRoutes);
app.use('/', registroLogin);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
