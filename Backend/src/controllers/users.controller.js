import User from '../models/User.model.js'

export const editUser = async (req, res) => {
    try{
        //Buscar y editar
        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!userUpdated){
            return res.status(404).send({message : "Usuario no encontrado"})
        }
        return res.status(200).send({message : "Usuario editado", data : userUpdated})
    } catch(err){
        return res.status(500).send({message : err.message})
    }
}

export const getUser = async (req, res) => {
    try{
        //Buscar el usuario
        const userFound = await User.findById(req.params.id);

        if(!userFound){
            return res.status(404).send({message : "No existe el usuario"})
        }
        return res.status(200).send({message : "Usuario encontrado", data : userFound})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const infoAllUser = async (req, res) => {
    try{
        const usuarios = await User.find({"_id" : {$ne : req.params.id}})

        return res.status(200).send({data : usuarios})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const deleteUser = async (req, res) => {
    try{
        //Buscar y eliminar
        const userDeleted = await User.findByIdAndDelete(req.params.id);

        if(!userDeleted) {
            return res.status(404).send({message : "Usuario no encontrado"})
        }

        return res.status(200).send({message : "Usuario eliminado exitosamente"})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}