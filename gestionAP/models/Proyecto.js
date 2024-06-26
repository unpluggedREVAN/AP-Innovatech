const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
  nombreProyecto: { type: String, required: true },
  recursosNecesarios: [{ type: String, required: true }],
  presupuesto: { type: Number, required: true },
  colaboradores: [{ type: Schema.Types.ObjectId, ref: 'Colaborador', required: true }],
  estadoProyecto: { type: String, required: true, default : "En progreso",enum: ['En progreso', 'Completado', 'Pausado', 'Cancelado'] },
  descripcion: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  historialCambios: [{ type: String }],
  responsable: { type: Schema.Types.ObjectId, ref: 'Colaborador', required: true },
  tareas: [{ type: Schema.Types.ObjectId, ref: 'Tareas' }]
});

const Proyecto = mongoose.model('Proyecto', proyectoSchema, 'Proyectos');

module.exports = Proyecto;
