import mongoose, {Schema, SchemaTypes} from "mongoose";

const meetingSchema = new Schema({
    tema : {type : String},
    fecha : {type : Date}, //Para mostrar por pantalla, se tiene que cortar en el caracter 9
    medio : {type : String, required: true},
    colaboradoresSolicitados : [{type : SchemaTypes.ObjectId, required : true, ref : 'User'}],
    proyecto : {type : SchemaTypes.ObjectId, required : true, ref : 'Project'} 
})

export default mongoose.model('Meeting', meetingSchema);