import mongoose, {Schema} from "mongoose";

//Faltan definir cosas

const userSchema = new Schema({
    nombreCompleto : {type : String, required : true},
    cedula : {type : String , required : true, unique : true},
    email : {type : String , required : true, unique : true},
    departamentoTrabajo : {type : String, required : true},
    telefono : {type : String, required : true},
    estado : {type : Number, required : true},
    proyectoActual : {type : String},
    contrasena : {type : String, required : true}
})

export default mongoose.model('User', userSchema)