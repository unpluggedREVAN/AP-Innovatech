import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try{
        // hash de la contraseña
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10)

        //Crear el colaborador
        const usuario = new User({
            ...req.body,
            contrasena : hashedPassword
        })
        //Guardar el colaborar
        await usuario.save();

        //Enviar respuesta 
        return res.status(201).send({message : "Registro realizado exitosamente."})
    } catch (err) {
        return res.status(500).send({message : err.message})
    }
}

export const login = async (req, res) => {
    try {
        //Buscar el colaborador por correo electronico
        const usuario = await User.findOne({email : req.body.email})

        //Si se encuentra validad la contraseña
        if (usuario && await bcrypt.compare(req.body.contrasena, usuario.contrasena)) {
            //Autenticacion exitosa
            //Crear token de validación

            //Mandar resultado
            return res.status(200).send({message : "Login realizado existosamente.", id : usuario._id})
        } else {
            //Autenticacion fallida
            return res.status(400).send({message : "Correo electrónico o contraseña incorrectos."})
        }
    } catch (err) {
        return res.status(500).send({message : err.message})
    }
}

export const logout = async (req, res) => {
    try {
        //Borrar el token de validación
    } catch (err) {

    }
}