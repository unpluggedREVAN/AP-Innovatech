const mongoose = require('mongoose');
const { Schema } = mongoose;

const mensajeSchema = new Schema({
  autor: { type: Schema.Types.ObjectId, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, required: true }
});

const foroSchema = new Schema({
  tipo: { type: String, required: true }, // Asumiendo posibles tipos
  titulo: { type: String, required: true },
  mensajes: [mensajeSchema],
  proyecto: { type: Schema.Types.ObjectId, required: true }
});

const Foro = mongoose.model('Foro', foroSchema,'Foros');

module.exports = Foro;
