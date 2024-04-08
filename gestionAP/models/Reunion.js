const mongoose = require('mongoose');
const { Schema } = mongoose;

const reunionSchema = new Schema({
  fecha: {type : String},
  tema: {type : String},
  medio: {type : String},
  colaboradores: [{type : Schema.Types.ObjectId}],
  proyecto: {type : Schema.Types.ObjectId},
}, { collection: 'Reuniones' }); // Asegúrate de especificar el nombre correcto de la colección

const Reunion = mongoose.model('Reunion', reunionSchema);

module.exports = Reunion;
