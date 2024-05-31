import mongoose, {Schema, SchemaTypes} from "mongoose";

const taskSchema = new Schema({
    nombre : {type : String, required : true},
    descripcion : {type : String , required : true},
    responsable : {type : SchemaTypes.ObjectId, required: true, ref : 'User'},
    proyecto : {type : SchemaTypes.ObjectId, required : true, ref : 'Project'},
    estado : {type : Number, required : true, default : 0}, //0:Por hacer - 1: En progreso - 2: Terminada
    storyPoints : {type : Number}
})

export default mongoose.model('Task', taskSchema)