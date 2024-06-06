import mongoose, {Schema, SchemaTypes} from "mongoose";

const foroSchema = new Schema({
    tipo : {type : String, required : true},
    titulo : {type : String, required :true},
    mensajes : [{type : SchemaTypes.ObjectId, ref : 'Mensaje'}],
    proyecto : {type : SchemaTypes.ObjectId, required : true}
})

export default mongoose.model('Foro', foroSchema)