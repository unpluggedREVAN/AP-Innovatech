const mongoose = require('mongoose');
const { Schema } = mongoose;

const proyectoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombreProyecto: { type: String, required: true },
    recursosNecesarios: [{ type: String, required: true }],
    presupuesto: { type: Number, required: true },
    colaboradores: [{ type: String, required: true }], // Esto podría ser un array de ObjectId si los colaboradores son documentos separados
    estadoProyecto: { type: String, required: true, enum: ['En progreso', 'Completado', 'Pausado', 'Cancelado'] },
    descripcion: { type: String, required: true },
    fechaInicio: { type: Date, required: true },
    historialCambios: [{ type: String }], // Esto podría ser más complejo dependiendo de lo que quieras registrar
    responsable: { type: String, required: true } // También podría ser un ObjectId
  });

const Proyecto = mongoose.model('Proyecto', proyectoSchema);

module.exports = Proyecto;
