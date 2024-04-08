const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  fecha: String,
  tema: String,
  medio: String,
  colaboradores: [Schema.Types.ObjectId],
  proyecto: Schema.Types.ObjectId,
}, { collection: 'Reuniones' }); // Asegúrate de especificar el nombre correcto de la colección

const Reunion = mongoose.model('Reunion', reunionSchema);

module.exports = Reunion;
