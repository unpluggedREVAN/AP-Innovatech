const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({
    fecha: String,
    tema: String,
    medio: String,
    colaboradores: [String],
    proyecto: String
}, { collection: 'Reuniones' }); // Asegúrate de especificar el nombre correcto de la colección

const Reunion = mongoose.model('Reunion', reunionSchema);

module.exports = Reunion;
