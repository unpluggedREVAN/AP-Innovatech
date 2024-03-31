const mongoose = require('mongoose');
const { Schema } = mongoose;


const TareaSchema = new Schema({
  nombreTarea: { type: String, required: true },
  idColaborador: { type: Schema.Types.ObjectId, required: true },
  estado: { type: String, required: true, enum: ['En progreso', 'Completado', 'Pendiente'] },
  fecha: { type: Date, required: true },
  points: { type: Number, required: true }
}, { collection: 'Tareas' });

const Tarea = mongoose.model('Tareas', TareaSchema);

module.exports = Tarea;
