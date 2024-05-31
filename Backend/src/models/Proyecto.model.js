import mongoose, {Schema, SchemaTypes} from "mongoose";

const projectSchema = new Schema({
    nombre : {type : String, required : true},
    recursos : [{type : String}],
    presupuesto : {type : Number},
    colaboradores : [{type : SchemaTypes.ObjectId, required : true, ref : 'User'}],
    tareas : [{type : SchemaTypes.ObjectId, ref : 'Task'}],
    estadoProyecto : {type : Number},
    descripcion : {type : String, required : true},
    fechaInicio : {type : Date, required : true},
    historialCambios : [{type : Date}],
    responsable : {type : SchemaTypes.ObjectId, ref : 'User', required : true}
})

export default mongoose.model('Project', projectSchema)