const mongoose = require('mongoose');
const { Schema } = mongoose;


const TareaSchema = new Schema({
  _id: Schema.Types.ObjectId,
  idProyecto: { type: Schema.Types.ObjectId, required: true },
  idColaborador: { type: Schema.Types.ObjectId, required: true },
  estado: { type: String, required: true, enum: ['En progreso', 'Completado', 'Pendiente'] },
  fecha: { type: Date, required: true },
  points: { type: Number, required: true }
});

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
