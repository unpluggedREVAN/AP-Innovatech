const mongoose = require('mongoose');
const { Schema } = mongoose;

const colaboradorSchema = new Schema({

  nombreCompleto: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  correoElectronico: { type: String, required: true, unique: true },
  departamentoTrabajo: { type: String, required: true },
  telefono: { type: String, required: true },
  estado: { type: String, default : 'libre',enum: ['libre', 'Ocupado'] }, // Asumiendo posibles estados
  proyectoActual: { type: Schema.Types.ObjectId, default: null },
  contrasena: { type: String, required: true }
}, { collection: 'Colaboradores' });

const Colaborador = mongoose.model('Colaboradores', colaboradorSchema);

module.exports = Colaborador;
