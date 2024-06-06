import mongoose, {Schema, SchemaTypes} from "mongoose";

const mensajeSchema = new Schema({
    autor : {type : SchemaTypes.ObjectId, required : true},
    mensaje : {type : String, required : true},
    fecha : {type : Date, required : true}
})

export default mongoose.model('Mensaje', mensajeSchema)