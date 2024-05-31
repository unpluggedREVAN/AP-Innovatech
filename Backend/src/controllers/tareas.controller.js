import Task from '../models/Tarea.model.js'

export const createTask = async (req, res) => {
    try{
        //Crear la tarea
        const tarea = new Task(req.body);

        //Guarda la tarea
        await tarea.save();

        //Enviar respuesta
        return res.status(201).send({message : "Tarea creada exitosamente", data : tarea})
    } catch (err) {
        return res.status(500).send({message : err.message})
    }
}

export const infoTask = async (req, res) => {
    try{
        //Buscar la tarea
        const taskFound = await Task.findById(req.params.id).populate('responsable').populate('proyecto');

        //Definir sí existe
        if(!taskFound){
            return res.status(404).send({message : "No existe la tarea"})
        }
        return res.status(200).send({message : "Tarea encontrada", data : taskFound})
    } catch (err) {
        return res.status(500).send({message : err.message})
    }
    return res.status(200).send({message : "Info task"})
}

export const infoAllTasks = async (req, res) => {
    return res.status(200).send({message : "Info all task"})
}

export const editTask = async (req, res) => {
    try{
        //Buscar y editar
        const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!taskUpdated) {
            return res.status(404).send({message : "Usuario no encontrado"})
        }
        return res.status(200).send({message : "Task editada", data : taskUpdated})
    } catch(err){
        return res.status(500).send({message : err.message})
    }
}

export const deleteTask = async (req, res) => {
    try{
        //Buscar y eliminar
        const taskDeleted = await Task.findByIdAndDelete(req.params.id)

        if(!taskDeleted) {
            return res.status(404).send({message : "Usuario no encontrado"})
        }
        return res.status(200).send({message : "Task eliminada exitosamente"})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}