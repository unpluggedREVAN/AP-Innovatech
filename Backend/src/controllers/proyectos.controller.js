import Project from '../models/Proyecto.model.js'
import User from '../models/User.model.js'

export const createProject = async (req, res) => {
    try{
        //Crear un nuevo proyecto
        const proyecto = new Project(req.body)

        //Guardar el proyecto
        await proyecto.save();

        //Dar respuesta
        return res.status(201).send({message : "Proyecto creado exitosamente", data : proyecto})
    } catch (err){
        console.log(err)
        return res.status(500).send({messsage : err.message})
    }
}

export const getProject = async (req, res) => {
    try{
        //Buscar el proyecto
        const projectFound = await Project.findById(req.params.id).populate('responsable').populate('colaboradores').populate('tareas');

        //Definir si el proyecto existe
        if(!projectFound){
            return res.status(404).send({message : "No existe el proyecto"})
        }

        return res.status(200).send({message : "Proyecto encontrado", data : projectFound})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const getAllProjects = async (req, res) => {
    try{
        const proyectos = await Project.find({})

        return res.status(200).send({data : proyectos})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const editProject = async (req, res) => {
    try{
        //Buscar y editar
        const projectEdited = await Project.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true})

        if(!projectEdited) {
            return res.status(404).send({message : "Proyecto no encontrado"})
        }
        return res.status(200).send({message : "Proyecto", data : projectEdited})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}

export const deleteProject = async (req, res) => {
    try{
        //Buscar y eliminar
        const projectDeleted = await Project.findByIdAndDelete(req.params.id)

        if(!projectDeleted) {
            return res.status(404).send({message : "Proyecto no encontrado"})
        }
        return res.status(200).send({message : "Proyecto eliminado"})
    } catch(err) {
        return res.status(500).send({message : err.message})
    }
}