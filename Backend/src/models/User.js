import mongoose, {Schema} from "mongoose";

//Faltan definir cosas

const userSchema = new Schema({
    nombreCompleto : {type : String, required : true},
    cedula : {type : String , required : true, unique : true},
    email : {type : String , required : true, unique : true},
    departamentoTrabajo : {type : String, required : true},
    telefono : {type : String, required : true},
    estado : {type : mongoose.Schema.Types.BigInt, required : true},
    proyectoActual : {type : String, required : true},
    constrasena : {type : String, required : true}
})

const User = mongoose.model('Users', userSchema)

module.exports = User;